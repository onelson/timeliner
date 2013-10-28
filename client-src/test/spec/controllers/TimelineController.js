'use strict';

describe('Controller: TimelinecontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('timelinerApp'));

  var TimelinecontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TimelinecontrollerCtrl = $controller('TimelinecontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
