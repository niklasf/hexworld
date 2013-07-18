var requirejs = require("requirejs"),
    assert = require("assert");

requirejs.config({ baseUrl: "lib" });

var hello = requirejs("hello");

describe("Test file", function () {
    describe("#1 Test", function () {
        it("should print hello", function () {
            hello();
        });
    });
});
