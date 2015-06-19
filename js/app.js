// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'leaflet-directive', 'starter.controllers', 'ngCordova', 'igTruncate', 'ngStorage'])

        .run(function ($ionicPlatform, $localStorage, $location, $cordovaPush, $rootScope, $http, config) {
            if (device.platform === 'android' || device.platform === 'Android')
            {
                var androidConfig = {
                    "senderID": "1003553143793",
                };
                document.addEventListener("deviceready", function () {
                    $cordovaPush.register(androidConfig)
                            .then(function (result) {
                                console.log("Resultado Android: " + result);
                            }, function (err) {
                                console.log(("Error Android: " + err));
                            });
                    $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
                        switch (notification.event) {
                            case 'registered':
                                if (notification.regid.length > 0) {
                                    console.log("Registrado con: " + notification.regid);
                                    $localStorage.device_id = notification.regid;
                                    alert('registration ID = ' + notification.regid);
                                    iniciar();
                                }
                                break;

                            case 'message':
                                // this is the actual push notification. its format depends on the data model from the push server
                                alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
                                break;

                            case 'error':
                                alert('GCM error = ' + notification.msg);
                                break;

                            default:
                                alert('An unknown GCM event has occurred');
                                break;
                        }
                        
                    });


                    // WARNING: dangerous to unregister (results in loss of tokenID)
                    $cordovaPush.unregister(options).then(function (result) {
                        // Success!
                    }, function (err) {
                        // Error
                    })

                }, false);
            }
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
            iniciar();
            function iniciar() {
                if ($localStorage.id_usuario) {
                    var url = config.push_server;
                    $http.post(url, {
                        type: device.platform,
                        regID: event.regid,
                        id: $localStorage.id_usuario
                    }).success(function (data) {
                        console.log("Se guardaron los datos: " + data);
                    }).error(function (data) {
                        console.log("Ocurrio un error al guardar datos de registro: " + data);
                    });
                    console.log("Se encontraron datos, redireccionando a gps");
                    $location.url('/app/gps');
                } else {
                    console.log("No se encontraron datos, redireccionando a login");
                    $location.url('/login');
                }
            }


        })

        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                    .state('login', {
                        url: "/login",
                        templateUrl: "templates/login.html",
                        controller: 'LoginCtrl',
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

            $urlRouterProvider.otherwise('/app/gps');
        });