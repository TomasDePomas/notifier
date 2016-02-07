/**
 * Created by TomasDePomas on 7-2-16.
 */
Meteor.startup(function(){

    window.onblur = function(){
        Meteor.call('/notifier/setUserStatus', Notifier.CLIENT_STATUS_BLUR);
    };
    window.onfocus = function(){
        Meteor.call('/notifier/setUserStatus', Notifier.CLIENT_STATUS_ACTIVE);
    };
    window.onunload = window.onbeforeunload = function(){
        Meteor.call('/notifier/setUserStatus', Notifier.CLIENT_STATUS_INACTIVE);
    };

    Tracker.autorun(function(){
        if(!Meteor.userId()){
            Meteor.call('/notifier/setUserStatus', Notifier.CLIENT_STATUS_INACTIVE, Session.get('currentUser'));
            Session.set('currentUser', false);
        }else{
            Meteor.call('/notifier/setUserStatus', Notifier.CLIENT_STATUS_ACTIVE);
            Session.set('currentUser', Meteor.userId());
        }
    });
});