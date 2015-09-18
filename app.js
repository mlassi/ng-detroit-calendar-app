angular.module('calendarApp', ['ngRoute'])
    .config(function ($routeProvider) {
        var resolveCalendar = {
            calendarApp: function (calendarApp) {
                return calendarApp.fetch();
            }
        };

        $routeProvider
            .when('/monthview/:date', {
                controller: 'calendarController as calendar',
                templateUrl: 'calendar.html'
            })
            .when('/weekview/:date/:weeknum', {
                controller: 'calendarController as calendar',
                templateUrl: 'week.html'
            })
            .otherwise({
                redirectTo: '/monthview/default'
            });
    })
    .controller('calendarController', function () {

        // List of Events
        this.events = [
            {id: 1, title: 'ng-Detroit event 1', date: '04/20/2015'},
            {id: 2, title: 'ng-Detroit event 2', date: '06/03/2015'}
        ];
        // Add Event
        this.addEvent = function () {
            this.events.push({title: calendar.eventTitle, date: calendar.eventDate});
        };

        this.removeEvent = function (event_id) {
            for(var i in this.events){
                if(event_id == this.events[i].id) {
                    this.events.splice(i, 1);
                }
            }
        }

    });
