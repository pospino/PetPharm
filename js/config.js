angular.module('starter')
        .constant('config', {
            apiurl: 'http://webapi.petpharm.net/index.php/',
        })
        .config(function ($compileProvider) {
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
        });

