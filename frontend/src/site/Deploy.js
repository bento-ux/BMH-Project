import React, { useState, useEffect } from 'react';
import {Web3} from 'web3';
import './css/deploy.css'

const MintingAndMultiSigManagerABI = [
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
const MintingAndMultiSigManagerContractAddress = "0xD8A31960472FC194d80324Bd3B62482bd1166ce4";


const DeployToken = () => {
	const [account, setAccount] = useState(null);
	const [status, setStatus] = useState("Metamask belum terhubung");
    const [tokenId, setTokenId] = useState("");
	const [tokenName, setTokenName] = useState(""); // State for token name
	const [tokenSymbol, setTokenSymbol] = useState(""); // State for token symbol
    const [signers, setSigners] = useState('');
    const [requiredSignatures, setRequiredSignatures] = useState(1);

    useEffect(() => {
		if (window.ethereum) {
			const web3 = new Web3(window.ethereum);
			window.ethereum.on('accountsChanged', (accounts) => {
				if (accounts.length > 0) {
					setAccount(accounts[0]);
					setStatus(`Terhubung sebagai: ${accounts[0]}`);
				} else {
					setAccount(null);
					setStatus("Belum terhubung");
				}
			});
		} else {
			setStatus("MetaMask belum terpasang!");
		}
	}, []);

    const connectToWallet = async () => {
		if (window.ethereum) {
			try {
				await window.ethereum.request({ method: 'eth_requestAccounts' });
				const web3 = new Web3(window.ethereum);
				const accounts = await web3.eth.getAccounts();
				setAccount(accounts[0]);
				setStatus(`Terhubung sebagai: ${accounts[0]}`);
			} catch (error) {
				console.error('Akses akun ditolak oleh pengguna', error);
			}
		} else {
			alert("MetaMask belum terpasang!");
		}
	};

    const createNewToken = async () => {
		if (!account) {
			alert("Silakan hubungkan dompet terlebih dahulu!");
			return;
		}

        const signerArray = signers.split(';').map(signer => signer.trim());
        console.log(signerArray);

		const web3 = new Web3(window.ethereum);
		const MintingAndMultiSigManager = new web3.eth.Contract(MintingAndMultiSigManagerABI, MintingAndMultiSigManagerContractAddress);
		console.log(typeof(tokenId))
		console.log(signerArray)
		console.log(requiredSignatures)
		console.log(tokenName)
		console.log(tokenSymbol)
		const tokenIdConvert = parseInt(tokenId)
		
		try {
			const gasPrice = await web3.eth.getGasPrice();

			const transaction = await MintingAndMultiSigManager.methods.createMultiSigAndToken(
                tokenIdConvert,
                signerArray,
                requiredSignatures,
                tokenName,
                tokenSymbol,
                0
			).send({ from: account, gasPrice });

            const tokenAddress = transaction.events.TokenCreated.returnValues.tokenAddress;  
			const multi_sig_wallet = transaction.events.NewMultiSigWallet.returnValues.walletAddress;  

            console.log(`token address: ${tokenAddress}`)
			console.log(`multi-sign-wallet address: ${multi_sig_wallet}`)

			alert(`Token berhasil dibuat dengan alamat: ${tokenAddress}`);
		} catch (error) {
			console.error('Error saat membuat transaksi:', error);
		}
	};

    return (
		<div>
			<div className='text-center m-3'>
				<h3>{status}</h3>
			</div>
			{!account && (
				<button className='buttonDeploy' onClick={connectToWallet}>Hubungkan MetaMask</button>
			)}
			{account && (
                
                <div className="form-wrapper">
                <h4>Masukkan detail token baru:</h4>

                <div className="form-group">
                    <label>ID Token:</label>
                    <input
                    type="text"
                    placeholder="ID Token"
                    value={tokenId}
                    onChange={(e) => setTokenId(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Nama Token:</label>
                    <input
                    type="text"
                    placeholder="Nama Token"
                    value={tokenName}
                    onChange={(e) => setTokenName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Simbol Token:</label>
                    <input
                    type="text"
                    placeholder="Simbol Token"
                    value={tokenSymbol}
                    onChange={(e) => setTokenSymbol(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Alamat Signer, pisahkan dengan titk koma (;):</label>
                    <input
                    type="text"
                    placeholder="Alamat Signer"
                    value={signers}
                    onChange={(e) => setSigners(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Required signature:</label>
                    <input
                    type="text"
                    placeholder="Required signature"
                    value={requiredSignatures}
                    onChange={(e) => setRequiredSignatures(e.target.value)}
                    />
                </div>

                <button className='buttonDeploy' onClick={createNewToken}>Deploy</button>
            </div>

              

			)}
		</div>
	);

};

export default DeployToken;