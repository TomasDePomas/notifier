
Notifier v0.8.1
===============
*You've got mail.* - Elwood Edwards


Table of contents
------------
* [Introduction](#introduction)
* [Dependencies](#dependencies) 
* [Installation](#installation) 
* [Three levels of Notifications](#three-levels-of-notifications)
* [Quick start](#quick-start)
* [Configuration](#configuration)
* [ToDo list](#todo-list)
* [Troubleshooting](#troubleshooting)
* [Additional Files](#additional-files)



Introduction
------------
This package is made to send notifications to the users of your applications. It uses the service worker API to send 
these notifications even when your site is not active. A demo showing how to set this all up can be found [here](https://github.com/TomasDePomas/notifier_demo)

It took me a while to figure all this out and I am by no means an expert. I just thought this might help people to make use of the new Notification capabilities of modern web browsers. 

The configuration process for the service worker notifications is not as plug and play as other packages so please read 
the documentation carefully. **Beware, in order to get it to work on anything but localhost, you will need an ssl
certificate. Even on 192.0.0.1 it will NOT work without a certificate**

Dependencies
------------
* Accounts-password
* Erasaur:meteor-lodash


Installation
------------
1. Call `meteor add tomasdepomas:notifier` in your console
2. Follow the steps under [Getting started](#Getting-started)


Three levels of Notifications
------------
This package facilitates three different levels of notifications:
- Meteor in app, or **client** notifications
- Web or **window** notifications
- ServiceWorker or **push** notifications

The package will keep track of which level of notifiaction is available and appropriate per user. The schematic below 
will show how messages are distributed.

..| Window is active | Window is inactive | Window is closed
------|------|------|------|
**window.Notification available** | client | window | none
**serviceWorker available** | client | push   | push
**neither is available** | client | client | none

_\* in the cases labeled none, the user will receive the notification the next time a window is active as a client 
notification_


Getting started
------------
For the Push notifications to work, you will need to do some setup with API keys and stuff:

* [GCM](docs/GCM-Configuration.md)- Android/Google 
* APN - Apple (not yet implemented)
* MDN - Mozilla (not yet implemented)
* MPNS - Microsoft (not yet implemented)

The **push** notifications will only be available when you setup the service worker correctly. **THIS DOES NOT WORK OUT 
OF THE BOX!** Check the [dedicated service-worker](docs/ServiceWorker-Documentation.md) documentation.

To start the Notification processes and add configuration (have a look at the full documentation for the configuration 
options), call:
```javascript
Notifier.start();
```

To allow your users to subscribe to the Service worker notifications, add the `{{>notifierToggle}}` template to your
application, or bind the `Notifier.subscribe()` and `Notifier.unsubscribe()` functions to a custom event to subscribe
your users.


In order to send a message to a specific user, use the following syntax:
```javascript
Notifier.send(
	'Hello',            /* A message */
	'g8aQSJunen44ZK5nn' /* receiverId / userId */
);
```

For more options, check [the Full documentation](docs/Full-Documentation.md) or have a look at [the demo](https://github.com/TomasDePomas/notifier_demo)

ToDo list
------------
* Code cleanup
* Look at Cordova possibilities
* Look at APN by Apple
* Look at MDN by Mozilla
* Look at MPNS by Microsoft
* Implement some sort of tests


Troubleshooting
------------
If notifications do not show up when you expect them, add the `{{>notificationStatus}}` template to your code to 
check what the status of the package.

The permission for request is denied and now I cant reset it, To reset the permissions, have a look at your browser 
settings and search for messaging settings and removing the domain from the list of exceptions. Check 
[chrome://settings/search#messages](chrome://settings/search#messages) on Chrome 
or [about:preferences#content](about:preferences#content) on Firefox'.

If notifications do not work on your production server, but it did just fine on your local development environment, you
might not have a SSL certificate installed on your production server.


Additional Files
-------------
* [How to set up GCM and the Manifest file](docs/GCM-Configuration.md)
* [How to set up the service worker file](docs/ServiceWorker-Documentation.md)
* [Full documentation](docs/Full-Documentation.md)
