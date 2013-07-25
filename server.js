var requirejs = require("requirejs"),
    express = require("express");

requirejs.config({ baseUrl: "lib" });

var app = express();

app.use("/vendor", express.static("vendor"));
app.use("/lib", express.static("lib"));

app.get("/", function (req, res) {
    res.sendfile("index.html");
});

app.listen(3000);
console.log("Listening on port http://localhost:3000/ ...");
