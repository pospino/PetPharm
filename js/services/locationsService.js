angular.module('starter').factory('LocationsService', ['$http','config',function ($http, config) {

        var locationsObj = {};
        locationsObj.savedLocations = [];
        locationsObj.getPPP = function (callback) {
            url = config.apiurl + "ppp/0/0";
//            console.log(url);
            $http.get(url)
                    .success(function (data) {
                        sl = [];
                        for (i = 0; i < data.length; i++) {
                            p = data[i];
                            sl[i]=p;
                        }
                        locationsObj.savedLocations = sl;
                        callback();
                    }).error(function (data) {
//                console.log("Ocurrio un error" + data);

            });
        };
        //Se deben leer los puntos desde el API de alberto.

        return locationsObj;

    }]);