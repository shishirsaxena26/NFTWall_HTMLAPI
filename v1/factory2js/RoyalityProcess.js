/* Define */
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
	return val + ' <a href="#" onclick="copyURI(event)" title="' + val + '">Copy</a>';
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
const contract = new web3.eth.Contract(RoyalABI, RoyalProcess);


async function loadData() {

	
	var count = await contract.methods.getRankUserCount().call();

	for (let i = 0; i < count[0]; i++) {
		var n4 = await contract.methods.rank4users(i).call();
		var isrank7 = await contract.methods.rank7(n4).call();

		var td = '<td>' + Linkmaker(n4) + '</td><td style="background:lightgreen;">' + (isrank7 ? 'Yes' : '') + '</td>';
		
		$("#tabR").append('<tr>' + td + '</tr>');
	}
			
}


loadData();
