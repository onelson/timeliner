'use strict';

angular.module('timelinerApp')
  .directive('timeline', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the timeline directive');
      }
    };
  });
