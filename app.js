var Monitor = require('./lib/monitor');


const WEB_WEBSITES = [
    'http://localhost'
]

var activeMonitors = [];

var interval_time = (process.argv[2]) ? process.argv[2] : 5; // Amount of seconds between each request

WEB_WEBSITES.forEach(function(website) {

    console.log('\x1b[34m%s\x1b[0m', '[' + Date.now() + '] ' + website + ' => Initializing a new Monitor.. (Interval: ' + interval_time + ')');

    // Init a new Monitor for each Website
    activeMonitors.push(new Monitor({ url: website, interval: interval_time }));

});