'use strict';

var mongoose = require('mongoose');

var nonTrendingStories = new mongoose.Schema({
    googleTrends:{type:Object},
    category:{type:String},
    date:{type:String},
    time:{type:Number, default:new Date().getTime()},
},{
    timestamps:true,
    toObject: { getters: true }
});


module.exports = nonTrendingStories;