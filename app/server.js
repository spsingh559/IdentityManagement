var path = require('path');
var webpack = require('webpack');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var index = require('./webserver/routes/index');
var users = require('./webserver/routes/users');
var app = express();
var compiler = webpack(config);
var fs=require('fs');

var multipart = require('connect-multiparty');

var multipartMiddleware = multipart();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, './webclient/')));

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// -----------------------Registration-------------------------------

app.post('/api/registration', function(req,response){
    console.log('api registration');
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        dbo.collection("registration").insertOne(req.body, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          this.onboarding(req.body,response);
        });

      });

})

onboarding=(obj,response)=>{
    var onboardingObj={
        _id:obj._id,
        name:obj.name,
        onboardingStatus:"Pending"
    }
    MongoClient.connect(url, function(err, db) {

        if (err) throw err;
        var dbo = db.db("sovrinDB");
        dbo.collection("onboarding").insertOne(onboardingObj, function(err, res) {
          if (err) throw err;
          console.log("Onboaridng Status done");
          response.send("success");
          db.close();
        });
        
      });
}

// ----------------------------------Login----------------------------------

app.post('/api/login', function(req,response){
    console.log('api registration');
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        
        var query = { name: req.body.name };
  dbo.collection("registration").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result.length);
    if(result.length==0){
        response.send({
            response:"Fail"
        })
    }else{
    console.log(result[0]);
    if(result[0].pwd==req.body.pwd){
        console.log('inside if');
        response.send({
            response:"Succes",
            name:result[0].name,
            role:result[0].role,
            _id:result[0]._id
        });
    }else{
        console.log('pass not match')
        response.send({
            response:"Fail"
        })
    }
}
    
    db.close();
  });
      });

})

// ---------------------------Onboarding Get Request----------------

app.get('/api/onboardingStatus/:_id', function(req,res){
    console.log('_id receivvedd is', req.params._id);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        
        // var query = { _id: req.params._id };
  dbo.collection("onboarding").findOne({_id: parseInt(req.params._id)},function(err, result) {
    if (err) throw err;
    console.log(result);
    res.send({data:result})
    db.close();
  })


})

});

 

//Ruotes
// app.use('/', index);
// app.use('/api/v1/',require('./router'));


app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
}));

app.use(webpackHotMiddleware(compiler));



//Listening to port 8081
app.listen(8080, '0.0.0.0', function(err, result) {
    if (err) {
        console.error("Error ", err);
    }

    console.log("Server started at 8080");
});
