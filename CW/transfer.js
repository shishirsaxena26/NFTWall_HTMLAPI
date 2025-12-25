'use strict';
var port = process.env.PORT || 4088;
var express = require('express');
require('dotenv').config({ path: './configfolder/config..env' });
var app = express();
var Web3 = require('web3').default;
var cron = require('node-cron');
const axios = require('axios');


app.use(express.json());

app.use(function (req, res) {
    res.status(404).json({ error: 'Not found' });
});
app.get('/', (req, res) => {
    res.send('okay');
});


//---------------Mainnet

const URL = 'https://api.nftwall.io:2096/api/dacct-proc?procedureName=daccttransferowner';
const _blankAdd = "0x0000000000000000000000000000000000000000";
const provider = "https://chain.ozonescan.com";

const nestedPrimeOld = "0x9f33B44587A57758C1413dBaB6640F6abea5cEF4";
const nestedPrime = "0x61F2902cC280839F565e949d8ECb00ed077CA748";
const transferRequest = "0xE89a13401341D4c371F63Ee0DC36a497e42C4F7f";
const to = '0x4f9c4CAFD9412116E1A1b2C8A134913724eceB5a'; 


//'0x4C45eeB06688E382E8fC6B8D3967433A42d7aeD7'; 0x69c38A1Aceb0115702297311D4E6b6abA9BD7A4C
var nestedPrimeOldContractABI = [{"type":"function","name":"getNodesCount","inputs":[],"outputs":[{"name":"nodesCount","type":"uint256","internalType":"uint256"}],"stateMutability":"view"}, {"inputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","name":"UserToInst","outputs":[{"internalType":"address","name":"","type":"address"}]}];
var nestedPrimeContractABI = [{"type":"function","name":"getNodesCount","inputs":[],"outputs":[{"name":"nodesCount","type":"uint256","internalType":"uint256"}],"stateMutability":"view"}];
var instancePrimeContractABI = [{"type":"function","name":"_setOwner","inputs":[{"name":"own","type":"address","internalType":"address"},{"name":"isApproved","type":"bool","internalType":"bool"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"_setReq","inputs":[{"name":"own","type":"address","internalType":"address"}],"outputs":[],"stateMutability":"nonpayable"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address","internalType":"address"}],"stateMutability":"view"}];

var transferRequestContractABI = [{"type":"function","name":"importPrimeuser","inputs":[{"name":"limit","type":"uint256","internalType":"uint256"}],"outputs":[],"stateMutability":"nonpayable"}];
var web3 = new Web3(provider);

async function Transfer(from) {
        
        const nestedPrimeOldContract = new web3.eth.Contract(nestedPrimeOldContractABI, nestedPrimeOld);
        const instance = await nestedPrimeOldContract.methods.UserToInst(from).call();
        if (instance!=_blankAdd) {
            const instanceContract = new web3.eth.Contract(instancePrimeContractABI, instance);
            const _owner = await instanceContract.methods.owner().call();
            console.log("Processing Node: "+from+" Current Owner: "+_owner+" Target Owner: "+to);
			if(_owner!=to)
			{
				const gasPrice = await web3.eth.getGasPrice();
                var signer1 = web3.eth.accounts.privateKeyToAccount(`${process.env.privateKeysigner2}`);
				const signedTxns1 = await web3.eth.accounts.signTransaction({
					from: signer1.address,
                    to: instance,
					value: '0',
                    gas: 6000000,
                    gasPrice,
					data: instanceContract.methods._setReq(to).encodeABI()
				}, signer1.privateKey);

				const receipt = await web3.eth.sendSignedTransaction(signedTxns1.rawTransaction);
				
                var signer2 = web3.eth.accounts.privateKeyToAccount(`${process.env.privateKeysigner2}`);
				const signedTxns2 = await web3.eth.accounts.signTransaction({
					from: signer2.address,
                    to: instance,
					value: '0',
                    gas: 6000000,
                    gasPrice,
					data: instanceContract.methods._setOwner(to,true).encodeABI()
				}, signer2.privateKey);

				const receipt2 = await web3.eth.sendSignedTransaction(signedTxns2.rawTransaction);
				const new_owner = await instanceContract.methods.owner().call();
                console.log("Current Node: "+from+" Old Owner: "+_owner+" New Owner: "+new_owner);
                if(to.toLowerCase() == new_owner.toLowerCase())
				{
                    await axios.get(URL+"&node="+from);
                    await importData();
                }
			}
            else
            {
                console.log("Node: "+from+" already owned by Target Owner: "+to);
                await axios.get(URL+"&node="+from);
            }
        }
   

}


async function importData() {

   const nestedPrimeOldContract = new web3.eth.Contract(nestedPrimeOldContractABI, nestedPrimeOld);
        const nestedPrimeContract = new web3.eth.Contract(nestedPrimeContractABI, nestedPrime);
        const countOld = await nestedPrimeOldContract.methods.getNodesCount().call();
        const count = await nestedPrimeContract.methods.getNodesCount().call();
        console.log('Old Count: '+countOld+' New Count: '+count);
        if(parseFloat(countOld)==parseFloat(count)) return;
        const transferReqContract = new web3.eth.Contract(transferRequestContractABI, transferRequest);
        var signer2 = web3.eth.accounts.privateKeyToAccount(`${process.env.privateKeysigner2}`);
				
        const gasPrice = await web3.eth.getGasPrice();
        const signedTxns3 = await web3.eth.accounts.signTransaction({
            from: signer2.address,
            to: transferRequest,
            value: '0',
            gas: 6000000,
            gasPrice,
            data: transferReqContract.methods.importPrimeuser(10).encodeABI()
        }, signer2.privateKey);
        
        const receipt3 = await web3.eth.sendSignedTransaction(signedTxns3.rawTransaction);

    

}
let isRunning = false;

cron.schedule("*/5 * * * * *", async function () {
   
    if (isRunning) {
        console.log("⏳ Previous task still running, skipping this cycle...");
        return;
    }
    isRunning = true;
    console.log("🚀 Running a task every 5 seconds");
    try {
        const res = await axios.get(URL);

        if (!res.data.success) return;

        if (res.data.data[0][0].node) 
            await Transfer(res.data.data[0][0].node);
 
    } catch (err) {
        console.error("⚠️ Error during cron task:", err.message);
      } finally {
        isRunning = false; // release lock
        console.log("✅ Task finished, lock released");
      }

}, {
        scheduled: true,
        timezone: "Asia/Kolkata"

    });


app.listen(port, () => {
    console.log(`app listening at ${port}`);
});

