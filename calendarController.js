angular.module('calendarApp')
    .controller('calendarController', function ($scope) {

        var vm = this;

        vm.debug_mode = true;

        vm.insert_id = 0; // This variable won't be necessary once we spin up a back-end data source

        vm.max_years = 4; // Number of years in filter list (starting with current year)
        vm.filter_years = [];

        vm.filter_year = new Date().getFullYear();
        vm.filter_month = new Date().getMonth();
        vm.filter_day = new Date().getDate();

        vm.days_pad = []; // For drawing leading days in a given month
        vm.days = []; // For drawings days in a given month

        // Watchers for redraw upon filter update
        $scope.$watchGroup([function () {
            return vm.filter_year;
        }, function () {
            return vm.filter_month;
        }], function (a, b) {
            vm.initCalendar();
        });

        // Build year options. Will draw the current year + <vm.max_years>
        for (i = 0; i < vm.max_years; i++) {
            vm.filter_years.push({value: vm.filter_year + i, label: vm.filter_year + i});
        }

        // List of Events TODO: interface with back-end
        vm.events = [
            {id: 1, title: 'ng-Detroit random event ', date: '09-03-2016', priority: 4},
            {id: 2, title: 'ng-Detroit event 2', date: '09-01-2015', priority: 2},
            {id: 3, title: 'ng-Detroit event 4', date: '09-03-2015', priority: 0}
        ];

        // Temporary method to calculate next insert ID
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
            for (var i in vm.days[day-1].events) {
                if (event_id == vm.days[day-1].events[i].id) {
                    vm.days[day-1].events.splice(i, 1);
                    vm.events.splice(i, 1);
                }
            }
        }

        vm.initCalendar = function (date) {
            // Creates a new Calendar object with filter data (Calendar class will fail back to current YYYY, MM in Date is null/invalid)
            vm.calendar_helper = new Calendar(new Date(vm.filter_year, vm.filter_month));
            vm.month_labels = vm.calendar_helper.month_labels;
            vm.day_labels = vm.calendar_helper.day_labels;
            vm.initDays();
            vm.initEvents();
        }

        // Updates the
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

        vm.checkModel = function() {
            console.log('[DEBUG] vm:', vm);
        }

    });
