requirejs.config({
    baseUrl: 'lib',
    paths: {
        "vendor": "../vendor",
        "jquery": "../vendor/jquery-2.0.3",
        "jquery-ui": "../vendor/jquery-ui",
        "testmap": "../data/maps/human-buildings"
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
        (function () {
            var tile = tiles[i];

            var image = $("<img />")
                .attr("src", tile.images[0])
                .css("position", "absolute")
                .css("left", tile.left)
                .css("top", tile.top)
                .css("z-index", tile.layer)
                .appendTo("#view");

            var frame = 0;

            if (tile.images.length > 1) {
                setInterval(function() {
                    frame = (frame + 1) % tile.images.length;
                    image.attr("src", tile.images[frame]);
                }, 100);
            }
        })();
    }

    $("#view").draggable({
        distance: 20
    });
});
