require.config({
    paths: {
        underscore: '../vendor/underscore-min',
        backbone: '../vendor/backbone-min'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require([
    './app',
    'jquery',
    'backbone',
    'underscore',
    '//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min.js'
], function(app) {
    app.init();
});