define([
    'app/common/jsonModel',
    'app/common/dom',
    'app/common/currencyHelper',
    'handlebars',
    'text!app/DiagramWidget/view.html',
    'd3',
    'app/common/percentageCalculator'], function (jsonModel, dom, currencyHelper, Handlebars, templateSource, d3, percentageCalculator) {

    function DiagramWidget(sourceFileName, container) {
        var SOURCE_PATH = '/mockData/';

        function generateCanvas(width, height) {
            var svgElement = container.querySelector('svg');

            return d3.select(svgElement).attr("width", width).attr("height", height);
        }

        function createArc(innerRadius, outerRadius, startAngle, endAngle) {
            return d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .startAngle(startAngle * 3.6 * (Math.PI/180))
                .endAngle(endAngle * 3.6 * (Math.PI/180));
        }

        function createHistogram(width, height, data) {
            var x = d3.scaleLinear()
                .domain([0, d3.max(data, function(d, i) { return i; })])
                .range([0, width]);

            var y = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) { return d; })])
                .range([height, 0]);

            var area = d3.area()
                .x(function(d, i) { return x(i); })
                .y0(height)
                .y1(function(d) { return y(d); });

            var line = d3.line()
                .x(function(d, i) { return x(i); })
                .y(function(d) { return y(d); });

            return {
                area: area,
                line: line
            }
        }

        function appendElementToCanvas(canvas, element, translateX, translateY, htmlClass, datum) {
            var path = canvas.append("path");

            if (datum) {
                path.datum(datum);
            }

            path.attr("d", element)
                .attr("transform", "translate("+translateX+", "+translateY+")")
                .attr("class", htmlClass);

            return path;
        }

        function drawDiagram(data, percentage) {
            var
                radius = 82,
                thickness = 8,
                canvas = generateCanvas(radius*2, radius*2);

            var arcA = createArc(radius-thickness, radius, 0, percentage);
            var arcB = createArc(radius-thickness, radius, 0, 360);
            var arcBackground = createArc(radius-thickness-3, radius+50, 0, 360);
            var histogram = createHistogram(radius*2, 50, data.histogram);

            appendElementToCanvas(canvas, histogram.area, 0, 100, 'histogram', data.histogram);
            appendElementToCanvas(canvas, histogram.line, 0, 100, 'line', data.histogram);
            appendElementToCanvas(canvas, arcBackground, radius, radius, 'background');
            appendElementToCanvas(canvas, arcB, radius, radius, 'valueB');
            appendElementToCanvas(canvas, arcA, radius, radius, 'valueA');
        }

        function onLoad(data) {
            var valueA = data.elements[0].value,
                valueB = data.elements[1].value,
                percentage = 100 - percentageCalculator.calculateFromShares(valueA, valueB),
                template = Handlebars.compile(templateSource);

                data.sum = valueA + valueB;

            data.elements.map(function (element, index) {
                if (index == 0) {
                    element.share = 100 -percentage;
                } else {
                    element.share = percentage;
                }
            });

            dom.appendContent(container, template(data));

            container.classList.add(data.colorScheme);

            drawDiagram(data, percentage);
        }

        jsonModel.load(SOURCE_PATH + sourceFileName, onLoad);
    }

    return DiagramWidget;
});