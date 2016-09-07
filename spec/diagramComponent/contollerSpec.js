define([], function () {
    describe('diagramComponent controller', function() {
        var diagramComponent,
            jsonModel,
            DiagramWidgetMock,
            onLoadCallback,
            domMock;

        beforeEach(function (done) {

            domMock = {
                createAndAttachElement: jasmine.createSpy('dom.createAndAttachElement')
            };

            requirejs.undef('app/common/dom');
            define('app/common/dom', [], function () {
                return domMock;
            });

            DiagramWidgetMock = jasmine.createSpy('DiagramWidget');

            requirejs.undef('app/DiagramWidget/controller');
            define('app/DiagramWidget/controller', [], function () {
                return DiagramWidgetMock;
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

            requirejs.undef('app/diagramComponent/controller');
            require(['app/diagramComponent/controller'], function (_diagramComponent_) {
                diagramComponent = _diagramComponent_;
                done();
            });
        });

        it('should contain init()', function () {
            expect(diagramComponent).toBeDefined();
            expect(diagramComponent.init).toBeDefined();
            expect(diagramComponent.init).toEqual(jasmine.any(Function));
        });

        describe('on init()',function () {
            var mockConfiguration = [
                {
                    "source": "revenue.json"
                },
                {
                    "source": "impressions.json"
                },
                {
                    "source": "visits.json"
                }
            ];

            beforeEach(function () {
                diagramComponent.init();
                onLoadCallback(mockConfiguration);
            });

            it('should call jsonModel.load(url, callback) on init()', function () {
                expect(jsonModel.load).toHaveBeenCalled();
                expect(jsonModel.load).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Function));
            });

            it("should create dom element for the DiagramWidget instances", function () {
                expect(domMock.createAndAttachElement).toHaveBeenCalled();
                expect(domMock.createAndAttachElement.calls.count()).toEqual(mockConfiguration.length);
            });

            it("should instantiate DiagramWidget with the source property", function () {
                expect(DiagramWidgetMock).toHaveBeenCalled();
                expect(DiagramWidgetMock.calls.count()).toEqual(mockConfiguration.length);
                expect(DiagramWidgetMock.calls.argsFor(0)).toContain(mockConfiguration[0].source);
            });
        });
    });
});