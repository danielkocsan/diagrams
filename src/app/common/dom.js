define([], function () {
    return {
        createAndAttachElement: function (tagName, container) {
            var element = document.createElement(tagName);

            container.appendChild(element);

            return element;
        },

        appendContent: function (element, html) {
            element.innerHTML = html;
        }
    };
});