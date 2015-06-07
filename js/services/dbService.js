angular.module('starter').factory('dbService', [function () {
        var database = {};
        database = {
            iniciar: function () {
                this.db = null;
                console.log("Inicializando db");
            },
            onError: function (transaction, error) {
                console.log('Error: ' + error.message);

            },
            onSuccess: function (transaction, resultSet) {
                console.log('Operation completed successfully');

            },
            openDatabase: function () {
                var dbSize = 1 * 1024 * 1024;
                database.db = openDatabase("PPdb", "", "Base de datos PetPharm", dbSize,
                        function () {
                            console.log("Base de datos creada");
                        });
            },
            createTable: function (tabla) {
                switch (tabla) {
                    case "user":
                    default:
                        database.db.transaction(function (tx) {
                            tx.executeSql("CREATE TABLE IF NOT EXISTS User(ID INTEGER PRIMARY KEY ASC, usuario TEXT, added_on TEXT)",
                                    [], database.onSuccess, database.onError);
                        });
                        break;
                }
            },
            IsLogin: function () {
                database.db.transaction(function (tx) {
                    tx.executeSql("SELECT usuario FROM User", [], function (tx, rs) {
                        return  (rs.rows.length);
                    }
                    , database.onError);
                });
            },
            hola: "hola"
        };
        return database;
    }]);

