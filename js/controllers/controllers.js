angular.module('starter.controllers', [])
        .controller('AppCtrl', function ($scope, $state, $localStorage) {

            $scope.logOut = function () {
                $localStorage.$reset();
                $state.go("login");

            };
        })

        .controller('MascotasCtrl', function ($scope, $http, config, $localStorage, $ionicLoading) {

            $scope.lista = [];
            LeerDatos(function () {
                console.log("Leer datos normal");
            });
            $scope.Actualizar = function () {
                $scope.lista = [];
                console.log("leyendo");
                LeerDatos(function () {
                    console.log("Datos Actualizados");
                });
            };
            $scope.Actualizar_Pull = function () {
                $scope.lista = [];
                console.log("Pull");
                LeerDatos(function () {
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

                url = config.apiurl + 'mismascotas/' + $localStorage.id_usuario + '/' + 0;
                console.log(url);
                $http.get(url)
                        .success(function (data) {
                            $scope.lista = data;
                            $ionicLoading.hide();
                            callback();
                        });


            }


        })

        .controller('SingleMascotaCtrl', function ($scope, $stateParams, config, $http, $ionicLoading, $localStorage) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            url = config.apiurl + 'pet/' + $stateParams.mascotaId + '/' + $localStorage.id_usuario;
            console.log(url);
            $http.get(url)
                    .success(function (data) {
                        $scope.mascota = data[0];
                        $ionicLoading.hide();
                    });
        })

        .controller('MascotahcCtrl', function ($scope, $stateParams, $ionicLoading, $http, config, $ionicModal) {
            $scope.mascotaId = $stateParams.mascotaId;
            $ionicModal.fromTemplateUrl('templates/modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $scope.open = function (detalle, fecha) {
                $scope.titulo = fecha;
                $scope.detalle = detalle;
                $scope.modal.show();
            };
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            url = config.apiurl + 'hc/' + $stateParams.mascotaId + '/0';
            console.log(url);
            $http.get(url)
                    .success(function (data) {
                        $scope.datos = data;
                        $ionicLoading.hide();
                    });

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

        .controller('SingleVeterinarioCtrl', function ($scope, $stateParams, $http, $ionicLoading, config) {
            $scope.mascotaId = $stateParams.mascotaId;
            $scope.veterinarioId = $stateParams.veterinarioId;
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



        })

        .controller('PerfilCtrl', function ($scope, $http, $localStorage, $ionicLoading, config) {
            $scope.perfil = {};
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            var url = config.apiurl + 'my/' + $localStorage.id_usuario + '/0';
            console.log(url);
            $http.get(url)
                    .success(function (data) {
                        $scope.perfil = data[0];
                        $ionicLoading.hide();
                    });
        })



        .controller('PuntosCtrl', function ($scope, $cordovaGeolocation, $ionicLoading, LocationsService) {

            $scope.lista = [];
            $scope.$on("$stateChangeSuccess", function () {

                $scope.puntos = LocationsService.savedLocations;
                $scope.locate = function () {
                    $ionicLoading.show({
                        content: 'Loading',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: 0
                    });
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
                                $ionicLoading.hide();

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
            $scope.lista = [
                {nombre: 'Veterinario 1', clinica: 'Clinica 1', id: 1},
                {nombre: 'Veterinario 2', clinica: 'Clinica 2', id: 2},
                {nombre: 'Veterinario 3', clinica: 'Clinica 1', id: 3},
                {nombre: 'Veterinario 4', clinica: 'Clinica 3', id: 4},
                {nombre: 'Veterinario 5', clinica: 'Clinica 4', id: 5},
                {nombre: 'Veterinario 6', clinica: 'Clinica 2', id: 6}
            ];
        })

        .controller('LoginCtrl', function ($scope, $state, $localStorage, $stateParams, AuthService,
                $cordovaPush, $cordovaToast, $ionicLoading) {
            console.log("LLego al login");
            if ($localStorage.username) {
                $state.go("app.gps");
            }
            $localStorage.$reset();

            $scope.loginData = {};
            var userdata = $scope.loginData;



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
                AuthService.Login(userdata.username, userdata.password, function (response) {
                    $scope.loginData.password = "";
                    if (response.result) {
                        $localStorage.username = response.username;
                        $localStorage.id_usuario = response.id_usuario;
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
