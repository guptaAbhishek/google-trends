(function () {

    'use strict';


    var HtGoogleTrends = angular.module("HtGoogleTrends",["ngRoute","angular-loading-bar","GoogleTrendsController","DataServices"])

    HtGoogleTrends.config(function($routeProvider,cfpLoadingBarProvider,$locationProvider){

        cfpLoadingBarProvider.includeSpinner = true;


        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider
            .when("/", {
                templateUrl : "pages/TrendingStories.html",
                controller:'GooglePageSpeedController'
            })
    });


})();