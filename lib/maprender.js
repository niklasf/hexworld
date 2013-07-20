define([ "coords" ], function (coords) {
    var rules = [];
    var directions = [ "n", "ne", "se", "s", "sw", "nw" ];

    // Grass.
    for (var i = 1; i <= 8; i++) {
        rules.push({
            "c": {
                "type": /Gg|Gs/,
                "set_flag": "base",
                "no_flag": "base"
            },
            "images": [
                "data/images/terrain/grass/green" + i + ".png"
            ],
            "layer": -100,
            "probability": 1 / ( 8 + 1 - i)
        });
    }

    // Grass borders.
    for (var i = 0; i < directions.length; i++) {
        var rule = {
            "c": {
                "type": /Wo/
            },
            "images": [
                "data/images/terrain/grass/green-" + directions[i] + ".png"
            ],
            "layer": -50,
        };
        rule[directions[i]] = { "type": /Gg|Gs/ };
        rules.push(rule);
    }

    // Forest.
    for (var i = 1; i <= 2; i++) {
        rules.push({
            "se": {
                "type": /Fms/,
                "set_flag": "forest",
                "no_flag": "forest"
            },
            "c": {
                "type": /Fms|Gg/
            },
            "n": {
                "type": /Fms|Gg/
            },
            "images": [
                "data/images/terrain/forest/mixed-summer" + i + ".png"
            ],
            "layer": -20,
            "probability": 1 / (2 + 1 - i)
        });
    }
    rules.push({
        "se": {
            "type": /Fms/,
            "set_flag": "forest",
            "no_flag": "forest"
        },
        "images": [
            "data/images/terrain/forest/mixed-summer-small.png"
        ],
        "layer": -20
    });

    // Experimental special sand border.
    rules.push({
        "c": {
            "type": /Gg/
        },
        "s": {
            "type": /Dd/
        },
        "sw": {
            "type": /Dd/
        },
        "images": [
            "data/images/terrain/sand/desert-s-sw.png"
        ],
    });

    // Sand.
    for (var i = 1; i <= 8; i++) {
        rules.push({
            "c": {
                "type": /Dd/,
                "no_flag": "base",
                "set_flag": "base"
            },
            "images": [
                "data/images/terrain/sand/desert" + i + ".png"
            ],
            "layer": -100,
            "probability": 1 / ( 8 + 1 - i)
        });
    }

    // Borders around sand.
    for (var i = 0; i < directions.length; i++) {
        var rule = {
            "c": {
                "type": /Wo|Gg|Gs/
            },
            "images": [
                "data/images/terrain/sand/desert-" + directions[i] + ".png"
            ],
            "layer": -50,
        };
        rule[directions[i]] = { "type": /Dd/ };
        rules.push(rule);
    }


    // Water.
    rules.push({
        "c": {
            "type": /Wo/
        },
        "images": [
            "data/images/terrain/water/ocean-A01.png",
            "data/images/terrain/water/ocean-A02.png",
            "data/images/terrain/water/ocean-A03.png",
            "data/images/terrain/water/ocean-A04.png",
            "data/images/terrain/water/ocean-A05.png",
            "data/images/terrain/water/ocean-A06.png",
            "data/images/terrain/water/ocean-A07.png",
            "data/images/terrain/water/ocean-A08.png",
            "data/images/terrain/water/ocean-A09.png",
            "data/images/terrain/water/ocean-A10.png",
            "data/images/terrain/water/ocean-A11.png",
            "data/images/terrain/water/ocean-A12.png",
            "data/images/terrain/water/ocean-A13.png",
            "data/images/terrain/water/ocean-A14.png",
            "data/images/terrain/water/ocean-A15.png"
        ],
        "layer": -100
    });

    // Borders around water.
    for (var i = 0; i < directions.length; i++) {
        var rule = {
            "c": {
                "type": /Wo/
            },
            "images": [
                "data/images/terrain/hills/regular-to-water-" + directions[i] + ".png"
            ],
            "layer": -50,
        };
        rule[directions[i]] = { "type": /Gg|Gs/ };
        rules.push(rule);
    }

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
                        if (condition == "images" || condition == "probability" || condition == "layer") {
                            continue;
                        }

                        var conditionTile = coords.offset(hex, condition);

                        if (map[conditionTile.y] === undefined || !rules[i][condition].type.test(map[conditionTile.y][conditionTile.x])) {
                            matches = false;
                            break;
                        }

                        if (rules[i][condition].no_flag !== undefined && flags[conditionTile.x] !== undefined && flags[conditionTile.x][conditionTile.y] !== undefined && flags[conditionTile.x][conditionTile.y][rules[i][condition].no_flag]) {
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

                    for (var condition in rules[i]) {
                        if (rules[i][condition].set_flag !== undefined) {
                            if (flags[conditionTile.x] === undefined) {
                                flags[conditionTile.x] = { };
                            }
                            if (flags[conditionTile.x][conditionTile.y] === undefined) {
                                flags[conditionTile.x][conditionTile.y] = { };
                            }
                            flags[conditionTile.x][conditionTile.y][rules[i][condition].set_flag] = true;
                        }
                    }

                    tiles.push({
                        left: pos.left,
                        top: pos.top,
                        images: rules[i].images,
                        layer: rules[i].layer
                    });
                }
            }
        }

        return tiles;
    };
});
