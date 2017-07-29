(function(){

    'use strict';

    var DataServices = angular.module('DataServices',[]);

    DataServices.factory('DataServices',['$http','$q',function ($http,$q) {
        return{
            _getTrendingStoriesByCategory:function (params) {
                var deferred = $q.defer();
                $http.post('/getTrendingStoriesByCategory',{params:params})
                    .then(function(data) {
                        deferred.resolve(data);
                    }).catch(function(){
                    deferred.reject();
                });

                return deferred.promise;
            },
            _getTrendingStoryById:function (params) {
                var deferred = $q.defer();
                $http.post('/getTrendingStoryById',{params:params})
                    .then(function(data) {
                        deferred.resolve(data);
                    }).catch(function(){
                    deferred.reject();
                });

                return deferred.promise;
            },

            _getTrendingStoryByIdv2:function (params) {
                var deferred = $q.defer();
                $http.post('/getTrendingStoryByIdv2',{params:params})
                    .then(function(data) {
                        deferred.resolve(data);
                    }).catch(function(){
                    deferred.reject();
                });

                return deferred.promise;
            },

            _getRelatedQueries:function (params) {
                var deferred = $q.defer();
                $http.post('/getRelatedQueries',{params:params})
                    .then(function(data) {
                        deferred.resolve(data);
                    }).catch(function(){
                    deferred.reject();
                });

                return deferred.promise;
            },

            _getGoogleHotSearches:function (params) {
                var deferred = $q.defer();
                $http.post('/getGoogleHotSearches',{params:params})
                    .then(function(data) {
                        deferred.resolve(data);
                    }).catch(function(){
                    deferred.reject();
                });

                return deferred.promise;
            }

        }
    }]);
})();