/**
 * Created by TomasDePomas on 22-7-15.
 */

Meteor.subscribe('notifications');

Template.notifierContainer.helpers({
  notifications: function(){
    return Notifications.find({
      type: Notifier.NOTIFICATION_TYPE_CLIENT,
      receivedAt: null,
      receiverId: Meteor.userId()
    }, {
      limit: 10,
      sort: {createdAt: -1},
    });
  }
});

Template.notifierNotification.onRendered(function () {
  var notification = this;
  notification.$('div').fadeIn('fast', function() {
    Meteor.setTimeout(function () {
      notification.$('div').fadeOut('slow', function () {
        if (notification.data.archive) {
          Meteor.call('/notifier/archive', notification.data._id);
        } else {
          Meteor.call('/notifier/destroy', notification.data._id);
        }
      });
    }, Notifier.config.notification.timeout || 2000);
  });
});

Template.notifierNotification.helpers({
    title : function(){
      return this.title || Notifier.config.defaultTitle || 'Notification';
    },
    hasIcon: function(){
      return this.icon || false
    }
});

Template.notifierNotification.events({
  'click': function (event) {
   //TODO Do stuff on click
  }
});