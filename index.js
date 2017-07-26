var express  = require('express');
var app = express();
const googleTrends = require('google-trends-api');

var request = require('request');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var configs = require('./configs');


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
            // var model = {
            //     googleTrending:body,
            //     date:body.date,
            //     category:params.code
            // };

            console.log(body);
            res.send(body);
            // return;
            // new GoogleTrendingStories(model).save(function (err) {
            //    if(err) throw err;
            //
            //    res.send({
            //        message:"Successfully Saved"
            //    })
            // });
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