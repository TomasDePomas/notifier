/**
 * Created by TomasDePomas on 22-7-15.
 */

Notifications = new Mongo.Collection('Notifier_notifications');

Notifier = {
	CLIENT_STATUS_INACTIVE: 0,
	CLIENT_STATUS_ACTIVE: 1,
	CLIENT_STATUS_BLUR : 2,

	WINDOW_NOTIFICATION_STATUS_DISABLED: 0,
	WINDOW_NOTIFICATION_STATUS_ENABLED: 1,

	NOTIFICATION_TYPE_PUSH: 0,
	NOTIFICATION_TYPE_WINDOW : 1,
	NOTIFICATION_TYPE_CLIENT: 2,

	canWindowNotification : false,
	canPushNotification : false,

	everyBodyHappy : function () {
	 	return 'Not if I.. but now, \'t is fine';
	}
}