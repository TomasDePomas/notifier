/**
 * Created by TomasDePomas on 24-1-16.
 */

Notifier.windowNotification = function(message){

    var title = message.title || Notifier.config.defaultTitle || 'Notification';

    var notification = new Notification(title, {
        body : message.body,
        icon : message.icon || null,
        tag : message.tag || message._id
    });

    var external = RegExp('^((f|ht)tps?:)?//');

    if(typeof Batch != 'undefined'){
        Batch.fire('Notifier:notificationSend');
    }

    notification.onclick = function(){
        if(typeof Batch != 'undefined'){
            Batch.fire('Notifier:notificationReceived');
        }

        if(notification.link){
            if(external.test(notification.link)){
                var newWindow = window.open(notification.link, '_blank');
                newWindow.focus();
            }else{
                window.open(notification.link, '_self');
                window.focus();
            }
        }
    };

    if(notification.archive){
        Meteor.call('/notifier/archive', notification._id);
    }else{
        Meteor.call('/notifier/destroy', notification._id);
    }
};

Notifier.startWindowQueue = function(){
    var unreadNotifications = Notifications.find({
        type: this.NOTIFICATION_TYPE_WINDOW,
        receivedAt: null,
        receiverId: Meteor.userId()
    });

    unreadNotifications.observe({
        added: function (message) {
            Notifier.windowNotification(message);
        }
    });

}