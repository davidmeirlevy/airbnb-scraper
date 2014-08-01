/**
 * Created by David on 7/31/2014.
 */
var scraper = require("./scraper-service/scraper-service.js");
scraper(8081);

var express = require("express");
var cors = require('cors');
var clientApp = express();

clientApp.use(cors());
clientApp.use(express.static(__dirname + "/app")).listen(80);


console.log("enjoy the party");