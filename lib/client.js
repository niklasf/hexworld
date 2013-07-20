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
    "testmap",
    "jquery-ui",
    "vendor/domReady!"
], function(coords, testmap) {
    var height = testmap.length;
    var width = testmap[0].length;

    var tiles = [];

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var tile = coords.real({ x: x, y: y });

            if (testmap[y][x] == "Gg") {
                var rand = Math.floor(Math.random() * 8) + 1;
                if (rand == 1) {
                    tile.src = "data/images/terrain/grass/green.png";
                } else {
                    tile.src = "data/images/terrain/grass/green" + rand + ".png";
                }
                tiles.push(tile);
            } else if (testmap[y][x] == "Dd") {
                var rand = Math.floor(Math.random() * 8) + 1;
                if (rand == 1) {
                    tile.src = "data/images/terrain/sand/desert.png";
                } else {
                    tile.src = "data/images/terrain/sand/desert" + rand + ".png";
                }
                tiles.push(tile);
            }
        }
    }

    for (var i = 0; i < tiles.length; i++) {
        $("<img />")
            .attr("src", tiles[i].src)
            .css("position", "absolute")
            .css("left", tiles[i].left)
            .css("top", tiles[i].top)
            .appendTo("#view");
    }

    $("#view").draggable({
        distance: 20
    });
});
