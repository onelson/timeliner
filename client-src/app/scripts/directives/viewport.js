
'use strict';

function Viewport(options) {
  options = options || {};
  var _ = {
      pos: {
        x: options.x || 0,
        y: options.y || 0
      },
      dragOffset: null,
      dragSpeed: 1
  };

  return {

    setDragOffset: function (event) {
      _.dragOffset = {x: event.x, y: event.y};
    },
    stopDrag: function () {
      _.dragOffset = null;
    },
    isDragging: function () {
      return _.dragOffset !== null;
    },
    getPos: function getPos () {
      return angular.copy(_.pos);
    },
    updatePos: function (event) {
      if (this.isDragging()) {
        _.pos.x += (event.x - _.dragOffset.x) * _.dragSpeed;
        _.pos.y += (event.y - _.dragOffset.y) * _.dragSpeed;
        this.setDragOffset(event);
      }
    }

  };
}

angular.module('timeliner')
  .directive('viewport', function () {
    return {
      scope: {},
      templateUrl: 'views/viewport.html',
      restrict: 'E',
      controller: ['$scope', '$window', '$log', function($scope, $window, $log) {

        var viewport = new Viewport();

        var pos = viewport.getPos();
        $scope.bgx = pos.x;
        $scope.bgy = pos.y;

        $scope.press = function mousePress () {
          viewport.setDragOffset($window.event);
        };

        $scope.release = function mouseRelease () {
          viewport.stopDrag();
        };

        /**
         * when dragging, we want to adjust the coords shown in the viewport
         */
        $scope.checkMove = function checkMove () {
          viewport.updatePos($window.event);
          if(viewport.isDragging()) {
            var pos = viewport.getPos();
            $log.debug(pos);
            $scope.bgx = pos.x;
            $scope.bgy = pos.y;
          }
        };

      }],
      link: function postLink(scope, element, attrs) {
      }
    };
  });