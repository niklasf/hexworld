requirejs.config({
    baseUrl: 'lib',
    paths: {
        "vendor": "../vendor",
        "jquery": "../vendor/jquery-2.0.3",
        "jquery-ui": "../vendor/jquery-ui",
        "testmap": "../test/fixtures/flatland"
    },
    shim: {
        "jquery": {
            exports: "$"
        },
        "jquery-ui": {
            deps: ["jquery"]
        }
    }
});

requirejs([
    "coords",
    "maprender",
    "testmap",
    "jquery-ui",
    "vendor/domReady!"
], function(coords, maprender, testmap) {
    var tiles = maprender(testmap);

    for (var i = 0; i < tiles.length; i++) {
        $("<img />")
            .attr("src", tiles[i].images[0])
            .css("position", "absolute")
            .css("left", tiles[i].left)
            .css("top", tiles[i].top)
            .css("z-index", tiles[i].layer)
            .appendTo("#view");
    }

    $("#view").draggable({
        distance: 20
    });
});
