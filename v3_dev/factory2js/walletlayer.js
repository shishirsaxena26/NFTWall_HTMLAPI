function copyAddress(element) {
    const fullAddress = element.getAttribute("data-full");
    navigator.clipboard.writeText(fullAddress).then(() => {
      alert("Copied: " + fullAddress);
    }).catch((err) => {
      console.error("Copy failed", err);
    });
  }


  function slice(text) {
	return text.slice(0, 6) + "..." + text.slice(-4)
  }

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



window.web3 = new Web3(new Web3.providers.HttpProvider(provider));
var BN = web3.utils.BN;
var bs1 = new web3.utils.BN("0");;
let factoryABI = {};
let RulesABI = {};
let PriceABI = {};
let NestedABI = {};
let insABI = {};
let ORCABI = {};
let safeABI = {};

pageload();

async function pageload() {
	//
	var version = Date.now(); // or any versioning logic
	safeABI = await fetch('abi/lib723Safeguard.sol/lib723Safeguard.json?v='+version).then(res => res.json());
	RulesABI = await fetch('abi/lib741Rules.sol/lib741Rules.json?v='+version).then(res => res.json());
	PriceABI = await fetch('abi/lib741Price.sol/lib741Price.json?v='+version).then(res => res.json());
	
	NestedABI = await fetch('abi/Nested741.sol/Nested741.json?v='+version).then(res => res.json());
	insABI = await fetch('abi/NodeInstance.sol/NodeInstance.json?v='+version).then(res => res.json());
	ORCABI = await fetch('abi/ORC1155.sol/ORC1155.json?v='+version).then(res => res.json());
	
	await web3.eth.getBlock(4564345).then((e) => { 
		console.log(e); 
	}).catch((e) => {});

	await web3.eth.getBlock(1005172).then((e) => { 
		console.log(e); 
	}).catch((e) => {});
	
	if ($("#tabApprove").length) {
		loadApprove();
		return;
	}
	
	if ($("#tabTree").length) {
		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		let count = await window.nestedcontract.methods.getNodesCount().call();
		$("#totalNodes").html(count);
		await _LoadPrimeTree();
		return;
	}

	if ($("#tabOrc").length) {
		   
		await LoadSystemORC1155(orc1155);
		
		
		await LoadSystemORC1155(orc1155Nanolit);
		await LoadSystemORC1155(orc1155MachineBull);
		
		await LoadSystemORC1155(orc1155Cat);
		await LoadSystemORC1155(orc1155Monalisa);
		   
		await _LoadSystemORC1155Prime();
		   

		return;
	}
	if($("#tabOrcNFT").length) {
		await LoadSystemORCNFT(orc1155Cat);
		await LoadSystemORCNFT(orc1155Monalisa);
		await LoadSystemORCNFT(orc1155MachineBull);
		await LoadSystemORCNFT(orc1155Nanolit);
		await LoadSystemORCNFT(orc1155);

	}
	

	if ($("#txtto").length) {
		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		let age = await window.nestedcontract.methods.age().call();
		$("#txtto").val(age);
		$("#txtfrom").val(parseInt(age)-10);
	};

	if ($("#txtAdd").length) {	
		LoadSystemRankClause();
		LoadSystemLevelClause();
		LoadSystemPoolClause();

		$("#txtRootAdd").val(rootSponser);
		$("#transferAdd").text(transfer);
		$("#transferBal").text(web3.utils.fromWei((await web3.eth.getBalance(transfer)), 'ether'));

		let accounts = await ethereum.enable();
		$("#txtAdd").val(accounts[0]);
	}
	
}
var profilecontract;
var t = web3.eth.getChainId(console.log);
const gasPrice = web3.eth.getGasPrice(console.log);

async function LoadTree(){
	if (!$("#tabTree").length) return;
	window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
	let count = await window.nestedcontract.methods.getNodesCount().call();
	
	for (let i = 0; i<parseInt(count); i++) {
		
		var td = '';
		
		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		let nodeIns = await window.nestedcontract.methods.getNodeByIndex(i).call();
		
		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		let node = await window.nestedcontract.methods.InstToUser(nodeIns).call();
		
		
		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		let nodeDet = await window.nestedcontract.methods.getNode(nodeIns).call();
		

		td =td + '<td>' + nodeDet.i + '</td>';
		td =td + '<td>' + node + '</td>';
		td =td + '<td>' + nodeIns + '</td>';
		td =td + '<td>' + nodeDet.cage + '</td>';
		
		
		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		let pa = await window.nestedcontract.methods.InstToUser(nodeDet.pa).call();
		td =td + '<td>' + pa + '</td>';
		td =td + '<td>' + nodeDet.pa + '</td>';

		

		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		let dc = await window.nestedcontract.methods.getNodeDirectsCount(nodeIns).call();
		
		td =td + '<td>' + dc+ '</td>';

		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		
		let rnk = await window.nestedcontract.methods.getEffectiveRank(nodeIns).call();
		
		td =td + '<td>' + rnk+ '</td>';

		window.instancecontract = new web3.eth.Contract(insABI.abi, nodeIns);
		let mc = await window.instancecontract.methods.mintCount().call();
		td =td + '<td>' + mc+ '</td>';

		$("#tabTree").append('<tr>' + td + '</tr>');
	}
}

async function onGetDailyBusiness(){
	
	var r3 = new BN("0");
	var r5 = new BN("0");
	var r7 = new BN("0");
	if (!$("#txtfrom").length) return;
	var from = $("#txtfrom").val();
	if (!from) { msg('from is blank'); return; }
	
	var to = $("#txtto").val();
	if (!to) { msg('to is blank'); return; }

	window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
	let age = await window.nestedcontract.methods.age().call();
	for (let i = parseInt(to); i>=parseInt(from); i--) {
		let b = await window.nestedcontract.methods.getbusiness(i).call();
		
		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		let Ct0 = await window.nestedcontract.methods.getrankCount(i,0).call();
		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		let Ct1 = await window.nestedcontract.methods.getrankCount(i,1).call();
		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		let Ct2 = await window.nestedcontract.methods.getrankCount(i,2).call();
		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		let Ct3 = await window.nestedcontract.methods.getrankCount(i,3).call();
		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		let Ct4 = await window.nestedcontract.methods.getrankCount(i,4).call();
		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		let Ct5 = await window.nestedcontract.methods.getrankCount(i,5).call();
		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		let Ct6 = await window.nestedcontract.methods.getrankCount(i,6).call();
		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		let Ct7 = await window.nestedcontract.methods.getrankCount(i,7).call();
		var royal3 = new BN('0');
		var royal5 = new BN('0');
		var royal7 = new BN('0');
		
		if(parseInt(Ct3)>0)
		{	royal3=(new BN(((new BN(b)).mul(new BN("18")).div(new BN("1000"))).toString())).div(new BN(Ct3.toString()));
		}
		if(parseInt(Ct5)>0)
		{
			royal5=(new BN(((new BN(b)).mul(new BN("18")).div(new BN("1000"))).toString())).div(new BN(Ct5.toString()));
		}
		if(parseInt(Ct7)>0)
		{
			royal7=(new BN(((new BN(b)).mul(new BN("9")).div(new BN("1000"))).toString())).div(new BN(Ct7.toString()));
		}
		
		r3=r3.add(new BN(royal3.toString()));
		r5=r5.add(new BN(royal5.toString()));
		r7=r7.add(new BN(royal7.toString()));
		

		$("#r3td").html(r3.toString());
		$("#r5td").html(r5.toString());
		$("#r7td").html(r7.toString());
		
		$("#tabDailyBusiness").append('<tr><td>'+i+'</td><td>'+b+'</td><td>'+Ct0+'</td><td>'+Ct1+'</td><td>'+Ct2+'</td><td>'+Ct3+'</td><td>'+Ct4+'</td><td>'+Ct5+'</td><td>'+Ct6+'</td><td>'+Ct7+'</td><td>'+royal3.toString()+'</td><td>'+royal5.toString()+'</td><td>'+royal7.toString()+'</td></tr>');
	}	

	

	
	
}

async function LoadRules()
{
	window.ruleContract = new web3.eth.Contract(RulesABI.abi, rule);
	
	let ozn = await window.ruleContract.methods.ozoneprice().call();
	  
	$('#oznprice').text(`Price: `+web3.utils.fromWei(ozn.toString(), 'ether'));

	window.ruleContract = new web3.eth.Contract(RulesABI.abi, rule);
	let shutdown = await window.ruleContract.methods.shutdown().call();
	$('#shutdown').text(`Shutdown: `+ shutdown);

	window.ruleContract = new web3.eth.Contract(RulesABI.abi, rule);
	let freeIntervals = await window.ruleContract.methods.freeIntervals().call();
	$('#freeIntervals').text(`FreeIntervals: `+ freeIntervals);

	window.ruleContract = new web3.eth.Contract(RulesABI.abi, rule);
	let claimMinLimit = await window.ruleContract.methods.claimMinLimit().call();
	$('#claimMinLimit').text(`claimMinLimit: `+web3.utils.fromWei((BigInt(claimMinLimit.toString())).toString(), 'ether'));
	
	window.ruleContract = new web3.eth.Contract(RulesABI.abi, rule);
	let claimMaxLimit = await window.ruleContract.methods.claimMaxLimit().call();
	$('#claimMaxLimit').text(`claimMaxLimit: `+web3.utils.fromWei((BigInt(claimMaxLimit.toString())).toString(), 'ether'));
	window.ruleContract = new web3.eth.Contract(RulesABI.abi, rule);
	let mintMin = await window.ruleContract.methods.mintMin().call();
	$('#mintMin').text(`mintMin: `+ (parseInt(mintMin)).toString());
	
	window.ruleContract = new web3.eth.Contract(RulesABI.abi, rule);
	let mintMax = await window.ruleContract.methods.mintMax().call();
	$('#mintMax').text(`mintMax: `+ (parseInt(mintMax)).toString());

	window.ruleContract = new web3.eth.Contract(RulesABI.abi, rule);
	let mintDailyLimit = await window.ruleContract.methods.mintDailyLimit().call();
	$('#mintDailyLimit').text(`mintDailyLimit: `+ mintDailyLimit.toString());
	
}
//console.log(parseFloat(0x8fce90cedbb7ab800));
async function LoadSystemRankClause() {
	LoadRules();
	window.ruleContract = new web3.eth.Contract(RulesABI.abi, rule);
	let tour = await window.ruleContract.methods.tourClause(2).call();
	$("#tabTour").append('<tr><td>Rank</td><td>Tour</td></tr>');
	$("#tabTour").append('<tr><td>2</td><td>'+web3.utils.fromWei(tour.toString(), 'ether')+' $</td></tr>');
	let gift = await window.ruleContract.methods.tourClause(4).call();
	$("#tabTour").append('<tr><td>Rank</td><td>Gift</td></tr>');
	$("#tabTour").append('<tr><td>4</td><td>'+web3.utils.fromWei(gift.toString(), 'ether')+' $</td></tr>');
		
	
	
	for (let i = 1; i <=7; i++) {	
		window.ruleContract = new web3.eth.Contract(RulesABI.abi, rule);
		let rnkCl = await window.ruleContract.methods.rankClause(i).call();
		var td = '<td>' + i + '</td>';
		td =td + '<td>' + rnkCl.direct + '</td>';
		td =td + '<td>' + rnkCl.nftAmount + '</td>';

		

		

		if(i==3 || i==5|| i==7)
		{
			window.ruleContract = new web3.eth.Contract(RulesABI.abi, rule);
			let roy = await window.ruleContract.methods.royalityClause(i).call()
			td =td + '<td>' + parseFloat(roy.rwNum)/parseFloat(roy.rwDen) +'% ' + roy.rwEnd + ' days' + '</td>';
		}
		else td =td + '<td></td>';
		
		

		$("#tabRank").append('<tr>' + td + '</tr>');
	}
}
async function LoadSystemLevelClause() {
	for (let i = 1; i <=15; i++) {	
		window.ruleContract = new web3.eth.Contract(RulesABI.abi, rule);
		let lvl = await window.ruleContract.methods.levelClause(i).call()
		var td = '<td>' + i + '</td>';
		td =td + '<td>' + lvl.rank + '</td>';
		td =td + '<td>' + parseFloat(lvl.rwNum)/parseFloat(lvl.rwrDen) +'%' + '</td>';
		td =td + '<td>' + parseFloat(lvl.yeiNum)/parseFloat(lvl.yeiDen) +'%'+ '</td>';
		$("#tabLvl").append('<tr>' + td + '</tr>');
	}
	
}

async function LoadSystemPoolClause() {
	
		window.ruleContract = new web3.eth.Contract(RulesABI.abi, rule);
		let p = await window.ruleContract.methods.pool().call();
		
		var td = '<td> New </td>';
		td = td + '<td>' + parseFloat(p.stakeN)/parseFloat(p.stakeD) +'%' + '</td>';
		td = td + '<td>' + parseFloat(p.roiN)/parseFloat(p.roiD) +'%'+ '</td>';
		td = td +'<td>' + p.startafter + '</td>';
		td = td +'<td>' + p.roiInt + '</td>'
		td = td +'<td>' + p.roiEnd + '</td>'
		$("#tabPool").append('<tr>' + td + '</tr>');
	
		let n = await window.ruleContract.methods.poolNFT1().call();
		
		td = '<td> NFT Pool 1 </td>';
		
		td = td + '<td>' + parseFloat(n.roiN)/parseFloat(n.roiD) +'%'+ '</td>';
		
		td = td +'<td>' + n.roiInt + '</td>'
		
		$("#tabPoolNFT").append('<tr>' + td + '</tr>');

		n = await window.ruleContract.methods.poolNFT2().call();
		
		td = '<td> NFT Pool 2 </td>';
		
		td = td + '<td>' + parseFloat(n.roiN)/parseFloat(n.roiD) +'%'+ '</td>';
		
		td = td +'<td>' + n.roiInt + '</td>'
		
		$("#tabPoolNFT").append('<tr>' + td + '</tr>');


		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		let age = await window.nestedcontract.methods.age().call();
		$("#systemAge").html('System Age ' + age);
}

async function LoadSystemORC1155(o1155) {
	
	window.web3 = new Web3(new Web3.providers.HttpProvider(provider));
	
	if (!$("#tabOrc").length) return;
	
	window.factorycontract = new web3.eth.Contract(factoryABI.abi, factory);
	if (!(await window.factorycontract.methods.isORC1155(o1155).call())) 
	
	    
	window.orc1155contract = new web3.eth.Contract(ORCABI.abi, o1155);
	
	//let baseMetadataURI =await window.orc1155contract.methods.baseMetadataURI().call();
	
	window.orc1155contract = new web3.eth.Contract(ORCABI.abi, o1155);
debugger;
	let totSupply =await window.orc1155contract.methods.totSupply().call();
	debugger;
	window.orc1155contract = new web3.eth.Contract(ORCABI.abi, o1155);
	let curSupply =await window.orc1155contract.methods.curSupply().call();
	window.orc1155contract = new web3.eth.Contract(ORCABI.abi, o1155);
	let name =await window.orc1155contract.methods.name().call();
	
	let tr='';
	let td = '<td> ' + name + '</td><td>'+o1155+' </td>';
	td = td +'<td>' + totSupply + '</td>'
	td = td +'<td>' + curSupply + '</td>'
	tr = '<tr>' + td + '</tr>';
	
	let flag=true;
	let i=1;
	td = '<td colspan="5" style="display: flex;"><div style="overflow-x: scroll; display:flex; width:400px;">';
	while(flag) {
		let tokenName =await window.orc1155contract.methods.idToName(i).call();
		
		if(!tokenName) { flag= false; }
		else {
			let metadata =await window.orc1155contract.methods.uri(i).call();
			let meta = await fetch(metadata).then(res => res.json());
			
			td = td + '<div class="NFTdiv"><img src="'+meta.image+'" width="50px" height="50px" /><br/>'+i+' - '+tokenName+'</div>';
			i++;
		}
	}

	

	td = td +'</div></td>';
	tr = tr + '<tr>' + td + '</tr>';
	
	$("#tabOrc").append(tr);
	
}


async function LoadSystemORCNFT(o1155) {
	
	if (!$("#tabOrcNFT").length) return;
	
	window.web3 = new Web3(new Web3.providers.HttpProvider(provider));
	window.factorycontract = new web3.eth.Contract(factoryABI.abi, factory);
	if (!(await window.factorycontract.methods.isORC1155(o1155).call())) 
	
	    
	window.orc1155contract = new web3.eth.Contract(ORCABI.abi, o1155);
	
	//let baseMetadataURI =await window.orc1155contract.methods.baseMetadataURI().call();
	
	window.orc1155contract = new web3.eth.Contract(ORCABI.abi, o1155);
	let totSupply =await window.orc1155contract.methods.totSupply().call();
	window.orc1155contract = new web3.eth.Contract(ORCABI.abi, o1155);
	let curSupply =await window.orc1155contract.methods.curSupply().call();
	window.orc1155contract = new web3.eth.Contract(ORCABI.abi, o1155);
	let name =await window.orc1155contract.methods.name().call();
	window.orc1155contract = new web3.eth.Contract(ORCABI.abi, o1155);
	let getTokenCount =await window.orc1155contract.methods.getTokenCount().call();
	let tr='';
	let td = '<td> ' + name + '</td><td>'+o1155+' </td>';
	td = td +'<td> <button onclick="getNFT(\''+ o1155 + '\','+getTokenCount+')">' + getTokenCount + '</button> </td>'
	td = td +'<td>' + totSupply + '</td>'
	td = td +'<td>' + curSupply + '</td>'
	tr = '<tr>' + td + '</tr>';
	
	
	$("#tabOrcNFT").append(tr);
	
}

async function getNFT(o,count) {
	alert('Please wait, it may take a while to load NFTs.');
	$("#divNFT").html('');
	window.orc1155contract = new web3.eth.Contract(ORCABI.abi, o);
	let i=1;

	let promises = [];

    for (let i = 1; i <= count; i++) {
        promises.push(
            (async (index) => {
                try {
                    let metadataUrl = await window.orc1155contract.methods.uri(index).call();
                    let meta = await fetch(metadataUrl).then(res => res.json());
                    //let path = 'http://52.220.77.185/' + new URL(meta.image).hostname.split(".")[0];
					let path = meta.image.replace('.ozonestore.io', '.ashokaverse.io');;
					console.log(path);
					let tokenName = await window.orc1155contract.methods.idToName(index).call();

                    // Append immediately (non-blocking UI)
                    $("#divNFT").append(
                        `<div class="NFTdiv">
                            <img src="${path}" loading="lazy" />
                            <br/>${index} - ${tokenName}
                        </div>`
                    );
                } catch (e) {
                    console.error("Error loading token " + index, e);
                }
            })(i)
        );
    }

	    // Wait for all metadata to load in background (no UI freeze)
    await Promise.all(promises);

}
async function onLoadRootAddress() {
	
	var n = $("#txtRootAdd").val();
	if (!n) { msg('txtRootAdd is blank'); return; }
	loadAddressData(n);
	loadAddressDataPrime(n);
}

async function onLoadAddress() {
	var n = $("#txtAdd").val();
	if (!n) { msg('address is blank'); return; }
	loadAddressData(n);
	loadAddressDataPrime(n);
}
async function loadAddressData(n) {
	
	window.factorycontract = new web3.eth.Contract(factoryABI.abi, factory);
	if (!(await window.factorycontract.methods.isuser(n).call())) 
		{ msg('Instance is not created.'); return; }

		
	var header1 = $($("#tab").find('tr')[0]).clone();
	await loadStructure(n, header1);
}


async function loadStructure(n, header) {
	
	window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
	let age = await window.nestedcontract.methods.age().call();

	var td = '<td>' + n + '</td>';
	window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
	let instance = await window.nestedcontract.methods.UserToInst(n).call();
	td =td + '<td>' + instance + '</td>';
	
	td =td + '<td>' +  web3.utils.fromWei((await web3.eth.getBalance(instance)), 'ether') + '</td>';
	window.instancecontract = new web3.eth.Contract(insABI.abi, instance);
	
	let cage =await window.instancecontract.methods.cage().call();
	td =td + '<td>' + (cage) + '</td>';
	window.instancecontract = new web3.eth.Contract(insABI.abi, instance);
	
	let mintnumber =await window.instancecontract.methods.mintCount().call();
	td =td + '<td>' + (mintnumber) + '</td>';
	let bonus =await window.instancecontract.methods.bonus().call();
	td =td + '<td>' + (web3.utils.fromWei(bonus.toString(), 'ether')) + '</td>';
	let vali =await window.instancecontract.methods.validator().call();
	td =td + '<td>' + (vali) + '</td>';
	$("#tab").append('<tr ' + cstyle + ' >' + td + '</tr>');
	
	window.instancecontract = new web3.eth.Contract(insABI.abi, instance);
	let inc = await window.instancecontract.methods.drawn().call()
	
	td ='<td>' + web3.utils.fromWei(inc[0].toString(), 'ether') + '</td>';
	td =td + '<td>' +  web3.utils.fromWei(inc[1].toString(), 'ether') + '</td>';
	td =td + '<td>' +  web3.utils.fromWei(inc[2].toString(), 'ether') + '</td>';
	td =td + '<td>' +  web3.utils.fromWei(inc[3].toString(), 'ether') + '</td>';
	td =td + '<td>' +  web3.utils.fromWei(inc[4].toString(), 'ether') + '</td>';
	td =td + '<td>' +  web3.utils.fromWei(inc[5].toString(), 'ether') + '</td>';
	
	var cstyle = "";
	$("#tabIncome").append('<tr ' + cstyle + ' >' + td + '</tr>');

	window.instancecontract = new web3.eth.Contract(insABI.abi, instance);
	let dage = await window.instancecontract.methods.drawnage().call();
	

	
	loadPool(n,instance,dage);
	
	loadLSB(instance,dage,age);
	loadlevelbusiness(instance);

	
	
	for (let i = 1; i<=parseInt(mintnumber); i++) {
		td = '<td>'+i+'</td>';	
		let orc =await window.instancecontract.methods.mints(i).call();
		window.orc1155contract = new web3.eth.Contract(ORCABI.abi, orc);
		//uint256 amount,uint timestamp, uint256 claimed,  uint256 value, uint mtype

		
		
		window.orc1155contract = new web3.eth.Contract(ORCABI.abi, orc);
		let a =await window.orc1155contract.methods.mintedAge().call();
		window.orc1155contract = new web3.eth.Contract(ORCABI.abi, orc);
		let amt =await window.orc1155contract.methods.mintAmt().call();
		window.orc1155contract = new web3.eth.Contract(ORCABI.abi, orc);
		let q =await window.orc1155contract.methods.mintedqty().call();

		let orcname =await window.orc1155contract.methods.name().call();
		let tokenName =await window.orc1155contract.methods.names(0).call();
		let id =await window.orc1155contract.methods.ids(0).call();
		let metadata =await window.orc1155contract.methods.uri(id).call();
		let meta = await fetch(metadata).then(res => res.json());

		amt = web3.utils.fromWei(amt, 'ether');
		
		td = td  + '<td onclick="copyAddress(this)" data-full="'+orc+'">'+slice(orc)+'<br/>'+orcname+'<br/><img src="'+meta.image+'" width="50px" height="50px" /><br/>1 - '+tokenName+'</td>';
		td = td  + '<td>'+a+'</td>';
		td = td  + '<td>'+amt+'</td>';
		td = td  + '<td>'+q+'</td>';

		window.orc1155contract = new web3.eth.Contract(ORCABI.abi, orc);
		let cl =await window.orc1155contract.methods.claimed().call();
		//
		td = td  + '<td>'+cl+'</td>';
		window.orc1155contract = new web3.eth.Contract(ORCABI.abi, orc);
		let ul =await window.orc1155contract.methods._getUnlockedNFT().call();
		td = td  + '<td>'+ul+'</td>';
		let cal = parseFloat(ul)-parseFloat(cl);
		
		td = td  + '<td><button id="btnWth" onclick="onNFTTransfer(\'' + orc + '\','+id+',\''+rootSponser+'\',\''+ (cal) +'\')">'+ (cal) +'</button></td>';

		$("#tabMint").append('<tr>' + td + '</tr>');
		
	}
	
}


async function loadPool(n, instance, dage) {
	
	window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
	var va1 = await window.nestedcontract.methods.getRewards(instance).call();
	
	let age = await window.nestedcontract.methods.age().call();

	window.instancecontract = new web3.eth.Contract(insABI.abi, instance);
	$("#id").text((await instancecontract.methods.id().call()));
	
	window.instancecontract = new web3.eth.Contract(insABI.abi, instance);
	let inc = await window.instancecontract.methods.compute(9999).call();
	
	tr1 = $($("#tabCalIncome").find('tr')[0]).clone();
	let td= '';
	td =td + '<td>' + web3.utils.fromWei(inc[0].toString(), 'ether') + '</td>';
	td =td + '<td>' + web3.utils.fromWei(inc[4].toString(), 'ether') + '</td>';
	td =td + '<td>' + web3.utils.fromWei(inc[5].toString(), 'ether') + '</td>';
	td =td + '<td>' + web3.utils.fromWei(inc[3].toString(), 'ether') + '</td>';
	td =td + '<td>' + web3.utils.fromWei(inc[2].toString(), 'ether') + '</td>';
	td =td + '<td>' + inc[6].toString() + '</td>';
	td =td + '<td>' + dage + '</td>';
	$("#tabCalIncome").append('<tr>' + td + '</tr>');
	
	window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
	tr1 = $($("#tabDet").find('tr')[0]).clone();
	td= '';
	window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
	var parentins = await window.nestedcontract.methods.getNodeParent(instance).call();
	td =td + '<td>' + parentins + '</td>';

	window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
	td =td + '<td>' + (await window.nestedcontract.methods.InstToUser(parentins).call()) + '</td>';
	window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
	td =td + '<td>' + (await window.nestedcontract.methods.getNodeDirectsCount(instance).call()) + '</td>';
	window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
	td =td + '<td>' + (await window.nestedcontract.methods.getEffectiveRank(instance).call()) + '</td>';
	window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
	td =td + '<td>' + (await window.nestedcontract.methods.isNode(instance).call()) + '</td>';
	window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
	td =td + '<td>' + (await window.nestedcontract.methods.isStop(instance).call()) + '</td>';
	
	$("#tabDet").append('<tr>' + td + '</tr>');
	
	window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
	td= '';
	td =td + '<td>' +  web3.utils.fromWei(inc[1], 'ether') + '</td>';
	window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
	td =td + '<td>' + (await window.nestedcontract.methods.getnodeRnkAge(instance, 3).call()) + '</td>';
	window.instancecontract = new web3.eth.Contract(insABI.abi, instance);
	td =td + '<td>' + (await window.instancecontract.methods.royaldage(3).call()) + '</td>';
	
	window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
	td =td + '<td>' + (await window.nestedcontract.methods.getnodeRnkAge(instance, 5).call()) + '</td>';
	window.instancecontract = new web3.eth.Contract(insABI.abi, instance);
	td =td + '<td>' + (await window.instancecontract.methods.royaldage(5).call()) + '</td>';

	window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
	td =td + '<td>' + (await window.nestedcontract.methods.getnodeRnkAge(instance, 7).call())+ '</td>';
	window.instancecontract = new web3.eth.Contract(insABI.abi, instance);
	td =td + '<td>' + (await window.instancecontract.methods.royaldage(7).call()) + '</td>';

	$("#tabRoyalityIncome").append('<tr>' + td + '</tr>');
	
}

async function loadlevelbusiness(instance) {
	var tr1 = $($("#tabLevel").find('tr')[0]).clone();
	window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
	let level = (await window.nestedcontract.methods.getNodeLvlDepth(instance).call());
	
	for (let i=0; i<level; i++) {
		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		var td = '<td>' + (i==0?"self":i) + '</td>';
		
		let lb = await window.nestedcontract.methods.getNodeLB(instance,i).call();
		
		td =td + '<td>' + web3.utils.fromWei(lb[0], 'ether') + '</td>';
		td =td + '<td>' + lb[1] + '</td>';
		$("#tabLevel").append('<tr>' + td + '</tr>');
	}
	
}


async function loadLSB(instance,dage,age) {
	
	for(let i=dage; i<=(parseInt(age)+2); i++) {	
		window.instancecontract = new web3.eth.Contract(insABI.abi, instance);
		let lsb = await window.instancecontract.methods.LSB(i).call();
		$("#tabLBS").append('<tr><td>'+i+'</td><td>'+lsb+'</td></tr>');
	}
	
}



async function loadApprove()
{
	
	window.safecontract = new web3.eth.Contract(safeABI.abi, safe);
	let isSafe = await window.safecontract.methods.isSafe().call();
	
	
	var td = '<td>==> Safeguard</td>';
	if(!isSafe)
	{
		td =td + '<td><button onclick="onApprove(1)" >Approve1</button></td>';
		td =td + '<td><button onclick="onApprove(2)" >Approve2</button></td>';
		td =td + '<td><button onclick="onApprove(3)" >Approve3</button></td>';
	}
	else
		td =td + '<td>&check;</td><td>&check;</td><td>&check;</td>';

	$("#tabApprove").append('<tr>'+td+'</tr>');

	
	await addSafeOwner("factory", factory);
	await addSafeOwner("ImportForge", importForge);
	await addSafeOwner("importForgePrime", importForgePrime);
	await addSafeOwner("Service", service);
	
	await addSafeOwner("ORC1155 (Lion) ", orc1155);
	await addSafeOwner("Monalisa", orc1155Monalisa);
	await addSafeOwner("Nanolit", orc1155Nanolit);
	await addSafeOwner("Machine Bull", orc1155MachineBull);
	await addSafeOwner("Cat", orc1155Cat);
	
	await _loadApprovePrime();
}

async function addSafeOwner(name,add)
{
	window.safecontract = new web3.eth.Contract(safeABI.abi, safe);
	isSafeOwner = await window.safecontract.methods.isSafeOwner(add).call();
	let td ='<td>'+name+' SafeOwner</td>';
	window.safecontract = new web3.eth.Contract(safeABI.abi, safe);
	req =await window.safecontract.methods.req().call();
	
	if(!isSafeOwner)
	{
		if(req.isReq)
		{
			td =td + '<td>'+(req.isVer1?'&check;':'<button onclick="onAddOwnerApprove(\'' + add + '\')" >Approve1</button>')+'</td>';
			td =td + '<td>'+(req.isVer2?'&check;':'<button onclick="onAddOwnerApprove(\'' + add + '\')" >Approve2</button>')+'</td>';
			td =td + '<td>'+(req.isVer3?'&check;':'<button onclick="onAddOwnerApprove(\'' + add + '\')" >Approve3</button>')+'</td>';
		}
		else
		{
			td =td + '<td><button onclick="onAddOwnerRequest(\'' + add + '\')" >Request1 </button></td>';
			td =td + '<td><button onclick="onAddOwnerRequest(\'' + add + '\')" >Request2 </button></td>';
			td =td + '<td><button onclick="onAddOwnerRequest(\'' + add + '\')" >Request3 </button></td>';
		}	
	}
	else
		td =td + '<td>&check;</td><td>&check;</td><td>&check;</td>';

	$("#tabApprove").append('<tr>'+td+'</tr>');
}

async function loadStructure121(n, header) {


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
async function loadData1() {

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
			//
			console.log(events);
			//res.send('response ' + JSON.stringify(stores));			// same results as the optional callback above
		});;


}
//showLogs();

function msg(m) {
	
	$("#lblmsg").text(m);
}


async function onAddOwnerApprove(add)
{
	$("#lblmsg").text('');
	try {

		let accounts = await ethereum.enable();
		var account = accounts[0];
		window.web3 = new Web3(window.ethereum);
		window.safecontract = new web3.eth.Contract(safeABI.abi, safe);
		let response = await window.safecontract.methods.addRemOwner(add, true, true, false).send(
			{ from: account }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					$("#lblmsg").text('Approval succeeded');
				}
				else {
					$("#lblmsg").text('Approval failed');
				}
			});



	}
	catch (ex) {
		console.log(ex);
		$("#lblmsg").text('Approval failed');
		
	}
}

async function onAddOwnerRequest(add)
{

	$("#lblmsg").text('');
	try {

		let accounts = await ethereum.enable();
		var account = accounts[0];

		window.web3 = new Web3(window.ethereum);
		window.safecontract = new web3.eth.Contract(safeABI.abi, safe);
		let response = await window.safecontract.methods.setRequest(add, true,false).send(
			{ from: account }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					$("#lblmsg").text('Request succeeded');
				}
				else {
					$("#lblmsg").text('Request failed');
				}
			});



	}
	catch (ex) {
		console.log(ex);
		$("#lblmsg").text('Request failed');
		
	}
}

async function onApprove(i)
{
		if(i==1) onApprove1();
		if(i==2) onApprove2();
		if(i==3) onApprove3();

}

async function onApprove1() {
	$("#lblmsg").text('');
	try {

		let accounts = await ethereum.enable();
		var account = accounts[0];

		window.web3 = new Web3(window.ethereum);
		window.safecontract = new web3.eth.Contract(safeABI.abi, safe);


		let response = await window.safecontract.methods.approveByV1(true).send(
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
		window.safecontract = new web3.eth.Contract(safeABI.abi, safe);

		
		let response = await window.safecontract.methods.approveByV2(true).send(
			{ from: account }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					$("#lblmsg").text('Approved 2 succeeded');
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

async function onApprove3() {
	$("#lblmsg").text('');
	try {

		let accounts = await ethereum.enable();
		var account = accounts[0];

		window.web3 = new Web3(window.ethereum);
		window.safecontract = new web3.eth.Contract(safeABI.abi, safe);

		
		let response = await window.safecontract.methods.approveByV3(true).send(
			{ from: account }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					$("#lblmsg").text('Approved 3 succeeded');
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


async function onJoin1() {
	$("#lblmsg").text('');

	try {
		
		var parent = $("#txtparent").val();
		if (!parent) { msg('parent is blank'); return; }

		let accounts = await ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		window.factorycontract = new web3.eth.Contract(factoryABI.abi, factory);
		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);

		if (!(await window.factorycontract.methods.isuser(accounts[0]).call())) 
		{ msg('Instanced is not created.'); return; }
		
		let instance = await window.nestedcontract.methods.UserToInst(accounts[0]).call();
		window.instancecontract = new web3.eth.Contract(insABI.abi, instance);
		 
		let response = await window.instancecontract.methods.Txn(parent,0,0,5,9999).send(
			{ from: accounts[0] }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					$("#lblmsg").text('Joined succeeded');
				}
				else {
					$("#lblmsg").text('Joined failed');
				}
			});

	}
	catch (ex) {
		console.log(ex);

		//  myalert("Registration failed");
	}
}


async function onDeploy()
{
		msgPrime('');
		
		try {

			let accounts = await ethereum.enable();
			window.web3 = new Web3(window.ethereum);
			debugger;
			const contract = new web3.eth.Contract(insABI.abi);
			debugger;
			
			let response2 = await web3.eth.sendTransaction({
				from: accounts[0],
				data: '0x60806040523462000023576200001462000029565b61426462000034823961426490f35b6200002f565b60405190565b5f80fdfe60806040526004361015610018575b361561001657005b005b6100225f35610171565b80630b98f9751461016c5780630d43aaf21461016757806312065fe0146101625780631bff68401461015d5780632a31f6b414610158578063379a423c146101535780633ac65bf71461014e5780633b844f9b1461014957806341ffe7c41461014457806360af454d1461013f5780636d24b8071461013a578063760f8ea8146101355780637fdd2b62146101305780638da5cb5b1461012b578063abb8c96514610126578063b90306ad14610121578063c73fddeb1461011c578063c9ce1e2814610117578063cbf0b0c014610112578063ee53a0461461010d5763f3fef3a30361000e57610b48565b610aee565b610a65565b610a30565b6109eb565b6109c2565b61098e565b61092c565b6108f8565b610875565b61083f565b6107e9565b6107b6565b61077e565b61070d565b610652565b6105f3565b610487565b610404565b6103a9565b6101d2565b60e01c90565b60405190565b5f80fd5b5f80fd5b5f80fd5b90565b61019581610189565b0361019c57565b5f80fd5b905035906101ad8261018c565b565b906020828203126101c8576101c5915f016101a0565b90565b610181565b5f0190565b34610200576101ea6101e53660046101af565b610fc9565b6101f2610177565b806101fc816101cd565b0390f35b61017d565b5f91031261020f57565b610181565b5f1c90565b60018060a01b031690565b61023061023591610214565b610219565b90565b6102429054610224565b90565b60a01c90565b60ff1690565b61025d61026291610245565b61024b565b90565b61026f9054610251565b90565b60a81c90565b61028461028991610272565b61024b565b90565b6102969054610278565b90565b60b01c90565b6102ab6102b091610299565b61024b565b90565b6102bd905461029f565b90565b60b81c90565b6102d26102d7916102c0565b61024b565b90565b6102e490546102c6565b90565b600d6102f45f8201610238565b916103005f8301610265565b9161030c5f820161028c565b916103235f61031c8185016102b3565b93016102da565b90565b60018060a01b031690565b61033a90610326565b90565b61034690610331565b9052565b151590565b6103589061034a565b9052565b909594926103a7946103966103a09261038c60809661038260a088019c5f89019061033d565b602087019061034f565b604085019061034f565b606083019061034f565b019061034f565b565b346103dd576103b9366004610205565b6103d96103c46102e7565b916103d0959395610177565b9586958661035c565b0390f35b61017d565b6103eb90610189565b9052565b9190610402905f602085019401906103e2565b565b3461043457610414366004610205565b61043061041f610fe4565b610427610177565b918291826103ef565b0390f35b61017d565b1c90565b61044d9060086104529302610439565b610219565b90565b90610460915461043d565b90565b61046f600f5f90610455565b90565b9190610485905f6020850194019061033d565b565b346104b757610497366004610205565b6104b36104a2610463565b6104aa610177565b91829182610472565b0390f35b61017d565b6104c581610331565b036104cc57565b5f80fd5b905035906104dd826104bc565b565b5f80fd5b5f80fd5b5f80fd5b909182601f830112156105255781359167ffffffffffffffff831161052057602001926001830284011161051b57565b6104e7565b6104e3565b6104df565b91909160408184031261056b57610543835f83016104d0565b92602082013567ffffffffffffffff81116105665761056292016104eb565b9091565b610185565b610181565b5190565b60209181520190565b5f5b83811061058f575050905f910152565b80602091830151818501520161057f565b601f801991011690565b6105c96105d26020936105d7936105c081610570565b93848093610574565b9586910161057d565b6105a0565b0190565b6105f09160208201915f8184039101526105aa565b90565b61061b61060a61060436600461052a565b91611261565b610612610177565b918291826105db565b0390f35b9060208282031261063857610635915f016104d0565b90565b610181565b9190610650905f6020850194019061034f565b565b346106825761067e61066d61066836600461061f565b6112ec565b610675610177565b9182918261063d565b0390f35b61017d565b9694929099989795939161012088019a5f89016106a3916103e2565b602088016106b0916103e2565b604087016106bd916103e2565b606086016106ca9161033d565b608085016106d7916103e2565b60a084016106e4916103e2565b60c083016106f1916103e2565b60e082016106fe916103e2565b6101000161070b9161033d565b565b346107475761071d366004610205565b61074361072861145f565b9561073a999799959195949294610177565b998a998a610687565b0390f35b61017d565b60409061077561077c949695939661076b60608401985f8501906103e2565b60208301906103e2565b01906103e2565b565b346107b1576107ad6107996107943660046101af565b6115b1565b6107a4939193610177565b9384938461074c565b0390f35b61017d565b346107e4576107ce6107c936600461061f565b611c8d565b6107d6610177565b806107e0816101cd565b0390f35b61017d565b34610817576108016107fc36600461061f565b611db1565b610809610177565b80610813816101cd565b0390f35b61017d565b91602061083d92949361083660408201965f8301906103e2565b01906103e2565b565b346108705761084f366004610205565b610857611e14565b9061086c610863610177565b9283928361081c565b0390f35b61017d565b346108a35761088d61088836600461061f565b612137565b610895610177565b8061089f816101cd565b0390f35b61017d565b6108b18161034a565b036108b857565b5f80fd5b905035906108c9826108a8565b565b91906040838203126108f357806108e76108f0925f86016108bc565b936020016101a0565b90565b610181565b346109275761091161090b3660046108cb565b906123f0565b610919610177565b80610923816101cd565b0390f35b61017d565b3461095c5761093c366004610205565b6109586109476123fc565b61094f610177565b91829182610472565b0390f35b61017d565b9190604083820312610989578061097d610986925f86016104d0565b936020016108bc565b90565b610181565b346109bd576109a76109a1366004610961565b906128a9565b6109af610177565b806109b9816101cd565b0390f35b61017d565b6109d56109d03660046101af565b6129c2565b6109dd610177565b806109e7816101cd565b0390f35b34610a1c576109fb366004610205565b610a036129fa565b90610a18610a0f610177565b9283928361081c565b0390f35b61017d565b610a2d600e5f90610455565b90565b34610a6057610a40366004610205565b610a5c610a4b610a21565b610a53610177565b91829182610472565b0390f35b61017d565b34610a9357610a7d610a7836600461061f565b612aa3565b610a85610177565b80610a8f816101cd565b0390f35b61017d565b919060a083820312610ae957610ab0815f85016104d0565b92610abe82602083016101a0565b92610ae6610acf84604085016101a0565b93610add81606086016101a0565b936080016101a0565b90565b610181565b610b05610afc366004610a98565b93929092612b39565b610b0d610177565b80610b17816101cd565b0390f35b9190604083820312610b435780610b37610b40925f86016104d0565b936020016101a0565b90565b610181565b610b5c610b56366004610b1b565b90612ea2565b610b64610177565b80610b6e816101cd565b0390f35b60018060a01b031690565b610b89610b8e91610214565b610b72565b90565b610b9b9054610b7d565b90565b90565b610bb5610bb0610bba92610326565b610b9e565b610326565b90565b610bc690610ba1565b90565b610bd290610bbd565b90565b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b90610bf7906105a0565b810190811067ffffffffffffffff821117610c1157604052565b610bd9565b60e01b90565b90505190610c29826108a8565b565b90602082820312610c4457610c41915f01610c1c565b90565b610181565b610c51610177565b3d5f823e3d90fd5b60209181520190565b5f7f6f776e2e696e76616c69642e6973536166650000000000000000000000000000910152565b610c966012602092610c59565b610c9f81610c62565b0190565b610cb89060208101905f818303910152610c89565b90565b15610cc257565b610cca610177565b62461bcd60e51b815280610ce060048201610ca3565b0390fd5b60018060a01b031690565b610cfb610d0091610214565b610ce4565b90565b610d0d9054610cef565b90565b610d1990610bbd565b90565b5f7f6f776e2e6e6f6e617574682e44414f0000000000000000000000000000000000910152565b610d50600f602092610c59565b610d5981610d1c565b0190565b610d729060208101905f818303910152610d43565b90565b15610d7c57565b610d84610177565b62461bcd60e51b815280610d9a60048201610d5d565b0390fd5b610dcc906020610db6610db16002610b91565b610bc9565b636a276f9d90610dc4610177565b948592610c16565b82528180610ddc600482016101cd565b03915afa918215610ef857610e3a92610dfc915f91610eca575b50610cbb565b6020610e10610e0b6002610b91565b610bc9565b6319c0642990610e2f3392610e23610177565b96879485938493610c16565b835260048301610472565b03915afa8015610ec557610e65925f91610e97575b508015610e67575b610e6090610d75565b610f30565b565b50610e60610e7d610e786001610d03565b610d10565b610e8f610e8933610331565b91610331565b149050610e57565b610eb8915060203d8111610ebe575b610eb08183610bed565b810190610c2b565b5f610e4f565b503d610ea6565b610c49565b610eeb915060203d8111610ef1575b610ee38183610bed565b810190610c2b565b5f610df6565b503d610ed9565b610c49565b610f0690610ba1565b90565b610f1290610efd565b90565b610f1e90610bbd565b90565b5f910312610f2b57565b610181565b610f4a610f45610f40600f610238565b610f09565b610f15565b906390fb00e790823b15610fc457610f8192610f765f8094610f6a610177565b96879586948593610c16565b8352600483016103ef565b03925af18015610fbf57610f93575b50565b610fb2905f3d8111610fb8575b610faa8183610bed565b810190610f21565b5f610f90565b503d610fa0565b610c49565b610bd5565b610fd290610d9e565b565b5f90565b610fe190610bbd565b90565b610fec610fd4565b50610ff630610fd8565b3190565b606090565b5f7f696e732e696e76616c69642e73656e6465720000000000000000000000000000910152565b6110336012602092610c59565b61103c81610fff565b0190565b6110559060208101905f818303910152611026565b90565b1561105f57565b611067610177565b62461bcd60e51b81528061107d60048201611040565b0390fd5b90565b61109861109361109d92611081565b610b9e565b610326565b90565b6110a990611084565b90565b5f7f696e732e696e76616c69642e7461726765740000000000000000000000000000910152565b6110e06012602092610c59565b6110e9816110ac565b0190565b6111029060208101905f8183039101526110d3565b90565b1561110c57565b611114610177565b62461bcd60e51b81528061112a600482016110ed565b0390fd5b905090565b90825f939282370152565b90918261114e816111559361112e565b8093611133565b0190565b90916111649261113e565b90565b9061117a611173610177565b9283610bed565b565b67ffffffffffffffff811161119a576111966020916105a0565b0190565b610bd9565b906111b16111ac8361117c565b611167565b918252565b3d5f146111d1576111c63d61119f565b903d5f602084013e5b565b6111d9610ffa565b906111cf565b5f7f696e732e7461726765742e63616c6c2e6661696c656400000000000000000000910152565b6112136016602092610c59565b61121c816111df565b0190565b6112359060208101905f818303910152611206565b90565b1561123f57565b611247610177565b62461bcd60e51b81528061125d60048201611220565b0390fd5b905f92839261126e610ffa565b5061129461127c600f610238565b61128e61128833610331565b91610331565b14611058565b6112b9816112b26112ac6112a7886110a0565b610331565b91610331565b1415611105565b9134906112d06112c7610177565b93849283611159565b03925af16112e56112df6111b6565b91611238565b90565b5f90565b6112f46112e8565b50611336602061130c6113076002610b91565b610bc9565b6319c064299061132b859261131f610177565b95869485938493610c16565b835260048301610472565b03915afa9081156113a8575f9161137a575b50908115611355575b5090565b905061137361136d611367600c610238565b92610331565b91610331565b145f611351565b61139b915060203d81116113a1575b6113938183610bed565b810190610c2b565b5f611348565b503d611389565b610c49565b5f90565b905051906113be8261018c565b565b905051906113cd826104bc565b565b90916101208284031261145a576113e8835f84016113b1565b926113f681602085016113b1565b9261140482604083016113b1565b9261141283606084016113c0565b9261142081608085016113b1565b9261142e8260a083016113b1565b9261145761143f8460c085016113b1565b9361144d8160e086016113b1565b93610100016113c0565b90565b610181565b6114e79061146b610fd4565b50611474610fd4565b5061147d610fd4565b506114866113ad565b5061148f610fd4565b50611498610fd4565b506114a1610fd4565b506114aa610fd4565b506114b36113ad565b506101206114d16114cc6114c7600f610238565b610f09565b610f15565b637b7ceb3f906114df610177565b948592610c16565b825281806114f7600482016101cd565b03915afa918215611572575f8080808080808080949992979196939890959a611530575b50919897969594939291989796959493929190565b9750509750505050505061155c91506101203d811161156b575b6115548183610bed565b8101906113cf565b9295989093969194975f61151b565b503d61154a565b610c49565b90916060828403126115ac576115a9611592845f85016113b1565b936115a081602086016113b1565b936040016113b1565b90565b610181565b906060611614926115c0610fd4565b506115c9610fd4565b506115d2610fd4565b506115ed6115e86115e3600f610238565b610f09565b610f15565b611609637e5c89376115fd610177565b96879485938493610c16565b8352600483016103ef565b03915afa908115611668575f8080949093611633575b50919291929190565b91935050611658915060603d8111611661575b6116508183610bed565b810190611577565b9290915f61162a565b503d611646565b610c49565b5f7f6f776d2e66616b652e2064656c65676174650000000000000000000000000000910152565b6116a16012602092610c59565b6116aa8161166d565b0190565b6116c39060208101905f818303910152611694565b90565b156116cd57565b6116d5610177565b62461bcd60e51b8152806116eb600482016116ae565b0390fd5b61171c60206117066117016002610b91565b610bc9565b636a276f9d90611714610177565b938492610c16565b8252818061172c600482016101cd565b03915afa801561184e57611747915f91611820575b50610cbb565b6117596117546001610d03565b610d10565b61176b61176533610331565b91610331565b14908115611787575b611780611785926116c6565b611b4e565b565b6117ca915060206117a061179b6002610b91565b610bc9565b637df73e27906117bf33926117b3610177565b96879485938493610c16565b835260048301610472565b03915afa91821561181b5761178592611780915f916117ed575b50925050611774565b61180e915060203d8111611814575b6118068183610bed565b810190610c2b565b5f6117e4565b503d6117fc565b610c49565b611841915060203d8111611847575b6118398183610bed565b810190610c2b565b5f611741565b503d61182f565b610c49565b9060208282031261186c57611869915f016113b1565b90565b610181565b61187b60a0611167565b90565b5f90565b5f90565b61188e611871565b906020808080808661189e61187e565b8152016118a9611882565b8152016118b4611882565b8152016118bf611882565b8152016118ca611882565b81525050565b6118d8611886565b90565b906118e59061034a565b9052565b90565b6119006118fb611905926118e9565b610b9e565b610189565b90565b90565b61191f61191a61192492611908565b610b9e565b610189565b90565b90565b61193e61193961194392611927565b610b9e565b610189565b90565b9061195090610331565b9052565b61195e9051610331565b90565b5f1b90565b9061197760018060a01b0391611961565b9181191691161790565b61198a90610bbd565b90565b90565b906119a56119a06119ac92611981565b61198d565b8254611966565b9055565b6119ba905161034a565b90565b60a01b90565b906119d260ff60a01b916119bd565b9181191691161790565b6119e59061034a565b90565b90565b90611a006119fb611a07926119dc565b6119e8565b82546119c3565b9055565b60a81b90565b90611a2060ff60a81b91611a0b565b9181191691161790565b90611a3f611a3a611a46926119dc565b6119e8565b8254611a11565b9055565b60b01b90565b90611a5f60ff60b01b91611a4a565b9181191691161790565b90611a7e611a79611a85926119dc565b6119e8565b8254611a50565b9055565b60b81b90565b90611a9e60ff60b81b91611a89565b9181191691161790565b90611abd611ab8611ac4926119dc565b6119e8565b8254611a8f565b9055565b90611b3a60805f611b4094611aea828201611ae4848801611954565b90611990565b611b02828201611afc602088016119b0565b906119eb565b611b1a828201611b14604088016119b0565b90611a2a565b611b32828201611b2c606088016119b0565b90611a69565b0192016119b0565b90611aa8565b565b90611b4c91611ac8565b565b611b90906020611b66611b616002610b91565b610bc9565b631d84be4490611b853392611b79610177565b96879485938493610c16565b835260048301610472565b03915afa918215611c8857611c1f92611c18915f91611c5a575b5091611bb46118d0565b92611bc36001602086016118db565b80611bd7611bd160016118ec565b91610189565b14611c47575b80611bf1611beb600261190b565b91610189565b14611c34575b611c0a611c04600361192a565b91610189565b14611c21575b5f8301611946565b600d611b42565b565b611c2f6001608085016118db565b611c10565b611c426001606086016118db565b611bf7565b611c556001604086016118db565b611bdd565b611c7b915060203d8111611c81575b611c738183610bed565b810190611853565b5f611baa565b503d611c69565b610c49565b611c96906116ef565b565b60018060a01b031690565b611caf611cb491610214565b611c98565b90565b611cc19054611ca3565b90565b611ccd90610bbd565b90565b5f7f6f776e2e686578626173652e6661696c65640000000000000000000000000000910152565b611d046012602092610c59565b611d0d81611cd0565b0190565b611d269060208101905f818303910152611cf7565b90565b15611d3057565b611d38610177565b62461bcd60e51b815280611d4e60048201611d11565b0390fd5b611d5b90610ba1565b90565b611d6790611d52565b90565b611d7390610ba1565b90565b611d7f90611d6a565b90565b611d8b90611d6a565b90565b90565b90611da6611da1611dad92611d82565b611d8e565b8254611966565b9055565b611e04611dff611e0a92611def611dcf611dca5f611cb7565b611cc4565b611de9611de3611dde5f6110a0565b610331565b91610331565b14611d29565b611dfa32600c611990565b611d5e565b611d76565b5f611d91565b611e1261302f565b565b611e1c610fd4565b50611e25610fd4565b50611e30600e610238565b3190611e3c600f610238565b3190565b611e6e906020611e58611e536002610b91565b610bc9565b636a276f9d90611e66610177565b948592610c16565b82528180611e7e600482016101cd565b03915afa918215611f9a57611edc92611e9e915f91611f6c575b50610cbb565b6020611eb2611ead6002610b91565b610bc9565b6319c0642990611ed13392611ec5610177565b96879485938493610c16565b835260048301610472565b03915afa8015611f6757611f07925f91611f39575b508015611f09575b611f0290610d75565b611ffa565b565b50611f02611f1f611f1a6001610d03565b610d10565b611f31611f2b33610331565b91610331565b149050611ef9565b611f5a915060203d8111611f60575b611f528183610bed565b810190610c2b565b5f611ef1565b503d611f48565b610c49565b611f8d915060203d8111611f93575b611f858183610bed565b810190610c2b565b5f611e98565b503d611f7b565b610c49565b60018060a01b031690565b611fb6611fbb91610214565b611f9f565b90565b611fc89054611faa565b90565b611fd490610bbd565b90565b916020611ff8929493611ff160408201965f83019061033d565b019061033d565b565b61200c6120076004611fbe565b611fcb565b631ea3c8b461201b600c610238565b8392803b15612132576120415f809461204c612035610177565b97889687958694610c16565b845260048401611fd7565b03925af1801561212d57612101575b5061207661207161206c600f610238565b610f09565b610f15565b9063bda71ada81833b156120fc576120ad936120a25f8094612096610177565b97889586948593610c16565b835260048301610472565b03925af19182156120f7576120c9926120cb575b50600c611990565b565b6120ea905f3d81116120f0575b6120e28183610bed565b810190610f21565b5f6120c1565b503d6120d8565b610c49565b610bd5565b612120905f3d8111612126575b6121188183610bed565b810190610f21565b5f61205b565b503d61210e565b610c49565b610bd5565b61214090611e40565b565b9061217191602061215b6121566002610b91565b610bc9565b636a276f9d90612169610177565b958692610c16565b82528180612181600482016101cd565b03915afa92831561229d576121df936121a1915f9161226f575b50610cbb565b60206121b56121b06002610b91565b610bc9565b6319c06429906121d433926121c8610177565b97889485938493610c16565b835260048301610472565b03915afa801561226a5761220a935f9161223c575b50801561220c575b61220590610d75565b6122c5565b565b5061220561222261221d6001610d03565b610d10565b61223461222e33610331565b91610331565b1490506121fc565b61225d915060203d8111612263575b6122558183610bed565b810190610c2b565b5f6121f4565b503d61224b565b610c49565b612290915060203d8111612296575b6122888183610bed565b810190610c2b565b5f61219b565b503d61227e565b610c49565b9160206122c39294936122bc60408201965f83019061034f565b01906103e2565b565b906122e06122db6122d6600f610238565b610f09565b610f15565b9063e995b63f90839092803b156123eb5761230e5f8094612319612302610177565b97889687958694610c16565b8452600484016122a2565b03925af180156123e6576123ba575b5061233b6123366004611fbe565b611fcb565b9063641657cb90823b156123b557612372926123675f809461235b610177565b96879586948593610c16565b83526004830161063d565b03925af180156123b057612384575b50565b6123a3905f3d81116123a9575b61239b8183610bed565b810190610f21565b5f612381565b503d612391565b610c49565b610bd5565b6123d9905f3d81116123df575b6123d18183610bed565b810190610f21565b5f612328565b503d6123c7565b610c49565b610bd5565b906123fa91612142565b565b6124046113ad565b5061240f600c610238565b90565b90612440602061242a6124256002610b91565b610bc9565b636a276f9d90612438610177565b938492610c16565b82528180612450600482016101cd565b03915afa80156125725761246b915f91612544575b50610cbb565b61247d6124786001610d03565b610d10565b61248f61248933610331565b91610331565b149182156124ab575b6124a46124a9936116c6565b6125c3565b565b6124ee925060206124c46124bf6002610b91565b610bc9565b637df73e27906124e333926124d7610177565b97889485938493610c16565b835260048301610472565b03915afa92831561253f576124a9936124a4915f91612511575b50935050612498565b612532915060203d8111612538575b61252a8183610bed565b810190610c2b565b5f612508565b503d612520565b610c49565b612565915060203d811161256b575b61255d8183610bed565b810190610c2b565b5f612465565b503d612553565b610c49565b61258b61258661259092611081565b610b9e565b610189565b90565b634e487b7160e01b5f52601160045260245ffd5b6125b090610189565b5f1981146125be5760010190565b612593565b905f146128915761260b60206125e16125dc6002610b91565b610bc9565b631d84be449061260033926125f4610177565b95869485938493610c16565b835260048301610472565b03915afa90811561288c575f9161285e575b5061262a5f600d01610265565b80612843575b8061281e575b61280b575b6126475f600d01610265565b806127f0575b806127cb575b6127b8575b6126645f600d01610265565b908161279c575b5080612777575b612764575b6126805f612577565b61268c5f600d0161028c565b612756575b61269d5f600d016102b3565b612748575b6126ae5f600d016102da565b61273a575b6126bf5f600d01610265565b908161271e575b50806126f9575b6126d6575b505b565b6126e190600c611990565b6126f36126ec6118d0565b600d611b42565b5f6126d2565b506127065f600d01610238565b61271861271283610331565b91610331565b146126cd565b905061273361272d600261190b565b91610189565b145f6126c6565b612743906125a7565b6126b3565b612751906125a7565b6126a2565b61275f906125a7565b612691565b61277260015f600d01611aa8565b612677565b506127845f600d01610238565b61279661279083610331565b91610331565b14612672565b90506127b16127ab600361192a565b91610189565b145f61266b565b6127c660015f600d01611a69565b612658565b506127d85f600d01610238565b6127ea6127e484610331565b91610331565b14612653565b50806128056127ff600261190b565b91610189565b1461264d565b61281960015f600d01611a2a565b61263b565b5061282b5f600d01610238565b61283d61283784610331565b91610331565b14612636565b508061285861285260016118ec565b91610189565b14612630565b61287f915060203d8111612885575b6128778183610bed565b810190611853565b5f61261d565b503d61286d565b610c49565b506128a461289d6118d0565b600d611b42565b6126d4565b906128b391612412565b565b6128e39060206128cd6128c86002610b91565b610bc9565b636a276f9d906128db610177565b948592610c16565b825281806128f3600482016101cd565b03915afa9182156129755761294592612913915f91612947575b50610cbb565b6129406129286129236001610d03565b610d10565b61293a61293433610331565b91610331565b14610d75565b612986565b565b612968915060203d811161296e575b6129608183610bed565b810190610c2b565b5f61290d565b503d612956565b610c49565b61298390610bbd565b90565b5f808080936129a461299f61299a846110a0565b611d5e565b61297a565b8282156129b9575bf1156129b457565b610c49565b506108fc6129ac565b6129cb906128b5565b565b91906040838203126129f557806129e96129f2925f86016113b1565b936020016113b1565b90565b610181565b612a4290612a06610fd4565b50612a0f610fd4565b506040612a2c612a27612a22600f610238565b610f09565b610f15565b632b17219790612a3a610177565b948592610c16565b82528180612a52600482016101cd565b03915afa8015612a9e575f80939091612a6b575b509190565b9050612a8f91925060403d8111612a97575b612a878183610bed565b8101906129cd565b91905f612a66565b503d612a7d565b610c49565b612aac906137ee565b565b90565b612ac5612ac0612aca92612aae565b610b9e565b610189565b90565b90565b612ae4612adf612ae992612acd565b610b9e565b610189565b90565b90959492612b3794612b26612b3092612b1c608096612b1260a088019c5f89019061033d565b60208701906103e2565b60408501906103e2565b60608301906103e2565b01906103e2565b565b90919380612b50612b4a60c8612ab1565b91610189565b10155f14612c2e5780612b6c612b6660c8612ab1565b91610189565b14612c16575b612b8c612b87612b82600f610238565b610f09565b610f15565b9163ac3e52c89234909390919496959295843b15612c11575f96612bc294612bcd92612bb6610177565b9a8b998a988997610c16565b875260048701612aec565b03925af18015612c0c57612be0575b505b565b612bff905f3d8111612c05575b612bf78183610bed565b810190610f21565b5f612bdc565b503d612bed565b610c49565b610bd5565b90612c2090613957565b90612c29613be2565b612b72565b9350505050612c46612c406064612ad0565b91610189565b1015612c52575b612bde565b612c4d565b5f7f6f776e2e64656661756c742e73656e6465720000000000000000000000000000910152565b612c8b6012602092610c59565b612c9481612c57565b0190565b612cad9060208101905f818303910152612c7e565b90565b15612cb757565b612cbf610177565b62461bcd60e51b815280612cd560048201612c98565b0390fd5b90612d0891612d0381612cfc612cf6612cf15f6110a0565b610331565b91610331565b1415612cb0565b612d0a565b565b90612d39916020612d23612d1e6002610b91565b610bc9565b636a276f9d90612d31610177565b958692610c16565b82528180612d49600482016101cd565b03915afa928315612dcb57612d9b93612d69915f91612d9d575b50610cbb565b612d96612d7e612d796001610d03565b610d10565b612d90612d8a33610331565b91610331565b14610d75565b612e52565b565b612dbe915060203d8111612dc4575b612db68183610bed565b810190610c2b565b5f612d63565b503d612dac565b610c49565b5f7f6f776e2e696e76616c69642e616d6f756e740000000000000000000000000000910152565b612e046012602092610c59565b612e0d81612dd0565b0190565b612e269060208101905f818303910152612df7565b90565b15612e3057565b612e38610177565b62461bcd60e51b815280612e4e60048201612e11565b0390fd5b5f808093612e84612e7f8395612e7a84612e74612e6e88612577565b91610189565b11612e29565b611d5e565b61297a565b828215612e99575bf115612e9457565b610c49565b506108fc612e8c565b90612eac91612cd9565b565b90602082820312612ec757612ec4915f016113c0565b90565b610181565b612ed590610ba1565b90565b612ee190612ecc565b90565b612eed90612ecc565b90565b90565b90612f08612f03612f0f92612ee4565b612ef0565b8254611966565b9055565b612f1c90610ba1565b90565b612f2890612f13565b90565b612f3490612f13565b90565b90565b90612f4f612f4a612f5692612f2b565b612f37565b8254611966565b9055565b612f6390610ba1565b90565b612f6f90612f5a565b90565b612f7b90612f5a565b90565b90565b90612f96612f91612f9d92612f72565b612f7e565b8254611966565b9055565b612faa90610ba1565b90565b612fb690612fa1565b90565b612fc290612fa1565b90565b90565b90612fdd612fd8612fe492612fb9565b612fc5565b8254611966565b9055565b612ff190610ba1565b90565b612ffd90612fe8565b90565b61300990612fe8565b90565b90565b9061302461301f61302b92613000565b61300c565b8254611966565b9055565b61304061303b5f611cb7565b611cc4565b61305a61305461304f5f6110a0565b610331565b91610331565b146136975761308b60206130756130705f611cb7565b611cc4565b634162169f90613083610177565b938492610c16565b8252818061309b600482016101cd565b03915afa908115613692576130c2916130bb915f91613664575b50612ed8565b6001612ef3565b6130ee60206130d86130d35f611cb7565b611cc4565b63b57dbdc6906130e6610177565b938492610c16565b825281806130fe600482016101cd565b03915afa90811561365f576131259161311e915f91613631575b50612f1f565b6002612f3a565b613151602061313b6131365f611cb7565b611cc4565b63cfbffe5390613149610177565b938492610c16565b82528180613161600482016101cd565b03915afa90811561362c5761318891613181915f916135fe575b50612f66565b6003612f81565b6131b4602061319e6131995f611cb7565b611cc4565b63ab6e844f906131ac610177565b938492610c16565b825281806131c4600482016101cd565b03915afa9081156135f9576131eb916131e4915f916135cb575b50612fad565b6004612fc8565b61321760206132016131fc5f611cb7565b611cc4565b639a7c40779061320f610177565b938492610c16565b82528180613227600482016101cd565b03915afa9081156135c65761324e91613247915f91613598575b50612ff4565b600561300f565b61327a602061326461325f5f611cb7565b611cc4565b63aa0ddc1690613272610177565b938492610c16565b8252818061328a600482016101cd565b03915afa8015613593576132a7915f91613565575b506007611990565b6132d360206132bd6132b85f611cb7565b611cc4565b636b4aefc6906132cb610177565b938492610c16565b825281806132e3600482016101cd565b03915afa801561356057613300915f91613532575b506008611990565b61332c60206133166133115f611cb7565b611cc4565b6324768d9190613324610177565b938492610c16565b8252818061333c600482016101cd565b03915afa801561352d57613359915f916134ff575b50600b611990565b613385602061336f61336a5f611cb7565b611cc4565b63640274279061337d610177565b938492610c16565b82528180613395600482016101cd565b03915afa80156134fa576133b2915f916134cc575b506009611990565b6133de60206133c86133c35f611cb7565b611cc4565b6330125cf5906133d6610177565b938492610c16565b825281806133ee600482016101cd565b03915afa80156134c75761340b915f91613499575b50600a611990565b613437602061342161341c5f611cb7565b611cc4565b63d3d1b0969061342f610177565b938492610c16565b82528180613447600482016101cd565b03915afa801561349457613464915f91613466575b506006611990565b565b613487915060203d811161348d575b61347f8183610bed565b810190612eae565b5f61345c565b503d613475565b610c49565b6134ba915060203d81116134c0575b6134b28183610bed565b810190612eae565b5f613403565b503d6134a8565b610c49565b6134ed915060203d81116134f3575b6134e58183610bed565b810190612eae565b5f6133aa565b503d6134db565b610c49565b613520915060203d8111613526575b6135188183610bed565b810190612eae565b5f613351565b503d61350e565b610c49565b613553915060203d8111613559575b61354b8183610bed565b810190612eae565b5f6132f8565b503d613541565b610c49565b613586915060203d811161358c575b61357e8183610bed565b810190612eae565b5f61329f565b503d613574565b610c49565b6135b9915060203d81116135bf575b6135b18183610bed565b810190612eae565b5f613241565b503d6135a7565b610c49565b6135ec915060203d81116135f2575b6135e48183610bed565b810190612eae565b5f6131de565b503d6135da565b610c49565b61361f915060203d8111613625575b6136178183610bed565b810190612eae565b5f61317b565b503d61360d565b610c49565b613652915060203d8111613658575b61364a8183610bed565b810190612eae565b5f613118565b503d613640565b610c49565b613685915060203d811161368b575b61367d8183610bed565b810190612eae565b5f6130b5565b503d613673565b610c49565b565b506136c760206136b16136ac6002610b91565b610bc9565b636a276f9d906136bf610177565b938492610c16565b825281806136d7600482016101cd565b03915afa80156137e9576136f2915f916137bb575b50610cbb565b61373360206137096137046002610b91565b610bc9565b6319c0642990613728339261371c610177565b95869485938493610c16565b835260048301610472565b03915afa9081156137b6575f91613788575b508015613758575b61375690610d75565b565b5061375661376e6137696001610d03565b610d10565b61378061377a33610331565b91610331565b14905061374d565b6137a9915060203d81116137af575b6137a18183610bed565b810190610c2b565b5f613745565b503d613797565b610c49565b6137dc915060203d81116137e2575b6137d48183610bed565b810190610c2b565b5f6136ec565b503d6137ca565b610c49565b6137f790613699565b565b67ffffffffffffffff8111613817576138136020916105a0565b0190565b610bd9565b9061382e613829836137f9565b611167565b918252565b5f7f55736572546f496e737428616464726573732900000000000000000000000000910152565b613864601361381c565b9061387160208301613833565b565b61387b61385a565b90565b369037565b906138a86138908361119f565b9260208061389e869361117c565b920191039061387e565b565b5f7f6361676528290000000000000000000000000000000000000000000000000000910152565b6138db600661381c565b906138e8602083016138aa565b565b6138f26138d1565b90565b60409061391e613925949695939661391460608401985f85019061033d565b602083019061033d565b01906103e2565b565b613930906118ec565b9052565b91602061395592949361394e60408201965f83019061033d565b0190613927565b565b61395f6113ad565b5061396b816010611990565b6139756010610238565b61398f6139896139845f6110a0565b610331565b91610331565b145f14613a29576139a86139a36004611fbe565b611fcb565b60206354279233916139ba600c610238565b906139d95f6001956139e46139cd610177565b97889687958694610c16565b845260048401613934565b03925af18015613a24576139f8575b505b90565b613a189060203d8111613a1d575b613a108183610bed565b810190611853565b6139f3565b503d613a06565b610c49565b50613a32613d34565b613a5e6020613a48613a435f611cb7565b611cc4565b63447bf0e290613a56610177565b938492610c16565b82528180613a6e600482016101cd565b03915afa908115613bdd57613ac791613aaa915f91613baf575b50613ab9613a96600c610238565b613a9e610177565b93849160208301610472565b60208201810382520383610bed565b613ac1613873565b90613e2f565b9081613ae3613add613ad85f6110a0565b610331565b91610331565b03613b85575b6020613afd613af86004611fbe565b611fcb565b63e4a312d190613b345f613b116010610238565b93613b3f613b1f600c610238565b97613b28610177565b98899788968795610c16565b8552600485016138f5565b03925af18015613b8057613b54575b506139f5565b613b749060203d8111613b79575b613b6c8183610bed565b810190611853565b613b4e565b503d613b62565b610c49565b50613baa81613b9b613b965f612577565b613883565b90613ba46138ea565b90613ea5565b613ae9565b613bd0915060203d8111613bd6575b613bc88183610bed565b810190612eae565b5f613a88565b503d613bbe565b610c49565b613c0e6020613bf8613bf35f611cb7565b611cc4565b637c27dd0c90613c06610177565b938492610c16565b82528180613c1e600482016101cd565b03915afa908115613d2f57613c4f91613c48915f91613d01575b50613c425f612577565b9061401f565b600f611990565b613c69613c64613c5f600f610238565b610f09565b610f15565b63463ef7c7613c7f613c7a5f611cb7565b611cc4565b613c896010610238565b92803b15613cfc57613cae5f8094613cb9613ca2610177565b97889687958694610c16565b845260048401611fd7565b03925af18015613cf757613ccb575b50565b613cea905f3d8111613cf0575b613ce28183610bed565b810190610f21565b5f613cc8565b503d613cd8565b610c49565b610bd5565b613d22915060203d8111613d28575b613d1a8183610bed565b810190612eae565b5f613c38565b503d613d10565b610c49565b613d3c610fd4565b50613d6a6020613d54613d4f6002610b91565b610bc9565b63262a9dff90613d62610177565b938492610c16565b82528180613d7a600482016101cd565b03915afa908115613dbe575f91613d90575b5090565b613db1915060203d8111613db7575b613da98183610bed565b810190611853565b5f613d8c565b503d613d9f565b610c49565b90565b613dda613dd5613ddf92613dc3565b610b9e565b610189565b90565b613deb90610326565b90565b613df781613de2565b03613dfe57565b5f80fd5b90505190613e0f82613dee565b565b90602082820312613e2a57613e27915f01613e02565b90565b610181565b929190613e4791613e3e6113ad565b9491909161414b565b9080613e82575b613e56575b50565b613e7b919250613e76906020613e6b82610570565b818301019101613e11565b61297a565b905f613e53565b50613e8c81610570565b613e9f613e996020613dc6565b91610189565b14613e4e565b929190613ebd91613eb4610fd4565b9491909161414b565b9080613eef575b613ecc575b50565b613ee89192506020613edd82610570565b818301019101611853565b905f613ec9565b50613ef981610570565b613f0c613f066020613dc6565b91610189565b14613ec4565b613f1b90610bbd565b90565b60207f73732874686973292e62616c616e63652c2076616c7565290000000000000000917f4572726f72732e496e73756666696369656e7442616c616e63652861646472655f8201520152565b613f786038604092610c59565b613f8181613f1e565b0190565b613f9a9060208101905f818303910152613f6b565b90565b5f7f696e732e436c6f6e65466163746f72792e6372656174652e6661696c65640000910152565b613fd1601e602092610c59565b613fda81613f9d565b0190565b613ff39060208101905f818303910152613fc4565b90565b15613ffd57565b614005610177565b62461bcd60e51b81528061401b60048201613fde565b0390fd5b6140276113ad565b5061403130613f12565b3161404461403e84610189565b91610189565b106140b1576037916e5af43d82803e903d91602b57fd5bf382763d602d80600a3d3981f3363d3d373d3d3d363d7300000060099460601b60e81c175f5260781b17602052f0906140af826140a86140a261409d5f6110a0565b610331565b91610331565b1415613ff6565b565b6140b9610177565b62461bcd60e51b8152806140cf60048201613f85565b0390fd5b6140dc5f61381c565b90565b6140e76140d3565b90565b90565b60200190565b63ffffffff60e01b1690565b614108906140f3565b90565b6141306141279260209261411e81610570565b9485809361112e565b9384910161057d565b0190565b61414290614148939261410b565b9061410b565b90565b6141536112e8565b5061415c610ffa565b50803b61417161416b5f612577565b91610189565b1461421e5760046142095f946141e286956141b8876141b261419a614194610177565b946140ea565b6141ac6141a682610570565b916140ed565b206140ff565b92610bed565b6141d36141c3610177565b95869260208401908152016101cd565b60208201810382520384610bed565b916141fa6141ee610177565b93849260208401614134565b60208201810382520382610bed565b602081019051915afa61421a6111b6565b9091565b5050505f9061422b6140df565b9056fea2646970667358221220efc19fa71c1902b56212c8e5d3228b628c73f2c4732de55484bf590ecefcca8364736f6c63430008180033'
				// adjust based on contract size
			  })
			  .then(receipt => console.log("Contract deployed at:", receipt.contractAddress))
			  .catch(err => console.error(err));
			  debugger;
			let response = await contract
			.deploy({
			data: '0x60806040523462000023576200001462000029565b61426462000034823961426490f35b6200002f565b60405190565b5f80fdfe60806040526004361015610018575b361561001657005b005b6100225f35610171565b80630b98f9751461016c5780630d43aaf21461016757806312065fe0146101625780631bff68401461015d5780632a31f6b414610158578063379a423c146101535780633ac65bf71461014e5780633b844f9b1461014957806341ffe7c41461014457806360af454d1461013f5780636d24b8071461013a578063760f8ea8146101355780637fdd2b62146101305780638da5cb5b1461012b578063abb8c96514610126578063b90306ad14610121578063c73fddeb1461011c578063c9ce1e2814610117578063cbf0b0c014610112578063ee53a0461461010d5763f3fef3a30361000e57610b48565b610aee565b610a65565b610a30565b6109eb565b6109c2565b61098e565b61092c565b6108f8565b610875565b61083f565b6107e9565b6107b6565b61077e565b61070d565b610652565b6105f3565b610487565b610404565b6103a9565b6101d2565b60e01c90565b60405190565b5f80fd5b5f80fd5b5f80fd5b90565b61019581610189565b0361019c57565b5f80fd5b905035906101ad8261018c565b565b906020828203126101c8576101c5915f016101a0565b90565b610181565b5f0190565b34610200576101ea6101e53660046101af565b610fc9565b6101f2610177565b806101fc816101cd565b0390f35b61017d565b5f91031261020f57565b610181565b5f1c90565b60018060a01b031690565b61023061023591610214565b610219565b90565b6102429054610224565b90565b60a01c90565b60ff1690565b61025d61026291610245565b61024b565b90565b61026f9054610251565b90565b60a81c90565b61028461028991610272565b61024b565b90565b6102969054610278565b90565b60b01c90565b6102ab6102b091610299565b61024b565b90565b6102bd905461029f565b90565b60b81c90565b6102d26102d7916102c0565b61024b565b90565b6102e490546102c6565b90565b600d6102f45f8201610238565b916103005f8301610265565b9161030c5f820161028c565b916103235f61031c8185016102b3565b93016102da565b90565b60018060a01b031690565b61033a90610326565b90565b61034690610331565b9052565b151590565b6103589061034a565b9052565b909594926103a7946103966103a09261038c60809661038260a088019c5f89019061033d565b602087019061034f565b604085019061034f565b606083019061034f565b019061034f565b565b346103dd576103b9366004610205565b6103d96103c46102e7565b916103d0959395610177565b9586958661035c565b0390f35b61017d565b6103eb90610189565b9052565b9190610402905f602085019401906103e2565b565b3461043457610414366004610205565b61043061041f610fe4565b610427610177565b918291826103ef565b0390f35b61017d565b1c90565b61044d9060086104529302610439565b610219565b90565b90610460915461043d565b90565b61046f600f5f90610455565b90565b9190610485905f6020850194019061033d565b565b346104b757610497366004610205565b6104b36104a2610463565b6104aa610177565b91829182610472565b0390f35b61017d565b6104c581610331565b036104cc57565b5f80fd5b905035906104dd826104bc565b565b5f80fd5b5f80fd5b5f80fd5b909182601f830112156105255781359167ffffffffffffffff831161052057602001926001830284011161051b57565b6104e7565b6104e3565b6104df565b91909160408184031261056b57610543835f83016104d0565b92602082013567ffffffffffffffff81116105665761056292016104eb565b9091565b610185565b610181565b5190565b60209181520190565b5f5b83811061058f575050905f910152565b80602091830151818501520161057f565b601f801991011690565b6105c96105d26020936105d7936105c081610570565b93848093610574565b9586910161057d565b6105a0565b0190565b6105f09160208201915f8184039101526105aa565b90565b61061b61060a61060436600461052a565b91611261565b610612610177565b918291826105db565b0390f35b9060208282031261063857610635915f016104d0565b90565b610181565b9190610650905f6020850194019061034f565b565b346106825761067e61066d61066836600461061f565b6112ec565b610675610177565b9182918261063d565b0390f35b61017d565b9694929099989795939161012088019a5f89016106a3916103e2565b602088016106b0916103e2565b604087016106bd916103e2565b606086016106ca9161033d565b608085016106d7916103e2565b60a084016106e4916103e2565b60c083016106f1916103e2565b60e082016106fe916103e2565b6101000161070b9161033d565b565b346107475761071d366004610205565b61074361072861145f565b9561073a999799959195949294610177565b998a998a610687565b0390f35b61017d565b60409061077561077c949695939661076b60608401985f8501906103e2565b60208301906103e2565b01906103e2565b565b346107b1576107ad6107996107943660046101af565b6115b1565b6107a4939193610177565b9384938461074c565b0390f35b61017d565b346107e4576107ce6107c936600461061f565b611c8d565b6107d6610177565b806107e0816101cd565b0390f35b61017d565b34610817576108016107fc36600461061f565b611db1565b610809610177565b80610813816101cd565b0390f35b61017d565b91602061083d92949361083660408201965f8301906103e2565b01906103e2565b565b346108705761084f366004610205565b610857611e14565b9061086c610863610177565b9283928361081c565b0390f35b61017d565b346108a35761088d61088836600461061f565b612137565b610895610177565b8061089f816101cd565b0390f35b61017d565b6108b18161034a565b036108b857565b5f80fd5b905035906108c9826108a8565b565b91906040838203126108f357806108e76108f0925f86016108bc565b936020016101a0565b90565b610181565b346109275761091161090b3660046108cb565b906123f0565b610919610177565b80610923816101cd565b0390f35b61017d565b3461095c5761093c366004610205565b6109586109476123fc565b61094f610177565b91829182610472565b0390f35b61017d565b9190604083820312610989578061097d610986925f86016104d0565b936020016108bc565b90565b610181565b346109bd576109a76109a1366004610961565b906128a9565b6109af610177565b806109b9816101cd565b0390f35b61017d565b6109d56109d03660046101af565b6129c2565b6109dd610177565b806109e7816101cd565b0390f35b34610a1c576109fb366004610205565b610a036129fa565b90610a18610a0f610177565b9283928361081c565b0390f35b61017d565b610a2d600e5f90610455565b90565b34610a6057610a40366004610205565b610a5c610a4b610a21565b610a53610177565b91829182610472565b0390f35b61017d565b34610a9357610a7d610a7836600461061f565b612aa3565b610a85610177565b80610a8f816101cd565b0390f35b61017d565b919060a083820312610ae957610ab0815f85016104d0565b92610abe82602083016101a0565b92610ae6610acf84604085016101a0565b93610add81606086016101a0565b936080016101a0565b90565b610181565b610b05610afc366004610a98565b93929092612b39565b610b0d610177565b80610b17816101cd565b0390f35b9190604083820312610b435780610b37610b40925f86016104d0565b936020016101a0565b90565b610181565b610b5c610b56366004610b1b565b90612ea2565b610b64610177565b80610b6e816101cd565b0390f35b60018060a01b031690565b610b89610b8e91610214565b610b72565b90565b610b9b9054610b7d565b90565b90565b610bb5610bb0610bba92610326565b610b9e565b610326565b90565b610bc690610ba1565b90565b610bd290610bbd565b90565b5f80fd5b634e487b7160e01b5f52604160045260245ffd5b90610bf7906105a0565b810190811067ffffffffffffffff821117610c1157604052565b610bd9565b60e01b90565b90505190610c29826108a8565b565b90602082820312610c4457610c41915f01610c1c565b90565b610181565b610c51610177565b3d5f823e3d90fd5b60209181520190565b5f7f6f776e2e696e76616c69642e6973536166650000000000000000000000000000910152565b610c966012602092610c59565b610c9f81610c62565b0190565b610cb89060208101905f818303910152610c89565b90565b15610cc257565b610cca610177565b62461bcd60e51b815280610ce060048201610ca3565b0390fd5b60018060a01b031690565b610cfb610d0091610214565b610ce4565b90565b610d0d9054610cef565b90565b610d1990610bbd565b90565b5f7f6f776e2e6e6f6e617574682e44414f0000000000000000000000000000000000910152565b610d50600f602092610c59565b610d5981610d1c565b0190565b610d729060208101905f818303910152610d43565b90565b15610d7c57565b610d84610177565b62461bcd60e51b815280610d9a60048201610d5d565b0390fd5b610dcc906020610db6610db16002610b91565b610bc9565b636a276f9d90610dc4610177565b948592610c16565b82528180610ddc600482016101cd565b03915afa918215610ef857610e3a92610dfc915f91610eca575b50610cbb565b6020610e10610e0b6002610b91565b610bc9565b6319c0642990610e2f3392610e23610177565b96879485938493610c16565b835260048301610472565b03915afa8015610ec557610e65925f91610e97575b508015610e67575b610e6090610d75565b610f30565b565b50610e60610e7d610e786001610d03565b610d10565b610e8f610e8933610331565b91610331565b149050610e57565b610eb8915060203d8111610ebe575b610eb08183610bed565b810190610c2b565b5f610e4f565b503d610ea6565b610c49565b610eeb915060203d8111610ef1575b610ee38183610bed565b810190610c2b565b5f610df6565b503d610ed9565b610c49565b610f0690610ba1565b90565b610f1290610efd565b90565b610f1e90610bbd565b90565b5f910312610f2b57565b610181565b610f4a610f45610f40600f610238565b610f09565b610f15565b906390fb00e790823b15610fc457610f8192610f765f8094610f6a610177565b96879586948593610c16565b8352600483016103ef565b03925af18015610fbf57610f93575b50565b610fb2905f3d8111610fb8575b610faa8183610bed565b810190610f21565b5f610f90565b503d610fa0565b610c49565b610bd5565b610fd290610d9e565b565b5f90565b610fe190610bbd565b90565b610fec610fd4565b50610ff630610fd8565b3190565b606090565b5f7f696e732e696e76616c69642e73656e6465720000000000000000000000000000910152565b6110336012602092610c59565b61103c81610fff565b0190565b6110559060208101905f818303910152611026565b90565b1561105f57565b611067610177565b62461bcd60e51b81528061107d60048201611040565b0390fd5b90565b61109861109361109d92611081565b610b9e565b610326565b90565b6110a990611084565b90565b5f7f696e732e696e76616c69642e7461726765740000000000000000000000000000910152565b6110e06012602092610c59565b6110e9816110ac565b0190565b6111029060208101905f8183039101526110d3565b90565b1561110c57565b611114610177565b62461bcd60e51b81528061112a600482016110ed565b0390fd5b905090565b90825f939282370152565b90918261114e816111559361112e565b8093611133565b0190565b90916111649261113e565b90565b9061117a611173610177565b9283610bed565b565b67ffffffffffffffff811161119a576111966020916105a0565b0190565b610bd9565b906111b16111ac8361117c565b611167565b918252565b3d5f146111d1576111c63d61119f565b903d5f602084013e5b565b6111d9610ffa565b906111cf565b5f7f696e732e7461726765742e63616c6c2e6661696c656400000000000000000000910152565b6112136016602092610c59565b61121c816111df565b0190565b6112359060208101905f818303910152611206565b90565b1561123f57565b611247610177565b62461bcd60e51b81528061125d60048201611220565b0390fd5b905f92839261126e610ffa565b5061129461127c600f610238565b61128e61128833610331565b91610331565b14611058565b6112b9816112b26112ac6112a7886110a0565b610331565b91610331565b1415611105565b9134906112d06112c7610177565b93849283611159565b03925af16112e56112df6111b6565b91611238565b90565b5f90565b6112f46112e8565b50611336602061130c6113076002610b91565b610bc9565b6319c064299061132b859261131f610177565b95869485938493610c16565b835260048301610472565b03915afa9081156113a8575f9161137a575b50908115611355575b5090565b905061137361136d611367600c610238565b92610331565b91610331565b145f611351565b61139b915060203d81116113a1575b6113938183610bed565b810190610c2b565b5f611348565b503d611389565b610c49565b5f90565b905051906113be8261018c565b565b905051906113cd826104bc565b565b90916101208284031261145a576113e8835f84016113b1565b926113f681602085016113b1565b9261140482604083016113b1565b9261141283606084016113c0565b9261142081608085016113b1565b9261142e8260a083016113b1565b9261145761143f8460c085016113b1565b9361144d8160e086016113b1565b93610100016113c0565b90565b610181565b6114e79061146b610fd4565b50611474610fd4565b5061147d610fd4565b506114866113ad565b5061148f610fd4565b50611498610fd4565b506114a1610fd4565b506114aa610fd4565b506114b36113ad565b506101206114d16114cc6114c7600f610238565b610f09565b610f15565b637b7ceb3f906114df610177565b948592610c16565b825281806114f7600482016101cd565b03915afa918215611572575f8080808080808080949992979196939890959a611530575b50919897969594939291989796959493929190565b9750509750505050505061155c91506101203d811161156b575b6115548183610bed565b8101906113cf565b9295989093969194975f61151b565b503d61154a565b610c49565b90916060828403126115ac576115a9611592845f85016113b1565b936115a081602086016113b1565b936040016113b1565b90565b610181565b906060611614926115c0610fd4565b506115c9610fd4565b506115d2610fd4565b506115ed6115e86115e3600f610238565b610f09565b610f15565b611609637e5c89376115fd610177565b96879485938493610c16565b8352600483016103ef565b03915afa908115611668575f8080949093611633575b50919291929190565b91935050611658915060603d8111611661575b6116508183610bed565b810190611577565b9290915f61162a565b503d611646565b610c49565b5f7f6f776d2e66616b652e2064656c65676174650000000000000000000000000000910152565b6116a16012602092610c59565b6116aa8161166d565b0190565b6116c39060208101905f818303910152611694565b90565b156116cd57565b6116d5610177565b62461bcd60e51b8152806116eb600482016116ae565b0390fd5b61171c60206117066117016002610b91565b610bc9565b636a276f9d90611714610177565b938492610c16565b8252818061172c600482016101cd565b03915afa801561184e57611747915f91611820575b50610cbb565b6117596117546001610d03565b610d10565b61176b61176533610331565b91610331565b14908115611787575b611780611785926116c6565b611b4e565b565b6117ca915060206117a061179b6002610b91565b610bc9565b637df73e27906117bf33926117b3610177565b96879485938493610c16565b835260048301610472565b03915afa91821561181b5761178592611780915f916117ed575b50925050611774565b61180e915060203d8111611814575b6118068183610bed565b810190610c2b565b5f6117e4565b503d6117fc565b610c49565b611841915060203d8111611847575b6118398183610bed565b810190610c2b565b5f611741565b503d61182f565b610c49565b9060208282031261186c57611869915f016113b1565b90565b610181565b61187b60a0611167565b90565b5f90565b5f90565b61188e611871565b906020808080808661189e61187e565b8152016118a9611882565b8152016118b4611882565b8152016118bf611882565b8152016118ca611882565b81525050565b6118d8611886565b90565b906118e59061034a565b9052565b90565b6119006118fb611905926118e9565b610b9e565b610189565b90565b90565b61191f61191a61192492611908565b610b9e565b610189565b90565b90565b61193e61193961194392611927565b610b9e565b610189565b90565b9061195090610331565b9052565b61195e9051610331565b90565b5f1b90565b9061197760018060a01b0391611961565b9181191691161790565b61198a90610bbd565b90565b90565b906119a56119a06119ac92611981565b61198d565b8254611966565b9055565b6119ba905161034a565b90565b60a01b90565b906119d260ff60a01b916119bd565b9181191691161790565b6119e59061034a565b90565b90565b90611a006119fb611a07926119dc565b6119e8565b82546119c3565b9055565b60a81b90565b90611a2060ff60a81b91611a0b565b9181191691161790565b90611a3f611a3a611a46926119dc565b6119e8565b8254611a11565b9055565b60b01b90565b90611a5f60ff60b01b91611a4a565b9181191691161790565b90611a7e611a79611a85926119dc565b6119e8565b8254611a50565b9055565b60b81b90565b90611a9e60ff60b81b91611a89565b9181191691161790565b90611abd611ab8611ac4926119dc565b6119e8565b8254611a8f565b9055565b90611b3a60805f611b4094611aea828201611ae4848801611954565b90611990565b611b02828201611afc602088016119b0565b906119eb565b611b1a828201611b14604088016119b0565b90611a2a565b611b32828201611b2c606088016119b0565b90611a69565b0192016119b0565b90611aa8565b565b90611b4c91611ac8565b565b611b90906020611b66611b616002610b91565b610bc9565b631d84be4490611b853392611b79610177565b96879485938493610c16565b835260048301610472565b03915afa918215611c8857611c1f92611c18915f91611c5a575b5091611bb46118d0565b92611bc36001602086016118db565b80611bd7611bd160016118ec565b91610189565b14611c47575b80611bf1611beb600261190b565b91610189565b14611c34575b611c0a611c04600361192a565b91610189565b14611c21575b5f8301611946565b600d611b42565b565b611c2f6001608085016118db565b611c10565b611c426001606086016118db565b611bf7565b611c556001604086016118db565b611bdd565b611c7b915060203d8111611c81575b611c738183610bed565b810190611853565b5f611baa565b503d611c69565b610c49565b611c96906116ef565b565b60018060a01b031690565b611caf611cb491610214565b611c98565b90565b611cc19054611ca3565b90565b611ccd90610bbd565b90565b5f7f6f776e2e686578626173652e6661696c65640000000000000000000000000000910152565b611d046012602092610c59565b611d0d81611cd0565b0190565b611d269060208101905f818303910152611cf7565b90565b15611d3057565b611d38610177565b62461bcd60e51b815280611d4e60048201611d11565b0390fd5b611d5b90610ba1565b90565b611d6790611d52565b90565b611d7390610ba1565b90565b611d7f90611d6a565b90565b611d8b90611d6a565b90565b90565b90611da6611da1611dad92611d82565b611d8e565b8254611966565b9055565b611e04611dff611e0a92611def611dcf611dca5f611cb7565b611cc4565b611de9611de3611dde5f6110a0565b610331565b91610331565b14611d29565b611dfa32600c611990565b611d5e565b611d76565b5f611d91565b611e1261302f565b565b611e1c610fd4565b50611e25610fd4565b50611e30600e610238565b3190611e3c600f610238565b3190565b611e6e906020611e58611e536002610b91565b610bc9565b636a276f9d90611e66610177565b948592610c16565b82528180611e7e600482016101cd565b03915afa918215611f9a57611edc92611e9e915f91611f6c575b50610cbb565b6020611eb2611ead6002610b91565b610bc9565b6319c0642990611ed13392611ec5610177565b96879485938493610c16565b835260048301610472565b03915afa8015611f6757611f07925f91611f39575b508015611f09575b611f0290610d75565b611ffa565b565b50611f02611f1f611f1a6001610d03565b610d10565b611f31611f2b33610331565b91610331565b149050611ef9565b611f5a915060203d8111611f60575b611f528183610bed565b810190610c2b565b5f611ef1565b503d611f48565b610c49565b611f8d915060203d8111611f93575b611f858183610bed565b810190610c2b565b5f611e98565b503d611f7b565b610c49565b60018060a01b031690565b611fb6611fbb91610214565b611f9f565b90565b611fc89054611faa565b90565b611fd490610bbd565b90565b916020611ff8929493611ff160408201965f83019061033d565b019061033d565b565b61200c6120076004611fbe565b611fcb565b631ea3c8b461201b600c610238565b8392803b15612132576120415f809461204c612035610177565b97889687958694610c16565b845260048401611fd7565b03925af1801561212d57612101575b5061207661207161206c600f610238565b610f09565b610f15565b9063bda71ada81833b156120fc576120ad936120a25f8094612096610177565b97889586948593610c16565b835260048301610472565b03925af19182156120f7576120c9926120cb575b50600c611990565b565b6120ea905f3d81116120f0575b6120e28183610bed565b810190610f21565b5f6120c1565b503d6120d8565b610c49565b610bd5565b612120905f3d8111612126575b6121188183610bed565b810190610f21565b5f61205b565b503d61210e565b610c49565b610bd5565b61214090611e40565b565b9061217191602061215b6121566002610b91565b610bc9565b636a276f9d90612169610177565b958692610c16565b82528180612181600482016101cd565b03915afa92831561229d576121df936121a1915f9161226f575b50610cbb565b60206121b56121b06002610b91565b610bc9565b6319c06429906121d433926121c8610177565b97889485938493610c16565b835260048301610472565b03915afa801561226a5761220a935f9161223c575b50801561220c575b61220590610d75565b6122c5565b565b5061220561222261221d6001610d03565b610d10565b61223461222e33610331565b91610331565b1490506121fc565b61225d915060203d8111612263575b6122558183610bed565b810190610c2b565b5f6121f4565b503d61224b565b610c49565b612290915060203d8111612296575b6122888183610bed565b810190610c2b565b5f61219b565b503d61227e565b610c49565b9160206122c39294936122bc60408201965f83019061034f565b01906103e2565b565b906122e06122db6122d6600f610238565b610f09565b610f15565b9063e995b63f90839092803b156123eb5761230e5f8094612319612302610177565b97889687958694610c16565b8452600484016122a2565b03925af180156123e6576123ba575b5061233b6123366004611fbe565b611fcb565b9063641657cb90823b156123b557612372926123675f809461235b610177565b96879586948593610c16565b83526004830161063d565b03925af180156123b057612384575b50565b6123a3905f3d81116123a9575b61239b8183610bed565b810190610f21565b5f612381565b503d612391565b610c49565b610bd5565b6123d9905f3d81116123df575b6123d18183610bed565b810190610f21565b5f612328565b503d6123c7565b610c49565b610bd5565b906123fa91612142565b565b6124046113ad565b5061240f600c610238565b90565b90612440602061242a6124256002610b91565b610bc9565b636a276f9d90612438610177565b938492610c16565b82528180612450600482016101cd565b03915afa80156125725761246b915f91612544575b50610cbb565b61247d6124786001610d03565b610d10565b61248f61248933610331565b91610331565b149182156124ab575b6124a46124a9936116c6565b6125c3565b565b6124ee925060206124c46124bf6002610b91565b610bc9565b637df73e27906124e333926124d7610177565b97889485938493610c16565b835260048301610472565b03915afa92831561253f576124a9936124a4915f91612511575b50935050612498565b612532915060203d8111612538575b61252a8183610bed565b810190610c2b565b5f612508565b503d612520565b610c49565b612565915060203d811161256b575b61255d8183610bed565b810190610c2b565b5f612465565b503d612553565b610c49565b61258b61258661259092611081565b610b9e565b610189565b90565b634e487b7160e01b5f52601160045260245ffd5b6125b090610189565b5f1981146125be5760010190565b612593565b905f146128915761260b60206125e16125dc6002610b91565b610bc9565b631d84be449061260033926125f4610177565b95869485938493610c16565b835260048301610472565b03915afa90811561288c575f9161285e575b5061262a5f600d01610265565b80612843575b8061281e575b61280b575b6126475f600d01610265565b806127f0575b806127cb575b6127b8575b6126645f600d01610265565b908161279c575b5080612777575b612764575b6126805f612577565b61268c5f600d0161028c565b612756575b61269d5f600d016102b3565b612748575b6126ae5f600d016102da565b61273a575b6126bf5f600d01610265565b908161271e575b50806126f9575b6126d6575b505b565b6126e190600c611990565b6126f36126ec6118d0565b600d611b42565b5f6126d2565b506127065f600d01610238565b61271861271283610331565b91610331565b146126cd565b905061273361272d600261190b565b91610189565b145f6126c6565b612743906125a7565b6126b3565b612751906125a7565b6126a2565b61275f906125a7565b612691565b61277260015f600d01611aa8565b612677565b506127845f600d01610238565b61279661279083610331565b91610331565b14612672565b90506127b16127ab600361192a565b91610189565b145f61266b565b6127c660015f600d01611a69565b612658565b506127d85f600d01610238565b6127ea6127e484610331565b91610331565b14612653565b50806128056127ff600261190b565b91610189565b1461264d565b61281960015f600d01611a2a565b61263b565b5061282b5f600d01610238565b61283d61283784610331565b91610331565b14612636565b508061285861285260016118ec565b91610189565b14612630565b61287f915060203d8111612885575b6128778183610bed565b810190611853565b5f61261d565b503d61286d565b610c49565b506128a461289d6118d0565b600d611b42565b6126d4565b906128b391612412565b565b6128e39060206128cd6128c86002610b91565b610bc9565b636a276f9d906128db610177565b948592610c16565b825281806128f3600482016101cd565b03915afa9182156129755761294592612913915f91612947575b50610cbb565b6129406129286129236001610d03565b610d10565b61293a61293433610331565b91610331565b14610d75565b612986565b565b612968915060203d811161296e575b6129608183610bed565b810190610c2b565b5f61290d565b503d612956565b610c49565b61298390610bbd565b90565b5f808080936129a461299f61299a846110a0565b611d5e565b61297a565b8282156129b9575bf1156129b457565b610c49565b506108fc6129ac565b6129cb906128b5565b565b91906040838203126129f557806129e96129f2925f86016113b1565b936020016113b1565b90565b610181565b612a4290612a06610fd4565b50612a0f610fd4565b506040612a2c612a27612a22600f610238565b610f09565b610f15565b632b17219790612a3a610177565b948592610c16565b82528180612a52600482016101cd565b03915afa8015612a9e575f80939091612a6b575b509190565b9050612a8f91925060403d8111612a97575b612a878183610bed565b8101906129cd565b91905f612a66565b503d612a7d565b610c49565b612aac906137ee565b565b90565b612ac5612ac0612aca92612aae565b610b9e565b610189565b90565b90565b612ae4612adf612ae992612acd565b610b9e565b610189565b90565b90959492612b3794612b26612b3092612b1c608096612b1260a088019c5f89019061033d565b60208701906103e2565b60408501906103e2565b60608301906103e2565b01906103e2565b565b90919380612b50612b4a60c8612ab1565b91610189565b10155f14612c2e5780612b6c612b6660c8612ab1565b91610189565b14612c16575b612b8c612b87612b82600f610238565b610f09565b610f15565b9163ac3e52c89234909390919496959295843b15612c11575f96612bc294612bcd92612bb6610177565b9a8b998a988997610c16565b875260048701612aec565b03925af18015612c0c57612be0575b505b565b612bff905f3d8111612c05575b612bf78183610bed565b810190610f21565b5f612bdc565b503d612bed565b610c49565b610bd5565b90612c2090613957565b90612c29613be2565b612b72565b9350505050612c46612c406064612ad0565b91610189565b1015612c52575b612bde565b612c4d565b5f7f6f776e2e64656661756c742e73656e6465720000000000000000000000000000910152565b612c8b6012602092610c59565b612c9481612c57565b0190565b612cad9060208101905f818303910152612c7e565b90565b15612cb757565b612cbf610177565b62461bcd60e51b815280612cd560048201612c98565b0390fd5b90612d0891612d0381612cfc612cf6612cf15f6110a0565b610331565b91610331565b1415612cb0565b612d0a565b565b90612d39916020612d23612d1e6002610b91565b610bc9565b636a276f9d90612d31610177565b958692610c16565b82528180612d49600482016101cd565b03915afa928315612dcb57612d9b93612d69915f91612d9d575b50610cbb565b612d96612d7e612d796001610d03565b610d10565b612d90612d8a33610331565b91610331565b14610d75565b612e52565b565b612dbe915060203d8111612dc4575b612db68183610bed565b810190610c2b565b5f612d63565b503d612dac565b610c49565b5f7f6f776e2e696e76616c69642e616d6f756e740000000000000000000000000000910152565b612e046012602092610c59565b612e0d81612dd0565b0190565b612e269060208101905f818303910152612df7565b90565b15612e3057565b612e38610177565b62461bcd60e51b815280612e4e60048201612e11565b0390fd5b5f808093612e84612e7f8395612e7a84612e74612e6e88612577565b91610189565b11612e29565b611d5e565b61297a565b828215612e99575bf115612e9457565b610c49565b506108fc612e8c565b90612eac91612cd9565b565b90602082820312612ec757612ec4915f016113c0565b90565b610181565b612ed590610ba1565b90565b612ee190612ecc565b90565b612eed90612ecc565b90565b90565b90612f08612f03612f0f92612ee4565b612ef0565b8254611966565b9055565b612f1c90610ba1565b90565b612f2890612f13565b90565b612f3490612f13565b90565b90565b90612f4f612f4a612f5692612f2b565b612f37565b8254611966565b9055565b612f6390610ba1565b90565b612f6f90612f5a565b90565b612f7b90612f5a565b90565b90565b90612f96612f91612f9d92612f72565b612f7e565b8254611966565b9055565b612faa90610ba1565b90565b612fb690612fa1565b90565b612fc290612fa1565b90565b90565b90612fdd612fd8612fe492612fb9565b612fc5565b8254611966565b9055565b612ff190610ba1565b90565b612ffd90612fe8565b90565b61300990612fe8565b90565b90565b9061302461301f61302b92613000565b61300c565b8254611966565b9055565b61304061303b5f611cb7565b611cc4565b61305a61305461304f5f6110a0565b610331565b91610331565b146136975761308b60206130756130705f611cb7565b611cc4565b634162169f90613083610177565b938492610c16565b8252818061309b600482016101cd565b03915afa908115613692576130c2916130bb915f91613664575b50612ed8565b6001612ef3565b6130ee60206130d86130d35f611cb7565b611cc4565b63b57dbdc6906130e6610177565b938492610c16565b825281806130fe600482016101cd565b03915afa90811561365f576131259161311e915f91613631575b50612f1f565b6002612f3a565b613151602061313b6131365f611cb7565b611cc4565b63cfbffe5390613149610177565b938492610c16565b82528180613161600482016101cd565b03915afa90811561362c5761318891613181915f916135fe575b50612f66565b6003612f81565b6131b4602061319e6131995f611cb7565b611cc4565b63ab6e844f906131ac610177565b938492610c16565b825281806131c4600482016101cd565b03915afa9081156135f9576131eb916131e4915f916135cb575b50612fad565b6004612fc8565b61321760206132016131fc5f611cb7565b611cc4565b639a7c40779061320f610177565b938492610c16565b82528180613227600482016101cd565b03915afa9081156135c65761324e91613247915f91613598575b50612ff4565b600561300f565b61327a602061326461325f5f611cb7565b611cc4565b63aa0ddc1690613272610177565b938492610c16565b8252818061328a600482016101cd565b03915afa8015613593576132a7915f91613565575b506007611990565b6132d360206132bd6132b85f611cb7565b611cc4565b636b4aefc6906132cb610177565b938492610c16565b825281806132e3600482016101cd565b03915afa801561356057613300915f91613532575b506008611990565b61332c60206133166133115f611cb7565b611cc4565b6324768d9190613324610177565b938492610c16565b8252818061333c600482016101cd565b03915afa801561352d57613359915f916134ff575b50600b611990565b613385602061336f61336a5f611cb7565b611cc4565b63640274279061337d610177565b938492610c16565b82528180613395600482016101cd565b03915afa80156134fa576133b2915f916134cc575b506009611990565b6133de60206133c86133c35f611cb7565b611cc4565b6330125cf5906133d6610177565b938492610c16565b825281806133ee600482016101cd565b03915afa80156134c75761340b915f91613499575b50600a611990565b613437602061342161341c5f611cb7565b611cc4565b63d3d1b0969061342f610177565b938492610c16565b82528180613447600482016101cd565b03915afa801561349457613464915f91613466575b506006611990565b565b613487915060203d811161348d575b61347f8183610bed565b810190612eae565b5f61345c565b503d613475565b610c49565b6134ba915060203d81116134c0575b6134b28183610bed565b810190612eae565b5f613403565b503d6134a8565b610c49565b6134ed915060203d81116134f3575b6134e58183610bed565b810190612eae565b5f6133aa565b503d6134db565b610c49565b613520915060203d8111613526575b6135188183610bed565b810190612eae565b5f613351565b503d61350e565b610c49565b613553915060203d8111613559575b61354b8183610bed565b810190612eae565b5f6132f8565b503d613541565b610c49565b613586915060203d811161358c575b61357e8183610bed565b810190612eae565b5f61329f565b503d613574565b610c49565b6135b9915060203d81116135bf575b6135b18183610bed565b810190612eae565b5f613241565b503d6135a7565b610c49565b6135ec915060203d81116135f2575b6135e48183610bed565b810190612eae565b5f6131de565b503d6135da565b610c49565b61361f915060203d8111613625575b6136178183610bed565b810190612eae565b5f61317b565b503d61360d565b610c49565b613652915060203d8111613658575b61364a8183610bed565b810190612eae565b5f613118565b503d613640565b610c49565b613685915060203d811161368b575b61367d8183610bed565b810190612eae565b5f6130b5565b503d613673565b610c49565b565b506136c760206136b16136ac6002610b91565b610bc9565b636a276f9d906136bf610177565b938492610c16565b825281806136d7600482016101cd565b03915afa80156137e9576136f2915f916137bb575b50610cbb565b61373360206137096137046002610b91565b610bc9565b6319c0642990613728339261371c610177565b95869485938493610c16565b835260048301610472565b03915afa9081156137b6575f91613788575b508015613758575b61375690610d75565b565b5061375661376e6137696001610d03565b610d10565b61378061377a33610331565b91610331565b14905061374d565b6137a9915060203d81116137af575b6137a18183610bed565b810190610c2b565b5f613745565b503d613797565b610c49565b6137dc915060203d81116137e2575b6137d48183610bed565b810190610c2b565b5f6136ec565b503d6137ca565b610c49565b6137f790613699565b565b67ffffffffffffffff8111613817576138136020916105a0565b0190565b610bd9565b9061382e613829836137f9565b611167565b918252565b5f7f55736572546f496e737428616464726573732900000000000000000000000000910152565b613864601361381c565b9061387160208301613833565b565b61387b61385a565b90565b369037565b906138a86138908361119f565b9260208061389e869361117c565b920191039061387e565b565b5f7f6361676528290000000000000000000000000000000000000000000000000000910152565b6138db600661381c565b906138e8602083016138aa565b565b6138f26138d1565b90565b60409061391e613925949695939661391460608401985f85019061033d565b602083019061033d565b01906103e2565b565b613930906118ec565b9052565b91602061395592949361394e60408201965f83019061033d565b0190613927565b565b61395f6113ad565b5061396b816010611990565b6139756010610238565b61398f6139896139845f6110a0565b610331565b91610331565b145f14613a29576139a86139a36004611fbe565b611fcb565b60206354279233916139ba600c610238565b906139d95f6001956139e46139cd610177565b97889687958694610c16565b845260048401613934565b03925af18015613a24576139f8575b505b90565b613a189060203d8111613a1d575b613a108183610bed565b810190611853565b6139f3565b503d613a06565b610c49565b50613a32613d34565b613a5e6020613a48613a435f611cb7565b611cc4565b63447bf0e290613a56610177565b938492610c16565b82528180613a6e600482016101cd565b03915afa908115613bdd57613ac791613aaa915f91613baf575b50613ab9613a96600c610238565b613a9e610177565b93849160208301610472565b60208201810382520383610bed565b613ac1613873565b90613e2f565b9081613ae3613add613ad85f6110a0565b610331565b91610331565b03613b85575b6020613afd613af86004611fbe565b611fcb565b63e4a312d190613b345f613b116010610238565b93613b3f613b1f600c610238565b97613b28610177565b98899788968795610c16565b8552600485016138f5565b03925af18015613b8057613b54575b506139f5565b613b749060203d8111613b79575b613b6c8183610bed565b810190611853565b613b4e565b503d613b62565b610c49565b50613baa81613b9b613b965f612577565b613883565b90613ba46138ea565b90613ea5565b613ae9565b613bd0915060203d8111613bd6575b613bc88183610bed565b810190612eae565b5f613a88565b503d613bbe565b610c49565b613c0e6020613bf8613bf35f611cb7565b611cc4565b637c27dd0c90613c06610177565b938492610c16565b82528180613c1e600482016101cd565b03915afa908115613d2f57613c4f91613c48915f91613d01575b50613c425f612577565b9061401f565b600f611990565b613c69613c64613c5f600f610238565b610f09565b610f15565b63463ef7c7613c7f613c7a5f611cb7565b611cc4565b613c896010610238565b92803b15613cfc57613cae5f8094613cb9613ca2610177565b97889687958694610c16565b845260048401611fd7565b03925af18015613cf757613ccb575b50565b613cea905f3d8111613cf0575b613ce28183610bed565b810190610f21565b5f613cc8565b503d613cd8565b610c49565b610bd5565b613d22915060203d8111613d28575b613d1a8183610bed565b810190612eae565b5f613c38565b503d613d10565b610c49565b613d3c610fd4565b50613d6a6020613d54613d4f6002610b91565b610bc9565b63262a9dff90613d62610177565b938492610c16565b82528180613d7a600482016101cd565b03915afa908115613dbe575f91613d90575b5090565b613db1915060203d8111613db7575b613da98183610bed565b810190611853565b5f613d8c565b503d613d9f565b610c49565b90565b613dda613dd5613ddf92613dc3565b610b9e565b610189565b90565b613deb90610326565b90565b613df781613de2565b03613dfe57565b5f80fd5b90505190613e0f82613dee565b565b90602082820312613e2a57613e27915f01613e02565b90565b610181565b929190613e4791613e3e6113ad565b9491909161414b565b9080613e82575b613e56575b50565b613e7b919250613e76906020613e6b82610570565b818301019101613e11565b61297a565b905f613e53565b50613e8c81610570565b613e9f613e996020613dc6565b91610189565b14613e4e565b929190613ebd91613eb4610fd4565b9491909161414b565b9080613eef575b613ecc575b50565b613ee89192506020613edd82610570565b818301019101611853565b905f613ec9565b50613ef981610570565b613f0c613f066020613dc6565b91610189565b14613ec4565b613f1b90610bbd565b90565b60207f73732874686973292e62616c616e63652c2076616c7565290000000000000000917f4572726f72732e496e73756666696369656e7442616c616e63652861646472655f8201520152565b613f786038604092610c59565b613f8181613f1e565b0190565b613f9a9060208101905f818303910152613f6b565b90565b5f7f696e732e436c6f6e65466163746f72792e6372656174652e6661696c65640000910152565b613fd1601e602092610c59565b613fda81613f9d565b0190565b613ff39060208101905f818303910152613fc4565b90565b15613ffd57565b614005610177565b62461bcd60e51b81528061401b60048201613fde565b0390fd5b6140276113ad565b5061403130613f12565b3161404461403e84610189565b91610189565b106140b1576037916e5af43d82803e903d91602b57fd5bf382763d602d80600a3d3981f3363d3d373d3d3d363d7300000060099460601b60e81c175f5260781b17602052f0906140af826140a86140a261409d5f6110a0565b610331565b91610331565b1415613ff6565b565b6140b9610177565b62461bcd60e51b8152806140cf60048201613f85565b0390fd5b6140dc5f61381c565b90565b6140e76140d3565b90565b90565b60200190565b63ffffffff60e01b1690565b614108906140f3565b90565b6141306141279260209261411e81610570565b9485809361112e565b9384910161057d565b0190565b61414290614148939261410b565b9061410b565b90565b6141536112e8565b5061415c610ffa565b50803b61417161416b5f612577565b91610189565b1461421e5760046142095f946141e286956141b8876141b261419a614194610177565b946140ea565b6141ac6141a682610570565b916140ed565b206140ff565b92610bed565b6141d36141c3610177565b95869260208401908152016101cd565b60208201810382520384610bed565b916141fa6141ee610177565b93849260208401614134565b60208201810382520382610bed565b602081019051915afa61421a6111b6565b9091565b5050505f9061422b6140df565b9056fea2646970667358221220efc19fa71c1902b56212c8e5d3228b628c73f2c4732de55484bf590ecefcca8364736f6c63430008180033'
				//arguments: [account]
				//arguments: ['0x24eb99dC3d5C26096160904A5E9b53AbEBfA0B7d']
			})
			//.send({ from: accounts[0]})
			//.send({ from: accounts[0], gas: 4931753 })
			.send({ from: accounts[0]  })
			.on('error', function(error) { debugger; console.log(error); })
			.on("receipt", (receipt) =>
			{
				debugger;
				// Contract Address will be returned here
				console.log("Contract Address:", receipt.contractAddress);


			})
			.then((initialContract) =>
			{	debugger;
				console.log("Contract Address:", initialContract);
				/*initialContract.methods.message().call((err, data) =>
				{
					console.log("Initial Data:", data);
				});*/
			});
		
		}
		catch (ex) {
			
				console.log(ex);
		}
		
}

async function onActivate()
{
	msgPrime('');

	try {
		
		let accounts = await ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		window.factorycontract = new web3.eth.Contract(factoryABI.abi, factory);
		if (!(await window.factorycontract.methods.isuser(accounts[0]).call())) 
		{ msg('Instance is not created.'); return; }

		await _activate(accounts[0]);
	}
	catch (ex) {
		console.log(ex);

		//  myalert("Registration failed");
	}
}
async function onActivate()
{
	msgPrime('');

	try {
		
		let accounts = await ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		window.factorycontract = new web3.eth.Contract(factoryABI.abi, factory);
		if (!(await window.factorycontract.methods.isuser(accounts[0]).call())) 
		{ msg('Instance is not created.'); return; }

		await _activate(accounts[0]);
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


async function onJoin() {
	$("#lblmsg").text('');
	
	try {

		let accounts = await ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		
		var parent = $("#txtparent").val();
		if (!parent) { msg('parent is blank'); return; }

		window.factorycontract = new window.web3.eth.Contract(factoryABI.abi, factory);
		if ((await window.factorycontract.methods.isuser(accounts[0]).call())) 
		{ msg('instance already exists.'); return; }
		
		window.factorycontract = new window.web3.eth.Contract(factoryABI.abi, factory);
		let response = await window.factorycontract.methods.createInstance(accounts[0], parent).send(
			{ from: accounts[0] }) 
			.on('error', function (error) { msg(error.message); console.log(error); })
			.then(function (Obj) {
				if (Obj.status == true) {
					$("#lblmsg").text('Joined succeeded');
				}
				else {
					$("#lblmsg").text('Joined failed');
				}
			});



	}
	catch (ex) {
		console.log(ex);
		$("#lblmsg").text('Initialized failed');
		//  myalert("Registration failed");
	}
}


async function onMint() {
	//let orc1155Add = orctype==1?orc1155:orc1155Cat;
	let orc1155Add = orc1155Cat;
	
	$("#lblmsg").text('');
	try {

		var txtqty = $("#txtAmount").val();
		if (!txtqty) { msg('qty is empty'); return; }
		
		let qty = BigInt(txtqty);
		let accounts = await ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		

		window.factorycontract = new window.web3.eth.Contract(factoryABI.abi, factory);
		if (!(await window.factorycontract.methods.isuser(accounts[0]).call())) 
		{ msg('user not found.'); return; }
		
		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		let instance = await window.nestedcontract.methods.UserToInst(accounts[0]).call();
		
		window.instancecontract = new web3.eth.Contract(insABI.abi, instance);
		
		let _value = BigInt(await window.instancecontract.methods.computeMintValue(qty).call());
		
		
		//let balanceWei = BigInt(await web3.eth.getBalance(instance)); 
		let bonus = BigInt(await window.instancecontract.methods.bonus().call());   // returns balance in Wei (as a string)
		//balanceWei = balanceWei+bonus;
		
		_value=bonus>=_value?(0):(_value-bonus); // if bonus is used, it should not exceed the total value
		
		let response = await window.instancecontract.methods.Txn(orc1155Add,3,qty,1).send(
			{ from: accounts[0], value: _value.toString() }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					$("#lblmsg").text('Minted succeeded');
				}
				else {
					$("#lblmsg").text('Minted failed');
				}
			});


	}
	catch (ex) {
		console.log(ex);
		$("#lblmsg").text('Staking failed');
		//  myalert("Registration failed");
	}
}


async function onClaim() {
	$("#lblmsg").text('');
	try {

		let accounts = await ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		

		window.factorycontract = new window.web3.eth.Contract(factoryABI.abi, factory);
		if (!(await window.factorycontract.methods.isuser(accounts[0]).call())) 
		{ msg('user not found'); return; }
		
		window.nestedcontract = new web3.eth.Contract(NestedABI.abi, nested);
		let instance = await window.nestedcontract.methods.UserToInst(accounts[0]).call();
		
		window.instancecontract = new web3.eth.Contract(insABI.abi, instance);
		//
		let response = await window.instancecontract.methods.Txn(blankAddress,9999,0,7).send(
			{ from: accounts[0] }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					$("#lblmsg").text('Claimed succeeded');
				}
				else {
					$("#lblmsg").text('Claimed failed');
				}
			});


	}
	catch (ex) {
		console.log(ex);
		$("#lblmsg").text('Staking failed');
		//  myalert("Registration failed");
	}
}


async function onNFTBurn(orc1155, tokenid, to, amount) {
	alert("Contract: " + orc1155 + ", Token ID: " + tokenid + ", To: " + to + ", Amount: " + amount);

	//

	$("#lblmsg").text('');
	try {

		let accounts = await ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		
		window.orc1155contract = new web3.eth.Contract(ORCABI.abi, orc1155);
		let response = await window.orc1155contract.methods.burn(accounts[0], tokenid, amount).send(
			{ from: accounts[0] }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })
	
			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					$("#lblmsg").text('Transfer succeeded');
				}
				else {
					$("#lblmsg").text('Transfer failed');
				}
			});


	}
	catch (ex) {
		console.log(ex);
		$("#lblmsg").text('Transfer failed');
		//  myalert("Registration failed");
	}
	
}

async function onNFTTransfer(orc1155, tokenid, to, amount) {
	alert("Contract: " + orc1155 + ", Token ID: " + tokenid + ", To: " + to + ", Amount: " + amount);

	//

	$("#lblmsg").text('');
	try {

		let accounts = await ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		
		window.orc1155contract = new web3.eth.Contract(ORCABI.abi, orc1155);
		let response = await window.orc1155contract.methods.safeTransferFrom(accounts[0], to, tokenid, amount, "0x").send(
			{ from: accounts[0] }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })
	
			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					$("#lblmsg").text('Transfer succeeded');
				}
				else {
					$("#lblmsg").text('Transfer failed');
				}
			});


	}
	catch (ex) {
		console.log(ex);
		$("#lblmsg").text('Transfer failed');
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
		//
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

			//
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


