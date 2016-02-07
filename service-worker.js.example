/**
 * Created by TomasDePomas on 10-1-2016.
 *
 * Make sure this file is served at <site root>/service-worker.js
 * by placing this file in the root of your <project root>/public/ folder.
 *
 */

var apiURL = '';
self.addEventListener('activate', function(event) {
    self.apiURL = self.registration.active.scriptURL.split('?apiPath=')[1];
});

self.addEventListener('push', function(event) {
    event.waitUntil(
        self.registration.pushManager.getSubscription()
            .then(function(subscription) {
                if(subscription) {
                    var bits = subscription.endpoint.split('/')
                        registrationId = bits[bits.length -1];

                    fetch(self.apiURL + '/' + registrationId)
                        .then(function (response) {
                            if (response.status !== 200) {
                                throw new Error('Invalid status code from API: ' +
                                    response.status);
                            }
                            return response.json();
                        })
                        .then(function (data) {
                            var message = data.length ? data[0] : false;

                            if(message){
                                fetch(self.apiURL + '/received/' + message._id);
                                var title = message.title ? message.title : 'Notification';
                                return self.registration.showNotification(title,
                                    message
                                );
                            }else{
                                console.error('Message is empty');
                            }
                        })
                        .catch(function (err) {
                            console.error('A problem occurred finding the message: ', err);
                        })
                } else {
                    console.error('No subscription found');
                }
        })
    );
});

self.addEventListener('notificationclick', function(event) {
    console.log(event);
    event.notification.close();

    event.waitUntil(clients.matchAll({
        type: 'window'
    }).then(function() {
        var url = event.notification.link || '/';
        if (clients.openWindow)
            return clients.openWindow(url);
    }));
});