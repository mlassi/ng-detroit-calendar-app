/**
 * Created by mikeonslow on 9/18/15.
 */

function Event(params)
{
    var self = this;

    this.id = 0;
    this.colors = ['blue', 'green', 'yellow', 'orange', 'red'];
    this.title = '';
    this.year = 0;
    this.month = 0;
    this.day = 0;
    this.hour = 0;
    this.minute = 0;
    this.description = '';
    this.priority = 0;

    angular.forEach(params, function(value, key, elem){
        self[key] = value;
    });

}
