angular.module('starter').factory('LocationsService', ['$http','config',function ($http, config) {

        var locationsObj = {};
        locationsObj.savedLocations = [];
        locationsObj.getPPP = function (callback) {
            url = config.apiurl + "ppp/0/0";
            console.log(url);
            $http.get(url)
                    .success(function (data) {
                        sl = [];
                        for (i = 0; i < data.length; i++) {
                            p = data[i];
                            switch (p.icon) {
                                case '1':
                                    p.icon = {
                                        iconUrl: 'img/cp.png',
                                        iconSize: [100, 107], // size of the icon

                                    };
                                    break;
                                case '2':
                                    p.icon = {
                                        iconUrl: 'img/ps.png',
                                        iconSize: [100, 107], // size of the icon

                                    };
                                    break;
                                case '3':
                                    p.icon = {
                                        iconUrl: 'img/ap.png',
                                        iconSize: [100, 107], // size of the icon

                                    };
                                    break;
                                case '4':
                                    p.icon = {
                                        iconUrl: 'img/ppp.png',
                                        iconSize: [100, 107], // size of the icon

                                    };
                                    break;
                            }
                            p.name = i;
                            sl[i] = p;
                        }
                        locationsObj.savedLocations = sl;
                        callback();
                    }).error(function (data) {
                console.log("Ocurrio un error" + data);

            });
        };
        //Se deben leer los puntos desde el API de alberto.

        return locationsObj;

    }]);