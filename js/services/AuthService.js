angular.module('starter')
        .factory('AuthService', ['$http', 'config', '$state', function ($http, config, $state, $localStorage) {
                var Auth = {};
                Auth.Login = function (username, password, callback) {
                    console.log("LLamando api");
                    url = config.apiurl + 'login/' + username + '/' + password;
                    //console.log(url);
                    $http.get(url)
                            .success(function (data) {
                                if (data) {
                                    if (!data.success) {

                                        if (!data.error) {
                                            
                                            callback({result: true, username: username, id_usuario: data[0]["id"]});
                                        } else {
                                            callback({result: false, data: "Ocurrio un error: " + data.error.status});
                                        }
                                    } else {
                                        callback({result: false, data: data.success.status});
                                    }
                                } else {
                                    callback({result: false, data: "Usuario y/o contraseña invalidos."});
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log("Ocurrio un error");
                            });
                    //return (username === 'pospino@procaps.com.co' && password === 'Calle20');

                };
                return Auth;
            }]);
