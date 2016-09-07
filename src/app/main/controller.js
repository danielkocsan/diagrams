define(['../diagramComponent/controller'], function (diagramComponent) {
    return {
        init: function () {
            diagramComponent.init(document.querySelector('#diagramComponent'));
        }
   };
});