var express  = require('express');
var app = express();
const googleTrends = require('google-trends-api');

var request = require('request');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var configs = require('./configs');
var fs = require('fs');


mongoose.connect('mongodb://'+configs.dbHost+'/'+configs.dbName);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('open connection')
});

var googleTrending = require('./models/GoogleTrendingStories');
var GoogleTrendingStories = mongoose.model('GoogleTrendingStories',googleTrending);




app.set('views',__dirname+'/public');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use('/pages',express.static(__dirname+'/public/pages'));
app.use('/img',express.static(__dirname+'/public/img'));

app.set('port',(process.env.PORT || '8080'));


app.get('*',function (req,res) {
   res.render('index.html');
});


app.post('/getTrendingStoriesByCategory',function (req,res) {
    var params = req.body.params;

    if(params !== undefined && params !== null && params !== "undefined"){
        request.get({
            url:"https://trends.google.com/trends/api/stories/latest?hl=en-US&tz=-330&cat="+params.code+"&fi=15&fs=15&geo=IN&ri=300&rs=15&sort=0"
        },function(err,response,body){

            res.send(body);
        });
    }else{
        res.send({
            message:"params not defined"
        })
    }
});


/**
 * get trending article by id
 */


app.post('/getTrendingStoryById',function (req,res) {
    var params = req.body.params;

    if(params !== undefined && params !== null && params !== "undefined"){
        var u = "";
        for(var i=0;i<10;i++){
            u += "&id="+params.ids[i];
        }
        console.log("u",u);
        request.get({
            url:"https://trends.google.com/trends/api/stories/summary?hl=en-US&tz=-330"+u
        },function(err,response,body){
           res.send(body);
        });
    }else{

    }
});


app.post('/getTrendingStoryByIdv2',function (req,res) {
   var params = req.body.params;
   if(params !== undefined && params !== null && params !== "undefined"){
       var id = params.story_id;
       request.get({
           url:"https://trends.google.com/trends/api/stories/"+id+"?hl=en-US&tz=-330&sw=10"
       },function(err,response,body){
           res.send(body);
       });
   }else{}
});

app.post("/getRelatedQueries",function (req,res) {
    var params = req.body.params;
    if(params !== undefined && params !== null && params !== "undefined"){
        var token = params.token;
        request.get({
            url:"https://trends.google.com/trends/embed/IN_lnk_d8Ih3QAwAABWrM_ml/RELATED_QUERIES"
        },function(err,response,body){
            res.send(body);
        });
    }else{}
});

app.post('/getGoogleHotSearches',function (req,res) {
    request.get({
        url:"https://trends.google.com/trends/hottrends/visualize/internal/data"
    },function(err,response,body){
        res.send(body);
    });
});

app.post('/getArticlesFromWeb',function(req,res){
    /**
     * Read GetNewsFromWeb
     * identify the id(news organization) and read the configuration
     *
     */

    var obj;
    fs.readFile('./GetNewsFromWeb.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        res.send(obj);
    });



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