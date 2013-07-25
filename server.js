var requirejs = require("requirejs"),
    express = require("express"),
    temp = require("temp");

requirejs.config({ baseUrl: "lib" });

var app = express();

app.get("/", function (req, res) {
    res.sendfile("index.html");
});

app.get("/lib/client.js", function (req, res) {
    var outFile = temp.path({
        prefix: "hexworld-client.",
	suffix: ".min.js",
    });
    requirejs.optimize({
        baseUrl: "lib",
        name: "client",
        out: outFile,
        mainConfigFile: "lib/client.js"
    }, function (buildResponse) {
        console.log(buildResponse);
	res.sendfile(outFile);
    });
});

app.listen(3000);
console.log("Listening on port http://localhost:3000/ ...");
