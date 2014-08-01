var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var cors = require('cors');


var scraper = function(port) {
    var app     = express();

    var start = false;
    var scrapingData = {};

    var actions = {
        start: function(id,res) {
            var url = 'https://www.airbnb.com/s/' + id;

            var items = [];

            scrapingData[id] = {
                ready: false,
                items: items
            };

            request(url, function(error, response, html){
                if(!error){
                    var $ = cheerio.load(html);

                    $(".listings-container div.listing").each(function(index, row) {
                        var $row = $(row);
                        var reviews = $row.find(".listing-location").text().split(" "); // split to words
                        reviews = reviews[reviews.indexOf("reviews") - 1]; //the word that appears before the word "reviews" is the number of reviews..

                        items.push({
                            id: index,
                            name: $row.attr("data-name"),
                            user: $row.attr("data-user"),
                            price: $row.find(".price-amount").text(),
                            reviews: parseInt(reviews),
                            geo: {
                                latitude: parseFloat($row.attr("data-lat")),
                                longitude: parseFloat($row.attr("data-lng"))
                            }
                        });
                    });

                    var mapData = JSON.parse($(".map-search").attr("data-bootstrap-data"));

                    scrapingData[id].geo = {
                        latitude: mapData['center_lat'] || 0,
                        longitude: mapData['center_lng'] || 0
                    };


                    scrapingData[id].ready = true;
                }
            });

            res.send({
                link: "http://localhost:8081/scrape/result/" + id
            });
            return;

        },
        result: function(id, res) {
            res.send(scrapingData[id]);

        }
    };


    app.use(cors());

    app.get('/scrape/:action/:id', function(req, res){

        var id = req.params.id || 94108;
        var action = req.params.action || "start";


        actions[action] && actions[action](id, res);

    });

    app.listen(port || '8081');

};

exports = module.exports = scraper;