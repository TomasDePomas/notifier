/**
 * Created by Tomas on 5-2-2016.
 */

Template.notifierStatus.helpers({
  status: function () {
    switch (Session.get('notificationStatus')){
      case 'not_supported':
        return 'Notifications are not available outside of the browser';
      case 'push_not_supported':
        return 'Notifications are not available when the browser is inactive';
      case 'denied':
        return 'You must allow this site to send notifications to your browser. Check \'chrome://settings/search#messages\' on Chrome or \'about:preferences#content\' on Firefox';
      case 'disabled':
      case 'enabled':
        return 'You are good to go!';
      case 'error':
      default:
        return 'Something went wrong. Please notify the admin of this system if the problem persists';
    }
  }
});
