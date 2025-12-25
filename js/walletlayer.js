/* Define */
/* ---------------------------------------- */

/*var qs = (function (a) {
	if (a == "") return {};
	var b = {};
	for (var i = 0; i < a.length; ++i) {
		var p = a[i].split('=', 2);
		if (p.length == 1)
			b[p[0]] = "";
		else
			b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
	}
	return b;
})(window.location.search.substr(1).split('&'));
*/

window.web3 = new Web3(new Web3.providers.HttpProvider(provider));
const contract = new web3.eth.Contract(metaozoneABI, metaozoneContractAddress);
var profilecontract;

const gasPrice = web3.eth.getGasPrice(console.log);
//console.log(gasPrice);
/* Implementation */
/* ---------------------------------------- */

//var bal = web3.utils.hexToNumberString('0x00000000000000000000000000000000000000000000000000000000000c350');
//console.log(bal);

//var b2 = web3.utils.numberToHex('50000000000000000000000');
//console.log(b2);

//var account = web3.eth.accounts.create();
//console.log(account);

async function loadData(user) {

	var count = await contract.methods.getNodesCount().call();
		

	for (let i = 0; i < count; i++)
		await loadStructure(i);

	var toggler = $(".caret");
	
	for (i = 0; i < toggler.length; i++) {
		toggler[i].addEventListener("click", function () {
			this.parentElement.querySelector(".nested").classList.toggle("active");
			this.classList.toggle("caret-down");
		});
	}
			
}


async function loadStructure(i) {

	var n = await contract.methods.nodes(i).call();
	var node = await contract.methods.nodeStructs(n).call();
	var childCount = await contract.methods.getNodeChildCount(n).call();
	if (childCount == 0)
		$("#" + node.parent).append('<li> <a href="#" onclick="showProfile(\'' + node.instance + '\',\'' + n + '\')" >' + node.id + '</a></li>');
	else {
		$("#" + node.parent).append('<li><a href="#" onclick="showProfile(\'' + node.instance + '\',\'' + n + '\')" >' + node.id + '</a> <ul class="nested" id="' + n + '" > </ul> </li>');
	}
	$("#tab").append('<tr><td>' + node.instance + '</td> <td>' + n + '</td></tr>');
	//$("#root").append('<li class="list-group-item d-flex justify-content-between align-items-center"> '+ node.id+' <a href="#" onclick="showProfile(\'' + node.instance + '\',\'' + n + '\')" >' + n + '</a>  <span class="badge badge-primary badge-pill">' + childCount +'</span> </li>');
	
}

/*
  uint256 public _levelIncome = 0;
  uint256 public _rewardIncome = 0;
  uint256 public _royalityIncome = 0;
  uint256 public _levelMining = 0;
  uint256 public _selfMining = 0;
*/
function showProfile(profileContractAddress,useraddress) {

	$("#txtPrivatekey").val(''); 
	$("#txtStakeAmount").val(''); 
	$("#textbody").html('');
	$("#textbody").append(" -  - Profile -  -  -  -  -  -  -  -  -  -  - <br/>");
	$("#textbody").append("Wallet Address - " + useraddress + " <br/>");

	profilecontract = new web3.eth.Contract(metaozoneUserProfileABI, profileContractAddress)

	web3.eth.getBalance(useraddress, function (err, result) {
		if (err) {
			console.log(err)
		} else {
			
			$("#textbody").append("Balance - " + web3.utils.fromWei(result, "ether") + " OZONE <br/>");
			console.log(web3.utils.fromWei(result, "ether") + " ETH")
		}
	});

	contract.methods.nodeStructs(useraddress).call()
		.then(function (node) {
			$("#textbody").append("id - " + node.id + " <br/>");
			$("#textbody").append("Is Node - " + node.isNode + " <br/>");
			$("#textbody").append("Instance - " + node.instance + " <br/>");
			$("#textbody").append("Parent - " + node.parent + " <br/>");
			$("#textbody").append("MyBusiness - " + node.myBusiness + " <br/>");
			
			
		})
		.catch(function (err) {
			console.log(err)
		});


	contract.methods.stakeLimit().call()
		.then(function (limit) {
			$("#textbody").append("StakeLimit - " + web3.utils.fromWei(limit, "ether") + " OZONE <br/>")
		})
		.catch(function (err) {
			console.log(err)
		});

	profilecontract.methods._levelIncome().call()
		.then(function (income) {
			$("#textbody").append("levelIncome - " + web3.utils.fromWei(income, "ether") + " OZONE <br/>");
		})
		.catch(function (err) {
			console.log(err)
		});

	profilecontract.methods._rewardIncome().call()
		.then(function (income) {
			$("#textbody").append("rewardIncome - " + web3.utils.fromWei(income, "ether") + " OZONE <br/>");
		})
		.catch(function (err) {
			console.log(err)
		});

	profilecontract.methods._royalityIncome().call()
			.then(function (income) {
				$("#textbody").append("royalityIncome - " + web3.utils.fromWei(income, "ether") + " OZONE <br/>");
			})
			.catch(function (err) {
				console.log(err)
			});

	profilecontract.methods._selfMining().call()
		.then(function (income) {
			$("#textbody").append("selfMining - " + web3.utils.fromWei(income, "ether") + " OZONE <br/>");
		})
		.catch(function (err) {
			console.log(err)
		});

	profilecontract.methods._levelMining().call()
		.then(function (income) {
			$("#textbody").append("levelMining - " + web3.utils.fromWei(income, "ether") + " OZONE <br/>");
		})
		.catch(function (err) {
			console.log(err)
		});

	profilecontract.methods.getStakeCount().call()
		.then(function (count) {
			$("#textbody").append("count - " + count + " stakes <br/>");

			for (var i = 0; i < count; i++)
			{
				profilecontract.methods.stakes(i).call()
					.then(function (stake) {
						$("#textbody").append("Stake - " + JSON.stringify(stake) + " <br/>");
					})
					.catch(function (err) {
						console.log(err)
					});
			}
		})
		.catch(function (err) {
			console.log(err)
		});

	contract.methods.getNodeBusinessRankPlan(useraddress).call()
		.then(function (d) {
			$("#textbody").append("Star  - " + d[0] + " <br/>");
			$("#textbody").append("RewardBusiness  - " + d[1] + " <br/>");
		})
		.catch(function (err) {
			console.log(err)
		});

	contract.methods.getNodeChildCount(useraddress).call()
		.then(function (childCount) {
			$("#textbody").append("ChildCount  - " + childCount + " <br/>")
		})
		.catch(function (err) {
			console.log(err)
		});


	/*contract.getPastEvents("LogTxns",
		{
			fromBlock: 0,
			toBlock: 'latest',
			//topics: ["0x2969cb574c4503bed8b8fcbdf86f50b92788f7032a0a9469dc0e8156e2172d91", null, "0x000000000000000000000000" + req.params.address.substring(2)]
		},
		function (error, event) {
			//event.forEach(function (e) { stores.push({ "name": e.returnValues.name, "address": e.returnValues.store }); });
			//res.send(JSON.stringify(stores));
		})
		.then(function (events) {
			//res.send('response ' + JSON.stringify(stores));			// same results as the optional callback above
		});;
		*/

}

//showLogs();
function showLogs() {

	var contract = new web3.eth.Contract(metaozoneABI, metaozoneContractAddress)

	contract.getPastEvents("IncomeDistribution",
		{
			fromBlock: 0,
			toBlock: 'latest',
			//topics: ["0x2969cb574c4503bed8b8fcbdf86f50b92788f7032a0a9469dc0e8156e2172d91", null, "0x000000000000000000000000" + req.params.address.substring(2)]
		},
		function (error, event) {
			//event.forEach(function (e) { stores.push({ "name": e.returnValues.name, "address": e.returnValues.store }); });
			//res.send(JSON.stringify(stores));
		})
		.then(function (events) {
			//debugger;
			console.log(events);
			//res.send('response ' + JSON.stringify(stores));			// same results as the optional callback above
		});;
		

}




function Stake() {

	var account = web3.eth.accounts.privateKeyToAccount($("#txtPrivatekey").val());
	var d = web3.utils.toWei($("#txtStakeAmount").val());
	debugger;
	web3.eth.accounts.signTransaction({
		to: metaozoneContractAddress,
		value: web3.utils.toWei($("#txtStakeAmount").val()),
		gas: 84000,
		data: contract.methods.StakeOn().encodeABI()
	}, account.privateKey).then(signedTransaction => {

		web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
			.on('error', function (error) {
				console.log("Transaction error");
				console.log(error);
			})
			.on('transactionHash', function (hash) {

				console.log("Transaction Initiated");
				console.log(hash);
			})
			.on('receipt', function (receipt) {
				console.log("Transaction receipt");
				console.log(receipt);

			});

	}).catch(function (fallback) {
		console.log("Transaction fallbak");
		console.log(fallback);
	});
}

const groupBy = (array, key) => {
	// Return the end result
	return array.reduce((result, currentValue) => {
		// If an array already present for key, push it to the array. Else create an array and push the object
		(result[currentValue[key]] = result[currentValue[key]] || []).push(
			currentValue
		);
		// Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
		return result;
	}, {}); // empty object is the initial value for result object
};


var i = 1;
//var total = 0
//console.log('GasPrice');
//web3.eth.getGasPrice().then(console.log);
//let myVar2 = setInterval(loadData99, 18000);

//console.log(" WalletNameData.length >> " + WalletNameData.length);
//let myVar2 = setTimeout(runRoyality, 15000);

//loadData('0xA5aFDe9119e9BA8207027d67f320c1e65d35C8c8');
//loadData99();
async function loadData99() {
	if (i < WalletNameData.length) {
		await RegisterPlusStakeNew(WalletNameData[i].LoginID.toString(), WalletNameData[i].Sponsor, WalletNameData[i].walletid, 0);
		var status = 1;
	}
}

async function runRoyality() {

	//total = await contract.methods.getNodesCount().call();
	//i = count;

	let myVar1 = setInterval(distributeRoyalityAndMining, 20000);
}

async function stake99() {


	if (i < walletData.length)
	{
		StakeOn(walletData[i].amt, walletData[i].user);
		i++;
	}
}

 function  Register(name, parent, user) {

	 const contract = new web3.eth.Contract(metaozoneABI, metaozoneContractAddress);
	 var account = web3.eth.accounts.privateKeyToAccount(privateKey);


	web3.eth.accounts.signTransaction({
		to: metaozoneContractAddress,
		value: 0,
		gas: 6849546,
		data: contract.methods.RegisterByAdmin(name, parent, user).encodeABI()
	}, account.privateKey).then(signedTransaction => {

		
		web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
			.on('error', function (error) {
				//console.log("Transaction error");
				console.log(error);
			})
			.on('transactionHash', function (hash) {
				//console.log("Transaction Initiated");
				//console.log(hash);
			})
			.on('receipt', function (receipt) {
				console.log("Transaction receipt");
				console.log(receipt);
				
			});
		  
	}).catch(function (fallback) {
		console.log("Transaction fallbak");
		console.log(fallback);
	});

	
}


async function RegisterNew(name, parent, user) {

	const contract = new web3.eth.Contract(metaozoneABI, metaozoneContractAddress);
	var account = web3.eth.accounts.privateKeyToAccount(privateKey);


	const signedTxns = await web3.eth.accounts.signTransaction({
		to: metaozoneContractAddress,
		value: 0,
		gas: 6849546,
		data: contract.methods.RegisterByAdmin(name, parent, user).encodeABI()
	}, account.privateKey);

	const receipt = await web3.eth.sendSignedTransaction(signedTxns.rawTransaction);

	if (receipt.blockNumber > 0)
		i++;

}


function StakeOn(Amount, user) {

	//debugger;
	const contract = new web3.eth.Contract(metaozoneABI, metaozoneContractAddress);
	var account = web3.eth.accounts.privateKeyToAccount(privateKey);


	web3.eth.accounts.signTransaction({
		to: metaozoneContractAddress,
		value: Amount * Math.pow(10, 18),
		gas: 6849546,
		data: contract.methods.StakeOn(user).encodeABI()
	}, account.privateKey).then(signedTransaction => {


		web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
			.on('error', function (error) {
				//console.log("Transaction error");
				console.log(error);
			})
			.on('transactionHash', function (hash) {
				//console.log("Transaction Initiated");
				//console.log(hash);
			})
			.on('receipt', function (receipt) {
				console.log("Transaction receipt");
				console.log(receipt);

			});

	}).catch(function (fallback) {
		console.log("Transaction fallbak");
		console.log(fallback);
	});


}

async function StakeOnNew(Amount, user) {

	const contract = new web3.eth.Contract(metaozoneABI, metaozoneContractAddress);
	var account = web3.eth.accounts.privateKeyToAccount(privateKey);


	

}

async function RegisterPlusStakeNew(name, parent, user, amt) {

	const contract = new web3.eth.Contract(metaozoneABI, metaozoneContractAddress);
	var account = web3.eth.accounts.privateKeyToAccount(privateKey);
	//amt = 0.000000000000000001;
	//if (!amt || amt == 0) amt = 1;
	//if (amt >= 1000) amt = amt/10;
	//if (amt >= 10000) amt = amt / 100;
	//web3.utils.toWei('1', 'ether')
	//value: amt * Math.pow(10, 18),
	//web3.utils.toWei(amt.toString(), 'ether').toString(),
	const signedTxns = await web3.eth.accounts.signTransaction({
		to: metaozoneContractAddress,
		value: 1,
		gas: 6849546,
		data: contract.methods.RegisterByAdmin(name, parent, user, 0).encodeABI()
	}, account.privateKey);

	const receipt = await web3.eth.sendSignedTransaction(signedTxns.rawTransaction);

	var t = 0;
	while (t < 800) { t++; }

	if (receipt.blockNumber > 0) {
		console.log("i >> " + i);
		document.writeln("i >> " + i + "<br/>");
		i = i + 1;
	} ;

}


async function RoyaliityMining() {

	

	/*if (i >= 1)
		data.push(await contract.methods.nodes(i - 1).call());

	if (i >= 2)
		data.push(await contract.methods.nodes(i - 2).call());

	if (i >= 3)
		data.push(await contract.methods.nodes(i - 3).call());

	if (i >= 4)
		data.push(await contract.methods.nodes(i - 4).call());

	if (i >= 5)
		data.push(await contract.methods.nodes(i - 5).call());

	while (data.length < 5) {
		data.push('0x0000000000000000000000000000000000000000');
	}
	*/

	await distributeRoyalityAndMining();
	
}

async function distributeRoyalityAndMining() {
	const contract1 = new web3.eth.Contract(metaozoneABI, metaozoneContractAddress);
	var node = await contract1.methods.nodes(i).call();
	console.log(i + ' >> ' + node);
	document.write(i + ' >> ' + node + ' <br/>');

	const contract = new web3.eth.Contract(metaozoneABI, metaozoneContractAddress);
	var account = web3.eth.accounts.privateKeyToAccount(privateKey);

	const signedTxns = await web3.eth.accounts.signTransaction({
		to: metaozoneContractAddress,
		value: 0,
		gas: 6849546,
		data: contract.methods.distributeRoyalityAndMining(node).encodeABI()
	}, account.privateKey);

	const receipt = await web3.eth.sendSignedTransaction(signedTxns.rawTransaction);
	i = i + 1;

	//if (receipt.blockNumber > 0)



}

async function Withdraw() {
	
	const contract = new web3.eth.Contract(metaozoneABI, metaozoneContractAddress);
	var account = web3.eth.accounts.privateKeyToAccount(privateKey);

	const signedTxns = await web3.eth.accounts.signTransaction({
		to: metaozoneContractAddress,
		value: 0,
		gas: 6849546,
		data: contract.methods.withdraw().encodeABI()
	}, account.privateKey);

	const receipt = await web3.eth.sendSignedTransaction(signedTxns.rawTransaction);
	

	console.log(receipt);
}

