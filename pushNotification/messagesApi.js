/**
 * Created by TomasDePomas on 24-1-16.
 */

Meteor.startup(function() {

    var endpoint = Meteor.settings.public.notifier &&
    Meteor.settings.public.notifier.endpoint ?
        Meteor.settings.public.notifier.endpoint : {};

    var apiPath = endpoint.path || 'api/message',
        port = endpoint.port || 3005,
        http = Npm.require('http'),
        fiber = Npm.require('fibers'),
        httpServer = http.createServer(function (request, response) {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader('Access-Control-Allow-Methods', 'GET');

            if (request.method == 'GET') {
                var params = _.without(request.url.split('/'), '');
                var required = _.without(apiPath.split('/'), ']' +
                    '' +
                    '');

                if (required.length === (params.length - 1) && _.isEqual(required, params.slice(0, -1))) {
                    var registrationId = _.last(params);

                    var messagesCursor = Notifications.find({
                        'subscriptions.registrationId': registrationId,
                        'receivedAt': null
                    });

                    fiber(function () {
                        var messages = messagesCursor.fetch();
                        if (messages.length) {
                            response.statusCode = 200;
                            response.end(JSON.stringify(messages));
                        }
                        response.statusCode = 404;
                        response.end('[]');
                    }).run();

                } else if (required.length === (params.length - 2) && _.isEqual(required, params.slice(0, -2))) {
                    var messageId = _.last(params);
                    fiber(function () {
                        Notifications.update({_id: messageId, archive: true}, {
                            'receivedAt': new Date()
                        });

                        Notifications.remove({_id: messageId, archive: false});

                        response.statusCode = 200;
                        response.end(JSON.stringify([]));
                    }).run();
                } else {
                    response.statusCode = 400;
                    response.end('[]');
                }
            } else {
                response.statusCode = 400;
                response.end('[]');
            }
        });

    httpServer.listen(port, function () {
        console.log('Server listening on port :%s', port);
    });
});