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

        this.filter_year = 2015;
        this.filter_month = 9;
        this.filter_day = 0;

        this.calendar_helper = new Calendar(this.filter_year, this.filter_month); // Creates a new object with the current date

        this.month_labels = this.calendar_helper.month_labels;
        this.day_labels = this.calendar_helper.day_labels;

        this.filter_years = [
            {id: 2015, label: '2015'},
            {id: 2016, label: '2016'},
            {id: 2017, label: '2017'},
            {id: 2018, label: '2018'},
        ];


        this.days_pad = [];
        this.days = [];

        // List of Events
        this.events = [
            {id: 1, title: 'ng-Detroit event 2', date: '09-01-2015', priority: 2},
            {id: 2, title: 'ng-Detroit event 4', date: '09-03-2015', priority: 0}
        ];

        // Add Event
        this.addEvent = function () {
            this.events.push({title: this.eventTitle, date: this.eventDate});
            this._initEvent(this.events.slice(-1)[0]);
        };

        // Delete Event
        this.deleteEvent = function (day, event_id) {
            for(var i in this.days[day - 1].events){
                if(event_id == this.events[i].id) {
                    this.days[day - 1].events.splice(i, 1);
                    this.events.splice(i, 1);
                }
            }
        }

        this.initCalendar = function (date) {
            this.initDays();
            this.initEvents();
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

        this.initEvents = function () {
            for(i=0;i<this.events.length;i++) {
                var event = this.events[i];
                this._initEvent(event);
            }
        }

        this._initEvent = function(event) {
            date = new Date(event.date);
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate() - 1;

            console.log(event.date, month, day, year);

            if(year != this.filter_year || month != this.filter_month) {
                return;
            }
            params = {
                id: event.id,
                title: event.title,
                year: year,
                month: month,
                day: day,
                hour: 0,
                minute: 0,
                description: '',
                priority: event.priority
            };
            this.days[day].events.push(new Event(params));
        }


    });
