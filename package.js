Package.describe({
    name: 'tomasdepomas:notifier',
    version: '0.8.1',
    summary: 'Send notifications to the users of your application using service workers or in-client notifications',

    git: 'https://github.com/TomasDePomas/notifier.git',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.2');

    api.use([
        'mongo',
        'http',
        'session',
        'templating',
        'accounts-password',
        'erasaur:meteor-lodash@4.0.0'
    ]);

    api.addFiles([
        'core/both.js',
        'core/methods.js'
    ]);

    api.addFiles([
        'core/server.js',
        'core/publish.js',
        'pushNotification/messagesApi.js'
    ], 'server');

    api.addFiles([
        'core/client.js',
        'core/startup.js',
        'pushNotification/configCheck.js',
        'pushNotification/register.js',
        'windowNotification/configCheck.js',
        'windowNotification/notification.js',
        'clientNotification/notificationContainer.html',
        'clientNotification/notificationContainer.js'
    ], 'client');


    api.addFiles([
        'core/template/toggle.html',
        'core/template/toggle.js',
        'core/template/list.html',
        'core/template/list.js',
        'core/template/status.html',
        'core/template/status.js'
    ], 'client');


    api.export('Notifier');
});
