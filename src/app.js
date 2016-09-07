requirejs.config({
    baseUrl: '',
    paths: {
        'd3': 'components/d3/d3.min',
        'handlebars': 'components/handlebars/handlebars.amd.min',
        'text': 'components/text/text'
    }
});

requirejs(['app/main/controller'], function (main) {
    main.init();
});