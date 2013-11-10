
'use strict';

angular.module('timeliner')
  .directive('viewport', function () {
    return {
      scope: {},
      templateUrl: 'views/viewport.html',
      restrict: 'E',
      controller: ['$scope', function($scope) {

        var isDragging = false;

        $scope.press = function mousePress () {
          isDragging = true;
        };

        $scope.release = function mouseRelease () {
          isDragging = false;
        };

        /**
         * when dragging, we want to adjust the coords shown in the viewport
         */
        $scope.checkMove = function checkMove () {
          if (isDragging) {
            console.log(window.event);
          }
        };

      }],
      link: function postLink(scope, element, attrs) {

      }
    };
  });