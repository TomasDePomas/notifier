/**
 * Created by TomasDePomas on 22-7-15.
 */

Meteor.startup(function () {
    Meteor.call('/notifier/setWindowNotificationStatus', Notifier.WINDOW_NOTIFICATION_STATUS_ENABLED);
    if(window.Notification && Notification.requestPermission){
        if (Notification.permission === 'default') {
            Notification.requestPermission(function (permission) {
                if(permission != 'denied'){
                    Meteor.call('/notifier/setWindowNotificationStatus', Notifier.WINDOW_NOTIFICATION_STATUS_ENABLED);
                    console.debug('Permission granted');
                }else{
                    console.error('Permission denied');
                }
            });
        }else if(Notification.permission === 'denied'){
            console.error('You have denied notifcation permissions for this domain. To undo this, select the content settings on "chrome://settings/search#meldingen" and remove this domain from the list of exceptions')
        }
    }
});