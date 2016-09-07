define([], function () {
    describe('common json model', function() {
        var jsonModel, d3Mock;

        beforeEach(function (done) {
            d3Mock = {
                json: function (url, callback) {
                    callback();
                }
            };

            spyOn(d3Mock, 'json').and.callThrough();

            requirejs.undef('d3');
            define('d3', [], function () {
                return d3Mock;
            });

            requirejs.undef('app/common/jsonModel');
            require(['app/common/jsonModel'], function (_diagramComponentModel_) {
                jsonModel = _diagramComponentModel_;
                done();
            });
        });

        it('should contain load()', function () {
            expect(jsonModel).toBeDefined();
            expect(jsonModel.load).toBeDefined();
            expect(jsonModel.load).toEqual(jasmine.any(Function));
        });

        describe('on load(url, callback)', function () {
            var callbackMock;

            beforeEach(function () {
                callbackMock = jasmine.createSpy('callback');
                jsonModel.load('', callbackMock);
            });

            it("should call d3.json(url, callback)", function () {
                expect(d3Mock.json).toHaveBeenCalled();
                expect(d3Mock.json).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Function));
            });

            it("should callback when the data is loaded", function () {
                expect(callbackMock).toHaveBeenCalled();
            });
        });
    });
});