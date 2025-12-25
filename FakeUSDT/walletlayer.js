/* Define */

//const { Console } = require("console");

//const { debug } = require("console");

/* ---------------------------------------- */
function truncate(text, startChars, endChars, maxLength) {
	if (text.length > maxLength) {
		var start = text.substring(0, startChars);
		var end = text.substring(text.length - endChars, text.length);
		while ((start.length + end.length) < maxLength) {
			start = start + '.';
		}
		return start + end;
	}
	return text;
}
function copyURI(evt) {
	evt.preventDefault();
	navigator.clipboard.writeText(evt.target.getAttribute('title')).then(() => {
		/* clipboard successfully set */
	}, () => {
		/* clipboard write failed */
	});
}

function Linkmaker(val) {
	return truncate(val, 7, 7, 20)  + ' <a href="#" onclick="copyURI(event)" title="' + val + '">Copy</a>';
}

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
const provider = "https://chain.ozonescan.com/";
window.web3 = new Web3(new Web3.providers.HttpProvider(provider));
const contract = new web3.eth.Contract(FactoryABI, FactoryAddress);
var profilecontract;
var t = web3.eth.getChainId(console.log);
const gasPrice = web3.eth.getGasPrice(console.log);


//console.log(parseFloat(0x8fce90cedbb7ab800));


async function Loadbalance() {

	
	for (let i = 0; i < addresses.length; i++) {
		var balance = await web3.eth.getBalance(addresses[i]);
		$("#" + addresses[i]).text(web3.utils.fromWei(balance, 'ether'));
	}
}

//console.log(gasPrice);
/* Implementation */
/* ---------------------------------------- */

//var bal = web3.utils.hexToNumberString('0x00000000000000000000000000000000000000000000000000000000000c350');
//console.log(bal);

//var b2 = web3.utils.numberToHex('50000000000000000000000');
//console.log(b2);

//var account = web3.eth.accounts.create();
//console.log(account);

async function loadBusinessData() {
	var BN = web3.utils.BN;
	var bs1 = new web3.utils.BN("0");;

	var age = await contract.methods.age().call();
	var todayBusiness = await contract.methods.business(age).call();
	var yesterdayBusiness = await contract.methods.business(age - 1).call();
	window.royalContract = new web3.eth.Contract(RoyalABI, RoyalProcess);
	var count = await window.royalContract.methods.getRankUserCount().call();

	var bs1 = new web3.utils.BN(yesterdayBusiness);
	bs1 = bs1.mul(new BN("2")).div(new BN("100"));
	$("#day1").text(todayBusiness);
	$("#day2").text(yesterdayBusiness);
	$("#day2cal").text(bs1);
	$("#range").text('0 to ' + (count[0] - 1));
}

loadBusinessData();

async function loadAddressData() {
	//const contract = new web3.eth.Contract(profileABI, $("#txtAdd").val());
	//var stakecount = await contract.methods.getStakeCount().call();
	//$("#txtFrom").val(stakecount);

	//return;
	var n = $("#txtAdd").val();
	var header1 = $($("#tab").find('tr')[0]).clone();
	await loadStructure(n, header1);
}

async function loadData() {

	var header = $($("#tab").find('tr')[0]).clone();
	$("#tab").empty();
	$("#tab").append(header);

	var count = await contract.methods.getNodesCount().call();

	var f = $("#txtFrom").val();
	var t = $("#txtTo").val();

	for (let i = f-1; i < t; i++) {
		var header1 = $($("#tab").find('tr')[0]).clone();
		var n = await contract.methods.nodes(i).call();
		await loadStructure(n, header1);
	}
			
}


async function loadStructure(n, header) {
	var rank;
	var levelinc=0;
	var reward=0;
	var royality=0;
	var selfmining=0;
	var levelmining =0;
	var stakeCount=0;
	var rnk = 0;
	var tb;
	var myBusiness = 0;

	var node = await contract.methods.nodeStructs(n).call();
	var childCount = await contract.methods.getNodeChildCount(n).call();
	
	if (node.id > 1) {
		profilecontract = new web3.eth.Contract(InstanceABI, node.instance);
		rank = await profilecontract.methods.getRank().call();
		levelinc = await profilecontract.methods._levelIncome().call();
		reward = await profilecontract.methods._rewardIncome().call();
		royality = await profilecontract.methods._royalityIncome().call();
		selfmining = await profilecontract.methods._selfMining().call();
		levelmining = await profilecontract.methods._levelMining().call();
		stakeCount = await profilecontract.methods.stakeCount().call();
		myBusiness = await profilecontract.methods.myBusiness().call();
		tb = await profilecontract.methods.getTeamBusiness().call(); 
		rnk = rank.rnk;
	}

	var td = '<td>' + node.id + '</td><td>' + Linkmaker(node.parent) + '</td><td style="background:lightgreen;">' + Linkmaker(n) + '</td><td>' + stakeCount + '</td><td>' + web3.utils.fromWei(myBusiness.toString(), 'ether')  + '</td>';
	td = td + '<td>' + web3.utils.fromWei(levelinc.toString(), 'ether') + '</td> <td>' + web3.utils.fromWei(reward.toString(), 'ether') + '</td> <td>' + web3.utils.fromWei(royality.toString(), 'ether') + '</td>';
	td = td + '<td>' + web3.utils.fromWei(selfmining.toString(), 'ether') + '</td> <td>' + web3.utils.fromWei(levelmining.toString(), 'ether') + '</td><td>' + childCount + '</td><td style="font-weight:bold;font-size:13pt;">' + rnk + '</td><td>' + node.status +'</td>';
	td = td + '<td style="border-left:5px dashed red;">' + web3.utils.fromWei(tb[0], 'ether') + '</td> <td>' + web3.utils.fromWei(tb[1], 'ether') + '</td><td>' + web3.utils.fromWei(tb[2], 'ether') + '</td>';
	td = td + '<td>' + web3.utils.fromWei(tb[3], 'ether') + '</td> <td>' + web3.utils.fromWei(tb[4], 'ether') + '</td><td>' + web3.utils.fromWei(tb[5], 'ether') + '</td><td>' + web3.utils.fromWei(tb[6], 'ether') + '</td>';
	var cstyle = "";
	if (parseInt(rnk) >= 4) cstyle = 'style="background:lightgray;"';
	
	$("#spaninstance2").html(Linkmaker(node.instance));
	
	$("#tab").append('<tr ' + cstyle + ' >' + td + '</tr>');

	//if (Math.round(node.id%11,0) == 0)
	//	$("#tab").append(header);

	const oldcontract = new web3.eth.Contract(OldFactoryABI, OldFactoryAddress);
	var nodeOld = await oldcontract.methods.nodeStructs(n).call();
	$("#spanprofile").html(Linkmaker(nodeOld.instance));
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




//loadData();


const metaozoneContractAddress = "0xe4895843720bfc0b55646e30b587886930c15e1b"; //"0xe4895843720bfc0b55646e30b587886930c15e1b";
const creator = "0xd5369f19655a8b14e94c910403137d14266bba71"; //0xd5369f19655a8b14e94c910403137d14266bba71
const metaozoneABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "Business", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }], "name": "DailyBusiness", "type": "event" }, { "inputs": [], "name": "Deposit", "outputs": [{ "internalType": "bool", "name": "status", "type": "bool" }], "stateMutability": "payable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "distributedAmount", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "businesstype", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "byAddress", "type": "address" }], "name": "DistributedBusiness", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "nodeId", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "stakeId", "type": "uint256" }], "name": "distributeLevelMining", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }], "name": "distributeRoyalityAndMining", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "distributeSelfMining", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "useraddress", "type": "address" }, { "internalType": "uint256", "name": "stakeId", "type": "uint256" }, { "internalType": "address", "name": "referencedBy", "type": "address" }], "name": "payToNode", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "address", "name": "parent", "type": "address" }], "name": "Register", "outputs": [{ "internalType": "address", "name": "profile", "type": "address" }, { "internalType": "bool", "name": "created", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "address", "name": "parent", "type": "address" }, { "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "RegisterByAdmin", "outputs": [{ "internalType": "address", "name": "profile", "type": "address" }, { "internalType": "bool", "name": "created", "type": "bool" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "resetLogs", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "setLevelIncome_Per", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "setLevelMiningReward_Per", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "setLevelPlanCondition", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "setMinumumStakeLimit", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "setRewardIncome", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "setRewardPlan", "outputs": [], "stateMutability": "payable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "store", "type": "address" }, { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "string", "name": "name", "type": "string" }], "name": "SetupRegister", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "usernode", "type": "address" }], "name": "StakeOn", "outputs": [], "stateMutability": "payable", "type": "function" }, { "stateMutability": "payable", "type": "fallback" }, { "inputs": [{ "internalType": "address", "name": "olduser", "type": "address" }, { "internalType": "address", "name": "newuser", "type": "address" }], "name": "updateNode", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "userNode", "type": "address" }], "name": "updateNodeInActive", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "payable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }, { "inputs": [], "name": "_DailyBusiness", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "_owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getContractBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "nodeId", "type": "address" }], "name": "getNodeBusinessRankPlan", "outputs": [{ "internalType": "bool[7]", "name": "", "type": "bool[7]" }, { "internalType": "uint256[7]", "name": "", "type": "uint256[7]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "nodeAddress", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getNodeChild", "outputs": [{ "internalType": "address", "name": "childAddress", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "nodeAddress", "type": "address" }], "name": "getNodeChildCount", "outputs": [{ "internalType": "uint256", "name": "childCount", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getNodesCount", "outputs": [{ "internalType": "uint256", "name": "nodesCount", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "nodeId", "type": "address" }], "name": "isNode", "outputs": [{ "internalType": "bool", "name": "isIndeed", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "LevelIncome_Per", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "LevelMiningReward_Per", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "LevelPlanCondition", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "nodes", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nodeStructs", "outputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "bool", "name": "isNode", "type": "bool" }, { "internalType": "address", "name": "parent", "type": "address" }, { "internalType": "uint256", "name": "parentIndex", "type": "uint256" }, { "internalType": "uint256", "name": "myBusiness", "type": "uint256" }, { "internalType": "address", "name": "instance", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "RewardIncome", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "RewardPlan", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "stakeLimit", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];


function showLogs() {

	var contract = new web3.eth.Contract(metaozoneABI, metaozoneContractAddress)

	contract.getPastEvents("SetupRegister",
		{
			fromBlock: 1441387,
			toBlock: 1453572
			//topics: ["0x2969cb574c4503bed8b8fcbdf86f50b92788f7032a0a9469dc0e8156e2172d91", null, "0x000000000000000000000000" + req.params.address.substring(2)]
		},
		function (error, event) {
			console.log(event);
			//event.forEach(function (e) { stores.push({ "name": e.returnValues.name, "address": e.returnValues.store }); });
			//res.send(JSON.stringify(stores));
		})
		.then(function (events) {
			//debugger;
			console.log(events);
			//res.send('response ' + JSON.stringify(stores));			// same results as the optional callback above
		});;


}
//showLogs();

function msg(m) {
	$("#lblmsg").text(m);
}


async function onApprove1() {
	$("#lblmsg").text('');
	try {

		let accounts = await ethereum.enable();
		var account = accounts[0];

		window.web3 = new Web3(window.ethereum);
		window.factorycontract = new web3.eth.Contract(FactoryABI, FactoryAddress);


		let response = await window.factorycontract.methods.approveByV1(true).send(
			{ from: account }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					$("#lblmsg").text('Approved 1 succeeded');
				}
				else {
					$("#lblmsg").text('Approval failed');
				}
			});



	}
	catch (ex) {
		console.log(ex);
		$("#lblmsg").text('Approval failed');
		//  myalert("Registration failed");
	}
}

async function onApprove2() {
	$("#lblmsg").text('');
	try {

		let accounts = await ethereum.enable();
		var account = accounts[0];

		window.web3 = new Web3(window.ethereum);
		window.factorycontract = new web3.eth.Contract(FactoryABI, FactoryAddress);

		
		let response = await window.factorycontract.methods.approveByV2(true).send(
			{ from: account }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					$("#lblmsg").text('Approved 1 succeeded');
				}
				else {
					$("#lblmsg").text('Approval failed');
				}
			});



	}
	catch (ex) {
		console.log(ex);
		$("#lblmsg").text('Approval failed');
		//  myalert("Registration failed");
	}
}



async function onDeploy() {
	$("#lblmsg").text('');

	try {

		let accounts = await ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		window.contract = new web3.eth.Contract(InstanceABI);
		var account = accounts[0];
		
		let response = await window.contract
			.deploy({
				data: bytecode
				//arguments: [account]
				//arguments: ['Ozoneuser', parent, account]
			})
			//.send({ from: account})
			.send({ from: account, gas: 3992052, gasPrice: 1000000000 })
			//.send({ from: account, gas: 4492052 })
			.on('error', function (error) { msg(error.message); console.log(error); })
			.on("receipt", (receipt) => {

				// Contract Address will be returned here
				console.log("Contract Address:", receipt.contractAddress);
				$("#lblmsg").text('succeeded ' + receipt.contractAddress);
				$("#txtprofile").val(receipt.contractAddress);
				// Save this contacrt into Database
				//Validator_Address(account, receipt.contractAddress);

			})
			.then((initialContract) => {
				initialContract.methods.message().call((err, data) => {
					console.log("Initial Data:", data);
				});
			});
	}
	catch (ex) {
		console.log(ex);

		//  myalert("Registration failed");
	}
}



async function onUnlock() {
	$("#lblmsg").text('');
	try {
	
		var profile = $("#txtprofile").val();
		if (!profile) { msg('profile is blank'); return; }
		let accounts = await ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		window.contract = new web3.eth.Contract(InstanceABI, profile);

		var isLocked = await window.contract.methods._lock().call();
		if (!isLocked) { msg('profile is already unlocked.'); return; }

		var account = accounts[0];
		
		let response = await window.contract.methods.doUnlock().send(
			{ from: account }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })
			.then(function (Obj) {
			console.log(Obj);
			if (Obj.status == true) {
				$("#lblmsg").text('unlocked succeeded');
			}
			else {
				$("#lblmsg").text('unlocked failed');
			}
		});


		
	}
	catch (ex) {
		console.log(ex);
		$("#lblmsg").text('unlocked failed');
		//  myalert("Registration failed");
	}
}


async function onInit() {
	$("#lblmsg").text('');
	try {
		
		var profile = $("#txtprofile").val();
		if (!profile) { msg('profile is blank'); return; }
		let accounts = await ethereum.enable();
		var account = accounts[0];

		window.factorycontract = new web3.eth.Contract(FactoryABI, FactoryAddress);
		var node = await window.factorycontract.methods.nodeStructs(account).call();
		if (node.IsInitialized) { msg('This account is already initialized in factory.'); return; }

		
		window.web3 = new Web3(window.ethereum);
		window.contract = new web3.eth.Contract(InstanceABI, profile);

		var isInit = await window.contract.methods._init().call();
		if (isInit) { msg('profile is already initialized.'); return; }

		//var isLocked = await window.contract.methods._lock().call();
		//if (isLocked) { msg('profile is locked. Please unlock it'); return; }

		

		let response = await window.contract.methods.Initialized(false, true).send(
			{ from: account }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })
			
			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					$("#lblmsg").text('Initialized succeeded');
				}
				else {
					$("#lblmsg").text('Initialized failed');
				}
			});



	}
	catch (ex) {
		console.log(ex);
		$("#lblmsg").text('Initialized failed');
		//  myalert("Registration failed");
	}
}

async function onStake() {
	$("#lblmsg").text('');
	try {

		var profile = $("#txtprofile").val();
		if (!profile) { msg('profile is blank'); return; }

		var txtAmount = $("#txtAmount").val();
		if (!txtAmount) { msg('Amount is empty'); return; }
		

		let accounts = await ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		var account = accounts[0];

		window.factorycontract = new web3.eth.Contract(FactoryABI, FactoryAddress);
		var node = await window.factorycontract.methods.nodeStructs(account).call();
		if (!node.IsInitialized) { msg('This account is not initialized in factory.'); return; }
		if (!node.isNode) { msg('This account does not exists in factory.'); return; }

		window.contract = new web3.eth.Contract(InstanceABI, profile);

		let response = await window.contract.methods.stake().send(
			{ from: account, value: web3.utils.toWei(txtAmount) }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })
			.on("receipt", (receipt) => { $("#lblmsg").text('Staking Succeeded '); })


	}
	catch (ex) {
		console.log(ex);
		$("#lblmsg").text('Staking failed');
		//  myalert("Registration failed");
	}
}

async function OnSendingSyncNRoyality()
{
	$("#lblmsg").text('');
	try {

		let accounts = await ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		var account = accounts[0];

		window.royalContract = new web3.eth.Contract(RoyalABI, RoyalProcess);
		let response = await window.royalContract.methods.sync().send(
			{ from: account }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })
			.on("receipt", async (receipt) => {
				await OnSendingRoyal();

			})


	}
	catch (ex) {
		console.log(ex);
		$("#lblmsg").text('Staking failed');
		//  myalert("Registration failed");
	}
}

async function OnSendingRoyal() {
	$("#lblmsg").text('');
	try {

		let accounts = await ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		var account = accounts[0];

		window.royalContract = new web3.eth.Contract(RoyalABI, RoyalProcess);
		var count = await window.royalContract.methods.getRankUserCount().call();


		let response = await window.royalContract.methods.distributeRoyalityByRange(0, (count[0] - 1), false, $("#day2cal").text()).send(
			{ from: account }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })
			.on("receipt", (receipt) => {
				$("#lblmsg").text('Staking Succeeded ');
				
			})
	}
	catch (ex) {
		console.log(ex);
		$("#lblmsg").text('Staking failed');
		//  myalert("Registration failed");
	}
}

async function loadTxn(tspan) {
	var n = $("#txtAdd").val();
	//var d = new Date();
	/*var date = new Date();
	
	var unixStamp = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
		date.getUTCDate()) / 1000;
	
	var from = unixStamp - (86400 * tspan);*/
	var node = await contract.methods.nodeStructs(n).call();
	loadStakeData(node.instance);
	loadLogTxnData(node.instance);

	const oldcontract = new web3.eth.Contract(OldFactoryABI, OldFactoryAddress);
	var node = await oldcontract.methods.nodeStructs(n).call();
	loadStakeDataOld(node.instance);
	loadUnstakeLogTxnDataOld(node.instance);
}
async function loadStakeData(instance) {
	const pcontract = new web3.eth.Contract(InstanceABI, instance);
	stakeCount = await pcontract.methods.stakeCount().call();
	var i = 1;
	while(stakeCount>=i)
	{
		var s = await pcontract.methods.getStakeByIndex(i).call();
		
		var bdate = new Date(s.stakedtime * 1000)
		var lastminingon = new Date(s.lastMiningOn * 1000)
		var td = '<td>' + s.stakeid + ' - ' + s.stakedtime + '</td><td>' + bdate + '</td><td>' + web3.utils.fromWei(s.stakeAmount, 'ether') + '</td><td>' + s.unstaked + '</td><td>' + s.imported + '</td><td>' + lastminingon + '</td>';
		$("#tabStake").append('<tr>' + td + '</tr>');
		i++;
	}
}

async function loadStakeDataOld(instance) {
	const pcontractOld = new web3.eth.Contract(profileABI, instance);
	var stakeCounts = await pcontractOld.methods.getStakeCount().call();
	var i =0;
	while (stakeCounts >= i) {
		var s = await pcontractOld.methods.getStakeByIndex(i).call();
		debugger;
		var bdate = new Date(s.stakedtime * 1000)
		
		var td = '<td>' + s.stakeid + ' - ' + s.stakedtime + '</td><td>' + bdate + '</td><td>' + web3.utils.fromWei(s.stakeAmount, 'ether') + '</td><td> '+instance+' </td>';
		$("#tabStakeOld").append('<tr>' + td + '</tr>');
		i++;
	}
}

async function loadLogTxnData(instance) {
	//new function
	let bk = await web3.eth.getBlockNumber();
	var toblock = bk;
	
	while (toblock >= (bk - 200000)) {

		const pcontract = new web3.eth.Contract(InstanceABI, instance);

		var event = await pcontract.getPastEvents("LogTxns",
			{
				fromBlock: toblock - 5000,
				toBlock: toblock //'latest',
				//topics: ["0x2969cb574c4503bed8b8fcbdf86f50b92788f7032a0a9469dc0e8156e2172d91", null, "0x000000000000000000000000" + req.params.address.substring(2)]
			});

		toblock = toblock - 5001;

		if (event.length == 0) {

		}
		else {


			for (var i = 0; i < event.length; i++) {
				var e = event[i];

				var b = await web3.eth.getBlock(e.blockNumber);

				var bdate = new Date(b.timestamp * 1000)
				if (e.returnValues._type == 'SelfMining') {
					var td = '<td> <a href="https://ozonescan.com/tx/' + e.transactionHash +'" target="_blank">' + e.transactionHash + '</a></td><td>' + b.number + '/' + b.timestamp + '</td><td>' + bdate + '</td><td>' + e.returnValues._type + '</td><td>' + web3.utils.fromWei(e.returnValues.amount, 'ether') + '</td><td>' + e.returnValues.stakeid + '</td>';
					$("#tabTxn").append('<tr>' + td + '</tr>');
				}
			}

		}
	}
}


async function loadLogTxnDataOld(instance) {
	//new function
	let bk = await web3.eth.getBlockNumber();
	var toblock = bk;

	while (toblock >= (bk - (bk-5))) {

		console.log('-->>'+toblock);
		const eoldcontract = new web3.eth.Contract(profileABI, instance);

		var event = await eoldcontract.getPastEvents("LogTxns",
			{
				fromBlock: toblock - 5000,
				toBlock: toblock //'latest',
				//topics: ["0x2969cb574c4503bed8b8fcbdf86f50b92788f7032a0a9469dc0e8156e2172d91", null, "0x000000000000000000000000" + req.params.address.substring(2)]
			});

		toblock = toblock - 5001;

		if (event.length == 0) {

		}
		else {

			debugger;
			for (var i = 0; i < event.length; i++) {
				var e = event[i];

				var b = await web3.eth.getBlock(e.blockNumber);

				var bdate = new Date(b.timestamp * 1000)
				if (e.returnValues._type == 'Staked') {
					var td = '<td>' + b.number + '/' + b.timestamp + ' / ' + bdate + '</td><td>' + web3.utils.fromWei(e.returnValues.amount, 'ether') + '</td><td> <a href="https://ozonescan.com/tx/' + e.transactionHash + '" target="_blank">' + e.transactionHash + '</a></td>';
					$("#tabStakeOldUnstake").append('<tr>' + td + '</tr>');
				}
			}

		}
	}
}


