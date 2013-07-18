var requirejs = require("requirejs");

requirejs.config({
    baseUrl: "lib",
    nodeRequire: require
});

requirejs(["hello"], function (hello) {
    hello();
});
