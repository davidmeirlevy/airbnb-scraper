/**
 * Created by David on 8/1/2014.
 */
var guestyServices = angular.module("guesty.services", []);

guestyServices.factory("scraperService", function ($http, $q, $timeout) {

    var scraperResource = "http://localhost:8081/scrape/start/";

    function getReadyData(link, defer, postProccess) {
        postProccess = postProccess || function(a) {return a};

        $http.get(link).success(function (result) {
            if (result.ready) {
                defer.resolve(postProccess(result));
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