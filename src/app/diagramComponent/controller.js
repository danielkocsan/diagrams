define(['app/common/jsonModel', 'app/DiagramWidget/controller', 'app/common/dom'], function (model, DiagramWidget, dom) {

    var CONF_URL = '/mockData/diagramConfiguration.json';

    function initWidget(componentContainer, configuration) {
        dom.createAndAttachElement('div', componentContainer);
        DiagramWidget(configuration.source);
    }

    function onLoad(componentContainer, configurationList) {
        configurationList.forEach(initWidget.bind(null, componentContainer));
    }

    return {
        init: function (componentContainer) {
            model.load(CONF_URL, onLoad.bind(null, componentContainer));
        }
    };
});