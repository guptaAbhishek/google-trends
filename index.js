var express  = require('express');
var app = express();
const googleTrends = require('google-trends-api');

var request = require('request');

var bodyParser = require('body-parser');





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('port',(process.env.PORT || '8080'));



// google trends apis
/**
 * interestOverTime
 *
 * @params
 *
 * params.keyword => array
 *
 */


app.get('/tech',function (req,res) {

});

/**
 * hl -> en-
 *
 *
 * business : b
 * science_tech : t
 *
 */

app.post('/getTrendingStoriesByCategory',function (req,res) {
    var params = req.body.params;

    if(params !== undefined && params !== null && params !== "undefined"){
        request.get({
            url:"https://trends.google.com/trends/api/stories/latest?hl=en-US&tz=-330&cat="+params.category+"&fi=15&fs=15&geo=IN&ri=300&rs=15&sort=0"
        },function(err,response,body){
            res.send(response);
        });
    }else{
        res.send({
            message:"params not defined"
        })
    }
});


app.post('/interestOverTime',function (req,res) {
    if(req.body.params !== undefined && req.body.params !== null && req.body.params !== "undefined"){
        var params =req.body.params;
        if(params !== undefined && params !== null && params !== "undefined"){
            if(params.keyword !== "undefined" && params.keyword !== null && params.keyword !== undefined){
                googleTrends.interestOverTime({keyword: params.keyword}, function(err, results){
                    if(err){
                        res.send({
                            message:err
                        });
                    }else{
                        res.send({
                            data:results
                        });
                    }
                })
            }else{
                res.send({
                    message:"params.keyword not defined"
                });
            }

        }else{
            res.send({
                message:"params not defined"
            });
        }
    }else{
        res.send({
            message:"req.body.params not defined !!"
        })
    }

});





app.listen(app.get('port'),function () {
   console.log('All magic happens at port',app.get('port'));
});