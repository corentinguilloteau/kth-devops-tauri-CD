var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("./database/install");

var updaterDemoRouter = require("./routes//kthdevops/tauriupdaterdemo/index.js");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/kthdevops/tauriupdaterdemo/", updaterDemoRouter);

module.exports = app;
