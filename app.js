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
    })
    .controller('calendarController', function ($scope) {

        var vm = this;

        vm.insert_id = 0; // this variable won't be necessary once we spin up a back-end data source

        vm.max_years = 4; // number of years in filter list (starting with current year)
        vm.filter_years = [];

        vm.filter_year = new Date().getFullYear();
        vm.filter_month = new Date().getMonth();
        vm.filter_day = new Date().getDate();

        $scope.$watchGroup([function () {
            return vm.filter_year;
        }, function () {
            return vm.filter_month;
        }], function (a, b) {
            vm.initCalendar();
        });

        for (i = 0; i < vm.max_years; i++) {
            vm.filter_years.push({value: vm.filter_year + i, label: vm.filter_year + i});
        }

        vm.days_pad = [];
        vm.days = [];

        // List of Events TODO: interface with back-end
        vm.events = [
            {id: 1, title: 'ng-Detroit random event ', date: '09-03-2016', priority: 4},
            {id: 2, title: 'ng-Detroit event 2', date: '09-01-2015', priority: 2},
            {id: 3, title: 'ng-Detroit event 4', date: '09-03-2015', priority: 0}
        ];

        vm.getEventInsertId = function() {
            vm.events.forEach(function(e){
                if(e.id > vm.insert_id) {
                    vm.insert_id = e.id;
                }
            });
            return vm.insert_id+1;
        }

        // Add Event
        vm.addEvent = function () {
            vm.events.push({id: vm.getEventInsertId(), title: vm.eventTitle, date: vm.eventDate});
            vm._initEvent(vm.events.slice(-1)[0]);
        };

        // Delete Event
        vm.deleteEvent = function (day, event_id) {
            console.log('test', arguments, vm.days);
            for (var i in vm.days[day-1].events) {
                console.log('event_id', event_id, 'vm.events[i].id', vm.events[i].id, 'vm.days[day-1].events', vm.days[day-1].events, i)
                if (event_id == vm.events[i].id) {
                    vm.days[day-1].events.splice(i, 1);
                    vm.events.splice(i, 1);
                }
            }
        }

        vm.initCalendar = function (date) {
            vm.calendar_helper = new Calendar(new Date(vm.filter_year, vm.filter_month)); // Creates a new object with the current date
            vm.month_labels = vm.calendar_helper.month_labels;
            vm.day_labels = vm.calendar_helper.day_labels;
            vm.initDays();
            vm.initEvents();
        }

        vm.initDays = function () {
            vm.days_pad = Array(vm.calendar_helper.first_day_of_month);
            for (i = 0; i < vm.days_pad.length; i++) {
                vm.days_pad[i] = new Day(0);
            }
            vm.days = Array(vm.calendar_helper.days_in_month);
            for (i = 0; i < vm.days.length;) {
                vm.days[i] = new Day(++i);
            }
        }

        vm.initEvents = function () {
            for (i = 0; i < vm.events.length; i++) {
                var event = vm.events[i];
                vm._initEvent(event);
            }
        }

        vm._initEvent = function (event) {
            date = new Date(event.date);
            year = date.getFullYear();
            month = date.getMonth();
            day = date.getDate() - 1;

            console.log(event.date, month, day, year);

            if (year != vm.filter_year || month != vm.filter_month) {
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
            vm.days[day].events.push(new Event(params));
        }


    });
