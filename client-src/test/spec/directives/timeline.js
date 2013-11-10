'use strict';

describe('Directive: viewport', function () {

  // load the directive's module
  beforeEach(module('timeliner'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<viewport></viewport>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the viewport directive');
  }));
});
