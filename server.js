var requirejs = require("requirejs");

requirejs.config({ baseUrl: "lib" });

requirejs(["hello"], function (hello) {
    hello();
});
