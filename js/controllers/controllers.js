angular.module('starter.controllers', [])
        .controller('AppCtrl', function ($scope, $localStorage, $location, pushService) {

            $scope.logOut = function () {
                $localStorage.$reset();
                $location.url('/login');
            };
            pushService.register().then(function (result) {
                console.log("Registrado con exito: " + result);
            }, function (error) {
                console.log("Ocurrio un error al Registrar: " + error);
            });
            /*if ($localStorage.platform && $localStorage.regid && $localStorage.id_usuario) {
             console.log("todos los datos necesarios OK");
             alert("Todos los datos necesarios OK");
             var url = config.push_server;
             console.log(url);
             $http.post(url, {
             type: $localStorage.platform,
             regID: $localStorage.regid,
             id: $localStorage.id_usuario
             }).success(function (data) {
             console.log("Se guardaron los datos: " + data);
             }).error(function (data) {
             console.log("Ocurrio un error al guardar datos de registro: " + data);
             });
             } else {
             alert("platform: " + $localStorage.platform + " RegID: " + $localStorage.regid + " Id_Usuario: " + $localStorage.id_usuario);
             console.log("No encontre datos para enviarlos al servidorPush");
             }*/

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
                $scope.ruta_img = config.ruta_mascota;
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

        .controller('SingleMascotaCtrl', function ($scope, $stateParams, config, $http, $ionicLoading, $localStorage, Camera) {
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            $scope.mascota = {};
            url = config.apiurl + 'pet/' + $stateParams.mascotaId + '/' + $localStorage.id_usuario;
            console.log(url);
            $http.get(url)
                    .success(function (data) {
                        $scope.mascota = data[0];
                        if ($scope.mascota.imagen !== null) {
                            $scope.mascota.imagen = config.ruta_mascota + $scope.mascota.imagen;
                        }
                        $ionicLoading.hide();
                    });
            $scope.TakePhoto = function () {

                var options = {
                    correctOrientation: true,
                    quality: 50,
                    encodingType: 0     // 0=JPG 1=PNG
                };
                Camera.getPicture(options).then(onSuccess, onFail);
            };
            var onSuccess = function (FILE_URI) {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                console.log(FILE_URI);
                $scope.mascota.imagen = FILE_URI;
                $scope.$apply();
                send();

            };
            var onFail = function (e) {
                console.log("On fail " + e);
                $ionicLoading.hide();
            }
            function send() {
                var myImg = $scope.mascota.imagen;
                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = myImg.substr(myImg.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";
                options.chunkedMode = false;
                var params = {};
                params.id = $scope.mascota.id;
                params.tipo = "m";
                options.params = params;
                var ft = new FileTransfer();
                ft.upload(myImg, encodeURI("http://webapi.petpharm.net/uploadImage.php"), win, fail, options);
            }

            function win(r) {
                console.log("Code = " + r.responseCode);
                console.log("Response = " + r.response);
                console.log("Sent = " + r.bytesSent);
                $ionicLoading.hide();
            }
            function fail(error) {
                console.log("An error has occurred: Code = " + error.code);
                $ionicLoading.hide();
            }
        })

        .controller('MascotahcCtrl', function ($scope, $stateParams, $ionicLoading, $http, config, $ionicModal) {
            $scope.datos = [];
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
            $scope.open2 = function (detalle, fecha) {
                $scope.titulo = fecha;
                $scope.detalle = "";
                separador = "";
                for (i = 0; i < detalle.length; i++) {
                    $scope.detalle += separador + "<b>" + (detalle[i].tipo === "a" ? "Motivo consulta: " : "Diagnostico: ") + "</b>";
                    $scope.detalle += detalle[i].desc;
                    separador = "<br><br>";
                }

                $scope.modal.show();
            };
            $scope.closeModal = function () {
                $scope.modal.hide();
            };


            $scope.Actualizar = function () {
                $scope.datos = [];
                console.log("leyendo");
                Consulta(function () {
                    console.log("Datos Actualizados");
                });
            };
            $scope.Actualizar_Pull = function () {
                $scope.datos = [];
                console.log("Pull");
                Consulta(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };
            Consulta(function () {
                console.log("Datos leidos");
            });
            function Consulta(callback) {
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
                            for (var i = 0; i < data.length; i++) {
                                $scope.datos[i] = {};
                                $scope.datos[i].fecha = data[i].fecha;
                                $scope.datos[i].detalles = [];
                                detalles = data[i].detalles.split(":");
                                for (var j = 0; j < detalles.length; j++) {
                                    var det = detalles[j].split(",");
                                    $scope.datos[i].detalles[j] = {
                                        tipo: det[0],
                                        desc: det[1]
                                    }
                                }
                            }
                            // $scope.datos = data;
                            $ionicLoading.hide();
                            callback();
                        });
            }
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

        .controller('PerfilCtrl', function ($scope, $http, $localStorage, $ionicLoading, config, Camera) {
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
                        if ($scope.perfil.imagen !== null) {
                            $scope.perfil.imagen = config.ruta_perfil + $scope.perfil.imagen;
                        }
                        $ionicLoading.hide();
                    });

            $scope.TakePhoto = function () {

                var options = {
                    correctOrientation: true,
                    quality: 50,
                    encodingType: 0     // 0=JPG 1=PNG
                };
                Camera.getPicture(options).then(onSuccess, onFail);
            };
            var onSuccess = function (FILE_URI) {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                console.log(FILE_URI);
                $scope.perfil.imagen = FILE_URI;
                $scope.$apply();
                send();

            };
            var onFail = function (e) {
                console.log("On fail " + e);
                $ionicLoading.hide();
            }
            function send() {
                var myImg = $scope.perfil.imagen;
                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = myImg.substr(myImg.lastIndexOf('/') + 1);
                options.mimeType = "image/jpeg";
                options.chunkedMode = false;
                var params = {};
                params.id = $localStorage.id_usuario;
                params.tipo = "d";
                options.params = params;
                var ft = new FileTransfer();
                ft.upload(myImg, encodeURI("http://webapi.petpharm.net/uploadImage.php"), win, fail, options);
            }

            function win(r) {
                console.log("Code = " + r.responseCode);
                console.log("Response = " + r.response);
                console.log("Sent = " + r.bytesSent);
                $ionicLoading.hide();
            }
            function fail(error) {
                console.log("An error has occurred: Code = " + error.code);
                $ionicLoading.hide();
            }
        })

        .controller('PuntosCtrl', function ($scope, leafletData, $cordovaGeolocation, $ionicLoading, LocationsService) {

            $scope.lista = [];
            function WIAM() {
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
                            $ionicLoading.hide();

                            // error
                            console.log("Location error!");
                            console.log(err);
                        });


            }
            $scope.$on("$stateChangeSuccess", function () {

                $scope.puntos = {};
                LocationsService.getPPP(function () {
                    sl = LocationsService.savedLocations;
                    leafletData.getMap().then(function (map) {
                        for (i = 0; i < sl.length; i++) {

                            L.marker([sl[i].lat, sl[i].lng], {icon: sl[i].icon}).addTo(map).bindPopup(sl[i].message);
                        }
                    });

                });
                $scope.locate = function () {
                    WIAM();
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
                WIAM();
            });

        })

        .controller('LoginCtrl', function ($scope, $state, $localStorage, AuthService, $ionicLoading, pushService) {
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
                        pushService.register().then(function (result) {
                            console.log("Registrado con exito: " + result);
                        }, function (error) {
                            console.log("Ocurrio un error al Registrar: " + error);
                        });
                        /*if ($localStorage.platform && $localStorage.regid && $localStorage.id_usuario) {
                         var url = config.push_server;
                         console.log(url);
                         $http.post(url, {
                         type: $localStorage.platform,
                         regID: $localStorage.regid,
                         id: $localStorage.id_usuario
                         }).success(function (data) {
                         console.log("Se guardaron los datos: " + data);
                         }).error(function (data) {
                         console.log("Ocurrio un error al guardar datos de registro: " + data);
                         });
                         } else {
                         console.log("No tengo los datos necesarios. platform: " + $localStorage.platform +
                         " regID: " + $localStorage.regid + " id_usuario: " + $localStorage.id_usuario);
                         }*/

                        $ionicLoading.hide();
                        $state.go("app.gps");

                    } else {
                        $ionicLoading.hide();
                        $scope.ShowError = true;
                        $scope.Error = response.data;
                    }
                });

            };


        });
