requirejs.config({
    baseUrl: 'lib',
    paths: {
        vendor: '../vendor'
    }
});

requirejs(["vendor/domReady!"], function() {
});
