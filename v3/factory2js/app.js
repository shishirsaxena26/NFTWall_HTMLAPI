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

const minBlock = 3653181;
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
    name(); 
    //debugTransaction();
    //scanBlocks(50); // scan last 20 blocks
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
  f.innerText = field;

  const v = document.createElement("div");
  if(typeof value === "string" && value.startsWith("0x")){
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

    v.appendChild(short);
    v.appendChild(btn);
  } else {
    v.innerText = value;
  }

  row.appendChild(f);
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
    return Number(web3.utils.fromWei(value, "ether")).toFixed(3) + " OZN";
}

async function printRow(addr){
    const bal = await web3.eth.getBalance(addr);
    let eth3 = new web3.utils.BN(bal).div(new web3.utils.BN("1000000000000000"));
    let major = eth3.div(new web3.utils.BN("1000")).toString();
    let minor = pad3(eth3.mod(new web3.utils.BN("1000")).toString());
    return addr + " | " + major + "." + minor + " OZN";
}

// -------------------- LOAD SYSTEM --------------------
async function loadSystem(){
    clearPanels();
    const panelSys = addPanel("System Data");
    try{
    const nodes = await nested.methods.getNodesCount().call();
    const sysAge = await nested.methods.systemAge().call();
    const forms = await transferRequests.methods.getFormsCount().call();

    addRow(panelSys,"Nodes Count",nodes);
    addRow(panelSys,"System Age",sysAge);
    addRow(panelSys,"Form Count",forms);

    await loadSystemTreasuriesNSecurebase();

    }catch(err){

        console.error(err);
        addRow(panelMarket,"Error","Unable to load marketplace");

    }

    hideLoader();
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
    const panelTreasury = addPanel("TREASURY");
    const factory = await hexBase.methods.inTreaseryFactory().call();
    addRow(panelTreasury,"Factory",factory);
    const mining = await hexBase.methods.inTreaseryTVLMining().call();
    addRow(panelTreasury,"TVL Mining",mining);
    const reward = await hexBase.methods.inTreaseryTVLReward().call();
    addRow(panelTreasury,"TVL Reward",reward);
    const roy = await hexBase.methods.inTreaseryTVLRoyality().call();
    addRow(panelTreasury,"TVL Royality",roy);
    const tour = await hexBase.methods.inTreaseryTVLTour().call();
    addRow(panelTreasury,"TVL Tour",tour);
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
}

// -------------------- LOAD USER --------------------
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

    addRow(userPanel,"ID",node[0]);
    addRow(userPanel,"Node",node[1]);
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

        addRow(panel, "ID", node[0]);
        addRow(panel, "Node", node[1]);
        addRow(panel, "Parent", node[2]);
        addRow(panel, "Active", node[5]);
        addRow(panel, "Direct Count", node[6]);

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
    }catch(err){

        console.error(err);
        addRow(panelMarket,"Error","Unable to load marketplace");

    }

    hideLoader();
}

async function loadMyStor(id, panel){
    try{

        const node = await nested.methods.getNode(id).call();
        const storAddr = node[4];
        if (storAddr != "0x0000000000000000000000000000000000000000") { 
            const stor = new web3.eth.Contract(IInstanceStorABI.abi, storAddr);
            const dage = await stor.methods.dage().call();
            const rank = await stor.methods.rank().call();
            const cage = await stor.methods.cage().call();
            const isCap = await stor.methods.isCap().call();

            addRow(panel, "Stor Dage", dage);
            addRow(panel, "Stor Rank", rank);
            addRow(panel, "Stor Cage", cage);
            addRow(panel, "Stor isCap", isCap);
            /*
            // Fetch LSB 1,3,30,93,95,603,695,696
            const lsbIndexes = [1, 3, 30, 93, 95, 603, 695, 696];
            for (const i of lsbIndexes) {
                const val = await stor.methods.LSB(i).call();
                addRow(panel, `Stor LSB(${i})`, val);
            }
            */

            // Drawn, Flushed, Unpaid, Compute
            const drawn = await stor.methods.drawn().call();
            const flushed = await stor.methods.flushed().call();
            const unpaid = await stor.methods.unpaid().call();
            const compute = await stor.methods.compute(700).call();
            debugger;
            const incomeTypes = ["Reward", "Royali", "Self", "Yeild", "Tour", "Gift", "Valida"];

            // Add a header row
            addRow(panel, "Income Type", "Compute | Drawn | Flushed | Unpaid");

            for (let i = 0; i < 7; i++) {
                const comp = formatOZN(compute[i]);
                const drwn = formatOZN(drawn[i]);
                const flsh = formatOZN(flushed[i]);
                const unpaidVal = formatOZN(unpaid[i]);

                addRow(panel, incomeTypes[i], `${comp} | ${drwn} | ${flsh} | ${unpaidVal}`);
            }

            // Burned & Self Proposed
            const burned = await stor.methods.burned().call();
            const selfProposed = await stor.methods.selfProposed().call();
            addRow(panel, "Burned", formatOZN(burned));
            addRow(panel, "Self Proposed", formatOZN(selfProposed));
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
 
    if(!instance || instance==ZERO || !stor || stor==ZERO){
        addRow(panel,"User","Instance/Stor not found");
        return;
    }

    const storeContract = new web3.eth.Contract(IInstanceStorABI.abi, stor);
    const mintCount = await storeContract.methods.mintCount().call();
   
    const lsbpanel = addPanel("LSB Amount");

    let lsbindex = await storeContract.methods.dage().call();
    lsbpanel.appendChild(Object.assign(document.createElement("div"), {
        className: "row",
        innerHTML: `Dage LSB[${lsbindex}]: ${web3.utils.fromWei(lsbindex,"ether")}`
    }));

    lsbindex = await storeContract.methods.withdrawlDage().call();
    lsbpanel.appendChild(Object.assign(document.createElement("div"), {
        className: "row",
        innerHTML: `WithdrawlDage LSB[${lsbindex}]: ${web3.utils.fromWei(lsbindex,"ether")}`
    }));

  
    for(let i=1; i<=mintCount; i++){

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
            const isforce = checkbox.checked;
            if(isforce) {
                alert('checked');
            } else {
                alert('not hecked');
            } 

            onNFTTransfer(user, nftAddr, tokenId, isforce);

        };

        /* BURN BUTTON */

        const btnBurn=document.createElement("button");
        btnBurn.innerText="Burn";
        btnBurn.style.marginLeft="5px";

        btnBurn.onclick = () => {
            const isforce = checkbox.checked;
            if(isforce) {
                alert('checked');
            } else {
                alert('not hecked');
            } 

            burnNFT(user, nftAddr, tokenId, isforce);
        };
        
        right.appendChild(checkbox);
        right.appendChild(btnTransfer);
        right.appendChild(btnBurn);

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
    for(let i=0; i<=15; i++){

        const lvl = await storeContract.methods.getNodeLB(i).call();
        debugger;
        addRow(levelpanel, "Level ["+i+"]", ` ${formatOZN(lvl[0])} | ${lvl[1]} `);
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
        if (user.trim().toLowerCase() !== accounts[0].toLowerCase()) {
            throw "Incorrect account selected";
        }
		window.web3T = new Web3(window.ethereum);
        // Initialize contract
        const orc1155contract = new web3T.eth.Contract(IORC1155ABI.abi, orc1155);

        // Check balance
        const balance = await orc1155contract.methods.balanceOf(user, tokenId).call();
        if (amount > parseInt(balance)) {
            throw 'Insufficient NFT balance';
        }
        if(isforce) {
            // Send transfer
            const tx = await orc1155contract.methods
                .onTokenTransferByForce(user, to, tokenId, amount, "0x")
                .send({ from: user });

            console.log(tx);

            if (tx.status) {
                alert("Transfer succeeded");
            } else {
                alert("Transfer failed");
            }
        } 
        else {
            // Send transfer
            const tx = await orc1155contract.methods
                .safeTransferFrom(user, to, tokenId, amount, "0x")
                .send({ from: user });

            console.log(tx);

            if (tx.status) {
                alert("Transfer succeeded");
            } else {
                alert("Transfer failed");
            }
        }

    } catch (err) {
        console.error(err);
        alert("Transfer failed: " + (err.message || err));
    } 
        
    hideLoader();
    
}


async function burnNFT(user,orc1155, tokenId, isforce) {
    showLoader();

    try {

        // Prompt for amount
        const amountStr = prompt("Enter amount to Burn:");
        if (!amountStr) 
            throw 'Amount required';
        
        const amount = parseInt(amountStr);
        if (isNaN(amount) || amount <= 0) 
            throw 'Invalid amount';
        

        // Enable wallet
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        
        if(user.trim().toLowerCase() !== accounts[0].toLowerCase())
            throw "Incorrect account selected";
        
		window.web3T = new Web3(window.ethereum);
        // Initialize contract
        const orc1155contract = new web3T.eth.Contract(IORC1155ABI.abi, orc1155);

        // Check balance
        const balance = await orc1155contract.methods.balanceOf(user, tokenId).call();
        if (amount > parseInt(balance)) 
            throw 'Insufficient NFT balance';
        
        //function subscribed(address _user) 
        const target = "0x250f1148511182e4Fa1a200Bd0d9E885A3259574";

        // encode function call
        const data = web3.eth.abi.encodeFunctionCall(
        {
            name: "subscribed",
            type: "function",
            inputs: [
                { type: "address", name: "_user" }
            ]
        },
        [user]
        );

        // build payload = target + calldata
        const payload =
            "0x" +
            target.slice(2) +
            data.slice(2);

        console.log(payload);

        const payload1 ='0x';
        
        if(isforce) { 
            // Send transfer
            const tx = await orc1155contract.methods
                .onTokenBurnByForce(tokenId, amount, payload1)
                .send({ from: user });

            console.log(tx);

            if (tx.status) 
                alert("Burning succeeded");
            else 
                throw "Burning failed"; 
        }
        else { 
            // Send transfer
            const tx = await orc1155contract.methods
                .onTokenBurn(tokenId, amount)
                .send({ from: user });

            console.log(tx);

            if (tx.status) 
                alert("Burning succeeded");
            else 
                throw "Burning failed"; 
        }
    

    } catch (err) {
        console.error(err);
        alert("Burning failed: " + (err.message || err));
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