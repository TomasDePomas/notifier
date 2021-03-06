
Full Documentation
===============

Table of contents
------------
* **[Functions](#functions)**
	* Notifier.**start()**
    * Notifier.**setConfig()**
    * Notifier.**send()**
    * Notifier.**subscribe()**
    * Notifier.**unsubscribe()**
    * Notifier.**windowNotification()**
    
* **[Database](#database)**
* **[Templates](#templates)** 
* **[Examples](#examples)**


Functions
--------

#### Notifier.**start(**[ *object* options] **)** _[client]_
*Starts the queue needed for windowNotifications and sets up initial settings of the client notifications*
* `options` : an *object* with options:
	* `notification` : an *object* with notification specific options
      * `location`: a *string* indicating the location of the client notifications, possible settings:
"topleft", "topright", "bottomleft", "bottomright". Defaults to "bottomright".


#### Notifier.**setConfig(**[ *object* options] **)** _[client]_
*Change the settings of the client notifications*
* `options` : an *object* with options:
	* `notification` : an *object* with notification specific options
      * `location`: a *string* indicating the location of the client notifications, possible settings:
"topleft", "topright", "bottomleft", "bottomright". Defaults to "bottomright".


#### Notifier.**send(** *string* text, *string* receiverId, [ *object* options] **)** _[both]_
*Registers a new notification*

* `text` : a *string* with the body of the notification
* `receiverId` : a *string* to indicate the Id of the user. This must correspond with an existing user, or an error will be thrown.
* `options` : an *object* with further options:
	* `title` : a *string* with the title of the notification, shown above the body / message
	* `link`: a *string* indicating a link to be opened when a user clicks on the notification
	* `icon`: a *string* indicating the location of an image which is shown next to the message in the notification. 
	Only small, square images display properly
	* `tag`: a *string* indicating a group of messages. If a notification is already show with the same tag, the new 
	notification will replace the old one on the receiver's desktop. If left empty, all messages will be shown in their 
	own notification container.
	* `archive`: a *boolean* indicating whether a notification should remain in the database once it has been delivered.


#### Notifier.**subscribe()** _[client]_
*Creates a new serviceWorkerRegistration and saves its subscriptionId to the `subscriptions` of the user that is currently logged in*

#### Notifier.**unsubscribe()** _[client]_
*Gets the current serviceWorkerRegistration and removes it from the `subscriptions` of the user that is currently logged in*

#### Notifier.**windowNotification(** *object* message **)** _[client]_
*Function the system uses to display a window message. This is for internal use and is not meant to be used seperately*


Database
---------
The `Notifier` creates one table `"Notifier_notifications"` which is available inside the package as `Notification` to 
store all the notification to be send. The notifications are published so they can be used in the `{{> notifierList}}`
Template.

The `Notifier` adds two integer parameters to the `users.profile` property; `clientStatus`, which keeps track of the status of the users client (*CLIENT_STATUS_INACTIVE*, *CLIENT_STATUS_ACTIVE*, *CLIENT_STATUS_BLUR*) and `notificationStatus`, which keeps track of wether the user has allowed the application to send notifications( *WINDOW_NOTIFICATION_STATUS_DISABLED*, *WINDOW_NOTIFICATION_STATUS_ENABLED*)

It also adds an array parameter, `users.subscriptions`, where all the subscription id's are stored, generated by the `Notifier.subscribe()` function.


Templates
---------
* `{{>notifierToggle}}` - adds a toggle which is bound to the `Notifier.subscribe()` and `Notifier.unsubscribe()` functions.
* `{{>notifierStatus}}` - adds a read-only textfield which displays the notification status of your current client (i.e.: not_supported, denied, error, dissabled, enabled) 
* `{{>notifierList}}` can be used in your templates to enter a table of unreceived and archived notifications. This is manuly for debug purposes.


Examples
------------------
#### Send a message (minimal example) ####
In order to send a message to a specific user, use the following syntax:

```javascript
Notifier.send(
	'Hello', 
	'g8aQSJunen44ZK5nn'
);

```
The first parameter is the content of the message, where the second is the userId of the receiver. It doesn't matter 
whether you call this function from the backend or the frontend of the application, both will register the notification 
and send it to the correct user.

#### Full example ####
Besides the `text` and `receiverId` parameters, `Notifier.send` also accepts an `options` argument:

```javascript
Notifier.send(
	'Hello human', 
	'g8aQSJunen44ZK5nn',
	{
		title : 'Message',
		link : 'www.google.com',
		icon : '/img/icon.png',
		tag : 'meteorserver',
		archive : true
	}
); 
```
This will send a message to the user with a title and an image. The sender of this message is called 'Meteor server'. 
The `link` is opened whenever the notification is clicked.
 
The `tag` option makes it possible to overwrite previous 
messages. If a new message is send with the same tag, the previous notification will be replaced with the new one. 
If the option is left empty, it will create 2 notifications on the users desktop.

The `archive` option indicates whether the notification should be saved in the database once it has reached the 
receiver. If set to `false` the notification will be deleted once it has been read.
