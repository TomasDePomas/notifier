/**
 * Created by TomasDePomas on 24-1-16.
 */

Meteor.publish('notifications', function(){
    return Notifications.find({});
});