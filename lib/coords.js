// Coordinate system:
//   ____        ____        ____        ____
//  /    \      /    \      /    \      /    \
// / 0,0  \____/ 2,0  \____/ 4,0  \____/ 6,0  \
// \      /    \      /    \      /    \      /
//  \____/ 1,0  \____/ 3,0  \____/ 5,0  \____/
//  /    \      /    \      /    \      /    \
// / 0,1  \____/ 2,1  \____/ 4,1  \____/ 6,1  \  |
// \      /    \      /    \      /    \      /  | Y
//  \____/ 1,1  \____/ 3,1  \____/ 5,1  \____/   v
//  /    \      /    \      /    \      /    \
// / 0,2  \____/ 2,2  \____/ 4,2  \____/ 6,2  \
// \      /    \      /    \      /    \      /
//  \____/ 1,2  \____/ 3,2  \____/ 5,2  \____/
//       \      /    \      /    \      /
//        \____/      \____/      \____/
//
//                -->
//                 X
//
// Directions:
//         ____
//        /    \
//   ____/  n   \____
//  /    \      /    \
// / nw   \____/ ne   \
// \      /    \      /
//  \____/  c   \____/
//  /    \      /    \
// / sw   \____/ se   \
// \      /    \      /
//  \____/  s   \____/
//       \      /
//        \____/

define(function() {
    var exports = {
        c: function (coords) {
            return coords;
        },
        n: function (coords) {
            return {
                x: coords.x,
                y: coords.y - 1
            };
        },
        s: function (coords) {
            return {
                x: coords.x,
                y: coords.y + 1
            };
        },
        ne: function (coords) {
            return {
                x: coords.x + 1,
                y: coords.y - 1 + (coords.x % 2)
            };
        },
        se: function (coords) {
            return {
                x: coords.x + 1,
                y: coords.y + (coords.x % 2)
            };
        },
        nw: function (coords) {
            return {
                x: coords.x - 1,
                y: coords.y - 1 + (coords.x % 2)
            };
        },
        sw: function (coords) {
            return {
                x: coords.x - 1,
                y: coords.y + (coords.x % 2)
            };
        }
    };

    exports.offset = function (coords, offset) {
        var steps = coords.split("-");
        for (var i = 0; i < steps.length; i++) {
            coords = exports[steps[i]](coords);
        }
        return coords;
    };

    return exports;
});