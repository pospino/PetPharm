angular.module('starter.controllers', [])
        .controller('AppCtrl', function ($scope, $state, $localStorage) {

            $scope.logOut = function () {
                var dbSize = 1 * 1024 * 1024; // 5MB
                var db = openDatabase("PPdb", "", "Base de datos PetPharm", dbSize,
                        function () {
                            console.log("Base de datos creada");
                        });
                db.transaction(function (tx) {
                    tx.executeSql("CREATE TABLE IF NOT EXISTS User(ID INTEGER PRIMARY KEY ASC, usuario TEXT, added_on TEXT)",
                            [], onSuccess, onError);
                    tx.executeSql("DELETE FROM User", [], function (tx, rs) {
                        console.log("Datos borrados");
                        $state.go("login");
                    }, onError);
                });

                function onSuccess(transaction, resultSet) {
                    console.log('Query completed: ' + JSON.stringify(resultSet));
                }

                function onError(transaction, error) {
                    console.log('Query failed: ' + error.message);
                }

            };
        })

        .controller('MascotasCtrl', function ($scope, $http, config, $ionicLoading) {

            $scope.lista = [];
            LeerDatos(function(){
                console.log("Leer datos normal");
            });
            $scope.Actualizar = function(){
                $scope.lista = [];
                console.log("leyendo");
                LeerDatos(function(){
                    console.log("Datos Actualizados");
                });
            };
            $scope.Actualizar_Pull = function(){
                $scope.lista = [];
                console.log("Pull");
                LeerDatos(function(){
                     $scope.$broadcast('scroll.refreshComplete');
                });
            };
            function LeerDatos(callback) {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                console.log("entro");
                var dbSize = 1 * 1024 * 1024;
                var db = openDatabase("PPdb", "", "Base de datos PetPharm", dbSize,
                        function () {
                            console.log("Base de datos creada");
                        });
                db.transaction(function (tx) {
                    tx.executeSql("SELECT * FROM User", [], function (tx, rs) {
                        if (rs.rows.length) {
                            url = config.apiurl + 'mismascotas/' + rs.rows[0]["id_usuario"] + '/' + 0;
                            $http.get(url)
                                    .success(function (data) {
                                        $scope.lista = data;
                                        $ionicLoading.hide();
                                        callback();
                                    });
                        } else {

                        }
                    }, function (tx, error) {
                        console.log("Error: " + error);
                    });
                });
            }


        })

        .controller('SingleMascotaCtrl', function ($scope, $stateParams, config, $http, $ionicLoading) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $http.get(config.apiurl + 'pet/' + $stateParams.mascotaId + '/1')
                    .success(function (data) {
                        $scope.mascota = data[0];
                        $ionicLoading.hide();
                    });
        })

        .controller('MascotahcCtrl', function ($scope, $stateParams) {
            $scope.mascotaId = $stateParams.mascotaId;
            $scope.nombre = "Luka";
            $scope.id = 1;
        })

        .controller('VeterinariosCtrl', function ($scope, $stateParams) {
            $scope.lista = [
                {nombre: 'Veterinario 1', clinica: 'Clinica 1', id: 1},
                {nombre: 'Veterinario 2', clinica: 'Clinica 2', id: 2},
                {nombre: 'Veterinario 3', clinica: 'Clinica 1', id: 3},
                {nombre: 'Veterinario 4', clinica: 'Clinica 3', id: 4},
                {nombre: 'Veterinario 5', clinica: 'Clinica 4', id: 5},
                {nombre: 'Veterinario 6', clinica: 'Clinica 2', id: 6}
            ];
        })

        .controller('SingleVeterinarioCtrl', function ($scope, $stateParams, $http,$ionicLoading,config) {
             $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $scope.$on("$stateChangeSuccess", function () {
                $scope.map = {
                    center: {
                        lat: -33.865143,
                        lng: 151.209900,
                        zoom: 16
                    },
                    defaults: {
                        scrollWheelZoom: false,
                        zoomControl: false,
                        dragging: false,
                        tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png"
                    },
                    markers: {
                        osloMarker: {
                            lat: -33.865143,
                            lng: 151.209900,
                            focus: true,
                            draggable: false,
                            icon: {
                                iconUrl: 'img/ppp.png',
                                iconSize: [100, 107] // size of the icon

                            }
                        }
                    }
                };
                $http.get(config.apiurl + 'vet/' + $stateParams.mascotaId + '/0')
                    .success(function (data) {
                        $scope.vet = data[0];
                        $ionicLoading.hide();
                    });
            });
            $scope.mascotaId = $stateParams.mascotaId;
            $scope.veterinarioId = $stateParams.veterinarioId;
           
            
            
        })

        .controller('PerfilCtrl', function ($scope, $stateParams) {
            $scope.nombre = "Pedro";
            $scope.apellido = "Ospino";
            $scope.edad = "31";
        })

        .controller('PuntosCtrl', function ($scope, $stateParams) {
            $scope.lista = [
                {nombre: 'Veterinario 1', clinica: 'Clinica 1', id: 1},
                {nombre: 'Veterinario 2', clinica: 'Clinica 2', id: 2},
                {nombre: 'Veterinario 3', clinica: 'Clinica 1', id: 3},
                {nombre: 'Veterinario 4', clinica: 'Clinica 3', id: 4},
                {nombre: 'Veterinario 5', clinica: 'Clinica 4', id: 5},
                {nombre: 'Veterinario 6', clinica: 'Clinica 2', id: 6}
            ];
        })

        .controller('PuntosCtrl', function ($scope, $stateParams, $cordovaGeolocation, LocationsService) {
            $scope.$on("$stateChangeSuccess", function () {
                $scope.puntos = LocationsService.savedLocations;
                $scope.locate = function () {

                    $cordovaGeolocation
                            .getCurrentPosition()
                            .then(function (position) {
                                $scope.map.center.lat = position.coords.latitude;
                                $scope.map.center.lng = position.coords.longitude;
                                $scope.map.center.zoom = 15;

                                $scope.map.markers.now = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude,
                                    message: "<b>Tu estas aqui</b>",
                                    focus: true,
                                    draggable: false
                                };

                            }, function (err) {
                                // error
                                console.log("Location error!");
                                console.log(err);
                            });

                };
                $scope.map = {
                    center: {
                        lat: -33.865143,
                        lng: 151.209900,
                        zoom: 16,
                    },
                    defaults: {
                        scrollWheelZoom: false,
                        tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
                    },
                    markers: $scope.puntos,
                };
            });
        })

        .controller('LoginCtrl', function ($scope, $state, $localStorage, $stateParams, AuthService,
                $cordovaPush, $cordovaToast, $ionicLoading) {
            var dbSize = 1 * 1024 * 1024;
            var db = openDatabase("PPdb", "", "Base de datos PetPharm", dbSize,
                    function () {
                        console.log("Base de datos creada");
                    });
            db.transaction(function (tx) {
                tx.executeSql("DROP TABLE IF EXISTS User",
                        [], onSuccess, onError);
                tx.executeSql("CREATE TABLE IF NOT EXISTS User(ID INTEGER PRIMARY KEY ASC, usuario TEXT, id_usuario number, added_on TEXT)",
                        [], onSuccess, onError);
                tx.executeSql("SELECT * FROM User", [], function (tx, rs) {
                    if (rs.rows.length) {
                        $state.go("app.gps");
                    } else {

                    }
                }, onError);
            });

            function onSuccess(transaction, resultSet) {
                console.log('Query completed: ' + JSON.stringify(resultSet));
            }

            function onError(transaction, error) {
                console.log('Query failed: ' + error.message);
            }


            $localStorage.$reset();

            $scope.loginData = {};
            var userdata = $scope.loginData;

            if ($stateParams.logout) {
                console.log("debe reiniciar");

            }
            if ($localStorage.username) {
                $state.go("app.gps");
            }
            if (userdata.password === "") {
                $scope.ShowError = false;
            }
            $scope.doLogin = function () {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                var userdata = $scope.loginData;
                AuthService.Login(userdata.username, userdata.password, db, function (response) {
                    $scope.loginData.password = "";
                    if (response.result) {
                        $ionicLoading.hide();
                        $state.go("app.gps");
                    } else {
                        $ionicLoading.hide();
                        $scope.ShowError = true;
                        $scope.Error = response.data;

                    }
                });

            };
            $scope.register = function () {
                var config = null;

                if (ionic.Platform.isAndroid()) {
                    console.log("Es Android");
                    config = {
                        "senderID": "bold-seat-95923" // REPLACE THIS WITH YOURS FROM GCM CONSOLE - also in the project URL like: https://console.developers.google.com/project/434205989073
                    };
                }
                else if (ionic.Platform.isIOS()) {
                    console.log("Es IOS");
                    config = {
                        "badge": "true",
                        "sound": "true",
                        "alert": "true"
                    }
                }

                $cordovaPush.register(config).then(function (result) {
                    console.log("Register success " + result);

                    $cordovaToast.showShortCenter('Registered for push notifications');
                    $scope.registerDisabled = true;
                    // ** NOTE: Android regid result comes back in the pushNotificationReceived, only iOS returned here
                    if (ionic.Platform.isIOS()) {
                        $scope.regId = result;
                        storeDeviceToken("ios");
                    }
                }, function (err) {
                    console.log("Register error " + err)
                });
            };



        });
