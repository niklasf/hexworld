define([ "coords" ], function (coords) {
    var rules = [];

    // Grass.
    for (var i = 1; i <= 8; i++) {
        rules.push({
            "c": {
                "type": "Gg"
            },
            "images": [
                "data/images/terrain/grass/green" + i + ".png"
            ],
            "no_flag": "base",
            "set_flag": "base",
            "probability": 1 / ( 8 + 1 - i)
        });
    }

    // Sand.
    for (var i = 1; i <= 8; i++) {
        rules.push({
            "c": {
                "type": "Dd"
            },
            "images": [
                "data/images/terrain/sand/desert" + i + ".png"
            ],
            "no_flag": "base",
            "set_flag": "base",
            "probability": 1 / ( 8 + 1 - i)
        });
    }

    // Water.
    rules.push({
        "c": {
            "type": "Wo"
        },
        "images": [
            "data/images/terrain/water/ocean-A01.png"
        ]
    });

    return function (map) {
        var height = map.length;
        var width = map[0].length;

        var flags = { };

        var tiles = [];

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var hex = { x: x, y: y };
                var pos = coords.real(hex);

                for (var i = 0; i < rules.length; i++) {
                    var matches = true;

                    for (var condition in rules[i]) {
                        if (condition == "images" || condition == "set_flag" || condition == "no_flag" || condition == "probability") {
                            continue;
                        }

                        var conditionTile = coords.offset(hex, condition);

                        if (map[conditionTile.y][conditionTile.x] != rules[i][condition].type) {
                            matches = false;
                            break;
                        }
                    }

                    if (!matches) {
                        continue;
                    }

                    if (rules[i].probability !== undefined && Math.random() > rules[i].probability) {
                        continue;
                    }

                    if (rules[i].no_flag !== undefined && flags[x] !== undefined && flags[x][y] == rules[i].no_flag) {
                        continue;
                    }

                    if (rules[i].set_flag !== undefined) {
                        if (flags[x] === undefined) {
                            flags[x] = { };
                        }
                        flags[x][y] = rules[i].set_flag;
                    }

                    tiles.push({
                        left: pos.left,
                        top: pos.top,
                        images: rules[i].images
                    });
                }
            }
        }

        return tiles;
    };
});
