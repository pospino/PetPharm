// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'leaflet-directive', 'starter.controllers', 'ngCordova', 'igTruncate', 'ngStorage', 'ngCookies'])

        .run(function ($ionicPlatform, $localStorage, $state) {
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
            function onSuccess(transaction, resultSet) {
                console.log('Query completed: ' + JSON.stringify(resultSet));
            }

            function onError(transaction, error) {
                console.log('Query failed: ' + error.message);
            }
            var dbSize = 1 * 1024 * 1024; // 5MB
            var db = openDatabase("PP", "", "Base de datos PetPharm", dbSize,
                    function () {
                        console.log("Base de datos creada");
                    });
            db.transaction(function (tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS User(ID INTEGER PRIMARY KEY ASC, usuario TEXT, id_usuario number,added_on TEXT)",
                        [], onSuccess, onError);
                tx.executeSql("SELECT * FROM User", [], function (tx, rs) {

                    if (rs.rows.length > 0) {
                        console.log("Se encontraron datos, redireccionando a gps");
                        $state.go("app.gps");
                    } else {
                        console.log("No se encontraron datos, redireccionando a login");
                        $state.go("login");
                    }
                }, onError);
            });
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
                        url: "/perfil/:usuarioId",
                        views: {
                            'menuContent': {
                                templateUrl: "templates/sperfil.html",
                                controller: 'PerfilCtrl'
                            }
                        }
                    })

            $urlRouterProvider.otherwise('/app/gps');

        });