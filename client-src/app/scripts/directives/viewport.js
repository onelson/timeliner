
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
  },
  methods = {
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


  var paper = Raphael(options.container.find('.wrapper')[0]);
  var circle = paper.circle(50, 40, 10);
  circle.attr("fill", "#f00");
  circle.attr("stroke", "#fff");
  return methods;
}

angular.module('timelinerApp')
  .directive('viewport', function () {
    return {
      scope: {},
      templateUrl: 'views/viewport.html',
      restrict: 'E',
      controller: ['$scope', '$window', '$log', function($scope, $window, $log) {

        $scope.press = function mousePress () {
          $scope.viewport.setDragOffset($window.event);
        };

        $scope.release = function mouseRelease () {
          $scope.viewport.stopDrag();
        };

        /**
         * when dragging, we want to adjust the coords shown in the viewport
         */
        $scope.checkMove = function checkMove () {
          $scope.viewport.updatePos($window.event);
          if($scope.viewport.isDragging()) {
            var pos = $scope.viewport.getPos();
            $log.debug(pos);
            $scope.bgx = pos.x;
            $scope.bgy = pos.y;
          }
        };



      }],
      link: function postLink(scope, element, attrs) {
        scope.viewport = new Viewport({
          container: element
        });
      }
    };
  });