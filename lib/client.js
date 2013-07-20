requirejs.config({
    baseUrl: 'lib',
    paths: {
        vendor: "../vendor",
        jquery: "../vendor/jquery-2.0.3"
    }
});

requirejs(["jquery", "vendor/domReady!"], function($) {
    var tiles = [
        { src: "data/images/terrain/grass/green.png",
          left: 0,
          top: 0 },
        { src: "data/images/terrain/grass/green.png",
          left: 54,
          top: 36 }
    ];

    for (var i = 0; i < tiles.length; i++) {
        $("<img />")
            .attr("src", tiles[i].src)
            .css("position", "absolute")
            .css("left", tiles[i].left)
            .css("top", tiles[i].top)
            .appendTo("#view");
    }
});
