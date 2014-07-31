/**
 * Created by David on 7/30/2014.
 */
angular.module('guesty.services', [])
    .factory("ScraperService", function ($http, $q) {

        return {
            getData: function() {
                var defer = $q.defer;
                $http.get("https://www.airbnb.com/s/94108", function() {

                });
                return defer.promise;
            }
        }
    });