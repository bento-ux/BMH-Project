// websocket.js

const {Web3} = require('web3');
const { ethers } = require("ethers");
const axios = require('axios');
const mysql = require('mysql2/promise');

const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://34.101.54.174:8546'));

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

const subscribeToTokenUmumMinted = () => {
    contractInstance.events.TokenUmumMinted({
        fromBlock: 'latest'
    })
    .on('data', async (event) => {
        const getTxHash = event.transactionHash
		const getInvoiceNumber = event.returnValues.invoice_number
		const getTokenName = event.returnValues.getTokenName;
		const getTokenSymbol = event.returnValues.getTokenSymbol;
		const getAmount = event.returnValues.amount;
        const getTokenId = event.returnValues.tokenId;

        const dataToSend = {
            invoice_number: getInvoiceNumber,
            transactionHash: getTxHash
        }
        console.log(`berhasil mint token ${getTxHash}`)

		try {
			const sendWaNotification = await axios.post('https://uat-pay.bmh.or.id/api/v1/incoming/invoice',dataToSend);
			if (sendWaNotification.status === 200) {
				console.log(`Berhasil kirim Notif wa incoming`)


				console.log(`isi response program ${sendWaNotification.data.program}`)
				const connection = await mysql.createConnection({
					host: 'localhost',      // Host default untuk XAMPP
					user: 'root',           // User default XAMPP
					password: '',           // Password default kosong (ganti jika Anda mengubahnya)
					database: 'BC_EXPLORER_DB', // Nama database yang Anda buat di phpMyAdmin
				});
				const dataToInsert = {
					txhash: getTxHash,
					amount: getAmount,
					status: 0,
					invoice_number: getInvoiceNumber,
					txhashtokenprogram: 0,
					tglDisalurkan: null,
					tokenProgramId: getTokenId,
					tokenName: getTokenName,
					tokenSymbol: getTokenSymbol,
					program: sendWaNotification.data.program, // Dari response
					signers: null
				};

                console.log(`data for store to db`)
                console.log(dataToInsert);

				const [result] = await connection.execute(
					`INSERT INTO tokenUmumTable (txhash, amount, status, invoice_number, txhashtokenprogram, tglDisalurkan, tokenProgramId, tokenName,tokenUmumSymbol, program, signers)
					 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
					[
						dataToInsert.txhash,
						dataToInsert.amount,
						dataToInsert.status,
						dataToInsert.invoice_number,
						dataToInsert.txhashtokenprogram,
						dataToInsert.tglDisalurkan,
						dataToInsert.tokenProgramId,
						dataToInsert.tokenName,
						dataToInsert.tokenSymbol,
						dataToInsert.program,
						dataToInsert.signers
					]
				);
				console.log('Data berhasil disimpan ke database:', result);
				await connection.end();
			}else {
				console.log('Gagal mengirim notifikasi WA kesalahan di Laravel');

			}
		} catch (error) {
			console.error('Error mengambil event:', error);
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
        subscribeToTokenUmumMinted();
    })
    .catch(e => {
        console.error('Gagal terhubung ke WebSocket:', e);
    });