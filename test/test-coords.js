var requirejs = require("requirejs"),
    assert = require("assert"),
    PNG = require("png-js");

requirejs.config({ baseUrl: "lib" });

var coords = requirejs("coords");

describe("coords", function () {
    describe("n", function () {
        it("should go north", function () {
            assert.deepEqual(coords.n({ x: 5, y: 5 }), { x: 5, y: 4 });
            assert.deepEqual(coords.n({ x: 8, y: 4 }), { x: 8, y: 3 });
        });
    });

    describe("s", function () {
        it("should go south", function () {
            assert.deepEqual(coords.s({ x: 0, y: 0 }), { x: 0, y: 1 });
        });
    });

    describe("ne", function () {
        it("should go north-east", function () {
            assert.deepEqual(coords.ne({ x: 0, y: 2 }), { x: 1, y: 1 });
            assert.deepEqual(coords.ne({ x: 3, y: 1 }), { x: 4, y: 1 });
        });
    });

    describe("se", function () {
        it("should go south-east", function () {
            assert.deepEqual(coords.se({ x: 4, y: 2 }), { x: 5, y: 2 });
            assert.deepEqual(coords.se({ x: 1, y: 0 }), { x: 2, y: 1 });
        });
    });

    describe("nw", function () {
        it("should go north-west", function () {
            assert.deepEqual(coords.nw({ x: 6, y: 1 }), { x: 5, y: 0 });
            assert.deepEqual(coords.nw({ x: 1, y: 0 }), { x: 0, y: 0 });
        });
    });

    describe("sw", function () {
        it("should go south-west", function () {
            assert.deepEqual(coords.sw({ x: 2, y: 2 }), { x: 1, y: 2 });
            assert.deepEqual(coords.sw({ x: 5, y: 0 }), { x: 4, y: 1 });
        });
    });

    describe("offset", function () {
        it("should go by the given offset", function () {
            assert.deepEqual(coords.offset({ x: 3, y: 1 }, "n-se-s-sw"), { x: 3, y: 2 });
        });
    });

    describe("real", function () {
        it("should convert to real screen coordinates", function () {
            assert.deepEqual(coords.real({ x: 0, y: 0 }), { left: 0, top: 0 });
            assert.deepEqual(coords.real({ x: 1, y: 0 }), { left: 54, top: 36 });
            assert.deepEqual(coords.real({ x: 2, y: 0 }), { left: 108, top: 0 });

            assert.deepEqual(coords.real({ x: 0, y: 1 }), { left: 0, top: 72 });
        });
    });

    describe("coords", function () {
        it("should return the correct hex coordinates", function (done) {
            PNG.decode("test/fixtures/hexes.png", function (pixels) {
                console.log(pixels[(234 * 36 + 36 + 54) * 3 + 1]);
                done();
            });
        });
    });
});
