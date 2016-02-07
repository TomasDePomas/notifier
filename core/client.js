/**
 * Created by TomasDePomas on 22-7-15.
 */

Notifier.send = function(body, receiverId, options, callback){
	Meteor.call('/notifier/send', body, receiverId, options, callback)
};

Notifier.setStatus = function(status){
    if(typeof Session != 'undefined'){
        Session.set('notificationStatus', status);
    }
};

Notifier.subscribe = function(){

    return new Promise(function(resolve, reject){
        navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
            serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
                .then(function(subscription) {
                    Notifier.setStatus('enabled');
                    Notifier.canPushNotification = true;

                    var registrationId = _.last(subscription.endpoint.split('/'));

                    Meteor.call('/notifier/addSubscription', Meteor.userId(), registrationId);

                    resolve(registrationId);
                })
                .catch(function(err) {
                    Notifier.canPushNotification = false;
                    Notifier.setStatus('error');
                    reject(Error(err));
                });
        });
    });

};

Notifier.unsubscribe = function() {
    return new Promise(function (resolve, reject) {
        navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
            serviceWorkerRegistration  .pushManager.getSubscription().then(
                function (subscription) {
                    Notifier.canPushNotification = false;

                    if (!subscription) {
                        Notifier.setStatus('disabled');
                        reject(Error('No subscription'));
                    }

                    var registrationId = _.last(subscription.endpoint.split('/'));

                    subscription.unsubscribe().then(function (successful) {
                        Notifier.setStatus('disabled');
                        Meteor.call('/notifier/removeSubscription', Meteor.userId(), registrationId);
                        resolve();
                    }).catch(function (err) {
                        Notifier.setStatus('disabled');
                        Meteor.call('/notifier/removeSubscription', Meteor.userId(), registrationId);
                        reject(Error(err));
                    });
                }).catch(function (err) {
                Notifier.canPushNotification = true;
                Notifier.setStatus('error');
                reject(Error(err));
            });
        });
    });
};


Notifier.start = function(config){

    config = _.extend({}, config);
    this.setConfig(config);
    this.startWindowQueue();
};

Notifier.setConfig = function(config){

    var notificationContainer = document.getElementById('notifierContainer');
    config.notification = config.notification || {};
    config.notification.type = 'card';

    notificationContainer.style.width = '300px';
    notificationContainer.style.position = 'fixed';
    notificationContainer.style.zIndex = 1000;

    switch(config.notification.location){
        case 'topbar':
            notificationContainer.style.top = 0;
            notificationContainer.style.left = 0;
            notificationContainer.style.right = 0;
            break;
        case 'bottombar':
            notificationContainer.style.bottom = 0;
            notificationContainer.style.left = 0;
            notificationContainer.style.right = 0;
            break;
        case 'topleft':
            notificationContainer.style.top = 0;
            notificationContainer.style.left = 0;
            break;
        case 'topright':
            notificationContainer.style.top = 0;
            notificationContainer.style.right = 0;
            break;
        case 'bottomleft':
            notificationContainer.style.bottom = 0;
            notificationContainer.style.left = 0;
            break;

        case 'bottomright':
        default:
            notificationContainer.style.bottom = 0;
            notificationContainer.style.right = 0;
            break;
    }

    Meteor.call('/notifier/setConfig', config);
};