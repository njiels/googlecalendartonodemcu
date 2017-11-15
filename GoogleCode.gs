function doGet(e) {
    var cal = CalendarApp.getCalendarById('GoogleCalendarId');
    
    if (cal == undefined) {
        return ContentService.createTextOutput("no access to calendar");
    }
    
    const now = new Date();
    var start = new Date(); start.setHours(0, 0, 0); // start at midnight
    const oneday = 24*3600000; // [msec]
    const stop = new Date(start.getTime() + 7 * oneday);
    var eventable = null;
    
    var events = cal.getEvents(start, stop);
    var oneHoursFromNow = new Date(now.getTime() + (2 * 60 * 60 * 1000));
    var twoHoursFromNow = new Date(now.getTime() + (2 * 60 * 60 * 1000));
    var threeHoursFromNow = new Date(now.getTime() + (3 * 60 * 60 * 1000));
    var fourHoursFromNow = new Date(now.getTime() + (4 * 60 * 60 * 1000));
    var fiveHoursFromNow = new Date(now.getTime() + (5 * 60 * 60 * 1000));
    
    for (var ii = 0; ii < events.length; ii++) {
        var event=events[ii];
        var myStatus = event.getMyStatus();
        switch(myStatus) {
            case CalendarApp.GuestStatus.OWNER:
            case CalendarApp.GuestStatus.YES:
            case CalendarApp.GuestStatus.MAYBE:
                if (event.getStartTime() >= now && event.getStartTime()<= fiveHoursFromNow){
                    var eventable=5;
                }
                
                if (event.getStartTime() >= now && event.getStartTime()<= fourHoursFromNow){
                    var eventable=4;
                }
                
                if (event.getStartTime() >= now && event.getStartTime()<= threeHoursFromNow){
                    var eventable=3;
                }
                
                if (event.getStartTime() >= now && event.getStartTime()<= twoHoursFromNow){
                    var eventable=2;
                }
                if (event.getStartTime() >= now && event.getStartTime()<= oneHoursFromNow){
                    var eventable=1;
                }
        }
    }
    return ContentService.createTextOutput(eventable);
}function doGet(e) {
    var cal = CalendarApp.getCalendarById('GoogleCalendarId');
    
    if (cal == undefined) {
        return ContentService.createTextOutput("no access to calendar");
    }
    
    const now = new Date();
    var start = new Date(); start.setHours(0, 0, 0); // start at midnight
    const oneday = 24*3600000; // [msec]
    const stop = new Date(start.getTime() + 7 * oneday);
    var eventable = null;
    
    var events = cal.getEvents(start, stop);
    var oneHoursFromNow = new Date(now.getTime() + (2 * 60 * 60 * 1000));
    var twoHoursFromNow = new Date(now.getTime() + (2 * 60 * 60 * 1000));
    var threeHoursFromNow = new Date(now.getTime() + (3 * 60 * 60 * 1000));
    var fourHoursFromNow = new Date(now.getTime() + (4 * 60 * 60 * 1000));
    var fiveHoursFromNow = new Date(now.getTime() + (5 * 60 * 60 * 1000));
    
    for (var ii = 0; ii < events.length; ii++) {
        var event=events[ii];
        var myStatus = event.getMyStatus();
        switch(myStatus) {
            case CalendarApp.GuestStatus.OWNER:
            case CalendarApp.GuestStatus.YES:
            case CalendarApp.GuestStatus.MAYBE:
                if (event.getStartTime() >= now && event.getStartTime()<= fiveHoursFromNow){
                    var eventable=5;
                }
                
                if (event.getStartTime() >= now && event.getStartTime()<= fourHoursFromNow){
                    var eventable=4;
                }
                
                if (event.getStartTime() >= now && event.getStartTime()<= threeHoursFromNow){
                    var eventable=3;
                }
                
                if (event.getStartTime() >= now && event.getStartTime()<= twoHoursFromNow){
                    var eventable=2;
                }
                if (event.getStartTime() >= now && event.getStartTime()<= oneHoursFromNow){
                    var eventable=1;
                }
        }
    }
    return ContentService.createTextOutput(eventable);
}
