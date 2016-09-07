define(['d3'], function (d3) {
    function onJsonLoad(callback, error, data) {
        callback(data);
    }

    return {
        load: function (url, callback) {
            d3.json(url, onJsonLoad.bind(null, callback));
        }
    };
});