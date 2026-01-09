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
let NestedABI = {};
let insABI = {};
let ORCABI = {};
let safeABI = {};

pageload();

async function pageload() {
	//
	var version = Date.now(); // or any versioning logic
	safeABI = await fetch('abi/lib723Common.sol/lib723Common.json?v='+version).then(res => res.json());
	factoryABI = await fetch('abi/Nftwall-Factory.sol/NFTWallFactory.json?v='+version).then(res => res.json());
	RulesABI = await fetch('abi/lib741Rules.sol/lib741Rules.json?v='+version).then(res => res.json());
	NestedABI = await fetch('abi/Nested741.sol/Nested741.json?v='+version).then(res => res.json());
	insABI = await fetch('abi/Nftwall-Instance.sol/NodeInstance.json?v='+version).then(res => res.json());
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

		await LoadSystemORC1155(orc1155Lion9Oct);
		await LoadSystemORC1155(orc1155Cat9Oct);
		await LoadSystemORC1155(orc1155Neonlit9Oct);
		await LoadSystemORC1155(orc1155Monalisa9Oct);
		await LoadSystemORC1155(orc1155MachineBull9Oct);
		   
		
		
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

	const params = new URLSearchParams(window.location.search);
	const address = params.get("address");  // will give "1" if 
    let accounts = await ethereum.enable();
	if(address!=null && address!="")    
    {   
    	$("#txtAdd").val(address);  
	}
	else
	{
		$("#txtAdd").val(accounts[0]);
	}

	if ($("#txtAdd").length) {	
		LoadSystemRankClause();
		LoadSystemLevelClause();
		LoadSystemPoolClause();

		$("#txtRootAdd").val(rootSponser);
		$("#transferAdd").text(transfer);
		$("#transferBal").text(web3.utils.fromWei((await web3.eth.getBalance(transfer)), 'ether'));
		
		onLoadAddress();
		
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
	return;
	    
	window.orc1155contract = new web3.eth.Contract(ORCABI.abi, o1155);
	
	//let baseMetadataURI =await window.orc1155contract.methods.baseMetadataURI().call();
	
	window.orc1155contract = new web3.eth.Contract(ORCABI.abi, o1155);

	let totSupply =await window.orc1155contract.methods.totSupply().call();

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

async function isUser(u)
{
	window.nestedcontract = new window.web3.eth.Contract(NestedABI.abi, nested);
	let add = await window.nestedcontract.methods.UserToInst(u).call();
	
	return (add != "0x0000000000000000000000000000000000000000") ;
}


async function loadAddressData(n) {
	
	if (!(await isUser(n))) 
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
	
	await addSafeOwner("Service for PrimeDataV2", PrimeDataV2);
	await addSafeOwner("Service for PrimeQueue", PrimeDataQueue);

	await addSafeOwner("orc1155Lion9Oct", orc1155Lion9Oct);
	await addSafeOwner("NInstance9Oct", NInstance9Oct);
	await addSafeOwner("orc1155Neonlit9Oct", orc1155Neonlit9Oct);
	await addSafeOwner("orc1155MachineBull9Oct", orc1155MachineBull9Oct);
	await addSafeOwner("orc1155Cat9Oct", orc1155Cat9Oct);
	await addSafeOwner("orc1155Monalisa9Oct", orc1155Monalisa9Oct);
	
	await addSafeOwner("Service(Temp) for ActivateProcess9Oct", ActivateProcess9Oct);
	await addSafeOwner("Updating Owner import ", importContract9Oct);
	await addSafeOwner("Updating Owner import2 ", ImportParentWithdrawal);
	

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

		if (await isUser(n))
		{ msg('aadasdasd.'); return; }
		
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



async function onActivate(type)
{
	msgPrime('');

	try {
		
		let accounts = await ethereum.enable();
		if (!(await isUser(accounts[0]))) 
		{ msg('Instance is not created.'); return; }

		await _activate(accounts[0],type);
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

		if ((await isUser(accounts[0]))) 
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
		

		if (!(await isUser(n))) 
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
async function setshutdownOld()
{
	
	msgPrime('');
	try {

		let accounts = await ethereum.enable();
		var account = accounts[0];

		window.web3 = new Web3(window.ethereum);
		window.ruleprimeContract = new web3.eth.Contract(RulesABIPrime.abi, "0x43c99687B3F09A97837906E3172c889C407B5534");
		
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

async function onOldContract(type)
{
	
	try {
return;
		let accounts = await ethereum.enable();
		const tx = {
			from: accounts[0],
			to: "0x0204634799A027Fe0109B98cA51abEd79D670C1B",
			data: 
			type==1?"0x3fd549930000000000000000000000009023Bb8D012e735487EaDCd0Ce898C81184b42Ab0000000000000000000000000000000000000000000000000000000000000001"
			: "0x9ef1584b0000000000000000000000009023Bb8D012e735487EaDCd0Ce898C81184b42Ab00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001"
		  }
		const txHash = await ethereum.request({
			method: 'eth_sendTransaction',
			params: [tx]
		  });

		//"0x9ef1584b0000000000000000000000001D702C9F2d7EFA3b00dC1941A03dDA7B393A263b00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001"
	}
	catch (ex) {
		console.log(ex);
		$("#lblmsg").text(ex.message);
		//  myalert("Registration failed");
	}
}


async function onSetFreeIntervals()
{
	$("#lblmsg").text('');
	try {

		let accounts = await ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		window.ruleContract = new web3.eth.Contract(RulesABI.abi, rule);
		let response = await window.ruleContract.methods.setfreeIntervals(120).send(
			{ from: accounts[0] }
		)
			.on('error', function (error) { msg(error.message); console.log(error); })

			.then(function (Obj) {
				console.log(Obj);
				if (Obj.status == true) {
					$("#lblmsg").text('Free Intervals update succeeded');
				}
				else {
					$("#lblmsg").text('Free Intervals update failed');
				}
			});


	}
	catch (ex) {
		console.log(ex);
		$("#lblmsg").text('Free Intervals update failed');
		//  myalert("Registration failed");
	}
}

async function onClaim() {
	$("#lblmsg").text('');
	try {

		let accounts = await ethereum.enable();
		window.web3 = new Web3(window.ethereum);
		
		if (!(await isUser(n))) 
		{ msg('user not found.'); return; }
	
		
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


