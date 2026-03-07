

let web3;
let hexBase;
let in741;
web3 = new Web3(provider);

    var BN = web3.utils.BN;
    var bs1 = new web3.utils.BN("0");;
    
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

async function init(){

    IPriceABI = await fetch('abistandardv3/lib741Price.sol/lib741Price.json?v='+version)
    .then(res => res.json());
    ISafeguardABI = await fetch('abistandardv3/libSafeguard.sol/libSafeguard.json?v='+version)
    .then(res => res.json());
    IHexBaseABI = await fetch('abistandardv3/hexBase.sol/hexBase.json?v='+version)
        .then(res => res.json());
    I741RulesABI = await fetch('abistandardv3/lib741Rules.sol/lib741Rules.json?v='+version)
        .then(res => res.json());
    INested741ABI = await fetch('abistandardv3/Nested741.sol/Nested741.json?v='+version)
        .then(res => res.json());
    IInstanceMeABI = await fetch('abistandardv3/Nftwall-InstanceMe.sol/InstanceMe.json?v='+version)
        .then(res => res.json());
    IORC1155ABI = await fetch('abistandardv3/ORC1155.sol/ORC1155.json?v='+version)
        .then(res => res.json());
    IInstanceStorABI = await fetch('abistandardv3/InstanceStor.sol/InstanceStor.json?v='+version)
        .then(res => res.json());
    IDAOCoreABI = await fetch('abistandardv3/DAOCore.sol/DAOCore.json?v='+version)
        .then(res => res.json());
    IDAOAssemblyABI = await fetch('abistandardv3/DAOAssembly.sol/DAOAssembly.json?v='+version)
        .then(res => res.json());
    ITransferRequestsABI = await fetch('abistandardv3/TransferRequests.sol/TransferRequests.json?v='+version)
        .then(res => res.json());
        
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
    debugger;
}



async function loadSystem(){

    const table = document.getElementById("systemTable");

    table.innerHTML = "<tr><th>System View</th><th>Value</th></tr>";

    await loadSystemTreasuriesNSecurebase();

    const nodes = await nested.methods.getNodesCount().call();
    const sysAge = await nested.methods.systemAge().call();

    const forms = await transferRequests.methods.getFormsCount().call();

    addRow(table,"Nodes Count",nodes);
    addRow(table,"System Age",sysAge);
    addRow(table,"Form Count",forms);
}

async function loadSystemTreasuriesNSecurebase(){

    const table = document.getElementById("systemTable");

    addRow(table,"------ BASE ------","");

    addRow(table,"HexBase",await printRow(hexBaseAddress));

    const deployer = await hexBase.methods.inDeployerAsRoot().call();
    addRow(table,"DeployerAsRoot",await printRow(deployer));

    const old741 = await hexBase.methods.in741Old().call();
    addRow(table,"in741Old",await printRow(old741));

    addRow(table,"in741",await printRow(inNested741));

    addRow(table,"in741Rule",await printRow(in741Rule));

    const daoCore = await hexBase.methods.daocore().call();
    addRow(table,"DAO Core",await printRow(daoCore));

    const daoAsm = await hexBase.methods.daoassembly().call();
    addRow(table,"DAO Assembly",await printRow(daoAsm));

    const prop0 = await hexBase.methods.proposals(0).call();
    addRow(table,"proposal(0)",await printRow(prop0));

    const inst = await hexBase.methods.inInstance().call();
    addRow(table,"instance",await printRow(inst));

    addRow(table,"------ TREASURY ------","");

    const factory = await hexBase.methods.inTreaseryFactory().call();
    addRow(table,"Factory",await printRow(factory));

    const mining = await hexBase.methods.inTreaseryTVLMining().call();
    addRow(table,"TVL Mining",await printRow(mining));

    const reward = await hexBase.methods.inTreaseryTVLReward().call();
    addRow(table,"TVL Reward",await printRow(reward));

    const roy = await hexBase.methods.inTreaseryTVLRoyality().call();
    addRow(table,"TVL Royality",await printRow(roy));

    const tour = await hexBase.methods.inTreaseryTVLTour().call();
    addRow(table,"TVL Tour",await printRow(tour));

    const val = await hexBase.methods.inTreaseryTVLValidator().call();
    addRow(table,"TVL Validator",await printRow(val));

    addRow(table,"------ SECUREBASE ------","");

    const safe = await safeguard.methods.isSecureBase(insafeguard).call();
    addRow(table,"safeguard",safe);

    const propSafe = await safeguard.methods.isSecureBase(prop0).call();
    addRow(table,"proposal(0)",propSafe);

    addRow(table,"------ ROUGH ------","");

    const hexCheck = await nested.methods.getHexbase().call();
    addRow(table,"getHexbase",hexCheck);

    const rough = await nested.methods._isSecureBase(prop0).call();
    addRow(table,"proposal(0)",rough);
}

async function loadUser(){

    const table = document.getElementById("userTable");

    const user = "0xE77aB47de567b3a79849F38dbAd1d321b3ACE9d8";

    const id = await nested.methods.UserToId(user).call();

    const node = await nested.methods.getNode(id).call();

    const instAddr = node[3];
    const storAddr = node[4];

    addRow(table,"ID",node[0]);
    addRow(table,"Node",await printRow(node[1]));
    addRow(table,"Parent",node[2]);
    addRow(table,"Active",node[5]);
    addRow(table,"Direct Count",node[6]);

    if(instAddr != "0x0000000000000000000000000000000000000000"){

        const inst = new web3.eth.Contract(IInstanceMeABI.abi,instAddr);

        const instId = await inst.methods.id().call();
        const instParent = await inst.methods.parent().call();
        const instStor = await inst.methods.stor().call();

        addRow(table,"Instance ID",instId);
        addRow(table,"Instance Parent",shortAddr(instParent));
        addRow(table,"Instance Stor",shortAddr(instStor));
    }

    const stor = new web3.eth.Contract(IInstanceStorABI.abi,storAddr);

    const dage = await stor.methods.dage().call();
    const rank = await stor.methods.rank().call();
    const cage = await stor.methods.cage().call();

    addRow(table,"Stor Dage",dage);
    addRow(table,"Stor Rank",rank);
    addRow(table,"Stor Cage",cage);

}

// ----------------- COPY BUTTON -----------------
function copyAddr(addr){
    navigator.clipboard.writeText(addr);
    alert("Copied: "+addr);
}

// ----------------- UPDATE addRow -----------------
function addRow(table, field, value){
    let row = table.insertRow();
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    c1.innerText = field;

    if(typeof value === "string" && value.startsWith("0x")){
        c2.innerHTML =
        '<div class="addr">'+
        '<span>'+value+'</span>'+
        '<button class="copyBtn" onclick="copyAddr(\''+value+'\')">Copy</button>'+
        '</div>';
    } else{
        c2.innerText = value;
    }
}

// ----------------- SHORT ADDRESS -----------------
function shortAddr(addr){
    return addr.slice(0,6) + "..." + addr.slice(-4);
}

// ----------------- PAD3 -----------------
function pad3(v){
    v = parseInt(v);
    if(v>=100) return v.toString();
    if(v>=10) return "0"+v;
    return "00"+v;
}

// ----------------- UPDATE printRow -----------------
async function printRow(addr){
    const bal = await web3.eth.getBalance(addr);
    let eth3 = new web3.utils.BN(bal).div(new web3.utils.BN("1000000000000000"));
    let major = eth3.div(new web3.utils.BN("1000")).toString();
    let minor = pad3(eth3.mod(new web3.utils.BN("1000")).toString());
    return addr + " | " + major + "." + minor + " OZN";
}


window.onload = init;