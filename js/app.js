// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'leaflet-directive', 'starter.controllers', 'ngCordova', 'igTruncate', 'ngStorage'])

        .run(function ($ionicPlatform, $localStorage, $location, pushService, $http, config) {


            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    window.cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }

            });
            document.addEventListener("deviceready", function () {
                //navigator.notification.alert('** cordova ready **');


//                pushService.register().then(function (result) {
//                    //navigator.notification.alert("Se leyo el # de serial" + result);
//                }, function (err) {
//                    navigator.notification.alert("No se recibiran notificaciones: " + err);
//                });

            }, false);
            if ($localStorage.id_usuario) {
                console.log("Datos registrados en el sistema, voy a consultar EULA");
                url = config.apiurl + "dueno_mascota/" + $localStorage.id_usuario;
                $http.get(url)
                        .then(
                                function (data) {
                                    console.log("Consulte y el Actual EULA es: " + data.eula);
                                    if (data.eula != "1") {
                                        $location.url('/app/eula');
                                    } else {
                                        $location.url('/app/mascotas');
                                    }
                                },
                                function (data) {
                                    console.log("Ocurrio un error al leer datos del dueño de la mascota");
                                    console.log("El error creo que es: "+data.data+" - "+data.status);

                                });
//                console.log("Se encontraron datos, redireccionando a gps");

            } else {
//                console.log("No se encontraron datos, redireccionando a login");
                $location.url('/login');
            }



        })

        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                    .state('login', {
                        url: "/login",
                        templateUrl: "templates/login.html",
                        controller: 'LoginCtrl'
                    })

                    .state('app', {
                        url: "/app",
                        abstract: true,
                        templateUrl: "templates/menu.html",
                        controller: 'AppCtrl'
                    })

                    .state('app.gps', {
                        url: "/gps",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/map.html",
                                controller: "PuntosCtrl"
                            }
                        }
                    })
                    .state('app.eula', {
                        url: "/eula",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/eula.html",
                                controller: "EULACtrl"
                            }
                        }
                    })
                    .state('app.mascotas', {
                        url: "/mascotas",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/lstmascotas.html",
                                controller: 'MascotasCtrl'
                            }
                        }
                    })

                    .state('app.singlemascota', {
                        url: "/mascota/:mascotaId",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/smascotadato.html",
                                controller: 'SingleMascotaCtrl'
                            }
                        }
                    })
                    .state('app.mascotahc', {
                        url: "/mascotahc/:mascotaId",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/smhc.html",
                                controller: 'MascotahcCtrl'
                            }
                        }
                    })

                    .state('app.veterinarios', {
                        url: "/veterinarios/:mascotaId",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/lstveterinarios.html",
                                controller: 'VeterinariosCtrl'
                            }
                        }
                    })
                    .state('app.singleveterinario', {
                        url: "/veterinario/:veterinarioId/:mascotaId",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/sveterinario.html",
                                controller: 'SingleVeterinarioCtrl'
                            }
                        }
                    })
                    .state('app.miperfil', {
                        url: "/perfil",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/sperfil.html",
                                controller: 'PerfilCtrl'
                            }
                        }
                    })

            $urlRouterProvider.otherwise('/app/mascotas');
        });