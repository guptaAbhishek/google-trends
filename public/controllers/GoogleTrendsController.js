(function () {

    'use strict';

    var GoogleTrendsController = angular.module('GoogleTrendsController',[]);

    GoogleTrendsController.controller('GoogleTrendsController',['$scope','DataServices',function ($scope,DataServices) {


        $scope.getTrendingStoriesByCategory = function(params){

            DataServices._getTrendingStoriesByCategory(params).then(function(response){
                if(response.status === 200){
                    // $scope.trendingStories = response.data;
                    console.log(response.data);
                }else{
                    $scope.error = response.status;
                }
            });

        };


        $scope.open_modal = function (params) {
          console.log(params);

          $scope.modal_data = params;
        };
        /**
         * categories codes
         * 0. all : all
         * 1. business : b
         * 2. entertainment : e
         * 3. science tech : t
         * 4. health : m
         * 5. sports : s
         * 6. top stories : h
         *
         */
        /**
         * if you hit with the trending story's id you get all the data
         * https://trends.google.com/trends/api/stories/{{treding_story_id}}?hl=en-US&tz=-330&sw=10
         *
         * if you want to plot the graph
         * https://trends.google.com/trends/api/widgetdata/timeline
         *
         * hl:en-US
         * tz:-330
         * req:{"geo":{"country":"IN"},"time":"2017-07-22T10\\:00\\:00 2017-07-24T17\\:30\\:00","resolution":"HOUR","mid":["/m/014g_s","/m/0b6d3h6","/m/0k8z"],"locale":"en-US"}
         * token:APP6_UEAAAAAWXeC75vQcotBDS2kAQyrggiHIey0tWff
         * tz:-330
         *
         */


        // https://trends.google.com/trends/api/widgetdata/relatedtopics?hl=en-US&tz=-330&req=%7B%22geo%22:%7B%22country%22:%22IN%22%7D,%22time%22:%222017-07-22T23%5C%5C:00%5C%5C:00+2017-07-24T17%5C%5C:20%5C%5C:00%22,%22mid%22:%5B%22%2Fm%2F0xnt5%22,%22%2Fm%2F05sb1%22,%22%2Fm%2F0bl0n_%22%5D,%22locale%22:%22en-US%22%7D&token=
            //
            // APP6_UEAAAAAWXeBckHZuRasXKxVrExXQN8kXGn1KcWo
            // APP6_UEAAAAAWXeC75vQcotBDS2kAQyrggiHIey0tWff
        /**
         * hl:en-US
         tz:-330
         req:{"geo":{"country":"IN"},"time":"2017-07-22T23\\:00\\:00 2017-07-24T17\\:20\\:00","mid":["/m/0xnt5","/m/05sb1","/m/0bl0n_"],"locale":"en-US"}
         token:APP6_UEAAAAAWXeBckHZuRasXKxVrExXQN8kXGn1KcWo
         * @type {{category: string}}
         */



        var t = {
            category:'all'
        };

        var categories = [
            {category:"all", code:"all"}, {category:"business", code:"b"},
            {category:"entertainment", code:"e"}, {category:"science_tech", code:"t"},
            {category:"health", code:"m"}, {category:"sports", code:"s"},
            {category:"top_stories", code:"h"}
        ];

        categories.forEach(function (obj,key) {
            // console.log('for category',obj.category);
            $scope.getTrendingStoriesByCategory(obj);
        });





    }]);


})();

