define(['app/common/jsonModel'], function (jsonModel) {

    function DiagramWidget(sourceFileName) {

        var SOURCE_PATH = '/mockData/';

        function onLoad() {

        }

        jsonModel.load(SOURCE_PATH + sourceFileName, onLoad);
    }

    return DiagramWidget;
});