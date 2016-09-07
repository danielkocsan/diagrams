define([], function () {
    describe('main controller', function() {
        var mainController, diagramComponentMock;

        beforeEach(function (done) {
            diagramComponentMock = {
                init: jasmine.createSpy()
            };

            requirejs.undef('app/diagramComponent/controller');
            define('app/diagramComponent/controller', [], function () {
                return diagramComponentMock;
            });

            requirejs.undef('app/main/controller');
            require(['app/main/controller'], function (_mainController_) {
                mainController = _mainController_;
                done();
            });
        });

        it('should contain init()', function () {
            expect(mainController).toBeDefined();
            expect(mainController.init).toBeDefined();
            expect(mainController.init).toEqual(jasmine.any(Function));
        });

        it('should call diagramComponent.init(container) on init', function () {
            mainController.init();
            expect(diagramComponentMock.init).toHaveBeenCalled();
            expect(diagramComponentMock.init).toHaveBeenCalledWith(jasmine.any(Object));
        });
    });
});