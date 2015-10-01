angular.module('calendarApp', ['ngRoute'])
    .config(function ($routeProvider) {
        var resolveCalendar = {
            calendarApp: function (calendarApp) {
                return calendarApp.fetch();
            }
        };

        $routeProvider
            .when('/monthview/:year/:month', {
                controller: 'calendarController as calendar',
                templateUrl: 'calendar.html'
            })
            .when('/weekview/:year/:month/:weekofmonth', {
                controller: 'calendarController as calendar',
                templateUrl: 'week.html'
            })
            .otherwise({
                redirectTo: '/monthview/default'
            });
    });
