define([], function () {
    describe('common dom library', function() {
        var dom;

        beforeEach(function (done) {
            requirejs.undef('app/common/dom');
            require(['app/common/dom'], function (_dom_) {
                dom = _dom_;
                done();
            });
        });

        it('should contain createAndAttachElement()', function () {
            expect(dom).toBeDefined();
            expect(dom.createAndAttachElement).toBeDefined();
            expect(dom.createAndAttachElement).toEqual(jasmine.any(Function));
        });

        it('should contain appendContent()', function () {
            expect(dom).toBeDefined();
            expect(dom.appendContent).toBeDefined();
            expect(dom.appendContent).toEqual(jasmine.any(Function));
        });
    });
});