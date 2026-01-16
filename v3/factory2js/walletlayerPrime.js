window.web3 = new Web3(new Web3.providers.HttpProvider(provider));
let factoryABIPrime = {};
let RulesABIPrime = {};
let NestedABIPrime = {};
let insABIPrime = {};
let ORCABIPrime = {};
let ImportForgePrime = {};
let PrimeData = {};

let PriceABI= {}
let PrimeDataV2ABI  = {};
let PrimeDataQueueABI  = {};
let lib741RulesV2ABI  = {};


let safev3ABIPrime = {};
let factoryv3ABIPrime = {};
let Rulesv3ABIPrime = {};
let Nestedv3ABIPrime = {};
let insv3ABIPrime = {};
let ORCv3ABIPrime = {};
let Pricev3ABI = {};


pageload();

async function pageload() {
	//rulePrime="0x9DC5e4b93795a8907E8979b06ed66b71e589C901";
	var version = Date.now(); // or any versioning logic
	safeABIPrime = await fetch('abi/lib723CommonPrime.sol/lib723CommonPrime.json?v='+version).then(res => res.json());
	factoryABIPrime = await fetch('abi/Nftwall-FactoryPrime.sol/NFTWallFactoryPrime.json?v='+version).then(res => res.json());
	RulesABIPrime = await fetch('abi/lib741RulesPrime.sol/lib741RulesPrime.json?v='+version).then(res => res.json());
	NestedABIPrime = await fetch('abi/Nested741Prime.sol/Nested741Prime.json?v='+version).then(res => res.json());
	insABIPrime = await fetch('abi/Nftwall-InstancePrime.sol/NodeInstancePrime.json?v='+version).then(res => res.json());
	ORCABIPrime = await fetch('abi/ORC1155Prime.sol/ORC1155Prime.json?v='+version).then(res => res.json());
	ImportForgePrime = await fetch('abi/ImportForgePrime.sol/ImportForgePrime.json?v='+version).then(res => res.json());
	PrimeData = await fetch('abi/PrimeData.sol/PrimeData.json?v='+version).then(res => res.json());
	
	PriceABI = await fetch('abi/lib741Price.sol/lib741Price.json?v='+version).then(res => res.json());
	PrimeDataV2ABI = await fetch('abi/PrimeDataV2.sol/PrimeDataV2.json?v='+version).then(res => res.json());
	PrimeDataQueueABI = await fetch('abi/PrimeClaimQueue.sol/PrimeClaimQueue.json?v='+version).then(res => res.json());
	lib741RulesV2ABI = await fetch('abi/lib741RulesV2.sol/lib741RulesV2.json?v='+version).then(res => res.json());
	
	safev3ABIPrime = await fetch('abiv3/libSafeguard9Oct.sol/libSafeguard.json?v='+version).then(res => res.json());
	proxyv3ABIPrime = await fetch('abiv3/Nftwall-PrimeProxy9Oct.sol/PrimeProxy.json?v='+version).then(res => res.json());
	Rulesv3ABIPrime = await fetch('abiv3/lib741RulesPrime9Oct.sol/lib741RulesPrime.json?v='+version).then(res => res.json());
	Nestedv3ABIPrime = await fetch('abiv3/Nested741Prime9Oct.sol/Nested741Prime.json?v='+version).then(res => res.json());
	insv3ABIPrime = await fetch('abiv3/Nftwall-InstancePrimeMe9Oct.sol/InstanceMe.json?v='+version).then(res => res.json());
	ORCv3ABIPrime = await fetch('abiv3/ORC1155Prime9Oct.sol/ORC1155Prime.json?v='+version).then(res => res.json());
	Pricev3ABI = await fetch('abiv3/lib741Price.sol/lib741Price.json?v='+version).then(res => res.json());
	

	if ($("#txtAdd").length) {	
		  
		LoadSystemPoolClausePrime();
		$("#transferAddPrime").text(TreaseryTVLMiningPrimev3);
		$("#transferBalPrime").text(web3.utils.fromWei((await web3.eth.getBalance(TreaseryTVLMiningPrimev3)), 'ether'));
	}
	
}

async function onGetPrimeDataOnHome(add) {
	
	window.web3 = new Web3(window.ethereum);
	window.PrimeDataContract = new web3.eth.Contract(PrimeDataV2ABI.abi, PrimeDataV3);

	var d =	await window.PrimeDataContract.methods.nodesStr(add).call();
	var td= '';
	td= '<td>' + add + '</td>';
	td= td + '<td>' + d.exist + '</td>';
	td= td + '<td>' + web3.utils.fromWei(d.bal) + '</td>';
	td= td + '<td>' + web3.utils.fromWei(d.msgval) + '</td>';

	$("#tabPrimeDataHome").append('<tr>' + td + '</tr>');
}

async function onGetPrimeData() {
	
	if (!$("#txtPrimeAddress").length) return;
	var n = $("#txtPrimeAddress").val();
	if (!n) { msg('address is blank'); return; }

	window.web3 = new Web3(window.ethereum);
	window.PrimeDataContract = new web3.eth.Contract(PrimeData.abi, primeData);

	var d =	await window.PrimeDataContract.methods.nodesStr(n).call();
	var td= '';
	td= '<td>' + n + '</td>';
	td= td + '<td>' + d.bal + '</td>';
	td= td + '<td>' + d.exist + '</td>';

	$("#tabPrimeData").append('<tr>' + td + '</tr>');
}

async function  _LoadPrimeTree() {
	window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
	let count = await window.nestedprimecontract.methods.getNodesCount().call();
	$("#totalPrimeNodes").html(count);
	return;
}

async function _LoadSystemORC1155Prime()
{
	$("#tabOrc").append('<tr><td colSpan="5">Prime <hr/></td></tr>');
	await LoadSystemORC1155Prime(orc1155Prime);
	await LoadSystemORC1155Prime(orc1155Prime9Oct);
	
}

async function onJoinPrime() {
	$("#lblmsgPrime").text('');
	
	try {

		let accounts = await ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		
		var parent = $("#txtparent").val();
		if (!parent) { msg('user is blank'); return; }

		if (!(await isPrimeUser(n))) 
		{ msgPrime('instance already exists.'); return; }
		
		let advance = web3.utils.toWei('5', 'ether');
		window.factoryprimecontract = new web3.eth.Contract(factoryABIPrime.abi, factoryPrime);
		let response = await window.factoryprimecontract.methods.createInstance(parent, accounts[0], advance).send(
			{ from: accounts[0] }) 
			.on('error', function (error) { msg(error.message); console.log(error); })
			.then(function (Obj) {
				if (Obj.status == true) {
					$("#lblmsgPrime").text('Joined succeeded');
				}
				else {
					$("#lblmsgPrime").text('Joined failed');
				}
			});



	}
	catch (ex) {
		console.log(ex);
		$("#lblmsgPrime").text('Initialized failed');
		//  myalert("Registration failed");
	}
}


async function LoadTreePrime(){
	if (!$("#tabTree").length) return;
	window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
	let count = await window.nestedprimecontract.methods.getNodesCount().call();
	
	for (let i = 0; i<parseInt(count); i++) {
		
		var td = '';
		
		window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
		let nodeIns = await window.nestedprimecontract.methods.getNodeByIndex(i).call();
		
		window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
		let node = await window.nestedprimecontract.methods.InstToUser(nodeIns).call();
		
		window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
		let nodeDet = await window.nestedprimecontract.methods.getNode(nodeIns).call();

		td =td + '<td>' + nodeDet.i + '</td>';
		td =td + '<td>' + node + '</td>';
		td =td + '<td>' + nodeIns + '</td>';
		td =td + '<td>' + nodeDet.cage + '</td>';
		
		
		window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
		let pa = await window.nestedprimecontract.methods.InstToUser(nodeDet.pa).call();
		td =td + '<td>' + pa + '</td>';
		td =td + '<td>' + nodeDet.pa + '</td>';

		window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
		let dc = await window.nestedprimecontract.methods.getNodeDirectsCount(nodeIns).call();
		td =td + '<td>' + dc+ '</td>';

		
		window.instancePrimecontract = new web3.eth.Contract(insABI.abi, nodeIns);
		let mc = await window.instancePrimecontract.methods.mintCount().call();
		td =td + '<td>' + mc+ '</td>';

		$("#tabTree").append('<tr>' + td + '</tr>');
	}
}

async function onGetDailyBusinessPrime(){
	if (!$("#txtfrom").length) return;
	var from = $("#txtfrom").val();
	if (!from) { msgPrime('from is blank'); return; }
	
	var to = $("#txtto").val();
	if (!to) { msgPrime('to is blank'); return; }

	window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
	let age = await window.nestedprimecontract.methods.age().call();
	for (let i = parseInt(to); i>=parseInt(from); i--) {
		let b = await window.nestedprimecontract.methods.getbusiness(i).call();
		
		window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
		let Ct0 = await window.nestedprimecontract.methods.getrankCount(i,0).call();
		window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
		let Ct1 = await window.nestedprimecontract.methods.getrankCount(i,1).call();
		window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
		let Ct2 = await window.nestedprimecontract.methods.getrankCount(i,2).call();
		window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
		let Ct3 = await window.nestedprimecontract.methods.getrankCount(i,3).call();
		window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
		let Ct4 = await window.nestedprimecontract.methods.getrankCount(i,4).call();
		window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
		let Ct5 = await window.nestedprimecontract.methods.getrankCount(i,5).call();
		window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
		let Ct6 = await window.nestedprimecontract.methods.getrankCount(i,6).call();
		window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
		let Ct7 = await window.nestedprimecontract.methods.getrankCount(i,7).call();
		

		let royal2 = (parseFloat(b)*parseFloat(2)/100)/parseFloat(Ct2);
		
		$("#tabDailyBusiness").append('<tr><td>'+i+'</td><td>'+b+'</td><td>'+Ct0+'</td><td>'+Ct1+'</td><td>'+Ct2+'</td><td>'+Ct3+'</td><td>'+Ct4+'</td><td>'+Ct5+'</td><td>'+Ct6+'</td><td>'+Ct7+'</td><td>'+royal2+'</td><td>0</td><td>0</td></tr>');
	}	
	
	
}

async function LoadSystemPoolClausePrime() {
		LoadRulesPrime();
		window.ruleprimeContract = new web3.eth.Contract(RulesABIPrime.abi, rulePrime);
		let p = await window.ruleprimeContract.methods.pool().call();
		
		var td = '<td> New </td>';
		td = td + '<td>' + parseFloat(p.stakeN)/parseFloat(p.stakeD) +'%' + '</td>';
		td = td + '<td>' + parseFloat(p.roiN)/parseFloat(p.roiD) +'%'+ '</td>';
		td = td +'<td>' + p.startafter + '</td>';
		td = td +'<td>' + p.roiInt + '</td>'
		td = td +'<td>' + p.roiEnd + '</td>'
		$("#tabPoolPrime").append('<tr>' + td + '</tr>');
	
		let n = await window.ruleprimeContract.methods.poolNFT1().call();
		
		td = '<td> NFT Pool 1 </td>';
		
		td = td + '<td>' + parseFloat(n.roiN)/parseFloat(n.roiD) +'%'+ '</td>';
		
		td = td +'<td>' + n.roiInt + '</td>'
		
		$("#tabPoolNFTPrime").append('<tr>' + td + '</tr>');

		n = await window.ruleprimeContract.methods.poolNFT2().call();
		
		td = '<td> NFT Pool 2 </td>';
		
		td = td + '<td>' + parseFloat(n.roiN)/parseFloat(n.roiD) +'%'+ '</td>';
		
		td = td +'<td>' + n.roiInt + '</td>'
		
		$("#tabPoolNFTPrime").append('<tr>' + td + '</tr>');



		window.nestedprimecontract = new web3.eth.Contract(Nestedv3ABIPrime.abi, Nested741Primev3);
		let age = await window.nestedprimecontract.methods.systemAge().call();
		
		$("#systemAgePrime").html('System Age ' + age);

}

async function LoadRulesPrime()
{
	
	window.PriceABIContract = new web3.eth.Contract(Pricev3ABI.abi, Pricev3);
	
	let ozn = await window.PriceABIContract.methods.ozonePriceInUSDT().call();
	$('#oznpricePrime').text(`Price: `+web3.utils.fromWei(ozn.toString(), 'ether'));
	
	window.ruleprimeContract = new web3.eth.Contract(RulesABIPrime.abi, rulePrime);
	let shutdown = await window.ruleprimeContract.methods.shutdown().call();
	let shut = `Shutdown: `+ shutdown;
	//$('#shutdownPrime').text(`Shutdown: `+ shutdown);

	window.ruleprimeContract1 = new web3.eth.Contract(RulesABIPrime.abi, rulePrimeV2);
	shutdown = await window.ruleprimeContract1.methods.shutdown().call();
	shut = shut + `V2: `+ shutdown;
	$('#shutdownPrime').text(shut);


	window.ruleprimeContract = new web3.eth.Contract(RulesABIPrime.abi, rulePrime);
	let freeIntervals = await window.ruleprimeContract.methods.freeIntervals().call();
	$('#freeIntervalsPrime').text(`FreeIntervals: `+ freeIntervals);

	window.ruleprimeContract = new web3.eth.Contract(RulesABIPrime.abi, rulePrime);
	let claimMinLimit = await window.ruleprimeContract.methods.claimMinLimit().call();
	$('#claimMinLimitPrime').text(`claimMinLimit: `+web3.utils.fromWei((BigInt(claimMinLimit.toString())).toString(), 'ether'));
	
	window.ruleprimeContract = new web3.eth.Contract(RulesABIPrime.abi, rulePrime);
	let claimMaxLimit = await window.ruleprimeContract.methods.claimMaxLimit().call();
	$('#claimMaxLimitPrime').text(`claimMaxLimit: `+web3.utils.fromWei((BigInt(claimMaxLimit.toString())).toString(), 'ether'));
	
	window.ruleprimeContract = new web3.eth.Contract(RulesABIPrime.abi, rulePrime);
	let mintMin = await window.ruleprimeContract.methods.mintMin().call();
	$('#mintMinPrime').text(`mintMin: `+ (parseInt(mintMin)).toString());
	
	window.ruleprimeContract = new web3.eth.Contract(RulesABIPrime.abi, rulePrime);
	let mintMax = await window.ruleprimeContract.methods.mintMax().call();
	$('#mintMaxPrime').text(`mintMax: `+ (parseInt(mintMax)).toString());

	window.ruleprimeContract = new web3.eth.Contract(RulesABIPrime.abi, rulePrime);
	let mintDailyLimit = await window.ruleprimeContract.methods.mintDailyLimit().call();
	$('#mintDailyLimitPrime').text(`mintDailyLimit: `+ mintDailyLimit.toString());
	
	
}
async function LoadSystemORC1155Prime(o1155) {
	
  
	if (!$("#tabOrc").length) return;
	window.factoryprimecontract = new web3.eth.Contract(factoryABIPrime.abi, factoryPrime);
	if (!(await window.factoryprimecontract.methods.isORC1155(o1155).call())) 
	 return; 
  
	window.orc1155Primecontract = new window.web3.eth.Contract(ORCABIPrime.abi, o1155);
	let baseMetadataURI =await window.orc1155Primecontract.methods.baseMetadataURI().call();
	
	window.orc1155Primecontract = new window.web3.eth.Contract(ORCABIPrime.abi, o1155);
	let totSupply =await window.orc1155Primecontract.methods.totSupply().call();
	window.orc1155Primecontract = new window.web3.eth.Contract(ORCABIPrime.abi, o1155);
	let curSupply =await window.orc1155Primecontract.methods.curSupply().call();
	window.orc1155Primecontract = new window.web3.eth.Contract(ORCABIPrime.abi, o1155);
	let name =await window.orc1155Primecontract.methods.name().call();
	let tr='';
	let td = '<td> ' + name + '</td><td>'+o1155+' </td>';
	
	td = td +'<td>' + totSupply + '</td>'
	td = td +'<td>' + curSupply + '</td>'
	tr = '<tr>' + td + '</tr>';

	let flag=true;
	let i=1;
	td = '<td colspan="5" style="display: flex;"><div style="overflow-x: scroll; display:flex; width:400px;">';
	while(flag) {
		let tokenName =await window.orc1155Primecontract.methods.idToName(i).call();
		if(!tokenName) { flag= false; }
		else {
			let metadata =await window.orc1155Primecontract.methods.uri(i).call();
			let meta = await fetch(metadata).then(res => res.json());
			
			td = td + '<div class="NFTdiv"><img src="'+meta.image+'" width="50px" height="50px" /><br/>'+i+' - '+tokenName+'</div>';
			i++;
		}
	}
	td = td + '</div></td>';
	tr = tr + '<tr>' + td + '</tr>';

	$("#tabOrc").append(tr);
	
}

async function isPrimeUser(u)
{
	window.nestedprimecontract = new web3.eth.Contract(Nestedv3ABIPrime.abi, Nested741Primev3);
	let address = await window.nestedprimecontract.methods.UserToInst(u).call();
	return (address!='0x0000000000000000000000000000000000000000') ;
}

async function loadAddressDataPrime(n) {
	
	if (!(await isPrimeUser(n))) 
		{ msgPrime('Instance is not created.'); return; }

	var header1 = $($("#tabPrime").find('tr')[0]).clone();
	await loadStructurePrime(n, header1);
}


async function loadStructurePrime(n, header) {

	
	window.nestedprimecontract = new web3.eth.Contract(Nestedv3ABIPrime.abi, Nested741Primev3);
	let age = await window.nestedprimecontract.methods.systemAge().call();
	var td = '<td>' + n + '</td>';
	window.nestedprimecontract = new web3.eth.Contract(Nestedv3ABIPrime.abi, Nested741Primev3);
	let instance = await window.nestedprimecontract.methods.UserToInst(n).call();
	td =td + '<td>' + instance + '</td>';
	td =td + '<td>' +  web3.utils.fromWei((await web3.eth.getBalance(instance)), 'ether') + '</td>';
	window.instancePrimecontract = new web3.eth.Contract(insv3ABIPrime.abi, instance);
	
	let cage =await window.instancePrimecontract.methods.cage().call();
	let bonus =await window.instancePrimecontract.methods.bonus().call();
	
	td =td + '<td>' + (web3.utils.fromWei(bonus.toString(), 'ether')) + '</td>';
	window.instancePrimecontract = new web3.eth.Contract(insv3ABIPrime.abi, instance);
	
	let mintnumber =await window.instancePrimecontract.methods.mintCount().call();
	
	window.instancePrimecontract = new web3.eth.Contract(insv3ABIPrime.abi, instance);
	
	
	let inc = await window.instancePrimecontract.methods.self().call()
	td =td + '<td>' + web3.utils.fromWei(inc.toString(), 'ether') + '</td>';
	td =td + '<td>' + (cage) + '</td>';
	var cstyle = "";
	$("#tabIncomePrime").append('<tr ' + cstyle + ' >' + td + '</tr>');

	window.instancePrimecontract = new web3.eth.Contract(insv3ABIPrime.abi, instance);
	
	let dage = await window.instancePrimecontract.methods.dage().call();
	;

	loadPoolPrime(n,instance,dage);
	;
	loadLSBPrime(instance,dage,age);
	
	loadlevelbusinessPrime(instance);
	
	window.instancePrimecontract = new web3.eth.Contract(insv3ABIPrime.abi, instance);	
	
	for (let i = 1; i<=parseInt(mintnumber); i++) {
		td = '<td>'+i+'</td>';	
		
		let orc =await window.instancePrimecontract.methods.mints(i).call();
		window.orc1155Primecontract = new window.web3.eth.Contract(ORCv3ABIPrime.abi, orc);
		
		let a =await window.orc1155Primecontract.methods.mintedAge().call();
		
		window.orc1155Primecontract = new window.web3.eth.Contract(ORCv3ABIPrime.abi, orc);
		
		
		let amt =await window.orc1155Primecontract.methods.mintedfee().call();
		
		window.orc1155Primecontract = new window.web3.eth.Contract(ORCv3ABIPrime.abi, orc);
		
		let q =await window.orc1155Primecontract.methods.mintedqty().call();
		
		let orcname =await window.orc1155Primecontract.methods.name().call();
		let tokenName =await window.orc1155Primecontract.methods.names(0).call();
		
		let metadata =await window.orc1155Primecontract.methods.uri(1).call();
		let meta = await fetch(metadata).then(res => res.json());
		
		amt = web3.utils.fromWei(amt, 'ether');
		
		
		td = td  + '<td onclick="copyAddress(this)" data-full="'+orc+'">'+slice(orc)+'<br/>'+orcname+'<br/><img src="'+meta.image+'" width="50px" height="50px" /><br/>1 - '+tokenName+'</td>';
		td = td  + '<td>'+a+'</td>';
		td = td  + '<td>'+amt+'</td>';
		td = td  + '<td>'+q+'</td>';

		window.orc1155Primecontract = new window.web3.eth.Contract(ORCv3ABIPrime.abi, orc);
		let cl =await window.orc1155Primecontract.methods.claimed().call();
		
		td = td  + '<td>'+cl+'</td>';
		window.orc1155Primecontract = new window.web3.eth.Contract(ORCv3ABIPrime.abi, orc);
		let ul =await window.orc1155Primecontract.methods._getUnlockedNFT().call();
		td = td  + '<td>'+ul+'</td>';
		let cal = parseFloat(ul)-parseFloat(cl);
		
		td = td  + '<td><button id="btnWth" onclick="onNFTTransfer(\'' + orc + '\',1,\''+rootSponser+'\',\''+ (cal) +'\')">'+ (cal) +'</button></td>';

		$("#tabMintPrime").append('<tr>' + td + '</tr>');
		
	}
	
}



async function loadPoolPrime(n, instance, dage) {

	window.nestedprimecontract = new web3.eth.Contract(Nestedv3ABIPrime.abi, Nested741Primev3);
	
	window.instancePrimecontract = new web3.eth.Contract(insv3ABIPrime.abi, instance);
	const primeid = await instancePrimecontract.methods.id().call();
	$("#idPrime").text(primeid);
	
	window.instancePrimecontract = new web3.eth.Contract(insv3ABIPrime.abi, instance);
	let inc = await window.instancePrimecontract.methods.compute(200).call();
	
	let td= '';
	td =td + '<td>' + web3.utils.fromWei(inc.toString(), 'ether') + '</td>';
	td =td + '<td>' + dage + '</td>';
	$("#tabCalIncomePrime").append('<tr>' + td + '</tr>');
	
	window.nestedprimecontract = new web3.eth.Contract(Nestedv3ABIPrime.abi, Nested741Primev3);
	
	td = '';
	window.nestedprimecontract = new web3.eth.Contract(Nestedv3ABIPrime.abi, Nested741Primev3);
	debugger;
	var parentid = await window.nestedprimecontract.methods.getNodeParent(instance).call();

	window.nestedprimecontract = new web3.eth.Contract(Nestedv3ABIPrime.abi, Nested741Primev3);
	debugger;
	if(parseInt(parentid)>0) {
		var parent = await window.nestedprimecontract.methods.nodes(parentid-1).call();

		let parentins = await window.nestedprimecontract.methods.UserToInst(parent).call();

		td =td + '<td>' + parentins + '</td>';

		window.nestedprimecontract = new web3.eth.Contract(Nestedv3ABIPrime.abi, Nested741Primev3);
		td =td + '<td>' + (await window.nestedprimecontract.methods.InstToUser(parentins).call()) + '</td>';
	}
	window.nestedprimecontract = new web3.eth.Contract(Nestedv3ABIPrime.abi, Nested741Primev3);
	let directs =await window.nestedprimecontract.methods.getNodeDirectsCount(primeid).call();
	td =td + '<td>' + (directs) + '</td>';
	debugger;
	
	window.instancePrimecontract = new web3.eth.Contract(insv3ABIPrime.abi, instance);
	let mintnumber =await window.instancePrimecontract.methods.mintCount().call();
	td =td + '<td>' + (mintnumber) + '</td>';
	debugger;
	window.nestedprimecontract = new web3.eth.Contract(Nestedv3ABIPrime.abi, Nested741Primev3);
	
	td =td + '<td>' + (await window.nestedprimecontract.methods.isNode(instance).call()) + '</td>';
	debugger;
	window.nestedprimecontract = new web3.eth.Contract(Nestedv3ABIPrime.abi, Nested741Primev3);
	td =td + '<td>' + (await window.nestedprimecontract.methods.isStop(instance).call()) + '</td>';
	$("#tabDetPrime").append('<tr>' + td + '</tr>');
	
	
}


async function loadlevelbusinessPrime(instance) {
	var tr1 = $($("#tabLevelPrime").find('tr')[0]).clone();
	window.nestedprimecontract = new web3.eth.Contract(Nestedv3ABIPrime.abi, Nested741Primev3);
	let level = (await window.nestedprimecontract.methods.getNodeLvlDepth(instance).call());
	
	for (let i=0; i<level; i++) {
		window.nestedprimecontract = new web3.eth.Contract(Nestedv3ABIPrime.abi, Nested741Primev3);
		var td = '<td>' + (i==0?"self":i) + '</td>';
		let lb = await window.nestedprimecontract.methods.getNodeLB(instance,i).call();
		td =td + '<td>' + web3.utils.fromWei(lb[0], 'ether') + '</td>';
		td =td + '<td>' + lb[1] + '</td>';
		$("#tabLevelPrime").append('<tr>' + td + '</tr>');
	}
	
}


async function loadLSBPrime(instance,dage,age) {
	;
	for(let i=dage; i<=(parseInt(age)); i++) {	
		window.instancePrimecontract = new web3.eth.Contract(insv3ABIPrime.abi, instance);
		let lsb = await window.instancePrimecontract.methods.LSB(i).call();
		$("#tabLBSPrime").append('<tr><td>'+i+'</td><td>'+lsb+'</td></tr>');
	}
	
}


async function onMintPrime() {
	//let orc1155Add = orctype==1?orc1155:orc1155Cat;
	let orc1155Add = orc1155Prime;
	orc1155Add=orc1155Prime9Oct;
	$("#lblmsgPrime").text('');
	try {

		var txtqty = $("#txtAmount").val();
		if (!txtqty) { msg('qty is empty'); return; }
		
		let qty = BigInt(txtqty);
		let accounts = await ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		
		if (!(await isPrimeUser(accounts[0]))) 
		{ msgPrime('user not found.'); return; }
		
		
		window.nestedprimecontract = new web3.eth.Contract(Nestedv3ABIPrime.abi, Nested741Primev3);
		let instance = await window.nestedprimecontract.methods.UserToInst(accounts[0]).call();
		window.instancePrimecontract = new web3.eth.Contract(insv3ABIPrime.abi, instance);
	
	
		
		//let _value = BigInt(await window.instancePrimecontract.methods.computeMintValue(qty).call());
		let _value = qty * BigInt(2*(parseFloat(10)**parseFloat(18)));
		;
		//let balanceWei = BigInt(await web3.eth.getBalance(instance)); 
		let bonus = BigInt(await window.instancePrimecontract.methods.bonus().call());   // returns balance in Wei (as a string)
		//balanceWei = balanceWei+bonus;
		
		_value=bonus>=_value?(0):(_value-bonus); // if bonus is used, it should not exceed the total value
		
		
		
		let response = await window.instancePrimecontract.methods.Txn(orc1155Add,2,qty,1).send(
			{ from: accounts[0], value: _value.toString() }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					$("#lblmsgPrime").text('Minted succeeded');
				}
				else {
					$("#lblmsgPrime").text('Minted failed');
				}
			});


	}
	catch (ex) {
		console.log(ex);
		$("#lblmsgPrime").text('Staking failed');
		//  myalert("Registration failed");
	}
}

async function onSync()
{
	msgPrime('');

	try {
		
		
		window.web3 = new Web3(window.ethereum);
		window.PrimeDataV2Contract = new web3.eth.Contract(PrimeDataV2ABI.abi, PrimeDataV2);
		
		if (!(await window.PrimeDataV2Contract.methods.isExist(accounts[0]).call())) 
		{ msgPrime('account not exists in prime.'); return; }

		window.PrimeDataV2Contract = new web3.eth.Contract(PrimeDataV2ABI.abi, PrimeDataV2);
		let response = await window.PrimeDataV2Contract.methods.syncWithOld(accounts[0]).send(
				{ from: accounts[0] }
			)
				.on('error', function (error) { msg(error.message); console.log(error); })
	
				.then(function (Obj) {
					
					if (Obj.status == true) {
						$("#lblmsgPrime").text('Synced succeeded');
					}
					else {
						$("#lblmsgPrime").text('Synced failed');
					}
		});	

	}
	catch (ex) {
		console.log(ex);
	}

}

async function _activate(account,type)
{
	msgPrime('');

	try {
		  
		
		window.web3 = new Web3(window.ethereum);
		window.PrimeDataV2Contract = new web3.eth.Contract(PrimeDataV2ABI.abi, PrimeDataV2);
		var exi = await window.PrimeDataV2Contract.methods.isExist(account.toString()).call();
	
		if (!exi) 
		{ msgPrime('account not exists in prime.'); return; }
		
		window.RulesV2ABIContract = new web3.eth.Contract(lib741RulesV2ABI.abi, rulePrimeV2);
		let _value = 0;

		if(type==2)
			_value=await window.RulesV2ABIContract.methods.computeActivateValue().call();

		window.PrimeDataV2Contract = new web3.eth.Contract(PrimeDataV2ABI.abi, PrimeDataV2);
		let response = await window.PrimeDataV2Contract.methods.activateAsOnOld(account).send(
				{ from: account, value: _value.toString() }
			)
				.on('error', function (error) { msg(error.message); console.log(error); })
	
				.then(function (Obj) {
					if (Obj.status == true) {
						$("#lblmsgPrime").text('Activate succeeded');
					}
					else {
						$("#lblmsgPrime").text('Activate failed');
					}
		});	


	}
	catch (ex) {
		console.log(ex);
	}
}



async function onPrimeClaim() {
	$("#lblmsg").text('');
	try {
	
		let accounts = await ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		
		if (!(await isPrimeUser(accounts[0]))) 
		{ msgPrime('user not found.'); return; }

		window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
		let instance = await window.nestedprimecontract.methods.UserToInst(accounts[0]).call();

		window.instancePrimecontract = new web3.eth.Contract(insABIPrime.abi, instance);
	
		let response = await window.instancePrimecontract.methods.Txn(blankAddress,82,0,7).send(
			{ from: accounts[0] }
		)
		//const abic = [{"type":"function","name":"requestClaim","inputs":[],"outputs":[],"stateMutability":"nonpayable"}];
		
		//window.primeDataQueuecontract = new web3.eth.Contract(PrimeDataQueueABI.abi, PrimeDataQueue);
		//let response = await window.primeDataQueuecontract.methods.requestClaim().send(
	//		{ from: accounts[0] }
	//	)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					$("#lblmsg").text('Claim queued');
				}
				else {
					$("#lblmsg").text('queueing failed');
				}
			});


	}
	catch (ex) {
		console.log(ex);
		$("#lblmsg").text('Staking failed');
		//  myalert("Registration failed");
	}
}

async function _loadTransferOwnerPrime() {
	await onTransferOwnerPrime("0x2F1614f6190bD3bd5731a8b6B37DAe79aAd84C15","0x187399f634B002EE91C041bA554E47268830DBCC");
}

async function _loadApprovePrime() {
	
	window.safeprimecontract = new web3.eth.Contract(safeABIPrime.abi, safePrime);
	let isSafe = await window.safeprimecontract.methods.isSafe().call();
	var td = '<td>==> Safeguard Prime</td>';
	if(!isSafe)
	{
		td =td + '<td><button onclick="onApprovePrime(1)" >Approve1</button></td>';
		td =td + '<td><button onclick="onApprovePrime(2)" >Approve2</button></td>';
		td =td + '<td><button onclick="onApprovePrime(3)" >Approve3</button></td>';
	}
	else
		td =td + '<td>&check;</td><td>&check;</td><td>&check;</td>';

	$("#tabApprove").append('<tr>'+td+'</tr>');

	await addSafeOwnerPrime("Service for Prime", service);
	await addSafeOwnerPrime("factory Prime",factoryPrime);
	await addSafeOwnerPrime("importForgePrime", importForgePrime);
	await addSafeOwnerPrime("updatebonus", updatebonus);
	await addSafeOwnerPrime("orc1155Prime (Dragon)",orc1155Prime);
	await addSafeOwnerPrime("Service for PrimeDataV2", PrimeDataV2);
	await addSafeOwnerPrime("Service for PrimeQueue", PrimeDataQueue);
	await addSafeOwnerPrime("Service for GlobalClaimInstance", GlobalClaimInstance);
	await addSafeOwnerPrime("Service(9Oct) for orc1155Prime9Oct", orc1155Prime9Oct);
	await addSafeOwnerPrime("Service(9Oct) for PrimeProxy", PrimeProxy);
	
	
}


async function onApprovePrime(i)
{
		if(i==1) onApprove1Prime();
		if(i==2) onApprove2Prime();
		if(i==3) onApprove3Prime();

}

async function onApprove1Prime() {
	msgPrime('');
	try {

		let accounts = await ethereum.enable();
		var account = accounts[0];

		window.web3 = new Web3(window.ethereum);
		window.safeprimecontract = new web3.eth.Contract(safeABIPrime.abi, safePrime);
		let response = await window.safeprimecontract.methods.approveByV1(true).send(
			{ from: account }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					msgPrime('Approved 1 succeeded');
				}
				else {
					msgPrime('Approval failed');
				}
			});



	}
	catch (ex) {
		console.log(ex);
		msgPrime('Approval failed');
		//  myalert("Registration failed");
	}
}

async function onApprove2Prime() {
	msgPrime('');
	try {

		let accounts = await ethereum.enable();
		var account = accounts[0];

		window.web3 = new Web3(window.ethereum);
		window.safeprimecontract = new web3.eth.Contract(safeABIPrime.abi, safePrime);
		
		
		let response = await window.safeprimecontract.methods.approveByV2(true).send(
			{ from: account }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					msgPrime('Approved 2 succeeded');
				}
				else {
					msgPrime('Approval failed');
				}
			});



	}
	catch (ex) {
		console.log(ex);
		msgPrime('Approval failed');
		//  myalert("Registration failed");
	}
}

async function onApprove3Prime() {
	msgPrime('');
	try {

		let accounts = await ethereum.enable();
		var account = accounts[0];

		window.web3 = new Web3(window.ethereum);
		window.safeprimecontract = new web3.eth.Contract(safeABIPrime.abi, safePrime);
		
		
		let response = await window.safeprimecontract.methods.approveByV3(true).send(
			{ from: account }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					msgPrime('Approved 3 succeeded');
				}
				else {
					msgPrime('Approval failed');
				}
			});



	}
	catch (ex) {
		console.log(ex);
		msgPrime('Approval failed');
		//  myalert("Registration failed");
	}
}


async function onAddOwnerApprovePrime(add)
{
	msgPrime('');
	try {

		let accounts = await ethereum.enable();
		var account = accounts[0];
		window.web3 = new Web3(window.ethereum);
		window.safeprimecontract = new web3.eth.Contract(safeABIPrime.abi, safePrime);
		let response = await window.safeprimecontract.methods.addRemOwner(add, true, true, false).send(
			{ from: account }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					msgPrime('Approval succeeded');
				}
				else {
					msgPrime('Approval failed');
				}
			});



	}
	catch (ex) {
		console.log(ex);
		msgPrime('Approval failed');
		
	}
}

async function onAddOwnerRequestPrime(add)
{

	msgPrime('');
	try {

		let accounts = await ethereum.enable();
		var account = accounts[0];

		window.web3 = new Web3(window.ethereum);
		window.safeprimecontract = new web3.eth.Contract(safeABIPrime.abi, safePrime);
		let response = await window.safeprimecontract.methods.setRequest(add, true, false).send(
			{ from: account }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					msgPrime('Request succeeded');
				}
				else {
					msgPrime('Request failed');
				}
			});



	}
	catch (ex) {
		console.log(ex);
		msgPrime('Request failed');
		
	}
}


async function setshutdownPrime()
{
	
	msgPrime('');
	try {

		let accounts = await ethereum.enable();
		var account = accounts[0];

		window.web3 = new Web3(window.ethereum);
		window.ruleprimeContract = new web3.eth.Contract(RulesABIPrime.abi, rulePrimeV2);
		let response = await window.ruleprimeContract.methods.setshutdown(true).send(
			{ from: account }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					msgPrime('Shutdown succeeded');
				}
				else {
					msgPrime('Shutdown failed');
				}
			});



	}
	catch (ex) {
		console.log(ex);
		msgPrime('Shutdown failed');
		
	}
}

async function addSafeOwnerPrime(name,add)
{
	window.safeprimecontract = new web3.eth.Contract(safeABIPrime.abi, safePrime);
	let isSafeOwner = await window.safeprimecontract.methods.isSafeOwner(add).call();
	let td ='<td>'+name+' SafeOwner</td>';
	window.safeprimecontract = new web3.eth.Contract(safeABIPrime.abi, safePrime);
	let req =await window.safeprimecontract.methods.req().call();
	
	if(!isSafeOwner)
	{
		if(req.newowner==add) {
			if(req.isReq)
			{
				td =td + '<td>'+(req.isVer1?'&check;':'<button onclick="onAddOwnerApprovePrime(\'' + add + '\')" >Approve1</button>')+'</td>';
				td =td + '<td>'+(req.isVer2?'&check;':'<button onclick="onAddOwnerApprovePrime(\'' + add + '\')" >Approve2</button>')+'</td>';
				td =td + '<td>'+(req.isVer3?'&check;':'<button onclick="onAddOwnerApprovePrime(\'' + add + '\')" >Approve3</button>')+'</td>';
			}
			else
			{
				td =td + '<td><button onclick="onAddOwnerRequestPrime(\'' + add + '\')" >Request1 </button></td>';
				td =td + '<td><button onclick="onAddOwnerRequestPrime(\'' + add + '\')" >Request2 </button></td>';
				td =td + '<td><button onclick="onAddOwnerRequestPrime(\'' + add + '\')" >Request3 </button></td>';
			}	
		}
	}
	else
		td =td + '<td>&check;</td><td>&check;</td><td>&check;</td>';

	$("#tabApprove").append('<tr>'+td+'</tr>');
}

function msgPrime(m) {
	$("#lblmsgPrime").text(m);
}



async function onTransferOwnerPrime(from,to)
{
	let td ='<td>'+shortenAddress(from)+'</td><td>'+shortenAddress(to)+'</td>';
	window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
	let instance = await window.nestedprimecontract.methods.UserToInst(from).call();
	window.instancePrimecontract = new web3.eth.Contract(insABIPrime.abi, instance);
	let req =await window.instancePrimecontract.methods.req().call();
	;
	window.instancePrimecontract = new web3.eth.Contract(insABIPrime.abi, instance);
	let owner =await window.instancePrimecontract.methods.owner().call();
	if(owner!=to)
	{
		if(req.isReq)
		{
			td =td + '<td>'+(req.isVer1?'&check;':'<button onclick="TransferOwnerPrime_AddReq(\'' + from + '\',\'' + to + '\')" >Approve1</button>')+'</td>';
			td =td + '<td>'+(req.isVer2?'&check;':'<button onclick="TransferOwnerPrime_AddReq(\'' + from + '\',\'' + to + '\')" >Approve2</button>')+'</td>';
			td =td + '<td>'+(req.isVer3?'&check;':'<button onclick="TransferOwnerPrime_AddReq(\'' + from + '\',\'' + to + '\')" >Approve3</button>')+'</td>';
		}
		else
		{
			td =td + '<td><button onclick="TransferOwnerPrime_SetReq(\'' + from + '\',\'' + to + '\')" >Request1 </button></td>';
			td =td + '<td><button onclick="TransferOwnerPrime_SetReq(\'' + from + '\',\'' + to + '\')" >Request2 </button></td>';
			td =td + '<td><button onclick="TransferOwnerPrime_SetReq(\'' + from + '\',\'' + to + '\')" >Request3 </button></td>';
		}	
	}
	else
		td =td + '<td>&check;</td><td>&check;</td><td>&check;</td>';

	$("#tabApprovePrimeOwner").append('<tr>'+td+'</tr>');
}

async function TransferOwnerPrime_AddReq(from,to)
{
	msgPrime('');
	try {

		let accounts = await ethereum.enable();
		var account = accounts[0];
		window.web3 = new Web3(window.ethereum);
		
		window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
		let instance = await window.nestedprimecontract.methods.UserToInst(from).call();
		window.instancePrimecontract = new web3.eth.Contract(insABIPrime.abi, instance);
	
		let response = await window.instancePrimecontract.methods._setOwner(to,true).send(
			{ from: account }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					msgPrime('Approval succeeded');
				}
				else {
					msgPrime('Approval failed');
				}
			});



	}
	catch (ex) {
		console.log(ex);
		msgPrime('Approval failed');
		
	}
}

async function TransferOwnerPrime_SetReq(from,to)
{

	msgPrime('');
	try {

		let accounts = await ethereum.enable();
		var account = accounts[0];

		window.web3 = new Web3(window.ethereum);
		
		window.nestedprimecontract = new web3.eth.Contract(NestedABIPrime.abi, nestedPrime);
		let instance = await window.nestedprimecontract.methods.UserToInst(from).call();
		window.instancePrimecontract = new web3.eth.Contract(insABIPrime.abi, instance);
	;
		let response = await window.instancePrimecontract.methods._setReq(to).send(
			{ from: account }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					msgPrime('Request succeeded');
				}
				else {
					msgPrime('Request failed');
				}
			});



	}
	catch (ex) {
		console.log(ex);
		msgPrime('Request failed');
		
	}

	
async function TransferOwnerPrimeReset()
{
	$("#lblmsg").text('');
	try {

		


	}
	catch (ex) {
		console.log(ex);
		$("#lblmsg").text('Approval failed');
		
	}
}
}

