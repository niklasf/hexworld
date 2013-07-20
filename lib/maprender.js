define([ "coords" ], function (coords) {
    var rules = [
        { "c": {
            "type": "Gg"
          },
          "images": [
              "data/images/terrain/grass/green.png"
          ]
        },
        { "c": {
            "type": "Dd"
          },
          "images": [
              "data/images/terrain/sand/desert.png"
          ]
        }
    ];

    return function (map) {
        var height = map.length;
        var width = map[0].length;

        var tiles = [];

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var hex = { x: x, y: y };
                var pos = coords.real(hex);

                for (var i = 0; i < rules.length; i++) {
                    var matches = true;

                    for (var condition in rules[i]) {
                        if (condition == "images") {
                            continue;
                        }

                        var conditionTile = coords.offset(hex, condition);

                        if (map[conditionTile.y][conditionTile.x] != rules[i][condition].type) {
                            matches = false;
                            break;
                        }
                    }

                    if (matches) {
                        tiles.push({
                            left: pos.left,
                            top: pos.top,
                            images: rules[i].images
                        });
                    }
                }
            }
        }

        return tiles;
    };
});
