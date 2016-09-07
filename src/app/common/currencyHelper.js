define(['handlebars'], function (Handlebars) {
    Handlebars.registerHelper('currency', function(value, unit) {
        var numValue = new Number(value),
            options = {maximumFractionDigits: 0};

        if (unit !== undefined) {
            options.style = 'currency';
            options.currency = 'EUR';
        }

        return numValue.toLocaleString('de-DE', options);
    });
});