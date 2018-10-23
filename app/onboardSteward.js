"use strict";
const indy = require('indy-sdk');
const util = require('./util');
const assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

run();

async function run() {
   
    console.log("Getting started -> started");

    let poolName = 'pool1';
    let poolGenesisTxnPath = await util.getPoolGenesisTxnPath(poolName);
    let poolConfig = {
        "genesis_txn": poolGenesisTxnPath
    };
    try {
        await indy.createPoolLedgerConfig(poolName, poolConfig);
    } catch(e) {
        if(e.message !== "PoolLedgerConfigAlreadyExistsError") {
            throw e;
        }
    }

    await indy.setProtocolVersion(2)

    let poolHandle = await indy.openPoolLedger(poolName);

    console.log("==============================");
    console.log("=== Getting Trust Anchor credentials for Faber, Acme, Thrift and Government  ==");
    console.log("------------------------------");

    console.log("\"Sovrin Steward\" -> Create wallet");
    let stewardWalletConfig = {'id': 'stewardWalletName'}
    let stewardWalletCredentials = {'key': 'steward_key'}
    try {
        await indy.createWallet(stewardWalletConfig, stewardWalletCredentials)
    } catch(e) {
        if(e.message !== "WalletAlreadyExistsError") {
            throw e;
        }
    }

    let stewardWallet = await indy.openWallet(stewardWalletConfig, stewardWalletCredentials);

    // await indy.closeWallet(stewardWallet);
    // await indy.deleteWallet(stewardWalletConfig, stewardWalletCredentials);
    console.log("\"Sovrin Steward\" -> Create and store in Wallet DID from seed");
    let stewardDidInfo = {
        'seed': '000000000000000000000000Steward1'
    };

    let [stewardDid, stewardKey] = await indy.createAndStoreMyDid(stewardWallet, stewardDidInfo);
    console.log('stewardDid', stewardDid);
    console.log(stewardKey);
    let obj={
        _id:Date.now(),
        did:stewardDid,
        key:stewardKey,
        owner:"Steward",
        relationship:"StewardKeyForTA"
    }

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sovrinDB");
        dbo.collection("DID").insertOne(obj, function(err, res) {
          if (err) throw err;
          console.log("DID document inserted for Steward");
        //   this.onboarding(req.body,response);
        });

      });
}