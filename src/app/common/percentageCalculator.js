define([], function () {
    return {
        calculateFromShares: function (valueA, valueB) {
            return Math.round((valueA / (valueA + valueB)) * 1000)/10;
        }
    };
});