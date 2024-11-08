// websocket.js

const {Web3} = require('web3');
const axios = require('axios');

// Ganti 'ws://localhost:8546' dengan URL WebSocket dari node Ethereum Anda
const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://34.101.54.174:8546'));

// Ganti alamat kontrak dan ABI dengan yang sesuai
const contractAddress = '0xD8A31960472FC194d80324Bd3B62482bd1166ce4';
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "walletAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "owners",
				"type": "address[]"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "requiredSignatures",
				"type": "uint256"
			}
		],
		"name": "NewMultiSigWallet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenAddress",
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
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "initialSupply",
				"type": "uint256"
			}
		],
		"name": "TokenCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "invoice_number",
				"type": "string"
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
				"name": "getTokenName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "getTokenSymbol",
				"type": "string"
			}
		],
		"name": "TokenUmumMinted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "txIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "transactionNote",
				"type": "string"
			}
		],
		"name": "TransactionCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string[]",
				"name": "txHashData",
				"type": "string[]"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenUmumId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenDistributionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "signers",
				"type": "address[]"
			}
		],
		"name": "TransferDistributionTokenEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "txHashData",
				"type": "string[]"
			},
			{
				"internalType": "uint256",
				"name": "tokenUmumId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenDistributionId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "toDistributionTokenAddress",
				"type": "address"
			}
		],
		"name": "TransferDistributionTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "txIndex",
				"type": "uint256"
			}
		],
		"name": "confirmTransaction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "signers",
				"type": "address[]"
			},
			{
				"internalType": "uint256",
				"name": "requiredSignatures",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "initialSupply",
				"type": "uint256"
			}
		],
		"name": "createMultiSigAndToken",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "_data",
				"type": "bytes"
			},
			{
				"internalType": "string",
				"name": "_transactionNote",
				"type": "string"
			}
		],
		"name": "createTransaction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllTokens",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "txIndex",
				"type": "uint256"
			}
		],
		"name": "getAllTransaction",
		"outputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			},
			{
				"internalType": "bool",
				"name": "executed",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "confirmations",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "transactionNote",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getBalanceByTokenId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
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
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getPendingProposal",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getSignersByTokenId",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "signers",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getSuccessProposal",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getTokenDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "multiSigAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "ERC20TokenAddr",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "invoice_number",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mintTokens",
		"outputs": [
			{
				"internalType": "string",
				"name": "getName",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "getAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenUmumId",
				"type": "uint256"
			}
		],
		"name": "tesConfirm",
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
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokenData",
		"outputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tokenName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalTokens",
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
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "txHashTokenProgramAndTokenIdProgram",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

// Fungsi untuk mendengarkan TransferDistributionTokenEvent
const subscribeToTransferDistributionTokenEvent = () => {
    // Ambil semua event `TransferDistributionTokenEvent` yang sudah terjadi
    // contractInstance.getPastEvents('TransferDistributionTokenEvent', {
    //     fromBlock: 0,
    //     toBlock: 'latest'
    // })
    // .then(events => {
    //     console.log(`Total TransferDistributionTokenEvent: ${events.length}`);
    //     events.forEach(event => {
    //         console.log('Event:', event.event);
    //         console.log('txHashData:', event.returnValues.txHashData); // Menampilkan txHashData
    //         console.log('Token Umum ID:', event.returnValues.tokenUmumId);
    //         console.log('Token Distribution ID:', event.returnValues.tokenDistributionId);
    //         console.log('Transaction Hash:', event.transactionHash);
    //     });
    // })
    // .catch(err => {
    //     console.error('Error mendapatkan event:', err);
    // });

    // Berlangganan ke `TransferDistributionTokenEvent` yang akan datang
    contractInstance.events.TransferDistributionTokenEvent({
        fromBlock: 'latest'
    })
    .on('data', async (event) => {
        console.log('Event baru:', event.event);
        console.log('txHashData:', event.returnValues.txHashData); // Menampilkan txHashData
        console.log('Token Umum ID:', event.returnValues.tokenUmumId);
        console.log('Token Distribution ID:', event.returnValues.tokenDistributionId);
        console.log('Transaction Hash:', event.transactionHash);
		const txHashDistribusiData = event.transactionHash
		const txHashDataUmum = event.returnValues.txHashData;
		const signers = event.returnValues.signers;
		console.log(txHashDistribusiData)
		console.log(txHashDataUmum)
		try {
			// Kirim POST request ke backend
			await axios.post('http://localhost:3001/send-distribution', { txHashes:txHashDataUmum,txHashDistribusi: txHashDistribusiData,signers:signers });
			console.log('Data dikirim ke backend');
		} catch (error) {
			console.error('Error mengirim data ke backend:', error);
		}
    })
    .on('error', error => {
        console.error('Error:', error);
    });
};

// Cek koneksi WebSocket dan mulai berlangganan
web3.eth.net.isListening()
    .then(() => {
        console.log('WebSocket terhubung!');
        subscribeToTransferDistributionTokenEvent();
    })
    .catch(e => {
        console.error('Gagal terhubung ke WebSocket:', e);
    });