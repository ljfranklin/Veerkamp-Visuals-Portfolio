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
    './common/styles/vendor/bootstrap/js/bootstrap.min.js'
], function(app) {
    app.init();
});