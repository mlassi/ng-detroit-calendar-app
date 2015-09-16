angular.module('calendarApp',[])
	.controller('calendarController', function(){
		var calendar = this;
		// List of Events
		calendar.events = [
			{id:1,title:'ng-Detroit event 1',date:'04/20/2015'},
			{id:2,title:'ng-Detroit event 2',date:'06/03/2015'}
		];
		// Add Event
		calendar.addEvent = function(){
			calendar.events.push({title:calendar.eventTitle,date:calendar.eventDate});
		};
	});