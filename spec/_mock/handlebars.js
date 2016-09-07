define([], function () {
    return {
        generate: function () {
            requirejs.undef('handlebars');
            define('handlebars', [], function () {
                return {
                    compile: function () {
                        return jasmine.createSpy('handlebars.template');
                    },

                    registerHelper: jasmine.createSpy('handlebars.template')
                };
            });

            requirejs.undef('text');
            define('text', [], function () {
                return {
                    load: function (name, req, onLoad, config) {
                        onLoad();
                    }
                };
            });
        }
    };
});