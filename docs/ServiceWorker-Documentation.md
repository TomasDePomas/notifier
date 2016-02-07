
Service Worker - Configuration
===============

### Table of contents ###
* [Setup the Service Worker file](#Setup-the-service-worker-file)
* [Changing the Service Worker file](#Changing-the-service-worker-file)


Setup the Service Worker file
------------
In the root of this project you will find a `service-worder.js.example` file. Copy this file to the root public folder
of your project and rename it to `service-worker.js`. If you have done this correctly you should be able to find the 
file on `<YOUR_PROJECT_URL>/service-worker.js` when your meteor project is running. 

The example file contains all the code needed for the push notifications.

Changing the Service Worker file
------------
If you are feeling adventurous and want to venture out into the world of service worker options, you can. However, keep
in mind that when you reload your application, the service worker will already be registered and its content will not be
refreshed. _Empty cache and hard reload_ will not help you in this regard. 

In chrome it is possible to get a list of all the registered service workers by going to 
[chrome://serviceworker-internals/](chrome://serviceworker-internals/). Here it is possible to unregister a service 
worker. Now, when you reload your application, the service worker will register itself again, but now with the updated
code.
For now I have not figured out how to force a service worker update for all the users of your application.

I do not know where to find comparable features in Firefox. However, their service worker implementation is still
rather new. If you find those settings, please let me know and I will update the documentation.

_\* okay, maybe this seperate file was not entirely necessary, but it is important you do this correctly_