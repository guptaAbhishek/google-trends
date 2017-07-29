(function () {

    'use strict';

    var GoogleTrendsController = angular.module('GoogleTrendsController',[]);

    GoogleTrendsController.controller('GoogleTrendsController',['$scope','DataServices',function ($scope,DataServices) {

        $scope.category = "";

        $scope.getTrendingStoriesByCategory = function(params){
            DataServices._getTrendingStoriesByCategory(params).then(function(response){
                if(response.status === 200){
                    console.log(response.data);
                }else{
                    $scope.error = response.status;
                }
            });
        };

        $scope.open_modal = function (params) {
          // console.log(params);
          $scope.modal_data = params;
        };

        var t = {category:'all',code:'all'};

        $scope.categories = [{category:"all", code:"all"}, {category:"business", code:"b"}, {category:"entertainment", code:"e"}, {category:"science_tech", code:"t"}, {category:"health", code:"m"}, {category:"sports", code:"s"}, {category:"top_stories", code:"h"}];

        $scope.category_clicked = function(category){
            $scope.category = category.category;
            DataServices._getTrendingStoriesByCategory(category).then(function(response){
                if(response.status === 200){
                    $scope.date = response.data.date;
                    $scope.trendingData = response.data;
                    // console.log($scope.trendingData);
                    /**
                     * Get the rank of hindustan times
                     */
                    $scope.trendingData.storySummaries.trendingStories.forEach(function (obj,key) {
                        var rank = [];
                        obj.articles.forEach(function(o,k){
                            if(o.url.indexOf("hindustantimes") !== -1){
                                rank.push({
                                    rank:k+1
                                });
                            }else{
                                $scope.trendingData.storySummaries.trendingStories[key]['htComRank'] = 0;
                            }
                            $scope.trendingData.storySummaries.trendingStories[key]['htComRank'] = rank;
                        });
                    });



                    // console.log($scope.trendingData);

                }else{
                    $scope.error = response.status;
                }
            });
        };
        $scope.category_clicked(t);

        // $scope.getTrendingStoryById = function (params) {
        //     DataServices._getTrendingStoryById(params).then(function(response){
        //         console.log(response);
        //     });
        // };


        var p = {
            story_id:"IN_lnk_Ub753AAwAACo0M_ml"
        };



        $scope.getTrendingStoryByIdv2 = function (params) {
          DataServices._getTrendingStoryByIdv2(params).then(function(response){
                console.log(response);
                $scope.trendingStoryData = response.data;

                $scope.trendingStoryData.widgets.forEach(function(obj,key){
                    if(obj.id === "RELATED_QUERIES"){
                        console.log('obj.token',obj.token);
                        DataServices._getRelatedQueries({token:obj.token}).then(function(repsonse){
                            console.log(response);
                        });
                    }else{
                        console.log('could not get RELATED_QUERIES');
                    }

                });

          });
        };


        $scope.getGoogleHotSearches = function (params) {
            $scope.hotKeyWords = [];
          DataServices._getGoogleHotSearches().then(function (response) {
              if(response.status === 200){
                  response.data.india.forEach(function(obj,key){
                      $scope.hotKeyWords.push({
                          keywords:obj
                      });
                  });
              }else{}
          })
        };

        $scope.getGoogleHotSearches(p);

        $scope.getTrendingStoryByIdv2(p)



    }]);


})();

