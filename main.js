require.config({
    paths: {
        underscore: './common/scripts/vendor/underscore-min',
        backbone: './common/scripts/vendor/backbone-min'
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
    './common/scripts/app/app',
    'jquery',
    'backbone',
    'underscore',
    '//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min.js'
], function(app) {
    app.init();
});