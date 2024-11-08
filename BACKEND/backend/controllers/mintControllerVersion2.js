const {Web3} = require('web3');
const { ethers } = require("ethers");
const axios = require('axios');
const mysql = require('mysql2/promise');


const provider = new ethers.JsonRpcProvider("https://w3.e-asset.co");
const senderPrivateKey = "d0e5c78ef64dc204378f9ad1fc6a94d6beee45cd45d25188d8a3fb7f6bc6535d"; // Ganti dengan private key Anda
const wallet = new ethers.Wallet(senderPrivateKey, provider);

// ABI dari kontrak kamu
const contractAbi = [
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
const contractAddress = '0x31233a8C81d8F41550541A8c2475F84bde9f094f'; // Alamat kontrak


// Fungsi untuk mengirim transaksi mintTokens ke smart contract
exports.handleMintTokens = async (req, res) => {
    console.log("tes");
    const { id }  = req.params; // Mengambil id dari parameter URL
    const idParamUrl = parseInt(id) // di express akan dianggap string sehinga harus di konversi ke integer
    const {order: {invoice_number, amount} } = req.body; // Mengambil invoice_number dan amount dari request body
    
	// DEBUG
	// console.log(idParamUrl)
    // console.log(invoice_number)
    // console.log(amount)

    // Instance kontrak
    const contract = new ethers.Contract(contractAddress,contractAbi, wallet);

    // let invoice_number_data;
	let token_name;

	// Untuk DEBUG
    const listenToEvents = () => {
        contract.once('TokenUmumMinted', (tokenId, invoice_number, amount, getTokenName) => {
            console.log('Event TokenUmumMinted diterima:', { tokenId, invoice_number, amount, getTokenName });

            // Simpan hasil event ke variabel
            // invoice_number_data = invoice_number;
			if (getTokenName) {
				token_name = getTokenName;
			}
			// token_name = getTokenName;
        });
    };

    async function sendTransaction() {
        try {

            listenToEvents();



            const tx = await contract.mintTokens(idParamUrl, invoice_number, amount,{ // diambil dari post doku
                gasLimit: 570000, // 570000 jika geth // ganache: 6721975
                gasPrice: 1, // 1 jika geth // ganache: 20000000000
            });

			listenToEvents();

            console.log("Transaksi dikirim, hash:", tx.hash);

            // Tunggu transaksi selesai
            const receipt = await tx.wait();
            console.log("Transaksi berhasil:");

			if (receipt.events) {
				receipt.events.forEach((event) => {
					console.log('Event:', event);
				});
			} else {
				console.log('Tidak ada events pada receipt.');
			}


            // const tokenMintedEvent = receipt.events.find(event => event.event === 'TokenUmumMinted');
            const transaction_hash = tx.hash;
			// const getTokenName = tx.events.TokenUmumMinted.returnValues.getTokenName;
            const dataToSend = {
                invoice_number: invoice_number,
                transactionHash: transaction_hash
            }

            const sendWaNotification = await axios.post('https://uat-pay.bmh.or.id/api/v1/incoming/invoice',dataToSend);
			if (sendWaNotification.status === 200) {


				console.log(`isi response program ${sendWaNotification.data.program}`)
				const connection = await mysql.createConnection({
					host: 'localhost',      // Host default untuk XAMPP
					user: 'root',           // User default XAMPP
					password: '',           // Password default kosong (ganti jika Anda mengubahnya)
					database: 'BC_EXPLORER_DB', // Nama database yang Anda buat di phpMyAdmin
				});
				const dataToInsert = {
					txhash: transaction_hash,
					amount: amount,
					status: 0,
					invoice_number: invoice_number,
					txhashtokenprogram: 0,
					tglDisalurkan: null,
					tokenProgramId: idParamUrl,
					tokenName: token_name,
					program: sendWaNotification.data.program, // Dari response
					
			
				};



				const [result] = await connection.execute(
					`INSERT INTO tokenUmumTable (txhash, amount, status, invoice_number, txhashtokenprogram, tglDisalurkan, tokenProgramId, tokenName, program)
					 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
					[
						dataToInsert.txhash,
						dataToInsert.amount,
						dataToInsert.status,
						dataToInsert.invoice_number,
						dataToInsert.txhashtokenprogram,
						dataToInsert.tglDisalurkan,
						dataToInsert.tokenProgramId,
						dataToInsert.tokenName,
						dataToInsert.program
					]
				);
				console.log('Data berhasil disimpan ke database:', result);
				await connection.end();
				res.status(200).send()
			}else {
				console.log('Gagal mengirim notifikasi WA kesalahan di Laravel');

			}
			
            // console.log(`status dari wa notif ${sendWaNotification.status}`)
			// console.log(`isi response program ${sendWaNotification.data.program}`)
			// console.log(`status dari wa notif yang header ${sendWaNotification.data.response}`)


			// response ke doku
           


        } catch (error) {
            console.error("Terjadi kesalahan:", error);
        }
    }

   await sendTransaction();


};
