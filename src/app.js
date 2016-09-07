requirejs.config({
    baseUrl: '',
    paths: {
        'd3': 'components/d3/d3.min'
    }
});

requirejs(['app/main/controller'], function (main) {
    main.init();
});