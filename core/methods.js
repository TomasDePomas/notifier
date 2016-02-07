/**
 * Created by TomasDePomas on 22-7-15.
 */

Meteor.methods({
    '/notifier/setConfig': function(config){
        Notifier.config = config;
    },
    '/notifier/addSubscription' : function(userId, subscriptionId) {
        Meteor.users.update(userId, {
                $addToSet : { subscriptions : {
                    registrationId : subscriptionId
                }
            }
        });

        Meteor.users.update({
            _id : { $ne : userId },
            'subscriptions.registrationId' : subscriptionId
        }, {
                $pull : { subscriptions : {
                    registrationId : subscriptionId
                }
            }
        });
    },
    '/notifier/removeSubscription' : function(userId, subscriptionId) {
        Meteor.users.update(userId, {
                $pull : { subscriptions : {
                    registrationId : subscriptionId
                }
            }
        });

    },
    '/notifier/setUserStatus' : function(status, userId){
        var userId = userId || Meteor.userId();
        if(userId){
            Meteor.users.update(userId,
                { $set:{
                    'profile.clientStatus' : status
                }
            });
        }
    },
    '/notifier/setWindowNotificationStatus' : function(status, userId){
        var userId = userId || Meteor.userId();
        if(userId){
            Meteor.users.update(userId,
                { $set:{
                    'profile.windowNotificationStatus' : status
                }
            });
        }
    },
    '/notifier/archive': function(id) {
        return Notifications.update(id, {$set: {
                receivedAt: new Date()
            }
        });
    },
    '/notifier/destroy': function(id) {
        return Notifications.remove(id);
    }
});

if(Meteor.isServer) {
    Meteor.methods({
        '/notifier/send':function (body, receiverId, options) {
            return Notifier.send(body, receiverId, options);
        }
    });
}