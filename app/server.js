
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

// ----------------Indy Configuration---------------------------------
const indy = require('indy-sdk');
const util = require('./util');
const assert = require('assert');

// // -----------------Indy Configuration-------------------------------

// // -----------------Onboarding Actor---------------------------------
let stewardWallet;
let poolHandle;
run();

async function run() {
let poolName = 'pool1';
await indy.setProtocolVersion(2)
poolHandle = await indy.openPoolLedger(poolName);
let stewardWalletConfig = {'id': 'stewardWalletName'}
let stewardWalletCredentials = {'key': 'steward_key'}
stewardWallet = await indy.openWallet(stewardWalletConfig, stewardWalletCredentials);
}


app.post('/api/onboarding', function(req,res){
    console.log(req.body);
    start();
    async function start() {
    console.log("==============================");
    console.log("== Getting Trust Anchor credentials -Onboarding  ==");
    console.log("------------------------------");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        
        // var query = { _id: req.params._id };
        let stewardDid;
  dbo.collection("DID").findOne({owner:"Steward"},function(err, result) {
    if (err) throw err;
    console.log("data from DB about steward is", result);
    stewardDid=result.did;
    console.log("stewardDid from DB is=================", stewardDid);
   this.onboardingTA(req.body.entityName,poolHandle,stewardWallet,stewardDid,res)
    db.close();
  })
})
    
    }
})

onboardingTA=(entityName,poolHandle,stewardWallet,stewardDid,res)=>{
    onboardingAsync();
    async function onboardingAsync(){
let governmentWalletConfig = {'id': entityName+"Wallet"}
    let governmentWalletCredentials = {'key': entityName+"_key"}
    let [governmentWallet, stewardGovernmentKey, governmentStewardDid, governmentStewardKey] = await onboarding(poolHandle, "Sovrin Steward", stewardWallet, stewardDid, entityName, null, governmentWalletConfig, governmentWalletCredentials);

    console.log("==============================");
    console.log("== Getting Trust Anchor credentials - Government getting Verinym  ==");
    console.log("------------------------------");

    let governmentDid = await getVerinym(poolHandle, "Sovrin Steward", stewardWallet, stewardDid,
        stewardGovernmentKey, entityName, governmentWallet, governmentStewardDid,
        governmentStewardKey, 'TRUST_ANCHOR');

        await indy.closeWallet(governmentWallet);
    let obj={
        _id:Date.now(),
        did:governmentDid,
        key:"Remove Later",
        owner:entityName,
        relationship:entityName+"DID"
    }

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        dbo.collection("DID").insertOne(obj, function(err, result) {
          if (err) throw err;
        //   console.log(result);
          console.log("DID document inserted for "+ entityName);
          this.onboardingUserUpdate(entityName,"Onboarded");
          res.send({response:'Success'})
        //   this.onboarding(req.body,response);
        });

      });
    }
}

onboardingUserUpdate=(name,status)=>{
    console.log('------------request received----------------')
 

      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        var myquery = { name: name };
        var newvalues = { $set: {onboardingStatus: status } };
        dbo.collection("onboarding").updateOne(myquery, newvalues, function(err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });

    });
}
// // ------------------OA End------------------------------------------

// --------Creat Schema-------------------------------------------------

app.post('/api/creatSchema', function(req,res){
    console.log('--------------create schema is called----------');
    console.log(req.body);
    console.log("==============================");
    console.log("=== Credential Schemas Setup ==");
    console.log("------------------------------");

    console.log("\"Government\" -> Create \"Job-Certificate\" Schema");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        var query = { owner: req.body.name};
        dbo.collection("DID").find(query).toArray(function(err, result) {
    if (err) throw err;
    // console.log(result);
    this.creatSchema(req.body,result[result.length-1].did,res);
    db.close();
  })


})
    // let [jobCertificateSchemaId, jobCertificateSchema] = await indy.issuerCreateSchema(governmentDid, 'Job-Certificate', '0.2',
    //     ['first_name', 'last_name', 'salary', 'employee_status',
    //         'experience']);

    // console.log("\"Government\" -> Send \"Job-Certificate\" Schema to Ledger");
    // await sendSchema(poolHandle, governmentWallet, governmentDid, jobCertificateSchema);

})

creatSchema=(obj,did,res)=>{
    console.log('obj is', obj);
    console.log('did is', did);
    schema();
    async function schema(){
let [jobCertificateSchemaId, jobCertificateSchema] = await indy.issuerCreateSchema(
    did, obj.schemaName, obj.version,obj.schemaAttrName);

    let governmentWalletConfig = {'id': obj.name+"Wallet"}
    let governmentWalletCredentials = {'key': obj.name+"_key"}
governmentWallet = await indy.openWallet(governmentWalletConfig, governmentWalletCredentials);

    console.log("\"Government\" -> Send \"Job-Certificate\" Schema to Ledger");
    await sendSchema(poolHandle, governmentWallet, did, jobCertificateSchema);
    await indy.closeWallet(governmentWallet);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        let schemaObj={
            _id:Date.now(),
            schemaId:jobCertificateSchemaId,
            schemaName:obj.schemaName,
            name:obj.name
        };
        console.log('schema obj is', schemaObj);
        dbo.collection("schema").insertOne(schemaObj, function(err, result) {
          if (err) throw err;
          console.log("1 document inserted");
          res.send("success");
        });

      });
    }
}
// ---------------------CS End------------------------------------------

// ------------------------Creat Schema Credential----------------------
app.post('/api/createSchemaCred', function(req,res){
    console.log('api registration');
    // console.log(req.body);
    // createSchemaCred();
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        var query = { owner: req.body.name};
        dbo.collection("DID").find(query).toArray(function(err, result) {
    if (err) throw err;
    // console.log(result);
    this.createSchemaCred(req.body,result[result.length-1].did,res);
    db.close();
  })


})
   

})

createSchemaCred=(obj,did,res)=>{
    createCred();
    async function createCred(){
        console.log("==============================");
        console.log(obj.name+ " ===Credential Definition Setup ==");
    
        console.log(obj.name+" -> Get \"Transcript\" Schema from Ledger");
        [, schema] = await getSchema(poolHandle, did, obj.schemaId);
    
        console.log("\"Faber\" -> Create and store in Wallet \"Faber Transcript\" Credential Definition");
        let WalletConfig = {'id': obj.name+"Wallet"}
    let WalletCredentials = {'key': obj.name+"_key"}
Wallet = await indy.openWallet(WalletConfig, WalletCredentials);

        let [CredDefId, CredDefJson] = await indy.issuerCreateAndStoreCredentialDef(Wallet, did, schema, 'TAG1', 'CL', '{"support_revocation": false}');
        console.log("CredDefId", CredDefId);
        console.log("CredDefJson", CredDefJson);
    
        console.log(obj.name+" -> Send  \"Faber Transcript\" Credential Definition to Ledger");
        await sendCredDef(poolHandle, Wallet, did,CredDefJson);
        await indy.closeWallet(Wallet);
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("sovrinDB");
            let schemaObj={
                _id:Date.now(),
                CredDefId:CredDefId,
                name:obj.name,
                schemaId:obj.schemaId
            };
            console.log('schema cred obj is', schemaObj);
            dbo.collection("credential").insertOne(schemaObj, function(err, result) {
              if (err) throw err;
              console.log("schema cred document inserted");
              res.send("success");
            });
    
          });
       }
}


// -----------------------CSC End---------------------------------------

// -----------------------Create Service -------------------------------

app.post('/api/creatService', function(req,response){
    console.log('api transcript');
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        
        // var query = { _id: req.params._id };
  dbo.collection("credential").findOne({schemaId: req.body.schemaId},function(err, result) {
    if (err) throw err;
    console.log('result', result);
    // res.send({data:result})
    this.createService(req.body,result.CredDefId, response);
    db.close();
  })
});
    // MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("sovrinDB");
    //     dbo.collection("createService").insertOne(req.body, function(err, res) {
    //       if (err) throw err;
    //       console.log("1 document inserted");
    //       response.send("success");
    //     });
    //   });

})

createService=(obj,CredDefId, response)=>{
    obj.CredDefId=CredDefId;
    console.log('final list of data is', obj)
MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        dbo.collection("createService").insertOne(obj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          response.send("success");
        });
      });
}

// ----------------------- CS ------------------------------------------

// -----------------------Get Service -------------------------------

app.get('/api/getServices/', function(req,res){
    console.log('getService api');
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");        
        var query = {serviceStatus: "Active"};
  dbo.collection("createService").find(query).toArray(function(err, result) {
    if (err) throw err;
    // console.log(result);
    res.send({data:result})
    db.close();
  })


})

})
// ----------------------- CS ------------------------------------------

// ---------------------Get service for owner --------------------------

app.get('/api/getServicesForOwner/:owner', function(req,res){
    console.log('getService api');
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");        
        var query = {serviceStatus: "Active" , owner:req.params.owner};
  dbo.collection("createService").find(query).toArray(function(err, result) {
    if (err) throw err;
    // console.log(result);
    res.send({data:result})
    db.close();
  })


})

})

// ---------------------- Get service for owner End ---------------------------

//  -----------------------Update Service -------------------------------

app.patch('/api/updateServices/', function(req,res){
    console.log('updateServices api');
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");        
        var query = {_id: req.body._id};
  var newvalues = { $set: {list: req.body.list } };
  dbo.collection("createService").updateOne(query,newvalues,function(err, result) {
    if (err) throw err;
    // console.log('result for update');
    // console.log(result);
    res.send("success")
    db.close();
  })


    })

})



// ----------------------- CS ------------------------------------------

// -----------****************************************************Create Certificate to User***************************--------------------------------------------

app.post('/api/birthCertificate', function(req,response){
    console.log('api birthCertificate');
    // console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        var query = { owner: req.body.issuer};
        dbo.collection("DID").find(query).toArray(function(err, result) {
    if (err) throw err;
   
    birthCertificate(result[result.length-1].did);
    // This code was written to verify schema
    // TAbbFxAje8szAH2tCLs2FA
    // run();
    // async function run(){
    // [, schema] = await getSchema(poolHandle, result[result.length-1].did, "TAbbFxAje8szAH2tCLs2FA:2:BirthCertificate:0.1");
    // console.log('schema for Birthcertificate', schema)
    // }
    // Code end to verfiy Schema
    db.close();
  })


})
    
    async function birthCertificate(did){
    let WalletConfig = {'id': req.body.certificateData.name+"Wallet"}
    let WalletCredentials = {'key': req.body.certificateData.name+"_key"}
    //-----------this piece of code is written to make it dynamic, task is to make wallet status null when wallet for user does not exist and pass wallet name when it exist.
    //  await indy.deleteWallet(WalletConfig, WalletCredentials);
    //  console.log('wallet deleted');
    let Wallet;
    let flag=true;
    try{
        Wallet = await indy.openWallet(WalletConfig, WalletCredentials);
        await indy.closeWallet(Wallet);
    } catch(error){
        flag=false;
        // console.log('inside catch block for birthCertificate---------------------------------')
        console.error(error)
    }
    
    let walletStatus;
if(!flag){
    console.log('create new wallet');
    walletStatus=null;
}else{
    console.log("use existing wallet");
    walletStatus=req.body.certificateData.name+"Wallet"
}
this.createBirthCertificate(req.body,did,walletStatus,WalletConfig,WalletCredentials,response);


    }
})

createBirthCertificate=(obj,did,walletStatus,WalletConfig,WalletCredentials,response)=>{
genrateBC();
async function genrateBC(){
    // console.log('inside genrateBC ---------------------------')
    let TAWalletConfig = {'id': obj.issuer+"Wallet"}
    let TAWalletCredentials = {'key': obj.issuer+"_key"}
let Wallet = await indy.openWallet(TAWalletConfig, TAWalletCredentials);
    // console.log('Faber wallet is', Wallet)
    let [aliceWallet, faberAliceKey, aliceFaberDid, aliceFaberKey, faberAliceConnectionResponse] = await onboarding(poolHandle, obj.issuer, Wallet, did, obj.certificateData.name, walletStatus, WalletConfig, WalletCredentials);
    // console.log("aliceWallet",aliceWallet);
    // console.log("faberAliceKey",faberAliceKey);
    // console.log("aliceFaberDid",aliceFaberDid);
    // console.log("aliceFaberKey",aliceFaberKey);
    // console.log("faberAliceConnectionResponse",faberAliceConnectionResponse);

    console.log("==============================");
    console.log("== Getting BirthCertificate Credential ==");
    console.log("------------------------------");


    console.log(obj.issuer+"-> Create \"BirthCertificate\" Credential Offer for "+obj.certificateData.name);
    let transcriptCredOfferJson = await indy.issuerCreateCredentialOffer(Wallet, obj.CredDefId);

    console.log(obj.issuer+" -> Get key for "+obj.certificateData.name+" did");
    let aliceFaberVerkey = await indy.keyForDid(poolHandle, Wallet, faberAliceConnectionResponse['did']);

    console.log(obj.issuer+" -> Authcrypt \"BirthCertificate\" Credential Offer for "+obj.certificateData.name);
    let authcryptedTranscriptCredOffer = await indy.cryptoAuthCrypt(Wallet, faberAliceKey, aliceFaberVerkey, Buffer.from(JSON.stringify(transcriptCredOfferJson),'utf8'));

    console.log(obj.issuer+" -> Send authcrypted \"BirthCertificate\" Credential Offer to "+ obj.certificateData.name);

    console.log(obj.certificateData.name+" -> Authdecrypted \"Transcript\" Credential Offer from "+obj.issuer);
    let [faberAliceVerkey, authdecryptedTranscriptCredOfferJson, authdecryptedTranscriptCredOffer] = await authDecrypt(aliceWallet, aliceFaberKey, authcryptedTranscriptCredOffer);

    console.log(obj.certificateData.name+" -> Create and store Master Secret in Wallet");
    let aliceMasterSecretId = await indy.proverCreateMasterSecret(aliceWallet, null);

    console.log(obj.certificateData.name+" -> Get "+obj.issuer+" BirthCerticate Credential Definition from Ledger");
    let faberTranscriptCredDef;
    [faberTranscriptCredDefId, faberTranscriptCredDef] = await getCredDef(poolHandle, aliceFaberDid, authdecryptedTranscriptCredOffer['cred_def_id']);

    console.log(obj.certificateData.name+" -> Create \"Birth Certificate\" Credential Request for "+ obj.issuer);
    let [transcriptCredRequestJson, transcriptCredRequestMetadataJson] = await indy.proverCreateCredentialReq(aliceWallet, aliceFaberDid, authdecryptedTranscriptCredOfferJson, faberTranscriptCredDef, aliceMasterSecretId);

    console.log(obj.certificateData.name+" -> Authcrypt \"BirthCertificate\" Credential Request for "+obj.issuer);
    let authcryptedTranscriptCredRequest = await indy.cryptoAuthCrypt(aliceWallet, aliceFaberKey, faberAliceVerkey, Buffer.from(JSON.stringify(transcriptCredRequestJson),'utf8'));

    console.log(obj.certificateData.name+" -> Send authcrypted \"BirthCertificate\" Credential Request to "+ obj.issuer);

    console.log(obj.issuer+" -> Authdecrypt \"BirthCertificate\" Credential Request from "+ obj.certificateData.name);
    let authdecryptedTranscriptCredRequestJson;
    [aliceFaberVerkey, authdecryptedTranscriptCredRequestJson] = await authDecrypt(Wallet, faberAliceKey, authcryptedTranscriptCredRequest);

    console.log(obj.issuer+" -> Create \"BirthCertificate\" Credential for "+ obj.certificateData.name);
    // note that encoding is not standardized by Indy except that 32-bit integers are encoded as themselves. IS-786
    let transcriptCredValues = {
        "name": {"raw": obj.certificateData.name, "encoded": "1139481716457488690172217916278103335"},
        "fatherName": {"raw": obj.certificateData.fatherName, "encoded": "5321642780241790123587902456789123452"},
        "motherName": {"raw": obj.certificateData.motherName, "encoded": "2213454313412354"},
        "gender": {"raw": obj.certificateData.gender, "encoded": "12434523576212321"},  
        "dateOfBirth":{"raw": obj.certificateData.dateOfBirth, "encoded": "124345235762123213"},  
        "placeOfBirth":{"raw": obj.certificateData.placeOfBirth, "encoded": "124345235762123214"}, 
        "timeOfBirth":{"raw": obj.certificateData.timeOfBirth, "encoded": "124345235762123215"}, 
        "address":{"raw": obj.certificateData.address, "encoded": "1243452357621232154366"}
    };

    let [transcriptCredJson] = await indy.issuerCreateCredential(Wallet, transcriptCredOfferJson, authdecryptedTranscriptCredRequestJson, transcriptCredValues, null, -1);

    console.log(obj.issuer+" -> Authcrypt \"BirthCertificate\" Credential for "+ obj.certificateData.name);
    let authcryptedTranscriptCredJson = await indy.cryptoAuthCrypt(Wallet, faberAliceKey, aliceFaberVerkey, Buffer.from(JSON.stringify(transcriptCredJson),'utf8'));

    console.log(obj.issuer+" -> Send authcrypted \"BirthCertificate\" Credential to "+ obj.certificateData.name);

    console.log(obj.certificateData.name+" -> Authdecrypted \"BirthCertificate\" Credential from "+ obj.issuer);
    let [, authdecryptedTranscriptCredJson] = await authDecrypt(aliceWallet, aliceFaberKey, authcryptedTranscriptCredJson);

    console.log(obj.certificateData.name+" -> Store \"Transcript\" Credential from "+ obj.issuer);
    await indy.proverStoreCredential(aliceWallet, null, transcriptCredRequestMetadataJson,
        authdecryptedTranscriptCredJson, faberTranscriptCredDef, null);

await indy.closeWallet(Wallet);

var monthName=["Jan", "Feb","March","April","May","Jun","July","Aug","Sept","Oct","Nov","Dec"];
var date=new Date();
var latestDate=date.getDate()+"-"+monthName[date.getMonth()]+"-"+date.getFullYear()+" "+ date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
let certificateObj={
    _id:Date.now(),
    certificateName:"BirthCertificate",
    issuedBy:obj.issuer,
    issuedTo:obj.certificateData.name,
    issuedToDID:aliceFaberDid,
    issuedByDID:did,
    time:latestDate
}
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("sovrinDB");
    dbo.collection("certificate").insertOne(certificateObj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      response.send("success");
    });
  });
console.log('list reached to server is', obj.list);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("sovrinDB");        
    var query = {_id: parseInt(obj.serviceId)};
var newvalues = { $set: {list: obj.list } };
dbo.collection("createService").updateOne(query,newvalues,function(err, result) {
if (err) throw err;
console.log('result for createService has been updated');
// console.log(result);
// res.send("success")
db.close();
})


})


}



}

// -----------****************************************************Create Certificate to User End****************************--------------------------------------------

// -------------------------Get certificate by Owner---------------------------------------

app.get('/api/getCertificateByUser/:name', function(req,res){
    console.log('api request for getCertificateByUser');
    console.log('_id receivvedd is', req.params.name);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        
        // var query = { _id: req.params._id };
//   dbo.collection("certificate").findOne({issuedTo:req.params.name},function(err, result) {
    dbo.collection("certificate").find({issuedTo:req.params.name}).toArray(function(err, result) {
    if (err) throw err;
    // console.log(result);
    res.send({data:result})
    db.close();
  })
})

});

// -------------------------Get certificate by Owner End---------------------------------------

app.post('/api/registration', function(req,response){
    console.log('api registration');
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        dbo.collection("registration").insertOne(req.body, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          this.onboardingUser(req.body._id,req.body.name,"Pending");
          response.send("success");
        });

      });

    //   let obj= {
    //       _id:req.body._id,
    //       name:req.body.name,
    //       certificateName:"",
    //       issuer:"",
    //       did:"",
    //       enrollStatus:false,
    //       timeStamp:""
    //   }

    //   MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("sovrinDB");
    //     dbo.collection("certificate").insertOne(obj, function(err, res) {
    //       if (err) throw err;
    //       console.log("1 document inserted");
    //       response.send("success");
    //     });

    //   });

})

onboardingUser=(_id,name,status,)=>{
    console.log('------------request received----------------')
    var onboardingObj={
        _id:_id,
        name:name,
        onboardingStatus:status
    }
    MongoClient.connect(url, function(err, db) {

        if (err) throw err;
        var dbo = db.db("sovrinDB");
        dbo.collection("onboarding").insertOne(onboardingObj, function(err, res) {
          if (err) throw err;
          console.log("Onboaridng Status done");
        //   response.send("success");
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
    // console.log(result);
    res.send({data:result})
    db.close();
  })


})

});

// ---------------------------------Schema Get Requst-----------------------

app.get('/api/schemaStatus', function(req,res){
    console.log('name receivvedd is', req.params.name);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        
        // var query = {name: req.params.name};
  dbo.collection("schema").find({}).toArray(function(err, result) {
    if (err) throw err;
    // console.log(result);
    res.send({data:result})
    db.close();
  })


})

});

// -------------Schema Cred Request-----------------------------------

app.get('/api/schemaCred/:name', function(req,res){
    console.log('name receivvedd is', req.params.name);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        // var myobj = { name: "Company Inc", address: "Highway 37" };
        
        var query = {name: req.params.name};
  dbo.collection("credential").find(query).toArray(function(err, result) {
    if (err) throw err;
    // console.log(result);
    res.send({data:result})
    db.close();
  })


})

});

// -------------------DID get request--------------------------

app.get('/api/did/:name', function(req,res){
    console.log('name receivvedd is', req.params.name);
    // console.log('did api')
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        var query = { owner: req.params.name};
        dbo.collection("DID").find(query).toArray(function(err, result) {
    if (err) throw err;
    // console.log(result);
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


// ---------------Function Definition indy-------------------------------

async function onboarding(poolHandle, From, fromWallet, fromDid, to, toWallet, toWalletConfig, toWalletCredentials) {
    console.log('data reached tp onboarding------');
    console.log(poolHandle,From, fromWallet, fromDid, to, toWallet, toWalletConfig, toWalletCredentials)
    console.log(`\"${From}\" > Create and store in Wallet \"${From} ${to}\" DID`);
    let [fromToDid, fromToKey] = await indy.createAndStoreMyDid(fromWallet, {});

    console.log(`\"${From}\" > Send Nym to Ledger for \"${From} ${to}\" DID`);
    await sendNym(poolHandle, fromWallet, fromDid, fromToDid, fromToKey, null);

    console.log(`\"${From}\" > Send connection request to ${to} with \"${From} ${to}\" DID and nonce`);
    let connectionRequest = {
        did: fromToDid,
        nonce: 123456789
    };

    if (!toWallet) {
        console.log(`\"${to}\" > Create wallet"`);
        try {
            await indy.createWallet(toWalletConfig, toWalletCredentials)
        } catch(e) {
            if(e.message !== "WalletAlreadyExistsError") {
                throw e;
            }
        }
        toWallet = await indy.openWallet(toWalletConfig, toWalletCredentials);
    }

    console.log(`\"${to}\" > Create and store in Wallet \"${to} ${From}\" DID`);
    let [toFromDid, toFromKey] = await indy.createAndStoreMyDid(toWallet, {});

    console.log(`\"${to}\" > Get key for did from \"${From}\" connection request`);
    let fromToVerkey = await indy.keyForDid(poolHandle, toWallet, connectionRequest.did);

    console.log(`\"${to}\" > Anoncrypt connection response for \"${From}\" with \"${to} ${From}\" DID, verkey and nonce`);
    let connectionResponse = JSON.stringify({
        'did': toFromDid,
        'verkey': toFromKey,
        'nonce': connectionRequest['nonce']
    });
    let anoncryptedConnectionResponse = await indy.cryptoAnonCrypt(fromToVerkey, Buffer.from(connectionResponse, 'utf8'));

    console.log(`\"${to}\" > Send anoncrypted connection response to \"${From}\"`);

    console.log(`\"${From}\" > Anondecrypt connection response from \"${to}\"`);
    let decryptedConnectionResponse = JSON.parse(Buffer.from(await indy.cryptoAnonDecrypt(fromWallet, fromToKey, anoncryptedConnectionResponse)));

    console.log(`\"${From}\" > Authenticates \"${to}\" by comparision of Nonce`);
    if (connectionRequest['nonce'] !== decryptedConnectionResponse['nonce']) {
        throw Error("nonces don't match!");
    }

    console.log(`\"${From}\" > Send Nym to Ledger for \"${to} ${From}\" DID`);
    await sendNym(poolHandle, fromWallet, fromDid, decryptedConnectionResponse['did'], decryptedConnectionResponse['verkey'], null);

    return [toWallet, fromToKey, toFromDid, toFromKey, decryptedConnectionResponse];
}

async function getVerinym(poolHandle, From, fromWallet, fromDid, fromToKey, to, toWallet, toFromDid, toFromKey, role) {
    console.log(`\"${to}\" > Create and store in Wallet \"${to}\" new DID"`);
    let [toDid, toKey] = await indy.createAndStoreMyDid(toWallet, {});

    console.log(`\"${to}\" > Authcrypt \"${to} DID info\" for \"${From}\"`);
    let didInfoJson = JSON.stringify({
        'did': toDid,
        'verkey': toKey
    });
    let authcryptedDidInfo = await indy.cryptoAuthCrypt(toWallet, toFromKey, fromToKey, Buffer.from(didInfoJson, 'utf8'));

    console.log(`\"${to}\" > Send authcrypted \"${to} DID info\" to ${From}`);

    console.log(`\"${From}\" > Authdecrypted \"${to} DID info\" from ${to}`);
    let [senderVerkey, authdecryptedDidInfo] =
        await indy.cryptoAuthDecrypt(fromWallet, fromToKey, Buffer.from(authcryptedDidInfo));

    let authdecryptedDidInfoJson = JSON.parse(Buffer.from(authdecryptedDidInfo));
    console.log(`\"${From}\" > Authenticate ${to} by comparision of Verkeys`);
    let retrievedVerkey = await indy.keyForDid(poolHandle, fromWallet, toFromDid);
    if (senderVerkey !== retrievedVerkey) {
        throw Error("Verkey is not the same");
    }

    console.log(`\"${From}\" > Send Nym to Ledger for \"${to} DID\" with ${role} Role`);
    await sendNym(poolHandle, fromWallet, fromDid, authdecryptedDidInfoJson['did'], authdecryptedDidInfoJson['verkey'], role);

    return toDid
}

async function sendNym(poolHandle, walletHandle, Did, newDid, newKey, role) {
    let nymRequest = await indy.buildNymRequest(Did, newDid, newKey, null, role);
    await indy.signAndSubmitRequest(poolHandle, walletHandle, Did, nymRequest);
}

async function sendSchema(poolHandle, walletHandle, Did, schema) {
    // schema = JSON.stringify(schema); // FIXME: Check JSON parsing
    let schemaRequest = await indy.buildSchemaRequest(Did, schema);
    await indy.signAndSubmitRequest(poolHandle, walletHandle, Did, schemaRequest)
}

async function sendCredDef(poolHandle, walletHandle, did, credDef) {
    let credDefRequest = await indy.buildCredDefRequest(did, credDef);
    await indy.signAndSubmitRequest(poolHandle, walletHandle, did, credDefRequest);
}

async function getSchema(poolHandle, did, schemaId) {
    let getSchemaRequest = await indy.buildGetSchemaRequest(did, schemaId);
    let getSchemaResponse = await indy.submitRequest(poolHandle, getSchemaRequest);
    return await indy.parseGetSchemaResponse(getSchemaResponse);
}

async function getCredDef(poolHandle, did, schemaId) {
    let getCredDefRequest = await indy.buildGetCredDefRequest(did, schemaId);
    let getCredDefResponse = await indy.submitRequest(poolHandle, getCredDefRequest);
    return await indy.parseGetCredDefResponse(getCredDefResponse);
}

async function proverGetEntitiesFromLedger(poolHandle, did, identifiers, actor) {
    let schemas = {};
    let credDefs = {};
    let revStates = {};

    for(let referent of Object.keys(identifiers)) {
        let item = identifiers[referent];
        console.log(`\"${actor}\" -> Get Schema from Ledger`);
        let [receivedSchemaId, receivedSchema] = await getSchema(poolHandle, did, item['schema_id']);
        schemas[receivedSchemaId] = receivedSchema;

        console.log(`\"${actor}\" -> Get Claim Definition from Ledger`);
        let [receivedCredDefId, receivedCredDef] = await getCredDef(poolHandle, did, item['cred_def_id']);
        credDefs[receivedCredDefId] = receivedCredDef;

        if (item.rev_reg_seq_no) {
            // TODO Create Revocation States
        }
    }

    return [schemas, credDefs, revStates];
}


async function verifierGetEntitiesFromLedger(poolHandle, did, identifiers, actor) {
    let schemas = {};
    let credDefs = {};
    let revRegDefs = {};
    let revRegs = {};

    for(let referent of Object.keys(identifiers)) {
        let item = identifiers[referent];
        console.log(`"${actor}" -> Get Schema from Ledger`);
        let [receivedSchemaId, receivedSchema] = await getSchema(poolHandle, did, item['schema_id']);
        schemas[receivedSchemaId] = receivedSchema;

        console.log(`"${actor}" -> Get Claim Definition from Ledger`);
        let [receivedCredDefId, receivedCredDef] = await getCredDef(poolHandle, did, item['cred_def_id']);
        credDefs[receivedCredDefId] = receivedCredDef;

        if (item.rev_reg_seq_no) {
            // TODO Get Revocation Definitions and Revocation Registries
        }
    }

    return [schemas, credDefs, revRegDefs, revRegs];
}

async function authDecrypt(walletHandle, key, message) {
    let [fromVerkey, decryptedMessageJsonBuffer] = await indy.cryptoAuthDecrypt(walletHandle, key, message);
    let decryptedMessage = JSON.parse(decryptedMessageJsonBuffer);
    let decryptedMessageJson = JSON.stringify(decryptedMessage);
    return [fromVerkey, decryptedMessageJson, decryptedMessage];
}


