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

const treeData = {
  id: "1",
  address: "0x0089188449F0d4119715c9A10eA8955FB26EE308",
  children: [
    {
      id: "2",
      address: "0x2242C969aaFD0D61Dd83e9a9c5E5dB046eeC922C",
      children: [
        {
          id: "4",
          address: "0x65595A6F3F2c71D2Daf9e816FbA3bfF80C8388c2",
          children: [
            {
              id: "6",
              address: "0x3700Ec1c787B382363f8CEF7c6605f6D8d8CBbBB",
              children: [
                {
                  id: "8",
                  address: "0x35312d50cf3c4ea8e997f2cB55c89b674E769161",
                  children: [
                    {
                      id: "9",
                      address: "0xBC422C995f416C44FDCD2f755622F74E76c1782f",
                      children: [
                        {
                          id: "10",
                          address: "0x38d8980013588181A3ee358F4aFcF573c1454A21",
                          children: [
                            {
                              id: "11",
                              address: "0x7017313e77417D9F66EFc6c4E38623Ec28E50266",
                              children: []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: "7",
              address: "0xE77aB47de567b3a79849F38dbAd1d321b3ACE9d8",
              children: []
            }
          ]
        },
        {
          id: "5",
          address: "0x8fBD8b80F831735B1d0f21c67600e2b29a43A143",
          children: [
            {
              id: "12",
              address: "0xd2e355C594775d9cE44959C05879085c4fD94229",
              children: []
            }
          ]
        }
      ]
    },
    {
      id: "3",
      address: "0x9653e22e7De603e3f4F80d6e6964Da487a4440bD",
      children: []
    }
  ]
};

const step = 5000;


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
    //name(); 
    //debugTransaction();
    //scanBlocks(50); // scan last 20 blocks

    //renderULTreePanel();
    
    
}

async function name() {
 
    const orc1155contract = new web3.eth.Contract(IORC1155ABI.abi,"0xC9627f194Cb4Ed859132F3f9D0E0577ee9c9f443");
    const events = await orc1155contract.getPastEvents("TransferSingle", {
    fromBlock: minBlock,
    toBlock: parseInt(minBlock)+10000
    });
    console.log(events);
}

async function _callpayload(){
    const data = web3.eth.abi.encodeFunctionCall({
            name: "subscribed",
            type: "function",
            inputs: [
                {type: "address", name: "_user"}
            ]
            }, ["0xE77aB47de567b3a79849F38dbAd1d321b3ACE9d8"]);

        const payload = web3.eth.abi.encodeParameters(
            ["address", "bytes"],
            ["0xFcb3B3914e3E93040884696De45fb99b1a8Cbb90", data]
        );
        
            window.web3T = new Web3(window.ethereum);
        // Initialize contract
        const hexcontract = new web3T.eth.Contract(IHexBaseABI.abi, inhexBase);
            // Send transfer
            const tx = await hexcontract.methods
                .onTokenTransfer(payload)
                .send({ from: currentAccount });

            console.log(tx);

            if (tx.status) 
                alert("Burning succeeded");
            else 
                throw "Burning failed"; 
      
}

async function scanBlocks(limit = 10) {


  const latestBlock = await web3.eth.getBlockNumber();
  //console.log("Latest Block:", latestBlock);

  for (let i = latestBlock; i > 0; i--) {

    const block = await web3.eth.getBlock(i, true); // true = include tx objects
    if( block.transactions.length==0) continue;
    console.log("------------------------------------------------");
   
   
    console.log("Block Number:", block.number);
    console.log("Block Hash:", block.hash);
    console.log("Timestamp:", block.timestamp);
    console.log("Miner:", block.miner);
    console.log("Gas Used:", block.gasUsed);
    console.log("Transaction Count:", block.transactions.length);

    block.transactions.forEach((tx, index) => {
      console.log("   TX#", index + 1);
      console.log("   Hash:", tx.hash);
      console.log("   From:", tx.from);
      console.log("   To:", tx.to);
      console.log("   Value:", web3.utils.fromWei(tx.value, "ether"), "ETH");
      console.log("   Gas:", tx.gas);
      console.log("   GasPrice:", tx.gasPrice);
      console.log("   Nonce:", tx.nonce);
      console.log("   Input:", tx.input);
      console.log("   ---------------------------");
    });

  }
}

async function debugTransaction() {
    const txHash = "0xa4de0d0d4355b21d9158ead76af831b1505de7d99b10ac543eb7293f66592501";
    web3.currentProvider.send(
    {
        jsonrpc: "2.0",
        method: "debug_traceTransaction",
        params: [
            txHash,
            { tracer: "callTracer" }
        ],
        id: 1
    },
    function (err, result) {
      if (err) {
        console.error("Debug error:", err);
        return;
      }

      console.log("Trace result:", result);

      /* OPTIONAL: Also fetch receipt */

      web3.eth.getTransactionReceipt(txHash)
        .then(function(receipt){

            console.log("Transaction Receipt:", receipt);

            if(receipt && receipt.logs){

                console.log("Event Logs:");

                receipt.logs.forEach(function(log,i){

                    console.log("Log #"+i, log);

                });

            }

        })
        .catch(function(err){
            console.error("Error fetching receipt:", err);
        });

    }
  );
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
    return Number(web3.utils.fromWei(value, "ether")).toFixed(8) + " OZN";
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

    hideLoader();
    setTimeout(() => loadSystem(), 15000);
   
}

// -------------------- SYSTEM TREASURY + SECUREBASE --------------------
async function loadSystemTreasuriesNSecurebase(){
    const container = document.getElementById("systemPanels");

    const panelBase = addPanel("BASE");
    addRow(panelBase,"HexBase",hexBaseAddress);
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

	

	
	
}

//NOT IN USED
// -------------------- LOAD USER (NOT IN USED) --------------------
async function loadUserPanel(user){
    if(!user || !web3.utils.isAddress(user)){
        alert("Please enter a valid address");
        return;
    }

    clearPanels();
    const userPanel = addPanel("User Data");

    //const user = "0xE77aB47de567b3a79849F38dbAd1d321b3ACE9d8";
    const id = await nested.methods.UserToId(user).call();
    const node = await nested.methods.getNode(id).call();
    const isdelegator = await nested.methods._isDelegatorNode(user).call();

    addRow(userPanel,"ID",node[0]);
    addRow(userPanel,"Node",node[1]);
    addRow(userPanel,"Are you Delegator ", isdelegator);
    addRow(userPanel,"Parent",node[2]);
    addRow(userPanel,"Active",node[5]);
    addRow(userPanel,"Direct Count",node[6]);

    const instAddr = node[3];
    const storAddr = node[4];

    if(instAddr != "0x0000000000000000000000000000000000000000"){
        const inst = new web3.eth.Contract(IInstanceMeABI.abi,instAddr);
        const instId = await inst.methods.id().call();
        const instParent = await inst.methods.parent().call();
        const instStor = await inst.methods.stor().call();

        addRow(userPanel,"Instance ID",instId);
        addRow(userPanel,"Instance Parent",instParent);
        addRow(userPanel,"Instance Stor",instStor);
    }

    const stor = new web3.eth.Contract(IInstanceStorABI.abi,storAddr);
    const dage = await stor.methods.dage().call();
    const rank = await stor.methods.rank().call();
    const cage = await stor.methods.cage().call();

    addRow(userPanel,"Stor Dage",dage);
    addRow(userPanel,"Stor Rank",rank);
    addRow(userPanel,"Stor Cage",cage);
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

async function joinUser() {
        try {
            const _p = prompt("Enter parent address:");
            const parent = _p.trim();
            if (!parent || !web3.utils.isAddress(parent)) {
                alert("Enter a valid parent");
                return;
            }

            if (!currentAccount || !web3.utils.isAddress(currentAccount)) {
                alert("Connect to wallet");
                return;
            }
            
            let accounts = await ethereum.enable();
            if(currentAccount!=accounts[0]) { alert("Incorrect account selected"); return;}
            window.web3T = new Web3(window.ethereum);
            // encode constructor args
            const iface = new ethers.utils.Interface(IInstanceMeABI.abi);
            const encodedArgs = iface.encodeDeploy([hexBaseAddress, parent]);
            
            // append args to bytecode
            const deployBytecode = byteCodeStandard + encodedArgs.slice(2);
            
            // deploy transaction
            const tx = await web3T.eth.sendTransaction({
                from: currentAccount,
                data: deployBytecode,
                value: "0"
            });
            
            console.log("Deploy TX:", tx);
          
            // contract address from receipt
            currentInstance = tx.contractAddress;
            alert("User Joined: "+currentInstance);
            // update UI
            document.getElementById("walletInst").innerText =
                "Inst " + shortAddr(currentInstance);

            document.getElementById("btnJoin").style.display = "none";
            document.getElementById("btnInit").style.display = "block";
        
        }catch(e){
            console.error(e);
            alert("Transaction failed");
        }  

    hideLoader();
}

async function initUser(){

    if(!currentInstance){
        alert("Instance not found");
        return;
    }

    try{

        let accounts = await ethereum.enable();
        window.web3T = new Web3(window.ethereum);
        if(currentAccount!=accounts[0]) { alert("Incorrect account selected"); return;}
       
        const instancecontract = new web3T.eth.Contract(
            IInstanceMeABI.abi,
            currentInstance
        );

        instancecontract.methods.owner().call(console.log);
        instancecontract.methods.getHexbase().call(console.log);
      
        await instancecontract.methods
            .initialize()
            .send({
                from: currentAccount,
                value: "0" // change if initialization requires ETH
            });

        console.log("Instance initialized");

        // reload panel so stor address appears
        await addConnectedUserPanel();

    }catch(e){
        console.log(e);
        alert("Transaction failed");
    }
     hideLoader();
}

async function importUser() {

    try{

        let accounts = await ethereum.enable();
        window.web3T = new Web3(window.ethereum);
        if(currentAccount!=accounts[0]) { alert("Incorrect account selected"); return;}
        const userId = await nested.methods.UserToId(currentAccount).call();
        if(userId==0) { alert("Invalid user"); return;}
        const limit = 5; // change according to your import batch size
        
        const nestedcontract = new web3T.eth.Contract(
            INested741ABI.abi,
            inNested741
        );
        await nestedcontract.methods
            .importOld(userId, limit)
            .send({
                from: currentAccount,
                value: "0"
            });

        console.log("Import completed");

        await addConnectedUserPanel();

    }catch(e){
        console.log(e);
        alert("Transaction failed");
    }
    hideLoader();
}

async function buyNFT(o1155, tokenId){
  showLoader();
                    try{

                        if(!currentAccount){
                            alert("Connect wallet first");
                            return;
                        }

                        if(currentInstance==null || currentInstance =='0x0000000000000000000000000000000000000000'){
                            alert("invalid instance");
                            return;
                        }

                        if(currentStor==null || currentStor == '0x0000000000000000000000000000000000000000'){
                            alert("invalid stor");
                            return;
                        }
                        
                        const qty = prompt("Enter buy amount:");
                        if (!qty) {
                            throw 'buy amount required';
                        }
                       
                        let accounts = await ethereum.enable();
                        if(currentAccount!=accounts[0]) { alert("Incorrect account selected"); return;}
		                window.web3T = new Web3(window.ethereum);
                        const instancecontract = new web3T.eth.Contract(IInstanceMeABI.abi, currentInstance);
                        const storcontract = new web3.eth.Contract(IInstanceStorABI.abi, currentStor);
                       
                        // qty = 1 (market purchase)
                       
                        //const tokenid = i;

                        // get mint value
                        let value = BigInt(
                            await rule.methods
                            .computeMintValue(qty)
                            .call()
                        );
                              
                        // check bonus
                        let bonus = BigInt(
                            await storcontract.methods
                            .bonus()
                            .call()
                        );

                        // reduce bonus
                        value = bonus >= value ? 0n : (value - bonus);
                        
                        // execute transaction
                        await instancecontract.methods
                            .Txn(o1155,tokenId,qty,1)
                            .send({
                                from: currentAccount,
                                value: value.toString()
                            });

                        alert("NFT Purchased");

                    }catch(e){
                        console.error(e);
                        alert("Transaction failed");
                    }
 hideLoader();
}

async function loadID() {
    try {
        const uid = prompt("Enter ID:");
        if (!uid && parseInt(uid)>0) 
            throw 'valid ID required';
        const user = await nested.methods.nodes(uid).call();
        if(user==ZERO) alert ("No user found");
        else document.getElementById("userAddrInput").value = user;

    } catch(err) {
        console.error(err);
        alert("Failed: " + (err.message || err));
    } 
        
    hideLoader();
 }
// -------------------- LOAD USER FULL --------------------
async function loadUser() {
    const input = document.getElementById("userAddrInput");
    const user = input.value.trim();
    if (!user || !web3.utils.isAddress(user)) {
        alert("Enter a valid Ethereum address");
        return;
    }
    
    clearPanels();
    const panel = addPanel("User Data");
    try{
        const id = await nested.methods.UserToId(user).call();
        const node = await nested.methods.getNode(id).call();
        const isdelegator = await nested.methods._isDelegatorNode(user).call();
        const isdelegatorNode = await daoassembly.methods.isdelegatorNode(user).call();
        const teamSizeAndZeroDownlevelCount = await nested.methods.getTotalTeamSizeWithLevel(user,1).call();

        addRow(panel, "ID", node[0]);
        addRow(panel, "Node", node[1]);
        addRow(panel, "Parent", node[2]);
        addRow(panel, "Active", node[5]);
        addRow(panel, "Direct Count", node[6]);
        addRow(panel, "Downline Size (1 level)",teamSizeAndZeroDownlevelCount[1]);
        addRow(panel, "TotalTeamSize",teamSizeAndZeroDownlevelCount[0]);
        
        addRow(panel,"Are you Delegator ", isdelegator);
        addRow(panel,"Are you delegatorNode ", isdelegatorNode);
        const instAddr = node[3];
        const storAddr = node[4];
        addRow(panel, "INST---", "");
        addRow(panel, "InstAddr", node[3]);
        if (instAddr != "0x0000000000000000000000000000000000000000") {
            const inst = new web3.eth.Contract(IInstanceMeABI.abi, instAddr);
            const instId = await inst.methods.id().call();
            const instParent = await inst.methods.parent().call();
            const instStor = await inst.methods.stor().call();
            addRow(panel, "Instance ID", instId);
            addRow(panel, "Instance Parent", instParent);
            addRow(panel, "Instance Stor", instStor);
        } 
        addRow(panel, "STOR---", "");
        addRow(panel, "StorAddr", node[4]);
        loadMyStor(id, panel);

        loadMyNFT();
    } catch(err){
        console.error(err);
        addRow(panelMarket,"Error","Unable to load marketplace");
    }

    hideLoader();

    
}

async function loadMyStor(id, panel) {
    try{

        const node = await nested.methods.getNode(id).call();
        const storAddr = node[4];
        if (storAddr != "0x0000000000000000000000000000000000000000") { 

          
            
            const stor = new web3.eth.Contract(IInstanceStorABI.abi, storAddr);
            const dage = await stor.methods.dage().call();
            const rank = await stor.methods.rank().call();
            const cage = await stor.methods.cage().call();
            const isLock = await stor.methods.isLock().call();
 
            addRow(panel, "Stor Dage", dage);
            addRow(panel, "Stor Rank", rank);
            addRow(panel, "Stor Cage", cage);
            
             /*
            let aj1 = await stor.methods.comp(15,2).call();
            let aj2 = await stor.methods.comp(15,1).call();
            
            let aj3 = await stor.methods.comp(14,2).call();
            let aj4 = await stor.methods.comp(14,1).call();
           
          
            stor.methods.rankage(0).call(console.log);
            stor.methods.rankage(1).call(console.log);
            stor.methods.rankage(2).call(console.log);
            
            // Fetch LSB 1,3,30,93,95,603,695,696
            const lsbIndexes = [1, 3, 30, 93, 95, 603, 695, 696];
            for (const i of lsbIndexes) {
                const val = await stor.methods.LSB(i).call();
                addRow(panel, `Stor LSB(${i})`, val);
            }
            */

            // Drawn, Flushed, Unpaid, Compute
            const drawn = await stor.methods.getAllIncome(0,0).call();
           
            const flushed = await stor.methods.getAllIncome(1,0).call();
            const unpaid = await stor.methods.getAllIncome(2,0).call();
            const misc = await stor.methods.getAllIncome(3,0).call();
            
            let compute;
            try {
                compute = await stor.methods.getAllIncome(4,50).call();
            } catch (err) {
                console.error("❌ compute() failed:", err.message);

                // Fallback → prevent UI break
                compute = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];
            }
            console.log(`compute: `  + compute);
            let computeFlush;
            try {
                computeFlush = await stor.methods.getAllIncome(5,50).call();
            } catch (err) {
                console.error("❌ computeFlush() failed:", err.message);

                // Fallback → prevent UI break
                computeFlush = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];
            }
            console.log(`computeFlush: `  + computeFlush);
            stor.methods.getAllIncome(6,10).call().then(console.log);

            const incomeTypes = ["Reward", "Royali", "Self", "Yeild", "Validator", "Tour", "Gift"];

            // Add a header row
            addRow(panel, "Income Type", "Compute | ComputeFlush | Drawn | Flushed | Unpaid | Suspend");

            for (let i = 0; i < 7; i++) {
                const comp = formatOZN(compute[i]);
                const compFlush = formatOZN(computeFlush[i]);
                const drwn = formatOZN(drawn[i]);
                const flsh = formatOZN(flushed[i]);
                const unpaidVal = formatOZN(unpaid[i]);
                const susCount =  await stor.methods.getToggleAgeCount(i+1).call();
                stor.methods.getToggleAgeCount(200).call().then(console.log);
                if(susCount>1){
                    stor.methods.getToggleAgeValue(i+1,0).call().then(console.log);
                    stor.methods.getToggleAgeValue(i+1,1).call().then(console.log);
                }
                addRow(panel, incomeTypes[i], `${comp} | ${compFlush} | ${drwn} | ${flsh} | ${unpaidVal}| ${parseInt(susCount)%2==1}`);
            }
            
            // Burned & Self Proposed

            addRow(panel, "Burned", formatOZN(misc[0]));
            addRow(panel, "Self Proposed", formatOZN(misc[1]));
            addRow(panel, "OLD_RWRD", formatOZN(misc[2]));
            addRow(panel, "OLD_YEILD", formatOZN(misc[3]));
            addRow(panel, "LOCKED", isLock);
            
            const capCount =  await stor.methods.getToggleAgeCount(200).call();
            
            addRow(panel, "ToggleAgeCount(_CAP_IX)->", `${parseInt(capCount)%2==1}`);
            const capStatus =  await stor.methods.capStatus().call();
            addRow(panel, "CAP Status", "TotalInc | Threshold | IsCap | CurrentValue");
            addRow(panel, "", `${formatOZN(capStatus.totalIncome)} |${formatOZN(capStatus.threshold)} | ${capStatus._cap} | ${formatOZN(capStatus.currentValue)}`);

            const right=document.createElement("div");
            const btnClaim=document.createElement("button");
            btnClaim.innerText="Claim";
            btnClaim.style.marginLeft="10px";
            btnClaim.onclick = () => {
              onClaim();
            };

            const btnCapBurn=document.createElement("button");
            btnCapBurn.innerText="CapBurn";
            btnCapBurn.style.marginLeft="10px";

            btnCapBurn.onclick = () => {
              onCapBurn();
            };
            right.appendChild(btnClaim);
            right.appendChild(btnCapBurn);
            
            addRow(panel, "Claim", right);
        }
    } catch(err){

        console.error(err);
        addRow(panel,"Error","Unable to load store");

    }
}

async function loadUpline(){

    const input = document.getElementById("userAddrInput");
    const user = input.value.trim();
    if (!user || !web3.utils.isAddress(user)) {
        alert("Enter a valid Ethereum address");
        return;
    }
    clearPanels();
    
    try{

        const id = await nested.methods.UserToId(user).call();
        _loadUpline(id);

    } catch (err) {
        console.error(err);
        alert("Burning failed: " + (err.message || err));
    } 
        
    hideLoader();

}


async function _loadUpline(id){
    try{
        
        const node = await nested.methods.getNode(id).call();
        const panel = addPanel(`${node[0]} | ${node[1]} | ${node[2]}`);
        await loadMyStor(id, panel);
        if(parseInt(node[2])>0) await _loadUpline(parseInt(node[2]));

    } catch (err) {
        console.error(err);
        alert("Burning failed: " + (err.message || err));
    } 
}


async function loadDAO() {
     clearPanels();
     const panel = addPanel("DAO Admin");
     try{
        
      
        addRow(panel,"DAO Core",indaocore);
        addRow(panel,"DAO Assembly",indaoassembly);

        const delegatorCount = await daoassembly.methods.getdelegatorCount().call();
        const rankforDAO = await rule.methods.rankforDAO().call();
      
        // const blacklistedCount = await daoassembly.methods.blacklistedCount().call();
        const proposalsCount = await daocore.methods.getProposalsCount().call();
        const left = document.createElement("div");
        
        left.innerHTML =
                    '<div style="display:flex;align-items:center;gap:8px;">'
                    + ' DelegatorCount: ' + delegatorCount            
                    + ' | RankForDAO: ' + rankforDAO         
                    + ' | BlacklistedCount: ' + 0    
                    //+ ' | ProposalsCount: ' + proposalsCount    
                    + '</div>';

        const right=document.createElement("div");
        const btnTransferForms=document.createElement("button");
        btnTransferForms.innerText="TransferForms";
        btnTransferForms.style.marginLeft="10px";
        btnTransferForms.onclick = () => {
              loadTransferForms();
        };

        const btnProposals=document.createElement("button");
        btnProposals.innerText="Proposals";
        btnProposals.style.marginLeft="10px";
        btnProposals.onclick = () => {
              loadProposals();
        };
         
        const btnSubmitTrasfer=document.createElement("button");
        btnSubmitTrasfer.innerText="SubmitTransfer";
        btnSubmitTrasfer.style.marginLeft="10px";
        btnSubmitTrasfer.onclick = () => {
              onSubmitTrasfer();
        };

        const btnNewProposer=document.createElement("button");
        btnNewProposer.innerText="NewProposer";
        btnNewProposer.style.marginLeft="10px";
        btnNewProposer.onclick = () => {
              onNewProposer();
        };

        const btnMovedownlineProposer=document.createElement("button");
        btnMovedownlineProposer.innerText="Movedownline";
        btnMovedownlineProposer.style.marginLeft="10px";
        btnMovedownlineProposer.onclick = () => {
              onMovedownlineProposer();
        };

        right.appendChild(btnNewProposer);
        right.appendChild(btnTransferForms);
        right.appendChild(btnSubmitTrasfer);
        right.appendChild(btnProposals);
        addRow(panel, left, right);
        addRow(panel, 'ProposalsCount: ' + proposalsCount, btnMovedownlineProposer);

    } catch (err) {
        console.error(err);
        addRow(panel, "", err.message);
    } 
    hideLoader();
}

/*
DATA_SUCCESS=$(cast calldata "safeSecureBaseCallback(address,bool)" $SECUREBASE true)
TARGET="$safeguardPrime"
VALUE_SUCCESS="0"
echo "Encoded success calldata: $DATA_SUCCESS"
SUBJECT="Trigger.securebase.proposal.UpdateBonusRequestsPrime"
echo "$SUBJECT"
#send "$PKKEY" "$DAOAssemblyCore" "0" "newProposal(string,address,uint256,bytes,uint256)" "$SUBJECT" "$TARGET" "$VALUE_SUCCESS" "$DATA_SUCCESS" "7" 
*/
//function setMoveDownlineApproval(uint256 _id, address parent, bool approval)
async function onNewProposer() {
     try {
        
        const ok = confirm("Are you sure you want to execute this transaction?");

        if(!ok) return;

        // Enable wallet
        window.web3T = new Web3(window.ethereum);
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if(currentAccount!=accounts[0]) { alert("Incorrect account selected"); return;}
       
        const daoContract = new web3T.eth.Contract(IDAOCoreABI.abi, indaocore);

        const SUBJECT = "Trigger.rule.proposal.UpdateMintQty";
        const TARGET = in741Rule;
        const DATA_SUCCESS = rule.methods.setMintQty(2, 50000).encodeABI();
        const VALUE_SUCCESS = 0;
        const EXPIRE = 7
        ;
        const tx = await daoContract.methods
            .newProposal(SUBJECT,TARGET,VALUE_SUCCESS,DATA_SUCCESS,EXPIRE)
            .send({
                from: currentAccount
            });

        if (tx.status) {
            alert("NewProposer succeeded");
        } else {
            alert("NewProposer failed");
        }
       

    } catch (err) {
        console.error(err);
        alert("NewProposer failed: " + (err.message || err));
    } 
} 


async function onMovedownlineProposer() {
    try {
        
        const uid = prompt("Enter ID:");
        if (!uid && parseInt(uid)>0) 
            throw 'valid ID required';

        const newpid = prompt("Enter new parent ID:");
        if (!newpid && parseInt(newpid)>0) 
            throw 'valid ID required';

        const ok = confirm("Are you sure you want to execute this transaction?");
        if(!ok) return;

        // Enable wallet
        window.web3T = new Web3(window.ethereum);
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if(currentAccount!=accounts[0]) { alert("Incorrect account selected"); return;}
    
        const nestedContractT = new web3T.eth.Contract(INested741ABI.abi, inNested741);

        //Raise  DAO request
    
      //  const tx = await nestedContractT.methods.createmdrequest(uid,newpid).send({ from: currentAccount });
   
       //if approved by DAO

         const tx = await nestedContractT.methods.moveDownline(uid).send({ from: currentAccount });
 
        if (tx.status) {
            alert("Movedownline succeeded");
        } else {
            alert("Movedownline failed");
        }
       

    } catch (err) {
        console.error(err);
        alert("Movedownline failed: " + (err.message || err));
    } 
} 
//send "$PKKEY" "$TransferRequest" "0" "submitTransferForm(address,address[] memory)" "$ADDRESS" "$mandatedvoters_arr"

async function onSubmitTrasfer() {

    try {
        
        const fromAddress = prompt("Enter ADDRESS to be transferred:");
        if (!fromAddress) {
            throw 'Enter from Address';
        }
        // Enable wallet
        window.web3T = new Web3(window.ethereum);
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if(currentAccount!=accounts[0]) { alert("Incorrect account selected"); return;}
       
        const trContract = new web3T.eth.Contract(ITransferRequestsABI.abi, inproposals[0]);
    
        const tx = await trContract.methods
            .submitTransferForm(fromAddress)
            .send({
                from: currentAccount,
                value: 0 // change if initialization requires ETH
            });

        if (tx.status) {
            alert("SubmitTrasfer succeeded");
        } else {
            alert("SubmitTrasfer failed");
        }
       

    } catch (err) {
        console.error(err);
        alert("SubmitTrasfer failed: " + (err.message || err));
    } 

}

async function loadProposals() {
     const panel = addPanel("Proposals");
    try{
        const count = await daocore.methods.getProposalsCount().call();
        
        let limit = 3;
        /* for (let i = count; i >= 1 && limit>0; i--) {
                const p = await contract.methods.getProposal(i).call();
                const r = await contract.methods.getResult(i).call();
                let sgn =r[5];
                if(r[4]==4) sgn = "RESOLVE";
                else if(r[4]==3) sgn = "REJECT";
                else if(r[4]==2) sgn = "SIGN-APPROVED2";
                else if(r[4]==1) sgn = "SIGN-APPROVED1";
                else sgn = "PENDING";

                '<div style="display:flex;align-items:center;gap:8px;">'
                + ' | ' + p[0] 
                + ' | ' + r[0] 
                + ' | ' + r[1]        
                + ' | ' + r[3]        
                + ' | DelegatorCount: ' + p[1]            
                + ' | RankForDAO: ' + p[3]         
                + ' | BlacklistedCount: ' + sgn    
                + ' | ' + p[5]       
                        + '</div>';
            } */
      
        const table = document.createElement("table");
        table.border = "1";
        table.cellPadding = "5";
        table.style.width = "100%";
        // ✅ THEAD (Header)
        const thead = document.createElement("thead");
        thead.innerHTML = `
        <tr>
            <th>#</th>
            <th>Desc</th>
            <th>Target</th>
            <th>Up</th>
            <th>Dn</th>
            <th>Win</th>
            <th>Approved</th>
            <th>Resolved</th>
            <th>Creator</th>
            <th>Vote</th>
            <th>Sign</th>
        </tr>
        `;
        table.appendChild(thead);
       const tbody = document.createElement("tbody");
      for (let i = count; i >= 1 && limit>0; i--) {
      
        const p = await daocore.methods.getProposal(i).call();
        const r = await daocore.methods.getResult(i).call();
        let approve = "PENDING"
        if(r[5]) approve = "RESOLVE";

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${i}</td>
          <td title="${p[0]}">${p[0]}</td>
          <td class="shortAddr" title="${p[1]}">${shortAddr(p[1])}</td>
          
          <td>${r[0]}</td>
          <td>${r[1]}</td>
          <td>${r[3]}</td>
          <td>${r[4]}</td>
          <td>${approve}</td>
          <td class="shortAddr" title="${p[5]}">${shortAddr(p[3])}</td>
          <td>
            <button class="vote-btn upvote" onclick="vote(${i}, true)">Vote(Y)</button>
            <button class="vote-btn downvote" onclick="vote(${i}, false)">Vote(N)</button>
          </td>
          <td>
            <button class="vote-btn upvote" onclick="execute(${i}, true)">Sign(Y)</button>
            <button class="vote-btn downvote" onclick="execute(${i}, false)">Sign(N)</button>
          </td>
        `;
        tbody.appendChild(row);
        limit--;
      }

        // ✅ Attach tbody
        table.appendChild(tbody);

       

      addRow(panel, "", table);
    } catch (err) {
        console.error(err);
        addRow(panel, "", err.message);
    } 
}

async function loadTransferForms() {

      const panel = addPanel("TransferForms");
    try{
        const count = await transferRequests.methods.getFormsCount().call();
        
        let limit = 10;
        const table = document.createElement("table");
        table.border = "1";
        table.cellPadding = "5";
        table.style.width = "100%";
        // ✅ THEAD (Header)
        const thead = document.createElement("thead");
        thead.innerHTML = `
        <tr>
            <th>#</th>
            <th>from</th>
            <th>to</th>
            <th>resolved</th>
            <th>closed</th>
            <th>status</th>
            <th>proposalId</th>
            <td>Close Action</td>
        </tr>
        `;
        table.appendChild(thead);
       const tbody = document.createElement("tbody");
      for (let i = count; i >= 1 && limit>0; i--) {
        
        const p = await transferRequests.methods.getForm(i).call();
      
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${i}</td>
          <td class="shortAddr" title="${p[p.from]}">${shortAddr(p.from)}</td>
          <td class="shortAddr" title="${p[p.to]}">${shortAddr(p.to)}</td>
          <td>${p.resolved}</td>
          <td>${p.closed}</td>
          <td>${p.status}</td>
          <td>${p.proposalId}</td>
          <td>
            <button class="vote-btn upvote" onclick="closeTransferTarget('${p.to}')">Close</button>
          </td>

        `;
        tbody.appendChild(row);
        limit--;
      }

        // ✅ Attach tbody
        table.appendChild(tbody);

       

      addRow(panel, "", table);
    } catch (err) {
        console.error(err);
        addRow(panel, "", err.message);
    } 
} 
async function closeTransferTarget(to) {
    try {
        window.web3T = new Web3(window.ethereum);
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if(currentAccount!=accounts[0]) { alert("Incorrect account selected"); return;}
        
        const transferContract = new web3T.eth.Contract(ITransferRequestsABI.abi, inproposals[0]);
        
        const tx = await transferContract.methods.closeTransferTarget(to).send({ from: accounts[0] });
        if (tx.status) {
                alert("Transfer Closed succeeded");
            } 
        else {
                alert("Transfer Closed failed");
            }
    } catch (err) {
        console.error(err);
        alert("❌ Transfer Closed failed: " + (err.message || err));
    }
}

async function vote(proposalId, support) {
	try {
	window.web3T = new Web3(window.ethereum);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if(currentAccount!=accounts[0]) { alert("Incorrect account selected"); return;}
       
    const daoContract = new web3T.eth.Contract(IDAOCoreABI.abi, indaocore);
	  
	const tx = await daoContract.methods.vote(proposalId, support).send({ from: accounts[0] });
    if (tx.status) {
            alert("vote succeeded");
        } 
    else {
            alert("vote failed");
        }
	} catch (err) {
	  console.error(err);
	  alert("❌ Vote failed: " + (err.message || err));
	}
  }

  async function execute(proposalId, isapproved) {
    try {
	window.web3T = new Web3(window.ethereum);
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    if(currentAccount!=accounts[0]) { alert("Incorrect account selected"); return;}
       
    const daoContract = new web3T.eth.Contract(IDAOCoreABI.abi, indaocore);
	  
	const tx = await daoContract.methods.execute(proposalId, isapproved).send({ from: accounts[0] });
    if (tx.status) {
            alert("execute succeeded");
        } 
    else {
            alert("execute failed");
        }
	} catch (err) {
	  console.error(err);
	  alert("❌ execute failed: " + (err.message || err));
	}
  }


async function loadMarket(){

    clearPanels();
    const panelMarket = addPanel("Marketplace");

    try{

        const o1155 = await hexBase.methods.inOrc1155(0).call();
        const orc1155 = new web3.eth.Contract(IORC1155ABI.abi,o1155);

        addRow(panelMarket,"Contract",o1155);

        const name = await orc1155.methods.name().call();
        const curSupply = await orc1155.methods.curSupply().call();
        const totSupply = await orc1155.methods.totSupply().call();
        const price = await rule.methods.computeMintValue(1).call();

        addRow(panelMarket,"Collection",name);
        addRow(panelMarket,"Total Supply",totSupply);
        addRow(panelMarket,"Minted",curSupply);
        addRow(panelMarket,"Price", formatOZN(price) +" / unit");
        const nftRows = [];
        
        let i=1;
        let flag=true;

        while(flag){

            try{

                const tokenName = await orc1155.methods.names(i-1).call();

                if(!tokenName){
                    flag=false;
                    break;
                }

                const metadataURI = await orc1155.methods.uri(i).call();
                const meta = await fetch(metadataURI).then(r=>r.json());

                const row = document.createElement("div");
                row.className="row";

                const left = document.createElement("div");
                left.innerHTML =
                    '<div style="display:flex;align-items:center;gap:8px;">'
                    + '<img src="'+meta.image+'" width="40" height="40">'
                    + '<span>#'+i+' '+tokenName+'</span>'
                    + '</div>';

                const right = document.createElement("div");

                if(currentAccount){

                    const btn=document.createElement("button");
                    btn.innerText="Buy";
                    btn.style.padding="4px 8px";

                    const tokenId = i;   // capture correct id
                    btn.onclick = () => buyNFT(o1155, tokenId);

                    right.appendChild(btn);

                }else{

                    right.innerText="Connect wallet";

                }

                row.appendChild(left);
                row.appendChild(right);
                nftRows.push(row);
                //panelNFT.appendChild(row);

                i++;

            }catch(e){
                flag=false;
            }

        }

        addRow(panelMarket,"Total NFT Tokens", i);
        const panelNFT = addPanel("NFT Marketplace");
        nftRows.slice(0,3).forEach(r => panelNFT.appendChild(r));

        

    }catch(err){

        console.error(err);
        addRow(panelMarket,"Error","Unable to load marketplace");

    }

    hideLoader();
}

async function loadMyNFT(){

    //clearPanels();
    const input = document.getElementById("userAddrInput");
    const user = input.value.trim();
  
    if (!user || !web3.utils.isAddress(user)) {
        alert("Enter a valid address");
        return;
    }

    const id = await nested.methods.UserToId(user).call();
    const node = await nested.methods.getNode(id).call();
    const instance = node[3];
    const stor = node[4];

    const panel = addPanel("My Minted NFTs");
 
    if(!stor || stor==ZERO){
        addRow(panel,"User","Instance/Stor not found");
        return;
    }

    const storeContract = new web3.eth.Contract(IInstanceStorABI.abi, stor);
    const mintCount = await storeContract.methods.mintCount().call();

    const lsbpanel = addPanel("LSB Amount");
    let lsbindex = await storeContract.methods.withdrawlDage().call();
    lsbpanel.appendChild(Object.assign(document.createElement("div"), {
        className: "row",
        innerHTML: `WithdrawlDage: ${lsbindex}`
    }));

    lsbindex = await storeContract.methods.dage().call();
    lsbpanel.appendChild(Object.assign(document.createElement("div"), {
        className: "row",
        innerHTML: `Dage: ${lsbindex}`
    }));
    lsbpanel.appendChild(Object.assign(document.createElement("div"), {
            className: "row",
            innerHTML: `Dage LSB[${parseInt(lsbindex)}]: ${web3.utils.fromWei(await storeContract.methods.LSB(parseInt(lsbindex)).call(),"ether")}`
    }));
    

  
    for(let i=1; i<=parseInt(mintCount); i++){

        const mint = await storeContract.methods.mints(i).call();
        const nftAddr = mint.nft;

        const nft = new web3.eth.Contract(IORC1155ABI.abi, nftAddr);

        const mintedUser = await nft.methods.mintedUser().call();
        
        if(mintedUser.toLowerCase() !== user.toLowerCase()){
            continue;
        }

        const tokenId = await nft.methods.ids(0).call();
        const tokenName = await nft.methods.names(0).call();

        const mintedqty = await nft.methods.mintedqty().call();
        const mintedfee = await nft.methods.mintedfee().call();
        const mintedAge = await nft.methods.mintedAge().call();
        const clonedOf = await nft.methods.clonedOf().call();
        const balance = await nft.methods.balanceOf(user, tokenId).call();

        const uri = await nft.methods.uri(tokenId).call();
        const meta = await fetch(uri).then(r=>r.json());

        const row=document.createElement("div");
        row.className="row";

        const left = document.createElement("div");

        const rowTop = document.createElement("div");
        rowTop.style.display = "flex";
        rowTop.style.alignItems = "center";
        rowTop.style.gap = "8px";

        const idSpan = document.createElement("span");
        idSpan.innerText = tokenId;

        const img = document.createElement("img");
        img.src = meta.image;
        img.width = 40;
        img.height = 40;

        const idText = document.createElement("span");
        idText.innerText = ' CLONNED_OF ';

        rowTop.appendChild(idSpan);
        rowTop.appendChild(img);
        rowTop.appendChild(renderAddress(nftAddr));
        rowTop.appendChild(idText);
        rowTop.appendChild(renderAddress(clonedOf));
        left.appendChild(rowTop);

        const right=document.createElement("div");

        right.innerHTML =
        "Balance: "+balance+
        " | Minted : "+mintedqty+
        " | Fee: "+Number(web3.utils.fromWei(mintedfee,"ether")).toFixed(3)+
        " | Age: "+mintedAge+" ";
        /* CHECKBOX */

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.style.marginRight="10px";

        /* TRANSFER BUTTON */

        const btnTransfer=document.createElement("button");
        btnTransfer.innerText="Transfer";
        btnTransfer.style.marginLeft="10px";

       
        btnTransfer.onclick = () => {
            onNFTTransfer(user, nftAddr, tokenId, checkbox.checked);
        };

        right.appendChild(checkbox);
        right.appendChild(btnTransfer);

        row.appendChild(left);
        row.appendChild(right);

        panel.appendChild(row);

       
        lsbpanel.appendChild(Object.assign(document.createElement("div"), {
            className: "row",
            innerHTML: `Mint LSB[${parseInt(mintedAge)+2}]: ${web3.utils.fromWei(await storeContract.methods.LSB(parseInt(mintedAge)+2).call(),"ether")}`
        }));
        lsbpanel.appendChild(Object.assign(document.createElement("div"), {
            className: "row",
            innerHTML: `Mint LSB[${parseInt(mintedAge)+2+600}]: ${web3.utils.fromWei(await storeContract.methods.LSB(parseInt(mintedAge)+2+600).call(),"ether")}`
        }));
    }

    
  
    const levelpanel = addPanel("Level Business");
    addRow(levelpanel, "Level ", ` Business | Qty | Reward | Yeild | RankAge`);
    for(let i=0; i<=15; i++){
        ;
        const lvl = await storeContract.methods.getNodeLB(i).call();
        let rankage = 0;
        if(i<8)
            rankage = await storeContract.methods.rankage(i).call();
        addRow(levelpanel, "Level ["+i+"]", ` ${formatOZN(lvl[0])} | ${lvl[1]} | ${formatOZN(lvl[2])} | ${formatOZN(lvl[3])} | ${rankage}`);
    }
    



    hideLoader();
}

async function onCapBurn() {
    showLoader();

    try {
        // Prompt for recipient
        const input = document.getElementById("userAddrInput");
        const user = input.value.trim();
    
        if (!user || !web3.utils.isAddress(user)) {
            alert("Enter a valid address");
            return;
        }

        const id = await nested.methods.UserToId(user).call();
        const node = await nested.methods.getNode(id).call();
        const stor = node[4];
        if(!stor || stor==ZERO){
            alert("Instance/Stor not found");
            return;
        }

        const amountStr = prompt("Enter amount to burn:");
        if (!amountStr) {
            throw 'Amount required';
        }
        const amount = parseFloat(amountStr);
        if (isNaN(amount)) {
            throw 'Invalid amount';
        }

        // Enable wallet
        window.web3T = new Web3(window.ethereum);
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if (user.trim().toLowerCase() !== accounts[0].toLowerCase()) {
            throw "Incorrect account selected";
        }
        if(currentAccount!=accounts[0]) { alert("Incorrect account selected"); return;}
       
        const storeContract = new web3T.eth.Contract(IInstanceStorABI.abi, stor);
    
        const tx = await storeContract.methods
            .BurnCoin()
            .send({
                from: currentAccount,
                value: web3.utils.toWei(amount.toString(), 'ether') // change if initialization requires ETH
            });

        if (tx.status) {
            alert("Burn succeeded");
        } else {
            alert("Burn failed");
        }
       

    } catch (err) {
        console.error(err);
        alert("Burn failed: " + (err.message || err));
    } 
        
    hideLoader();
}

async function onClaim() {
    showLoader();

    try {
        // Prompt for recipient
        const input = document.getElementById("userAddrInput");
        const user = input.value.trim();
    
        if (!user || !web3.utils.isAddress(user)) {
            alert("Enter a valid address");
            return;
        }

        const id = await nested.methods.UserToId(user).call();
        // Enable wallet
        window.web3T = new Web3(window.ethereum);
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if (user.trim().toLowerCase() !== accounts[0].toLowerCase()) {
            throw "Incorrect account selected";
        }
        if(currentAccount!=accounts[0]) { alert("Incorrect account selected"); return;}
       
        const instancecontract = new web3T.eth.Contract(
            IInstanceMeABI.abi,
            currentInstance
        );
      
        const tx = await instancecontract.methods
            .Txn(ZERO,49,0,7)
            .send({
                from: currentAccount,
                value: "0" // change if initialization requires ETH
            });

        if (tx.status) {
            alert("Claimed succeeded");
        } else {
            alert("Claimed failed");
        }
       

    } catch (err) {
        console.error(err);
        alert("Claimed failed: " + (err.message || err));
    } 
        
    hideLoader();
    
}

async function onNFTTransfer(user,orc1155, tokenId, isforce) {
    showLoader();

    try {
        // Prompt for recipient
        const to = prompt("Enter receiver address:");
        if (!to) {
            throw 'Receiver address required';
        }

        // Prompt for amount
        const amountStr = prompt("Enter amount to transfer:");
        if (!amountStr) {
            throw 'Amount required';
        }
        const amount = parseInt(amountStr);
        if (isNaN(amount) || amount <= 0) {
            throw 'Invalid amount';
        }
        
        // Enable wallet
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });


        window.web3T = new Web3(window.ethereum);
        // Initialize contract
        const orc1155contract = new web3T.eth.Contract(IORC1155ABI.abi, orc1155);
        // Check balance
        const balance = await orc1155contract.methods.balanceOf(user, tokenId).call();
        if (amount > parseInt(balance)) {
            throw 'Insufficient NFT balance';
        }

        if (user.trim().toLowerCase() !== accounts[0].toLowerCase()) {
            const tx1 = await orc1155contract.methods
                .setApprovalForAll(accounts[0], true)
                .send({ from: user });
            if (!tx1.status) throw "Incorrect account selected";
        }
        
        // Send transfer
        const tx1 = await orc1155contract.methods
            .onTokenTransfer(user, to, tokenId, amount, isforce, "0x")
            .send({ from: accounts[0] });

        console.log(tx1);

        if (tx1.status) {
            alert("Transfer succeeded");
        } else {
            alert("Transfer failed");
        }
       

    } catch (err) {
        console.error(err);
        alert("Transfer failed: " + (err.message || err));
    } 
        
    hideLoader();
    
}

async function loadNFTArchive(){

    clearPanels();
    const panel = addPanel("NFT Archive Events");

    try{

        const latestBlock = await web3.eth.getBlockNumber();

        
        let allEvents = [];

        const transferSingleTopic = web3.utils.sha3(
            "TransferSingle(address,address,address,uint256,uint256)"
        );

        for (let end = latestBlock; end >= minBlock; end -= step) {

            let start = end - step;
            if (start < minBlock) start = minBlock;

            for (let block = start; block <= end; block++) {
                
                const blockData = await web3.eth.getBlock(block, true);
                if (!blockData || !blockData.transactions) continue;

                for (const tx of blockData.transactions) {

                    const receipt = await web3.eth.getTransactionReceipt(tx.hash);
                    if (!receipt || !receipt.logs) continue;

                    for (const log of receipt.logs) {
                        
                        if (log.topics[0] === transferSingleTopic) {
                            
                            const operator = "0x" + log.topics[1].slice(26);
                            const from = "0x" + log.topics[2].slice(26);
                            const to = "0x" + log.topics[3].slice(26);

                            const decoded = web3.eth.abi.decodeParameters(
                                ["uint256", "uint256"],
                                log.data
                            );

                            const id = decoded[0];
                            const value = decoded[1];

                            allEvents.push({
                                contract: log.address,
                                operator,
                                from,
                                to,
                                id,
                                value,
                                blockNumber: receipt.blockNumber,
                                txHash: receipt.transactionHash
                            });

                        }

                    }

                }

            }

        }

        if(allEvents.length === 0)
            throw new Error("No events found");

        /* sort latest first */

        allEvents.sort((a,b)=> b.blockNumber - a.blockNumber);

        for(const ev of allEvents){
           
            const e = ev.returnValues;

            const row = document.createElement("div");
            row.className = "row";
            row.style.display = "flex";
            row.style.justifyContent = "space-between";
            row.style.alignItems = "center";

            const left = document.createElement("div");
            left.style.display = "flex";
            left.style.alignItems = "center";
            left.style.gap = "6px";

            const right = document.createElement("div");
            right.style.display = "flex";
            right.style.alignItems = "center";
            right.style.gap = "6px";

            const arrow = document.createElement("span");
            arrow.innerText = "➜";

            /* FROM → TO */

            left.appendChild(renderAddressLongX(ev.from));
            left.appendChild(arrow);
            left.appendChild(renderAddressLongX(ev.to));

            /* RIGHT SIDE INFO */

            const info = document.createElement("span");

            info.innerText =
                "Block: "+ev.blockNumber+
                " | TokenId: "+ev.id+
                " | Amount: "+ev.value+
                " | Sender:";

            right.appendChild(info);

            /*if(e.sender){
                right.appendChild(renderAddress(e.sender));
            }*/

            row.appendChild(left);
            row.appendChild(right);

            panel.appendChild(row);
        }

    }
    catch(err){
        console.error(err);
        addRow(panel,"Error", err.message);
        addRow(panel,"Error","Failed to load events");
    }

    hideLoader();
}

async function loadValidatorPage() {
    clearPanels();
    const panel = addPanel("Validator Module");
    try {
        const row=document.createElement("div");
        row.className="row";

        const left = document.createElement("div");

        const btnGetDeligator=document.createElement("button");
        btnGetDeligator.innerText="Get Deligator Info";
        btnGetDeligator.style.marginLeft="10px";
       
        btnGetDeligator.onclick = async () => {
            try {
                const _v = prompt("Enter deligator address:");
                const deligatorAdd = _v.trim();
                if (!deligatorAdd || !web3.utils.isAddress(deligatorAdd)) {
                    alert("Enter a valid deligatorAdd");
                    return;
                }
                
                // Enable wallet
                //const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                
                //if(currentAccount.trim().toLowerCase() !== accounts[0].toLowerCase())
                //    throw "Incorrect account selected";
                
                // Initialize contract
                //const validatorcontract = new web3.eth.Contract(validatorsLocalsABI, validatorsLocalsAddress);
                
                const isDelegator = await validator.methods.isDelegator(deligatorAdd).call();
                const deluser = await validator.methods.getUser(deligatorAdd).call();
                const subrow=document.createElement("div");
                subrow.className="row";

                const right=document.createElement("div");
                right.innerHTML =
                "Deligator: "+deligatorAdd+" | isDelegator: "+isDelegator+" | "+ "User: "+deluser+" ";
                
                subrow.appendChild(right);
                panel.appendChild(subrow);
            }
            catch(err){
                console.error(err);
                addRow(panel,"Error", err.message);
                addRow(panel,"Error","Failed to Deligator Module");
            }
        };

        left.appendChild(btnGetDeligator);
        
        const btnGetUserDeligator=document.createElement("button");
        btnGetUserDeligator.innerText="Get User's Deligator";
        btnGetUserDeligator.style.marginLeft="10px";

        btnGetUserDeligator.onclick = async () => {
            try {
                const _u = prompt("Enter User address:");
                const userAdd = _u.trim();
                if (!userAdd || !web3.utils.isAddress(userAdd)) {
                    alert("Enter a valid userAdd");
                    return;
                }
                
                // Enable wallet
                //const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                
                //if(currentAccount.trim().toLowerCase() !== accounts[0].toLowerCase())
                //    throw "Incorrect account selected";
                
                // Initialize contract
                //const validatorcontract = new web3.eth.Contract(validatorsLocalsABI, validatorsLocalsAddress);
                
                
                const delegatorAdd = await validator.methods.getDelegator(userAdd).call();
                const subrow=document.createElement("div");
                subrow.className="row";

                const right=document.createElement("div");
                right.innerHTML =
                "User: "+userAdd+" | Delegator: "+delegatorAdd +" ";
                
                subrow.appendChild(right);
                panel.appendChild(subrow);
            }
            catch(err){
                console.error(err);
                addRow(panel,"Error", err.message);
                addRow(panel,"Error","Failed to Deligator Module");
            }
        };

        left.appendChild(btnGetUserDeligator);

        row.appendChild(left);
        panel.appendChild(row);

    }   
    catch(err){
        console.error(err);
        addRow(panel,"Error", err.message);
        addRow(panel,"Error","Failed to Validator Module");
    }

    hideLoader();
}

function renderRadialTreePanel(treeData) {

  const panel = addPanel("🌳 Radial Tree View");

  const container = document.createElement("div");
  container.style.width = "100%";
  container.style.overflow = "auto";
  panel.appendChild(container);

  const size = 800;
  const center = size / 2;

  let svg = `<svg width="${size}" height="${size}">`;

  const pos = new Map();

  // --------- BUILD LEVELS ----------
  function buildLevels(root) {
    const levels = [];
    function walk(node, depth = 0) {
      if (!levels[depth]) levels[depth] = [];
      levels[depth].push(node);
      if (node.children) {
        node.children.forEach(c => walk(c, depth + 1));
      }
    }
    walk(root);
    return levels;
  }

  const levels = buildLevels(treeData);

  const radiusStep = 40;

  // --------- POSITION NODES ----------
  levels.forEach((level, depth) => {

    const radius = depth * radiusStep;

    level.forEach((node, i) => {

      const angle = (2 * Math.PI * i) / level.length;

      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);

      pos.set(node.id, { x, y });

      svg += `
        <circle cx="${x}" cy="${y}" r="10"
          fill="#0b0f1a"
          stroke="#00ffff"
          stroke-width="1.5"
          onclick="onTreeNodeClick('${node.id}')"
          style="cursor:pointer"
        />
        <text x="${x}" y="${y - 14}" 
          fill="#00ffff"
          font-size="9"
          text-anchor="middle">
          ${node.id}
        </text>
      `;
    });
  });

  // --------- DRAW EDGES ----------
  function drawEdges(node) {
    if (!node.children) return;

    const p = pos.get(node.id);

    node.children.forEach(child => {
      const c = pos.get(child.id);

      svg += `
        <line 
          x1="${p.x}" 
          y1="${p.y}" 
          x2="${c.x}" 
          y2="${c.y}" 
          stroke="#00ffff33"
        />
      `;

      drawEdges(child);
    });
  }

  drawEdges(treeData);

  svg += `</svg>`;

  container.innerHTML = svg;
}
function renderTreeGraphPanel(treeData) {

  // ✅ Use your existing panel system
  const panel = addPanel("🌳 Tree Graph");

  // Container (acts like a row but full width)
  const graphContainer = document.createElement("div");
  graphContainer.style.width = "100%";
  graphContainer.style.overflow = "auto";
  graphContainer.style.paddingTop = "10px";

  panel.appendChild(graphContainer);

  // ---------- BUILD LEVELS ----------
  function buildLevels(root) {
    const levels = [];
    function walk(node, depth = 0) {
      if (!levels[depth]) levels[depth] = [];
      levels[depth].push(node);
      if (node.children) {
        node.children.forEach(c => walk(c, depth + 1));
      }
    }
    walk(root);
    return levels;
  }

  const levels = buildLevels(treeData);

  // ---------- CONFIG ----------
  const nodeW = 70;
  const nodeH = 28;
  const hGap = 25;
  const vGap = 70;

  const svgW = 1200;
  const svgH = levels.length * vGap + 100;

  let svg = `<svg width="${svgW}" height="${svgH}">`;

  const pos = new Map();

  // ---------- DRAW NODES ----------
  levels.forEach((level, depth) => {

    const totalWidth = level.length * (nodeW + hGap);
    let startX = (svgW - totalWidth) / 2;

    level.forEach((node, i) => {

      const x = startX + i * (nodeW + hGap);
      const y = depth * vGap + 40;

      pos.set(node.id, { x, y });

      svg += `
        <g onclick="onTreeNodeClick('${node.id}')">
          <rect x="${x}" y="${y}" width="${nodeW}" height="${nodeH}"
            rx="6"
            fill="#0b0f1a"
            stroke="#00ffff"
            style="cursor:pointer" />
          
          <text x="${x + nodeW/2}" y="${y + 18}"
            text-anchor="middle"
            fill="#00ffff"
            font-size="11">
            ${node.id}
          </text>
        </g>
      `;
    });
  });

  // ---------- DRAW EDGES ----------
  function drawEdges(node) {
    if (!node.children) return;

    const p = pos.get(node.id);

    node.children.forEach(child => {
      const c = pos.get(child.id);

      svg += `
        <line 
          x1="${p.x + nodeW/2}" 
          y1="${p.y + nodeH}" 
          x2="${c.x + nodeW/2}" 
          y2="${c.y}" 
          stroke="#00ffff55"
          stroke-width="1"
        />
      `;

      drawEdges(child);
    });
  }

  drawEdges(treeData);

  svg += `</svg>`;

  graphContainer.innerHTML = svg;
}

function renderULTreePanel() {

  const panel = addPanel("🌳 UL Tree View");

  // ---------- INPUT UI ----------
  const inputWrap = document.createElement("div");
  inputWrap.style.display = "flex";
  inputWrap.style.gap = "8px";
  inputWrap.style.marginBottom = "10px";

  const input = document.createElement("input");
  input.placeholder = "Enter wallet address...";
  input.style.flex = "1";
  input.style.padding = "6px";
  input.style.borderRadius = "6px";
  input.style.border = "1px solid #333";
  input.style.background = "#0b0f1a";
  input.style.color = "#00ffff";
  input.style.fontSize = "12px";

  const btn = document.createElement("button");
  btn.textContent = "Load Tree";

  inputWrap.appendChild(input);
  inputWrap.appendChild(btn);
  panel.appendChild(inputWrap);

  // ---------- TREE CONTAINER ----------
  const container = document.createElement("div");
  container.className = "ulTreeWrap";
  container.style.width = "100%";
  container.style.overflow = "auto";
  container.style.padding = "10px";

  panel.appendChild(container);

  // ---------- STYLE ----------
  const style = document.createElement("style");
  style.innerHTML = `
    .ulTreeWrap ul { list-style:none; padding-left:18px; position:relative; }
    .ulTreeWrap li { position:relative; margin:4px 0; color:#00ffff; font-size:12px; }
    .ulTreeWrap li::before {
      content:""; position:absolute; top:10px; left:-12px;
      width:10px; height:2px; background:#00ffff55;
    }
    .ulTreeWrap ul::before {
      content:""; position:absolute; left:6px; top:10px;
      bottom:0; width:2px; background:#00ffff22;
    }
    .node {
      cursor:pointer;
      padding:3px 6px;
      border-radius:4px;
      display:inline-block;
      background:#0b0f1a;
    }
    .node:hover { background:#ffffff22; }
    .active {
      background:#00ffff33;
      box-shadow:0 0 6px #00ffff;
    }
    .toggle {
      margin-right:6px;
      color:#ffd700;
      cursor:pointer;
    }
  `;
  document.head.appendChild(style);

  // ---------- CACHE ----------
  const nodeCache = {};

  // ---------- HELPERS ----------
  function shortAddr(addr) {
    return addr ? addr.slice(-4) : "----";
  }

  async function getNode(id) {

    if (nodeCache[id]) return nodeCache[id];

    const n = await nested.methods.nodes(id).call();

    const node = {
      id: id.toString(),
      address: n.user || n[0],
      loaded: false,
      loading: false,
      children: []
    };

    nodeCache[id] = node;
    return node;
  }

  async function getChildren(node) {

    const n = await nested.methods.nodes(node.id).call();
    const directs = n.direc || n[2] || [];

    const MAX_CHILD = 10; // 🔥 IMPORTANT LIMIT

    const slice = directs.slice(0, MAX_CHILD);

    // ⚡ PARALLEL CALLS
    const promises = slice.map(async (addr) => {
      const info = await nested.methods.getNodeParent(addr).call();
      return getNode(info[0]);
    });

    return await Promise.all(promises);
  }

  // ---------- MAIN LOAD FUNCTION ----------
  async function loadTree(userAddress) {

    container.innerHTML = "⏳ Loading...";

    try {

      const info = await nested.methods.getNodeParent(userAddress).call();
      let uid = info[0];

      let current = await getNode(uid);
      let root = current;

      // 🔼 BUILD UPLINE
      while (true) {
        const pid = await nested.methods.getNodeParentId(current.id).call();
        if (pid == 0) break;

        const parent = await getNode(pid);
        parent.children = [current];

        current = parent;
        root = parent;
      }

      // ---------- RENDER ----------
      function createNode(node) {

        const li = document.createElement("li");

        const toggle = document.createElement("span");
        toggle.textContent = "▶";
        toggle.className = "toggle";

        const label = document.createElement("span");
        label.className = "node";
        label.textContent = `${node.id} (${shortAddr(node.address)})`;

        // 🔽 EXPAND / COLLAPSE + LAZY LOAD
        toggle.onclick = async () => {

          if (node.loading) return;
          node.loading = true;

          toggle.textContent = "⏳";

          try {

            if (!node.loaded) {

              const children = await getChildren(node);

              node.children = children;
              node.loaded = true;

              const ul = document.createElement("ul");
              children.forEach(c => ul.appendChild(createNode(c)));
              li.appendChild(ul);

            } else {

              const ul = li.querySelector("ul");
              if (ul) {
                ul.style.display = ul.style.display === "none" ? "block" : "none";
              }
            }

          } catch (e) {
            console.error(e);
          }

          node.loading = false;
          toggle.textContent = toggle.textContent === "▶" ? "▼" : "▶";
        };

        // 🎯 HIGHLIGHT PATH
        label.onclick = () => {
          container.querySelectorAll(".node").forEach(n => n.classList.remove("active"));

          let el = label;
          while (el) {
            if (el.classList?.contains("node")) el.classList.add("active");
            el = el.parentElement?.closest("li")?.querySelector(".node");
          }
        };

        li.appendChild(toggle);
        li.appendChild(label);

        return li;
      }

      container.innerHTML = "";

      const ul = document.createElement("ul");
      ul.appendChild(createNode(root));

      container.appendChild(ul);

    } catch (err) {
      container.innerHTML = "❌ Error loading tree";
      console.error(err);
    }
  }

  // ---------- BUTTON CLICK ----------
  btn.onclick = () => {
    const addr = input.value.trim();
    if (!addr) {
      alert("Enter address");
      return;
    }
    loadTree(addr);
  };
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



window.onload = init;