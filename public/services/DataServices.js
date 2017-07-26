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
            }
        }
    }]);
})();