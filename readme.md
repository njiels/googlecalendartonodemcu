# Google-Agenda-to-Node-MCU

This manual will show you how to connect to your Google Calendar to your NodeMCU and make a LED light up when an event is nearby. For this manual I used:
* a NodeMCU (with ESP8266 board) with Wifi board
* a (new) Google Calendar

## Step 1: Create a Google Calendar
You can use your own calendar but for security I created a new one.
Once we've created a calendar we have to search for the Calendar ID. You can find your id at `settings > calendar settings > Integrate Calendar > Calendar ID`.

## Step 2: Let Google App Script read your Google Calendar
For this step we'll be using [Google App Script](https://www.google.com/script/start/), a online text editor that calls the google API, making it very easy to communicate to google services. I have created my own code using some snippets from [this tutorial](https://coertvonk.com/sw/embedded/esp8266-clock-import-events-from-google-calendar-15809).
```javascript
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
}
```
This code creates a couple of time variables which determine how close an event is. The amount of time till an event determines what text output


### **Now we need to publish this script**
We are going to publish this script as a web app
* Publish > Deploy as web app.
* Enter the following settings: Project version = new.  Execute the app as me.  Access = anyone, even anonymous.
* Click OK
* When you run the script for the first time (Run > doGet), it will ask you to grand access to your calendar.

### **With the script published as web app we ar able to retrieve our Library Key**
The web app will have a url that looks like this: `https://script.google.com/macros/s/<random-string>/exec` the `<random-string>` is your GScriptId


> Note: this is a customized version of the code i got at this [tutorial.](https://coertvonk.com/sw/embedded/esp8266-clock-import-events-from-google-calendar-15809)

## Step 3: Connect your NodeMCU to your Google Web App
Now we need to connect our Node to our internet. Download the **GoogleDocs.ino** (It's pretty long so I won't post the whole code here) script that I have included in these files. It's an edited version of a [script created by Sujay Phadke](https://github.com/electronicsguy/ESP8266) which also uses his HTTPSRedirect library. This library (and script) is needed because the data is displayed on a HTTPS website, which due to security reasons is pretty hard to read for my nodeMCU.

**Connecting to Wifi and Google Web App**

```c++
// Fill ssid and password with your network credentials
const char* ssid = "ssid"; //Change this to your wifi's name
const char* password = "password"; //change this to your wifi password

const char* host = "script.google.com";
// Replace with your own script id to make server side changes
const char *GScriptId = "GoogleScriptID";
```

>This code was built by [Sujay Phadke's HTTPSRedirect Library](https://github.com/electronicsguy/ESP8266) which, itself is an extension of the [HTTPSRederict Library](https://github.com/esp8266/Arduino)

## Conclusion
I have been able to succesfully display my Google Web App content in my serial monitor but i do not know how to make my serial trigger events on my NodeMCU. I thought that it would be possible to read the serial output and I planned on using that data in a `if statement`.
I have tried all sorts of solutions but have yet to come across a code that is able to read the serial output.

## Other Problems
### Creating a script for multiple different calendars.
My first idea was to create this script for multiple calendars, which events would trigger a LED that lit up with the color of the triggering calendar. I have yet been unable to do this. I found the following [post on stackoverflow](https://stackoverflow.com/questions/37255380/extract-multiple-google-calendars-to-single-google-sheet) of someone with a similar question, but the solution on this post did not work for me. It said that i had to create an array with all my calendar iD's and create a for loop in which the whole code runs, so it will run for different iD's. The code looks something like this:

```javascript
function doGet(e) {
var mycals = ['nilsvangeven@gmail.com',
'9qf7ksr1okbrieel7srqhpm3o8@group.calendar.google.com']; //Multiple Calendars

for (var j = 0; j < mycals.length; j++){
var cal = CalendarApp.getCalendarById(mycals[j]);
<REST OF CODE>
}
```
The code simply doesn't return more than 1 calendar's event. I haven't come across a solution for this.

### Finding the string that gets printed in the monitor
I tried to solve the problem described in the conclusion by searching for the string that declares what gets printed. Due to hardware problems and my use of someone else's code that I do not fully comprehend I have not yet found this string but I know that `string = url2` redirects to the url to Google Calendar and that `payload` is probably the string. BUT I do not yet know how to extract data from this variable.

## Sources
[ESP8266 reads Google Calendar.](https://coertvonk.com/sw/embedded/esp8266-clock-import-events-from-google-calendar-15809)

[Sujay Phadke's HTTPSRedirect Library](https://github.com/electronicsguy/ESP8266)

[Google Apps Script Library](https://developers.google.com/apps-script/overview)

[Extract multiple calendars](https://stackoverflow.com/questions/37255380/extract-multiple-google-calendars-to-single-google-sheet)
