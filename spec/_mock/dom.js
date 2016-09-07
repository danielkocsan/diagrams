define([], function () {
    return {
        generate: function () {
            var domMock = {
                createAndAttachElement: function () {
                    return {};
                },
                appendContent: jasmine.createSpy('dom.createAndAttachElement')
            };

            spyOn(domMock, 'createAndAttachElement').and.callThrough();

            requirejs.undef('app/common/dom');
            define('app/common/dom', [], function () {
                return domMock;
            });

            return domMock;
        }
    };
});