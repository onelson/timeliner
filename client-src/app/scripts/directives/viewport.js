'use strict';

angular.module('timeliner')
  .directive('viewport', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the viewport directive');
      }
    };
  });
