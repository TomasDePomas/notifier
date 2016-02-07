/**        alert('Service workers not supported.');
 * Created by TomasDePomas on 10-1-2016.
 */

Meteor.startup(function () {

    var serviceWorker =  Meteor.settings.public.notifier && Meteor.settings.public.notifier.service_worker_location ?
                          Meteor.settings.public.notifier.service_worker_location :'/service-worker.js',

        endpoint = Meteor.settings.public.notifier &&
                    Meteor.settings.public.notifier.endpoint ?
                      Meteor.settings.public.notifier.endpoint : { };

    var apiPath = Meteor.absoluteUrl().split(':').slice(0, 2).join(':');
        apiPath = apiPath.replace(/\/$/, '');
        apiPath += ':';
        apiPath += endpoint.port || 3005;
        apiPath += '/';
        apiPath += endpoint.path || 'api/message';


    if ('serviceWorker' in navigator) {
        function initializeSubscription() {

            if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
                Notifier.setStatus('not_supported');
                return;
            }

            if (Notification.permission == 'denied') {
                Notifier.setStatus('denied');
                return;
            }

            if (!('PushManager' in window)) {
                Notifier.setStatus('not_supported');
                return;
            }

            navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
                serviceWorkerRegistration.pushManager.getSubscription()
                    .then(function (subscription) {
                        if (!subscription) {
                            Notifier.setStatus('disabled');
                            return;
                        }
                        var registrationId = _.last(subscription.endpoint.split('/'));
                        Meteor.call('/notifier/addSubscription', Meteor.userId(), registrationId);
                        Notifier.canPushNotification = true;
                        Notifier.setStatus('enabled');
                    })
                    .catch(function (err) {
                        Notifier.setStatus('error');
                        throw new Meteor.Error('subscription-error', err);
                    });
            });
        }

        navigator.serviceWorker.register(serviceWorker + '?apiPath=' + apiPath, {
                scope: '/'
            }).then(initializeSubscription);
    } else if(window.Notification){
        Notifier.setStatus('push_not_supported');
    }else{
        Notifier.setStatus('not_supported');
    }
});