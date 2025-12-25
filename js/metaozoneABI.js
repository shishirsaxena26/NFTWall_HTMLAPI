
const metaozoneABI_testnet =
	[
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "addOwner",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bool",
					"name": "isapprove",
					"type": "bool"
				}
			],
			"name": "approveByV1",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bool",
					"name": "isapprove",
					"type": "bool"
				}
			],
			"name": "approveByV2",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "user",
					"type": "address"
				}
			],
			"name": "distributeRoyalityAndMining",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "v1",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "v2",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "totalusers",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "dailybusiness",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "distributedLevel",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "distributedReward",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "distributedRoyality",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "distributedSelfMining",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "distributedLevelMining",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "staked",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "byAddress",
					"type": "address"
				}
			],
			"name": "Business",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "Deposit",
			"outputs": [
				{
					"internalType": "bool",
					"name": "status",
					"type": "bool"
				}
			],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "fromAddress",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "toAddress",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "incometype",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				}
			],
			"name": "IncomeDistribution",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "useraddress",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "stakeId",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "referencedBy",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "byLevel",
					"type": "uint256"
				}
			],
			"name": "payToNode",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"internalType": "address",
					"name": "parent",
					"type": "address"
				}
			],
			"name": "Register",
			"outputs": [
				{
					"internalType": "address",
					"name": "profile",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "created",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"internalType": "address",
					"name": "parent",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "user",
					"type": "address"
				}
			],
			"name": "RegisterByAdmin",
			"outputs": [
				{
					"internalType": "address",
					"name": "profile",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "created",
					"type": "bool"
				}
			],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "oldOwner",
					"type": "address"
				}
			],
			"name": "removeOwner",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "resetLogs",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "setLevelIncome_Per",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "setLevelMiningReward_Per",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "setLevelPlanCondition",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "setMinumumStakeLimit",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "setRewardIncome",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "setRewardPlan",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "usernode",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "newdays",
					"type": "uint256"
				}
			],
			"name": "setStakeDaysforNode",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "store",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				}
			],
			"name": "SetupRegister",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "usernode",
					"type": "address"
				}
			],
			"name": "StakeOn",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "usernode",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "stakeid",
					"type": "uint256"
				}
			],
			"name": "StakeOnOldUpload",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"stateMutability": "payable",
			"type": "fallback"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "usernode",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "stakeid",
					"type": "uint256"
				}
			],
			"name": "UnStakeForNode",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "userNode",
					"type": "address"
				}
			],
			"name": "updateNodeInActive",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "recevier",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "withdraw",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "recevier",
					"type": "address"
				}
			],
			"name": "withdrawFull",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "usernode",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amt",
					"type": "uint256"
				}
			],
			"name": "Withdrawnode",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"stateMutability": "payable",
			"type": "receive"
		},
		{
			"inputs": [],
			"name": "getContractBalance",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getData",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "stakelimit",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "dailybusiness",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "distributedLevel",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "distributedReward",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "distributedRoyality",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "distributedSelfMining",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "distributedLevelMining",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "staked",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "getLevelDataAndCondition",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "LevelIncomePer",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "LevelMiningPer",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "LevelCondition",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "nodeId",
					"type": "address"
				}
			],
			"name": "getNodeBusinessRankPlan",
			"outputs": [
				{
					"internalType": "bool[7]",
					"name": "",
					"type": "bool[7]"
				},
				{
					"internalType": "uint256[7]",
					"name": "",
					"type": "uint256[7]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "getNodeByIndex",
			"outputs": [
				{
					"internalType": "address",
					"name": "node",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "nodeAddress",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "getNodeChild",
			"outputs": [
				{
					"internalType": "address",
					"name": "childAddress",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "nodeAddress",
					"type": "address"
				}
			],
			"name": "getNodeChildCount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "childCount",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getNodesCount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "nodesCount",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "getRewardPlanAndIncome",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "rewardplan",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "rewardamount",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "nodeId",
					"type": "address"
				}
			],
			"name": "isNode",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isIndeed",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "nodeStructs",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"internalType": "bool",
					"name": "isNode",
					"type": "bool"
				},
				{
					"internalType": "address",
					"name": "parent",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "parentIndex",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "myBusiness",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "instance",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "depth",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "owners",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];



const metaozoneABI =
	[
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "addOwner",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bool",
					"name": "isapprove",
					"type": "bool"
				}
			],
			"name": "approveByV1",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bool",
					"name": "isapprove",
					"type": "bool"
				}
			],
			"name": "approveByV2",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "user",
					"type": "address"
				}
			],
			"name": "distributeRoyalityAndMining",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "v1",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "v2",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "totalusers",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "dailybusiness",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "distributedLevel",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "distributedReward",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "distributedRoyality",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "distributedSelfMining",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "distributedLevelMining",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "staked",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "byAddress",
					"type": "address"
				}
			],
			"name": "Business",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "Deposit",
			"outputs": [
				{
					"internalType": "bool",
					"name": "status",
					"type": "bool"
				}
			],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "fromAddress",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "toAddress",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "incometype",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				}
			],
			"name": "IncomeDistribution",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "useraddress",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "stakeId",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "referencedBy",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "byLevel",
					"type": "uint256"
				}
			],
			"name": "payToNode",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"internalType": "address",
					"name": "parent",
					"type": "address"
				}
			],
			"name": "Register",
			"outputs": [
				{
					"internalType": "address",
					"name": "profile",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "created",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"internalType": "address",
					"name": "parent",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "user",
					"type": "address"
				}
			],
			"name": "RegisterByAdmin",
			"outputs": [
				{
					"internalType": "address",
					"name": "profile",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "created",
					"type": "bool"
				}
			],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "oldOwner",
					"type": "address"
				}
			],
			"name": "removeOwner",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "resetLogs",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "setLevelIncome_Per",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "setLevelMiningReward_Per",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "setLevelPlanCondition",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "setMinumumStakeLimit",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "setRewardIncome",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "setRewardPlan",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "usernode",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "newdays",
					"type": "uint256"
				}
			],
			"name": "setStakeDaysforNode",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "store",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "name",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				}
			],
			"name": "SetupRegister",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "usernode",
					"type": "address"
				}
			],
			"name": "StakeOn",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "usernode",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "stakeid",
					"type": "uint256"
				}
			],
			"name": "StakeOnOldUpload",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"stateMutability": "payable",
			"type": "fallback"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "usernode",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "stakeid",
					"type": "uint256"
				}
			],
			"name": "UnStakeForNode",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "userNode",
					"type": "address"
				}
			],
			"name": "updateNodeInActive",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "recevier",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "withdraw",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "recevier",
					"type": "address"
				}
			],
			"name": "withdrawFull",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "usernode",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amt",
					"type": "uint256"
				}
			],
			"name": "Withdrawnode",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"stateMutability": "payable",
			"type": "receive"
		},
		{
			"inputs": [],
			"name": "getContractBalance",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getData",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "stakelimit",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "dailybusiness",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "distributedLevel",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "distributedReward",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "distributedRoyality",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "distributedSelfMining",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "distributedLevelMining",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "staked",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "getLevelDataAndCondition",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "LevelIncomePer",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "LevelMiningPer",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "LevelCondition",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "nodeId",
					"type": "address"
				}
			],
			"name": "getNodeBusinessRankPlan",
			"outputs": [
				{
					"internalType": "bool[7]",
					"name": "",
					"type": "bool[7]"
				},
				{
					"internalType": "uint256[7]",
					"name": "",
					"type": "uint256[7]"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "getNodeByIndex",
			"outputs": [
				{
					"internalType": "address",
					"name": "node",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "nodeAddress",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "getNodeChild",
			"outputs": [
				{
					"internalType": "address",
					"name": "childAddress",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "nodeAddress",
					"type": "address"
				}
			],
			"name": "getNodeChildCount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "childCount",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getNodesCount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "nodesCount",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "index",
					"type": "uint256"
				}
			],
			"name": "getRewardPlanAndIncome",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "rewardplan",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "rewardamount",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "nodeId",
					"type": "address"
				}
			],
			"name": "isNode",
			"outputs": [
				{
					"internalType": "bool",
					"name": "isIndeed",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "nodeStructs",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "id",
					"type": "uint256"
				},
				{
					"internalType": "bool",
					"name": "isNode",
					"type": "bool"
				},
				{
					"internalType": "address",
					"name": "parent",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "parentIndex",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "myBusiness",
					"type": "uint256"
				},
				{
					"internalType": "address",
					"name": "instance",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "depth",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "owners",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];