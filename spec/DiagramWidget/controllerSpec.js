define(['mock/handlebars', 'mock/dom'], function (handlebarsMockGenerator, domMockGenerator) {
    describe('DiagramWidget controller', function() {
        var DiagramWidget, diagramComponentMock, jsonModel, onLoadCallback, domMock;

        beforeEach(function (done) {
            domMock = domMockGenerator.generate();

            diagramComponentMock = {
                init: jasmine.createSpy()
            };

            requirejs.undef('app/diagramComponent/controller');
            define('app/diagramComponent/controller', [], function () {
                return diagramComponentMock;
            });

            requirejs.undef('app/DiagramWidget/controller');
            require(['app/DiagramWidget/controller'], function (_DiagramWidget_) {
                DiagramWidget = _DiagramWidget_;
                done();
            });

            jsonModel = {
                load: function (url, callback) {
                    onLoadCallback = callback;
                }
            };

            spyOn(jsonModel, 'load').and.callThrough();

            requirejs.undef('app/common/jsonModel');
            define('app/common/jsonModel', [], function () {
                return jsonModel;
            });

            handlebarsMockGenerator.generate();
        });

        it('should be a constructor', function () {
            expect(DiagramWidget).toBeDefined();
            expect(DiagramWidget).toEqual(jasmine.any(Function));
        });

        describe('when a new instance has been initialized', function () {
            var instance,
                mockUrl = 'mock';

            beforeEach(function () {
                instance = new DiagramWidget(mockUrl, {querySelector: function() {}, classList: {add: function () {}}});
            });

            it('should load the corresponding json data', function () {
                expect(jsonModel.load).toHaveBeenCalled();
                expect(jsonModel.load).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Function));
            });
        });
    });
});