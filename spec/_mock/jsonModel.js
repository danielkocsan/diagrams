define([], function () {
    return {
        generate: function (onLoadCallback) {
            var jsonModel = {
                load: function (url, callback) {
                    onLoadCallback = callback;
                }
            };

            spyOn(jsonModel, 'load').and.callThrough();

            requirejs.undef('app/common/jsonModel');
            define('app/common/jsonModel', [], function () {
                return jsonModel;
            });

            return jsonModel;
        }
    }
});