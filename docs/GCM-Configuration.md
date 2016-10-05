
GCM - Configuration
===============

### Table of contents ###
* [Setup a Google API project](#setup-a-google-api-project)
* [Enable the GCM API](#enable-the-gcm-api) 
* [Create an API Key](#create-an-api-key) 
* [Setup the project number in the manifest file](#setup-the-project-number-in-the-manifest-file)
* [Setup the API key in the configuration](#setup-the-api-key-in-the-configuration)

Setup a Google API project
------------
1. Open the [Google Developers Console](https://console.developers.google.com).
2. Click `Enable and manage API's`.
3. If you do not have an existing project yet, you will be prompted to create a new project. 
4. Enter a name and click `Create`.

Once the project has been created, you can find your project ID and project number at the top of the Project Dashboard 
page. For example, `Project Number: 670330094152`.
Copy down your project number. You will use it later on in the manifest file


Enable the GCM API
------------
1. Open the [Google Developers Console](https://console.developers.google.com) 
2. Select your project.
3. Click `Enable and manage API's`.
4. In the displayed list of APIs, search and select `Google Cloud Messaging` 
5. Click `Enable API`.


Create an API Key
------------
1. In the `Enable and manage API's` menu, select the `Credentials` tab in the left sidebar.
2. Select `New credentials > API key > Server Key`
3. Give the key name. The server IP is optional and is best left empty when you are testing on your local host.
4. Click `Create`

The prompt will show you your key, and it can later be found in the listed credentials. Copy down your key. You will
use it later in the configuration.


Setup the project number in the manifest file
------------
In the root of this project you will find a `notification-manifest.json.example` file. Copy this file to the root public folder of 
your project and rename it to `notification-manifest.json`. If you have done this correctly you should be able to find the file
on `<YOUR_PROJECT_URL>/notification-manifest.json` when your meteor project is running.

In the `manifest.json`, enter your project number from your Google developers console on the `"gcm_sender_id"` line.

Setup the API key in the configuration
-----------
In your project add the following:

```javascript
Meteor.startup(function(){
    if(Meteor.isServer){
         Notifier.GCMAPIKey : "<YOUR API KEY>"
    }
});
```
If you have followed these steps correctly, and have set up your service-worker, you should now be able to send 
notifications using GCM.
