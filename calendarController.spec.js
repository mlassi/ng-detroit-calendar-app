'use strict';

describe('calendarController', function() {

    var scope, $rootScope, $controller, CalendarController;

    beforeEach(function() {
        module('calendarApp');

        inject(function($injector) {
           $rootScope = $injector.get('$rootScope');
           $controller = $injector.get('$controller');
        });

        scope = $rootScope.$new();
        CalendarController = $controller('calendarController as calendar', {
            $scope: scope
        });
    })

    it('should do something', function() {
       expect(false).toBeTruthy();
    });

});
