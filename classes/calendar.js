function Calendar(date) {

    this.month_names = new Array("January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December");

    this.day_names = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");

    this.getDaysInMonth = function() {
        return this.days_in_month;
    }

    this.setFirstDayofMonth = function() {
        var d = new Date(this.date);
        d.setDate(1);
        this.first_day_of_month = d.getDay();
    }

    this.getFirstDayOfMonth = function() {
        return this.first_day_of_month;
    }

    this.init = function(date) {
        if(typeof date == 'string') {
            date = new Date(date);
        } else if(!(date instanceof Date)) {
            date = new Date();
        }

        this.date = date;
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.day = date.getDate();
        this.days_in_month = new Date(this.year, this.month, 0).getDate();
        this.setFirstDayofMonth();
    }

    this.init(date);

}

