let web3;
web3 = new Web3(provider);

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

let nested;
let rule;
let safeguard;
let daocore;
let daoassembly;
let transferRequests;


let currentAccount = null;
let currentInstance = null;
let currentStor = null;

async function init(){
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

    if (!currentAccount || !web3.utils.isAddress(currentAccount)) return;

    try{
        const id = await nested.methods.UserToId(currentAccount).call();
        const node = await nested.methods.getNode(id).call();

        document.getElementById("walletId").innerText =
            "ID " + node[0];

        currentInstance = node[3];
        document.getElementById("walletInst").innerText =
            "Inst " + shortAddr(node[3]);

        currentStor = node[4];
        document.getElementById("walletStor").innerText =
            "Stor " + shortAddr(node[4]);

    }catch(e){
        console.log(e);
        document.getElementById("walletNode").innerText = "User not registered";
    }
}

async function joinUser() {
    const input = document.getElementById("userAddrInput");
    const parent = input.value.trim();
    if (!parent || !web3.utils.isAddress(parent)) {
        alert("Enter a valid parent");
        return;
    }

    if (!currentAccount || !web3.utils.isAddress(currentAccount)) {
        alert("Connect to wallet");
        return;
    }

	window.web3T = new Web3(window.ethereum);
   

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
        if (storAddr != "0x0000000000000000000000000000000000000000") { 
            const stor = new web3.eth.Contract(IInstanceStorABI.abi, storAddr);
            const dage = await stor.methods.dage().call();
            const rank = await stor.methods.rank().call();
            const cage = await stor.methods.cage().call();

            addRow(panel, "Stor Dage", dage);
            addRow(panel, "Stor Rank", rank);
            addRow(panel, "Stor Cage", cage);
        
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
    }catch(err){

        console.error(err);
        addRow(panelMarket,"Error","Unable to load marketplace");

    }

    hideLoader();
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

        const panelNFT = addPanel("NFT Marketplace");

        let i=1;
        let flag=true;

        while(flag){

            try{

                const tokenName = await orc1155.methods.idToName(i).call();

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

                panelNFT.appendChild(row);

                i++;

            }catch(e){
                flag=false;
            }

        }

        // MY NFT PANEL
        if(currentAccount){

            const panelMine = addPanel("My NFTs");

            for(let id=1; id<=i; id++){

                try{

                    const bal = await orc1155.methods.balanceOf(currentAccount,id).call();

                    if(bal>0){

                        const tokenName = await orc1155.methods.idToName(id).call();

                        addRow(panelMine,"#"+id+" "+tokenName,"x"+bal);

                    }

                }catch(e){}

            }

        }

    }catch(err){

        console.error(err);
        addRow(panelMarket,"Error","Unable to load marketplace");

    }

    hideLoader();
}


async function buyNFT(o1155, tokenId){


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
                        debugger;
                        let accounts = await ethereum.enable();
		                window.web3T = new Web3(window.ethereum);
                        const instancecontract = new web3T.eth.Contract(IInstanceMeABI.abi, currentInstance);
                        const storcontract = new web3.eth.Contract(IInstanceStorABI.abi, currentStor);
                       
                        // qty = 1 (market purchase)
                        const qty = 2;
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
                        debugger;
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