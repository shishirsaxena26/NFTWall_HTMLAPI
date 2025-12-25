window.addEventListener("load", function load(event) {
    ConnectWallet();

}, false);
async function ConnectWallet() {
    window.selectedaddress = null;
    return await getConnectedAddress();
}
 

const getConnectedAddress = async () => {
    window.selectedaddress = null;
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        //if (!window.ethereum.isConnected())
        //    console.log("Please connect metamask wallet.")

        await window.ethereum.enable();
        if (window.ethereum.isConnected()) {
            // window.web3 = new Web3(window.ethereum);

            console.log(window.ethereum);

            window.web3 = new Web3(window.ethereum);
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
                params: [],
            });
            console.log(accounts);
            if (accounts.length === 0) {
                myalert('Please connect to MetaMask.');
            }
            else {            //console.log(window.ethereum._state.account);

                selected_chainId = await ethereum.request({ method: 'eth_chainId' });
                if (selected_chainId == testnet_chainId || selected_chainId == mainnet_chainId) {
                    handleAccountsChanged(accounts);
                    window.selectedaddress = accounts[0];
                    return accounts[0];
                }
                else
                    myalert("Please select polygon network");
            }
        }
    }
    else
        myalert("Please download metamask");

    return false;
};

function handleAccountsChanged(accounts) {
    console.log(accounts);
    if (accounts.length === 0) {
        myalert('Please connect to MetaMask.');
    } else {
        setAccount(accounts[0]);
    }
}

