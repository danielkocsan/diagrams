define([], function () {
    var percentageCalculator;

    describe('calculateFromShares', function () {
        beforeEach(function (done) {
            requirejs.undef('app/common/percentageCalculator');
            require(['app/common/percentageCalculator'], function (_percentageCalculator_) {
                percentageCalculator = _percentageCalculator_;
                done();
            });
        });

        it('exists', function () {
            expect(percentageCalculator.calculateFromShares).toBeDefined();
        });

        it('returns 20 for [40, 160]', function () {
            var actualValue = percentageCalculator.calculateFromShares(40, 160);

            expect(actualValue).toEqual(20);
        });

        it('returns 33.3 for [40, 80]', function () {
            var actualValue = percentageCalculator.calculateFromShares(40, 80);

            expect(actualValue).toEqual(33.3);
        });
    });
});