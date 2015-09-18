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
            .when('/weekview/:date/:weekofmonth', {
                controller: 'calendarController as calendar',
                templateUrl: 'week.html'
            })
            .otherwise({
                redirectTo: '/monthview/default'
            });
    })
    .controller('calendarController', function () {

        this.calendar_helper = new Calendar(); // Creates a new object with the current date

        this.month_labels = this.calendar_helper.month_labels;
        this.day_labels = this.calendar_helper.day_labels;

        this.filter_year = 2015;
        this.filter_month = 9;
        this.filter_day = 0;

        this.days_pad = [];
        this.days = [];

        // List of Events
        this.events = [
            {id: 1, title: 'ng-Detroit event 1', date: '2015-04-20'},
            {id: 2, title: 'ng-Detroit event 2', date: '2015-06-03'}
        ];

        // Add Event
        this.addEvent = function () {
            this.events.push({title: calendar.eventTitle, date: calendar.eventDate});
        };

        // Remove Event
        this.removeEvent = function (event_id) {
            for(var i in this.events){
                if(event_id == this.events[i].id) {
                    this.events.splice(i, 1);
                }
            }
        }

        this.initCalendar = function (date) {
            this.calendar_helper = new Calendar(date);
            this.initDays();


            console.log(this);
        }

        this.initDays = function () {
            this.days_pad = Array(this.calendar_helper.first_day_of_month);
            for(i=0;i<this.days_pad.length;i++) {
                this.days_pad[i] = new Day(0);
            }
            this.days = Array(this.calendar_helper.days_in_month);
            for(i=0;i<this.days.length;) {
                this.days[i] = new Day(++i);
            }
        }

        this.drawCalendar = function () {
            //console.log(this.cal);
        }


    });
