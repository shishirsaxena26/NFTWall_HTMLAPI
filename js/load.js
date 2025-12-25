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

const factoryContractAddress = "0x33f76cb2d9e3D5a3C98873007E0B6b8006e55426";

window.web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s3.binance.org:8545/"));
var contract = new web3.eth.Contract(factoryABI, factoryContractAddress);


async function loadData() {
	contract = new web3.eth.Contract(factoryABI, factoryContractAddress);
	var count = await contract.methods.getNodesCount().call();
	
	for (let i = 0; i < count; i++)
		await loadStructure(i);
		
}


async function loadStructure(i) {
	contract = new web3.eth.Contract(factoryABI, factoryContractAddress);
	var n = await contract.methods.nodes(i).call();
	var node = await contract.methods.nodeStructs(n).call();
	contract = new web3.eth.Contract(validatorABI, node.validator);
	var stars = '<ul class="list-group">   <li class="">S1  <span class="badge">' + (await contract.methods.Star(0).call()) + '</span></li>   <li class="">S2 <span class="badge">' + (await contract.methods.Star(1).call()) + '</span></li>   <li class="">S3 <span class="badge">' + (await contract.methods.Star(2).call()) + '</span></li>   <li class="">S4 <span class="badge">' + (await contract.methods.Star(3).call()) + '</span></li>   <li class="">S5 <span class="badge">' + (await contract.methods.Star(4).call()) + '</span></li>   <li class="">S6 <span class="badge">' + (await contract.methods.Star(5).call()) + '</span></li>   <li class="">S7 <span class="badge">' + (await contract.methods.Star(6).call()) + '</span></li> </ul>';

	var LB = '<ul class="list-group">   <li class="">LB1  <span class="badge">' + (await contract.methods.LevelBusiness(0).call()) + '</span></li>   <li class="">LB2 <span class="badge">' + (await contract.methods.LevelBusiness(1).call()) + '</span></li>   <li class="">LB3 <span class="badge">' + (await contract.methods.LevelBusiness(2).call()) + '</span></li>   <li class="">LB4 <span class="badge">' + (await contract.methods.LevelBusiness(3).call()) + '</span></li>   <li class="">LB5 <span class="badge">' + (await contract.methods.LevelBusiness(4).call()) + '</span></li>   <li class="">LB6 <span class="badge">' + (await contract.methods.LevelBusiness(5).call()) + '</span></li>   <li class="">LB7 <span class="badge">' + (await contract.methods.LevelBusiness(6).call()) + '</span></li> </ul>';;

	var incomes = '<ul class="list-group">   <li class="">LevelInc  <span class="badge">' + (await contract.methods._levelIncome().call()) + '</span></li>   <li class="">Reward <span class="badge">' + (await contract.methods._rewardIncome().call()) + '</span></li>   <li class="">Royalilty <span class="badge">' + (await contract.methods._royalityIncome().call()) + '</span></li>   <li class="">Self <span class="badge">' + (await contract.methods._selfMining().call()) + '</span></li>   <li class="">LevelMine <span class="badge">' + (await contract.methods._levelMining().call()) + '</span></li>   <li class="">Adjusted <span class="badge">' + (await contract.methods._adjusted().call()) + '</span></li>   <li class="">Admin <span class="badge">' + (await contract.methods._adminincome().call()) + '</span></li>   <li class="">Staked <span class="badge">' + (await contract.methods._staked().call()) + '</span></li>   <li class="">Unstaked <span class="badge">' + (await contract.methods._unstaked().call()) + '</span></li> </ul>';

	var profile = '<div class="col-sm-4"><p>' + node.id + '</p> <div class="row"> <div class="col-sm-3">' + incomes + '</div> <div class="col-sm-3">' + stars + '</div><div class="col-sm-3">' + LB + '</div> </div> </div>';

	$("#nodes").append(profile);
	
}



$(document).ready(function () {
	loadData();
});