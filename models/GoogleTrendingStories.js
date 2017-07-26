'use strict';

var mongoose = require('mongoose');

var googleTrendings = new mongoose.Schema({
    googleTrends:{type:Object},
    category:{type:String},
    date:{type:String},
    time:{type:Number, default:new Date().getTime()},
},{
    timestamps:true,
    toObject: { getters: true }
});


module.exports = googleTrendings;