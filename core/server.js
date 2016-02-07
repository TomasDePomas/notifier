/**
 * Created by TomasDePomas on 22-7-15.
 */

Notifier.send = function (body, receiverId, options) {
    if (typeof body === 'string' && typeof receiverId ==='string') {

        var receiver = Meteor.users.findOne(receiverId);

        if (!receiver) {
            throw new Meteor.Error('user-not-found-error', 'Unable to find a user with id: \'' + receiverId + '\'');
        }
        if (!Notifier.GCMAPIKey) {
            throw new Meteor.Error('apikey-missing', 'No apikey set. Check the readme for further instructions.');
        }

        if(receiver.subscriptions &&
            receiver.subscriptions.length &&
               receiver.profile.clientStatus != Notifier.CLIENT_STATUS_ACTIVE) {

            Notifications.insert(_.extend({
                createdAt: new Date(),
                body: body,
                receiverId: receiverId,
                receivedAt: null,
                subscriptions: receiver.subscriptions,
                type: this.NOTIFICATION_TYPE_PUSH
            }, options));

            _.each(receiver.subscriptions, function(subscription){

                HTTP.post('https://android.googleapis.com/gcm/send', {
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : 'key=' + Notifier.GCMAPIKey
                    },
                    data: {
                        to: subscription.registrationId
                    }
                }, function(err, response){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(response);
                    }
                });
            });

        } else if(receiver.profile.clientStatus == Notifier.CLIENT_STATUS_BLUR &&
                    receiver.profile.windowNotificationStatus == Notifier.WINDOW_NOTIFICATION_STATUS_ENABLED) {

            return Notifications.insert(_.extend({
                createdAt: new Date(),
                body: body,
                receiverId: receiverId,
                receivedAt: null,
                type: this.NOTIFICATION_TYPE_CLIENT
            }, options));

        } else {

            return Notifications.insert(_.extend({
                createdAt: new Date(),
                body: body,
                receiverId: receiverId,
                receivedAt: null,
                type: this.NOTIFICATION_TYPE_WINDOW
            }, options));
        }
    }
    return false;
};