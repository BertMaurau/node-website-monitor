var request = require('request');
var http = require('http');


function Monitor(args) {

    this.init(args)

}


Monitor.prototype = {

    init: function(args) {

        var self = this;

        // Set the URL that needs to be Monitored
        self.url = (args.hasOwnProperty('url')) ? args.url : '';

        // Set the Interval (Amount of seconds between each request) (Default: 30s)
        self.interval = (args.hasOwnProperty('interval')) ? (args.interval * 1000) : 30000;

        // Start the polling..
        self.start();

    },

    start: function() {

        var self = this;

        console.log('\x1b[33m%s\x1b[0m', '[' + Date.now() + '] ' + self.url + ' => Monitor Started!\r\n');

        // Activate the polling
        self.handle = setInterval(function() {

            // Send a request
            self.request();

        }, self.interval)
    },

    request: function() {

        var self = this;

        console.log('[' + Date.now() + '] ' + self.url + ' => Sending Request..');

        try {
            request(self.url, function(error, response, body) {

                var responseDisplay = response.statusCode + ' ' + response.statusMessage;

                if (!error && response.statusCode === 200) {
                    self.onSuccess();
                } else if (!error) {
                    self.onWarning(responseDisplay);
                } else {
                    self.onError(responseDisplay);
                }
            });
        } catch (error) {
            self.onError();
        }

    },

    onSuccess: function() {
        var self = this;
        console.log('\x1b[32m%s\x1b[0m', '[' + Date.now() + '] ' + self.url + ' => Responded! (Status: OK)');
    },
    onWarning: function(response) {
        var self = this;
        console.log('\x1b[33m%s\x1b[0m', '[' + Date.now() + '] ' + self.url + ' => Responded, but longer than expected! (' + response + ')');
    },
    onError: function(response) {
        var self = this;
        console.log('\x1b[31m%s\x1b[0m', '[' + Date.now() + '] ' + self.url + ' => Didn\'t Respond! (' + response + ')');
    }
}

module.exports = Monitor;