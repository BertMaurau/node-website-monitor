var Monitor = require('./lib/monitor');

const WEB_INTERVAL = 5; // Amount of seconds between each request
const WEB_WEBSITES = [
    'https://www.google.com'
]

var activeMonitors = [];

WEB_WEBSITES.forEach(function(website) {

    console.log('\x1b[34m%s\x1b[0m', '[' + Date.now() + '] ' + website + ' => Initializing a new Monitor..');

    // Init a new Monitor for each Website
    activeMonitors.push(new Monitor({ url: website, interval: WEB_INTERVAL }));

});