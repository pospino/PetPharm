angular.module('starter')
        .constant('config', {
            apiurl: 'http://webapi.petpharm.net/index.php/',
            ruta_mascota: 'http://petpharm.net/img/mascotas/',
            ruta_perfil: 'http://petpharm.net/img/clientes/'
        })
        .config(function ($compileProvider) {
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
        });

