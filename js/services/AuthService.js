angular.module('starter')
        .factory('AuthService', ['$http', 'config', '$state', function ($http, config, $state) {
                var Auth = {};
                Auth.Login = function (username, password, db, callback) {
                    console.log("LLamando api");
                    url = config.apiurl + 'login/' + username + '/' + password;
                    console.log(url);
                    $http.get(url)
                            .success(function (data) {
                                if (data) {
                                    if (!data.success) {

                                        if (!data.error) {
                                            db.transaction(function (tx) {
                                                tx.executeSql("INSERT INTO User(usuario, added_on, id_usuario) VALUES (?,?,?)", [username, new Date().toUTCString(), data[0]["id"]],
                                                        function (transaction, resultSet) {
                                                            console.log(resultSet);
                                                        }, function (tran, error) {
                                                    console.log(error);
                                                });
                                            });
                                            callback({result:true});
                                        } else {
                                            callback({result:false,data:"Ocurrio un error: "+data.error.status});
                                        }
                                    }else{
                                        callback({result:false, data:data.success.status});
                                    }
                                }else{
                                    callback({result:false, data:"Usuario y/o contraseña invalidos."});
                                }
                            })
                            .error(function (data, status, headers, config) {
                                console.log("Ocurrio un error");
                            });
                    //return (username === 'pospino@procaps.com.co' && password === 'Calle20');

                };
                return Auth;
            }]);
