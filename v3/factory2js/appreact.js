let web3;
web3 = new Web3(provider);

let web3Main;
web3Main = new Web3(providerMain);

var BN = web3.utils.BN;
var bs1 = new web3.utils.BN("0");

let IPriceABI = {};
let ISafeguardABI = {};
let IHexBaseABI = {};
let I741RulesABI = {};
let INested741ABI = {};
let IInstanceMeABI = {};
let IORC1155ABI = {};
let IInstanceStorABI = {};
let IDAOCoreABI = {};
let IDAOAssemblyABI = {};
let ITransferRequestsABI = {};
let INFTProxyABI = {};

let inprice = {};
let insafeguard = {};
let inHexBase = {};
let in741Rule = {};
let inNested741 = {};
let inInstanceMe = {};
let inORC1155 = {};
let indaocore = {};
let indaoassembly = {};
let inproposals = [];
let inNftProxy = {};

let nested;
let rule;
let safeguard;
let daocore;
let daoassembly;
let transferRequests;
let nftProxy;
let validator;
let currentAccount = null;
let currentInstance = null;
let currentStor = null;


const step = 5000;



async function load(){
    await init();
    loadRule();
    
}

async function init(){
    //scanBlocks(50); // scan last 20 blocks
    IPriceABI = await fetch('abistandardv3/lib741Price.sol/lib741Price.json?v='+version).then(res => res.json());
    ISafeguardABI = await fetch('abistandardv3/libSafeguard.sol/libSafeguard.json?v='+version).then(res => res.json());
    IHexBaseABI = await fetch('abistandardv3/hexBase.sol/hexBase.json?v='+version).then(res => res.json());
    I741RulesABI = await fetch('abistandardv3/lib741Rules.sol/lib741Rules.json?v='+version).then(res => res.json());
    INested741ABI = await fetch('abistandardv3/Nested741.sol/Nested741.json?v='+version).then(res => res.json());
    IInstanceMeABI = await fetch('abistandardv3/Nftwall-InstanceMe.sol/InstanceMe.json?v='+version).then(res => res.json());
    IORC1155ABI = await fetch('abistandardv3/ORC1155.sol/ORC1155.json?v='+version).then(res => res.json());
    IInstanceStorABI = await fetch('abistandardv3/InstanceStor.sol/InstanceStor.json?v='+version).then(res => res.json());
    IDAOCoreABI = await fetch('abistandardv3/DAOCore.sol/DAOCore.json?v='+version).then(res => res.json());
    IDAOAssemblyABI = await fetch('abistandardv3/DAOAssembly.sol/DAOAssembly.json?v='+version).then(res => res.json());
    ITransferRequestsABI = await fetch('abistandardv3/TransferRequests.sol/TransferRequests.json?v='+version).then(res => res.json());
    INFTProxyABI = await fetch('abistandardv3/NFTProxy.sol/NFTProxy.json?v='+version).then(res => res.json());
     
    inhexBase = hexBaseAddress;
    hexBase = new web3.eth.Contract(IHexBaseABI.abi, inhexBase);
    
    inNested741 = await hexBase.methods.in741().call();
    nested = new web3.eth.Contract(INested741ABI.abi, inNested741);

    in741Rule = await hexBase.methods.in741Rule().call();
    rule = new web3.eth.Contract(I741RulesABI.abi, in741Rule);

    insafeguard = await hexBase.methods.insafeguard().call();
    safeguard = new web3.eth.Contract(ISafeguardABI.abi, insafeguard);

    indaocore = await hexBase.methods.daocore().call();
    daocore = new web3.eth.Contract(IDAOCoreABI.abi, indaocore);

    indaoassembly = await hexBase.methods.daoassembly().call();
    daoassembly = new web3.eth.Contract(IDAOAssemblyABI.abi, indaoassembly);
    
    inInstanceMe = await hexBase.methods.inInstance().call();
    instanceme = new web3.eth.Contract(IInstanceMeABI.abi,inInstanceMe);

    inproposals.push(await hexBase.methods.proposals(0).call());
    transferRequests = new web3.eth.Contract(ITransferRequestsABI.abi, inproposals[0]);
    
    inPrice  = await hexBase.methods.inPrice().call();
    const priceContract = new web3.eth.Contract(IPriceABI.abi, inPrice);
    console.log("💰 Ozone Price in USDT:", 
        await priceContract.methods.ozonePriceInUSDT().call()
    );

    validator = new web3Main.eth.Contract(validatorsLocalsABI, validatorsLocalsAddress);
   
    inNftProxy = await hexBase.methods.inNftProxy().call();
    nftProxy = new web3.eth.Contract(INFTProxyABI.abi, inNftProxy);
    
    currentAccount = null;
    currentInstance = null;
    currentStor = null;

    if(window.ethereum){
        window.ethereum.request({method:'eth_accounts'}).then(async (accounts)=>{
            if(accounts.length){
                currentAccount = accounts[0];
                showWallet();
                await addConnectedUserPanel();
            }
        });
    }
   
    hideLoader();
    
    
}


// -------------------- PANEL FUNCTIONS --------------------
function clearPanels() {
  document.getElementById("systemPanels").innerHTML = "";
}

function renderAddress(value){
  const v = document.createElement("div");

  if(typeof value === "string" && value.startsWith("0x")){
    v.className = "addr";

    const short = document.createElement("span");
    short.className = "shortAddr";
    short.innerText = value.slice(0,6) + "..." + value.slice(-4);

    const btn = document.createElement("button");
    btn.className = "copyBtn";
    btn.innerText = "📋";

    btn.onclick = ()=>{
      navigator.clipboard.writeText(value);
      btn.innerText="✓";
      setTimeout(()=>{ btn.innerText="📋"; },1000);
    };

    v.appendChild(short);
    v.appendChild(btn);
  } 
  else{
    v.innerText = value;
  }

  return v;
}

function renderAddressLongX(value){
  const v = document.createElement("div");

  if(typeof value === "string" && value.startsWith("0x")){
    v.className = "addr";

    const short = document.createElement("span");
    short.className = "shortAddr";
    short.innerText = value.slice(0,10) + "..." + value.slice(-10);

    const btn = document.createElement("button");
    btn.className = "copyBtn";
    btn.innerText = "📋";

    btn.onclick = ()=>{
      navigator.clipboard.writeText(value);
      btn.innerText="✓";
      setTimeout(()=>{ btn.innerText="📋"; },1000);
    };

    v.appendChild(short);
    v.appendChild(btn);
  } 
  else{
    v.innerText = value;
  }

  return v;
}

function addPanel(title) {
  const panel = document.createElement("div");
  panel.className = "panel";
  const h3 = document.createElement("h3");
  h3.innerText = title;
  panel.appendChild(h3);
  document.getElementById("systemPanels").appendChild(panel);
  return panel;
}

function addRow(panel, field, value) {
  const row = document.createElement("div");
  row.className = "row";

  const f = document.createElement("div");

  if (field instanceof HTMLElement) {
    f.appendChild(field); row.appendChild(f); 
  }
  else {
    if(field!="") { f.innerText = field;  row.appendChild(f); }
  }

  const v = document.createElement("div");
  if (value instanceof HTMLElement) {
    // ⬅️ If value is HTML object → append it
    v.width = "100%";
    v.appendChild(value);
    
  } else if(typeof value === "string" && value.startsWith("0x")){
    v.className = "addr";
    const short = document.createElement("span");
    short.className = "shortAddr";
    short.innerText = value.slice(0,6) + "..." + value.slice(-4);

    const btn = document.createElement("button");
    btn.className="copyBtn";
    btn.innerText="📋";
    btn.onclick = ()=>{
      navigator.clipboard.writeText(value);
      btn.innerText="✓";
      setTimeout(()=>{ btn.innerText="📋"; },1000);
    };

    const balpanel = document.createElement("span");
    balpanel.className = "shortAddr";
    printRow(value,balpanel);

    v.appendChild(short);
    v.append(balpanel);
    v.appendChild(btn);
  } else {
    v.innerText = value;
  }

 
  row.appendChild(v);
  panel.appendChild(row);
}

function shortAddr(addr){
    if(!addr) return "";
    if(addr.length <= 10) return addr;
    return addr.slice(0,6) + "..." + addr.slice(-4);
}

function pad3(v){
    v=parseInt(v);
    if(v>=100) return v.toString();
    if(v>=10) return "0"+v;
    return "00"+v;
}

// Helper: format wei → OZN with 3 decimals
function formatOZN(value) {
    if(!value) return "NULL";
    return Number(web3.utils.fromWei(value, "ether")).toFixed(12) + " OZN";
}

async function printRow(addr, balpanel){
    const bal = await web3.eth.getBalance(addr);
   /* let eth3 = new web3.utils.BN(bal).div(new web3.utils.BN("1000000000"));
    let major = eth3.div(new web3.utils.BN("1000")).toString();
    let minor = pad3(eth3.mod(new web3.utils.BN("1000")).toString()); */
    
    let res = " | " + Number(web3.utils.fromWei(bal, "ether")).toFixed(12) + " OZN";
    balpanel.innerText = res;
    return res;
}

// -------------------- LOAD SYSTEM --------------------
async function loadSystem() {
    clearPanels();
    const panelSys = addPanel("System Data");
    try{
    const nodes = await nested.methods.getNodesCount().call();
    const sysAge = await nested.methods.systemAge().call();
    const forms = await transferRequests.methods.getFormsCount().call();
    const isSafe = await safeguard.methods.isSafe().call();

    addRow(panelSys,"Nodes Count",nodes);
    addRow(panelSys,"System Age",sysAge);
    addRow(panelSys,"Form Count",forms);
    addRow(panelSys,"Is Safe",isSafe);

    await loadSystemTreasuriesNSecurebase();

    } catch(err){
        console.error(err);
        addRow(panelMarket,"Error","Unable to load marketplace");
    }

    await onGetDailyBusiness();
    hideLoader();
    //setTimeout(() => loadSystem(), 15000);
   
}

// -------------------- SYSTEM TREASURY + SECUREBASE --------------------
async function loadSystemTreasuriesNSecurebase(){
    const container = document.getElementById("systemPanels");

    const panelBase = addPanel("BASE");
    const link = document.createElement("a");

    link.innerText = "HexBase";
    link.href = "#"; // prevent navigation
    // apply color
    link.style.color = "var(--text)";
    link.addEventListener("click", function (e) {
        e.preventDefault(); // stop page jump
        const _p = prompt("Enter hexbase address:");
        const _hex = _p.trim();
        if (!_hex || !web3.utils.isAddress(_hex)) {
            alert("Enter a valid hexbase address");
            return;
        }
        hexBaseAddress = _hex;
        init();
    });
    addRow(panelBase,link,hexBaseAddress);
   

    const deployer = await hexBase.methods.inDeployerAsRoot().call();
    addRow(panelBase,"DeployerAsRoot",deployer);

    const old741 = await hexBase.methods.in741Old().call();
    addRow(panelBase,"in741Old",old741);
    addRow(panelBase,"in741",inNested741);

    const daoCore = await hexBase.methods.daocore().call();
    addRow(panelBase,"DAO Core",daoCore);
    const daoAsm = await hexBase.methods.daoassembly().call();
    addRow(panelBase,"DAO Assembly",daoAsm);

    const prop0 = await hexBase.methods.proposals(0).call();
    addRow(panelBase,"proposal(0)",prop0);
    const inst = await hexBase.methods.inInstance().call();
    addRow(panelBase,"instance",inst);
    const nftproxy = await hexBase.methods.inNftProxy().call();
    addRow(panelBase,"NFTProxy",nftproxy);
    const validator = await hexBase.methods.invalidator().call();
    addRow(panelBase,"Validator",validator);

    const panelTreasury = addPanel("TREASURY");
    const factory = await hexBase.methods.inTreaseryFactory().call();
    addRow(panelTreasury,"Factory",factory);
    const mining = await hexBase.methods.inTreaseryTVLMining().call();
    addRow(panelTreasury,"TVL Mining",mining);
    const reward = await hexBase.methods.inTreaseryTVLReward().call();
    addRow(panelTreasury,"TVL Reward",reward);
    const roy = await hexBase.methods.inTreaseryTVLRoyality().call();
    addRow(panelTreasury,"TVL Royality",roy);
    const val = await hexBase.methods.inTreaseryTVLValidator().call();
    addRow(panelTreasury,"TVL Validator",val);
    const panelByteCode = addPanel("BYTECODE");
    addRow(panelByteCode,"Bytecode", byteCodeStandard);
    addRow(panelByteCode,"Download ABI", "https://drive.google.com/drive/folders/1O4J0hFtdSdbBcDyA5SxrLUOM8NqtQl0-");
    

    const panelSecure = addPanel("SECUREBASE");
    const safe = await safeguard.methods.isSecureBase(insafeguard).call();


    addRow(panelSecure,"safeguard",safe);
    const propSafe = await safeguard.methods.isSecureBase(prop0).call();
    addRow(panelSecure,"proposal(0)",propSafe);

    
    const panelBusiness= addPanel("Business");
      
    const rBusiness=document.createElement("div");

    const btnExecuteRoyality=document.createElement("button");
            btnExecuteRoyality.innerText="ExecuteRoyality";
            btnExecuteRoyality.style.marginLeft="10px";
            btnExecuteRoyality.onclick = () => {
              onExecuteRoyality();
    };

    const btnDefaultRankCount=document.createElement("button");
            btnDefaultRankCount.innerText="DefaultRankCount";
            btnDefaultRankCount.style.marginLeft="10px";
            btnDefaultRankCount.onclick = () => {
              onSetDefaultRankCount();
    };
    

    const btnBusiness=document.createElement("button");
            btnBusiness.innerText="GetBusiness";
            btnBusiness.style.marginLeft="10px";
            btnBusiness.onclick = () => {
              onGetDailyBusiness();
    };
    
    rBusiness.appendChild(btnDefaultRankCount);
    rBusiness.appendChild(btnExecuteRoyality);
    rBusiness.appendChild(btnBusiness);

    addRow(panelBusiness,"Click to get business",rBusiness);
    // Create table
    const table1 = document.createElement("table");
    table1.id = "tabDailyBusiness";
    table1.border = "1";
    table1.style.width = "100%";

    // Add header
    table1.innerHTML = `
    <thead>
    <tr>
    <th>Day</th><th>Business</th><th>Withdrawn</th><th>Joining</th>
    <th>Ct0</th><th>Ct1</th><th>Ct2</th><th>Ct3</th>
    <th>Ct4</th><th>Ct5</th><th>Ct6</th><th>Ct7</th>
    <th>Royal3-2</th><th>Royal5-4</th><th>Royal7</th>
    </tr>
    </thead>
    <tbody id="tabDBBody"></tbody>
    `;
  
    
    const idSpan = document.createElement("span");
    

    addRow(panelBusiness, "", table1);
    onGetDailyBusiness();
    
}

async function onExecuteRoyality() {

    // Enable wallet
    window.web3T = new Web3(window.ethereum);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const nestedContractV1 = new web3T.eth.Contract(INested741ABI.abi, inNested741);
    
    const tx = await nestedContractV1.methods
        .compileRoyality(systemAge)
        .send({
            from: accounts[0]
    });

    if (tx.status) {
        alert("ExecuteRoyality succeeded");
    } else {
        alert("ExecuteRoyality failed");
    }
       

}

async function onSetDefaultRankCount() {

    // Enable wallet
    window.web3T = new Web3(window.ethereum);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const nestedContractV1 = new web3T.eth.Contract(INested741ABI.abi, inNested741);
    
    const tx = await nestedContractV1.methods
        .setDefaultRankCount(10)
        .send({
            from: accounts[0]
    });

    if (tx.status) {
        alert("ExecuteRoyality succeeded");
    } else {
        alert("ExecuteRoyality failed");
    }
       
    
}
async function onGetDailyBusiness() {
	showLoader();
	var r3 = new BN("0");
	var r5 = new BN("0");
	var r7 = new BN("0");
	document.getElementById("tabDBBody").replaceChildren();
    document.getElementById("tabDBBody").innerHTML = "";
	
	let age = await nested.methods.systemAge().call();
	for (let i = age; i>=parseInt(age)-8; i--) {
		let b = await nested.methods.getbusiness(i).call();
		let w = await nested.methods.getwithdrawn(i).call();
        let j = await nested.methods.getjoining(i).call();

		
		let Ct0 = await nested.methods.getrankCount(i,0).call();
		let Ct1 = await nested.methods.getrankCount(i,1).call();
		let Ct2 = await nested.methods.getrankCount(i,2).call();
		let Ct3 = await nested.methods.getrankCount(i,3).call();
		let Ct4 = await nested.methods.getrankCount(i,4).call();
		let Ct5 = await nested.methods.getrankCount(i,5).call();
		let Ct6 = await nested.methods.getrankCount(i,6).call();
		let Ct7 = await nested.methods.getrankCount(i,7).call();
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
		
		//console.log(r3.toString());
		//console.log(r5.toString());
		//console.log(r7.toString());
        // 1. Check addresses
        //console.log("nested:", nested.options.address);

        //let in741Addr = await hexBase.methods.in741().call();
        //console.log("in741:", in741Addr);
        let constRoyal = await nested.methods.getRoyalityAmountBatch(i).call();

		console.log(`i: ${i}`);
        console.log(`constRoyal: ${constRoyal}`);
		document.getElementById("tabDBBody")
        .insertAdjacentHTML("beforeend",
            '<tr><td>'+i+'</td><td>'+b+'</td><td>'+w+'</td><td>'+j+'</td><td>'+Ct0+'</td><td>'+Ct1+'</td><td>'+Ct2+'</td><td>'+Ct3+'</td><td>'+Ct4+'</td><td>'+Ct5+'</td><td>'+Ct6+'</td><td>'+Ct7+'</td><td>'+constRoyal[1].toString()+'</td><td>'+constRoyal[3].toString()+'</td><td>'+constRoyal[6].toString()+'</td></tr>'
        );
	}	

	

	hideLoader();
	
}


async function addConnectedUserPanel(){

    
    const btnJoin = document.getElementById("btnJoin");
    const btnInit = document.getElementById("btnInit");
    const btnImport = document.getElementById("btnImport");

    btnJoin.style.display = "none";
    btnInit.style.display = "none";
    btnImport.style.display = "none";

    if (!currentAccount || !web3.utils.isAddress(currentAccount)) return;

    try{
        const id = await nested.methods.UserToId(currentAccount).call();
        const node = await nested.methods.getNode(id).call();

        document.getElementById("walletId").innerText =
            "ID " + node[0];

        currentInstance = node[3];
        currentStor = node[4];

       /*
        STEP 1
        No instance yet
        */

        if(node[3] == ZERO){
            btnJoin.style.display = "block";
            return;
        }

        /*
        STEP 2
        Import instance
        */
        if(node[3] != ZERO && node[4] != ZERO){
            currentInstance = node[3];
            currentStor = node[4];
            document.getElementById("walletInst").innerText =
                "Inst " + shortAddr(currentInstance);
            const stor = new web3.eth.Contract(IInstanceStorABI.abi, currentStor);
            const postInit = await stor.methods.postInit().call();
            if(!postInit){
                btnImport.style.display = "block";
                return;
            } else {
                
                document.getElementById("walletStor").innerText =
                "Stor " + shortAddr(currentStor);
            }
           
        }

    }catch(e){
        console.log(e);
        document.getElementById("walletNode").innerText = "User not registered";
    }
}

function updatePanelWithInstance(instance){

    document.getElementById("walletInst").innerText =
        "Inst " + shortAddr(instance);

    document.getElementById("btnJoin").style.display = "none";
    document.getElementById("btnInit").style.display = "block";
}


async function connectWallet() {
    currentAccount = null;
    currentInstance = null;
    currentStor = null;

  if (!window.ethereum) {
      alert("MetaMask not installed");
      return;
  }

  try {

      const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
      });

      currentAccount = accounts[0];

      showWallet();
      await addConnectedUserPanel();
  } catch (err) {
      console.error(err);
  }

}
function showWallet(){

    const short = currentAccount.slice(0,6) + "..." + currentAccount.slice(-4);

    document.getElementById("walletAddr").innerText = short;

    document.getElementById("connectBtn").style.display = "none";
    document.getElementById("walletInfoLine").style.display = "flex";
    

}

function disconnectWallet(){

    currentAccount = null;
    currentInstance = null;
    currentStor = null;

    document.getElementById("walletInfoLine").style.display = "none";

    document.getElementById("connectBtn").style.display = "inline-block";

}

function copyWallet(){

    if(!currentAccount) return;

    navigator.clipboard.writeText(currentAccount);

}



window.onload = load;