/**
 * Created by TomasDePomas on 22-7-15.
 */

Meteor.subscribe('notifications');

Template.notifierList.helpers({
  notifications: function(){

    if(Session.get('Notifications:onlyCurrent')){
      return Notifications.find({
        receiverId :  Meteor.userId()
      }, {
        limit: 10,
        sort: {createdAt: -1},
      });
    }

    return Notifications.find({
    }, {
      limit: 10,
      sort: {createdAt: -1},
    });
  },
  onlyCurrent :function(){
    return Session.get('Notifications:onlyCurrent')
  }
});

Template.notifierList.events({
    'change #only-current': function (event) {
      Session.set('Notifications:onlyCurrent', event.target.checked);
    }
});

Template.notifierItem.helpers({
  send: function(){
    return this.createdAt.toLocaleString();
  },
  received: function(){
    if(this.receivedAt){
      return this.receivedAt.toLocaleString();
    }
    return false;
  },
  receiver: function(){
    var user = Meteor.users.findOne({_id : this.receiverId});
    if(user){
      return user.username;
    }
  },
  trimmedText: function(){
    if(this.body && this.body.length > 200){
      return this.body.slice(0, 200);
    }
    return this.body;
  }
});