/**
 * Created by TomasDePomas on 19-1-16.
 */

Meteor.startup(function () {

    var manifest =  Meteor.settings.public.notifier && Meteor.settings.public.notifier.manifest_location ?
                        Meteor.settings.public.notifier.manifest_location : '/manifest.json',
        serviceWorker =  Meteor.settings.public.notifier && Meteor.settings.public.notifier.service_worker_location ?
                        Meteor.settings.public.notifier.service_worker_location :'/service-worker.js';

    HTTP.get(Meteor.absoluteUrl(manifest), function (error, result) {
        if (error ||
            result.headers['content-type'] !== 'application/json' ||
            ! typeof result.data.gcm_sender_id === 'string' ) {
                console.warn('The manifest file is not properly set at '+ manifest +'. Push notifications will not be available. Check the README.md for further instructions');
        }
    });


    HTTP.get(Meteor.absoluteUrl(serviceWorker), function (error, result) {
        if (error ||
            result.headers['content-type'] !== 'application/javascript') {
            console.warn('The service-worker is not properly setup at '+ serviceWorker +'. Push notifications will not be available. Check the README.md for further instructions');
        }
    });


    var head = document.getElementsByTagName('head').item(0),
        link = document.createElement('link');

    link.rel = 'manifest';
    link.href = manifest;
    head.appendChild(link);
});

