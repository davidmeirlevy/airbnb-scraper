/**
 * Created by David on 8/1/2014.
 */
var guestyServices = angular.module("guesty.services", []);

guestyServices.factory("scraperService", function ($http, $q, $timeout) {

    var scraperResource = "http://localhost:8081/scrape/start/";

    function getReadyData(link, defer) {
        $http.get(link).success(function (result) {
            if (result.ready) {
                defer.resolve(result.items);
            } else {
                $timeout(function () {
                    getReadyData(link, defer);
                }, 1000);
            }
        }).error(function () {
            defer.reject();
        });
    }

    return {
        getPlaces: function (zipCode) {
            var deferred = $q.defer();
            $http.get(scraperResource + zipCode).success(function (result) {
                getReadyData(result.link, deferred);
            }).error(function () {
                deferred.reject();
            });

            return deferred.promise;
        }
    };
});