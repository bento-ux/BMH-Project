import React, { useState, useEffect } from 'react';
import {Web3} from 'web3';
import './css/MintingMultiSig.css'
import axios from 'axios';

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


const MintingMultiSig = () => {
    const [account, setAccount] = useState(null);
	const [status, setStatus] = useState("Metamask belum terhubung");
    const [tokens, setTokens] = useState([]);
    const [tokenId, setTokenId] = useState('');
    const [tokenDetails, setTokenDetails] = useState({}); 
    const [tokenSignerAddrList, setTokenSignerAddrList] = useState([]);
    const [tokenBalance, setTokenBalance] = useState('');
    const [selectedDistributionTokenId, setSelectedDistributionTokenId] = useState('');

    // form distribusi
    const [amount, setAmount] = useState('');
    const [receipent, setRecepeint] = useState('');
    const [transactionNote, setTransactionNote] = useState('');

    const handleAmountChange = (e) => setAmount(e.target.value);
    const handleRecepeintChange = (e) => setRecepeint(e.target.value);
    const handleTransactionNoteChange = (e) => setTransactionNote(e.target.value);


	
    // form proposal
    const [pendingProposals, setPendingProposals] = useState([]);
	const [successProposals, setSuccessProposals] = useState([]);


    //execute proposal
    const [txIndexExecute, setTexIndexExecute] = useState(null);
    const handleTxIndexExecute = (e) => setTexIndexExecute(e.target.value);

	const [isClicked, setIsClicked] = useState(false);

	const [programData, setProgramData] = useState([]);


	const[tokenSymbol, setTokenSymbol] = useState('');



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

    // const fetchTokens = async () => {
    //     try {
    //         const web3 = new Web3(window.ethereum);
	// 	    const contract = new web3.eth.Contract(MintingAndMultiSigManagerABI, MintingAndMultiSigManagerContractAddress);
    //         const result = await contract.methods.getAllTokens().call();
    //         const ids = result[0];
    //         const names = result[1];
    //         if (Array.isArray(ids) && Array.isArray(names)) {
    //             const tokenData = ids.map((id, index) => ({ id, name: names[index] }));
    //             setTokens(tokenData);
    //         } else {
    //             console.error("Format data tidak sesuai, `ids` dan `names` bukan array:", ids, names);
    //         }
    //         console.log("Token data:", result);
    //     } catch (error) {
    //         console.error("Error fetching tokens:", error);
    //     }
    // };
   
    const web3 = new Web3(window.ethereum);
	const contract = new web3.eth.Contract(MintingAndMultiSigManagerABI, MintingAndMultiSigManagerContractAddress);
    

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const result = await contract.methods.getAllTokens().call();
                console.log("Token data:", result);

                // Ambil data ID dan nama dari hasil pemanggilan contract
                const ids = result[0];
                const names = result[1];

                if (true) {
                    const tokenData = ids.map((id, index) => ({ id: id.toString(), name: names[index] }));
                    setTokens(tokenData);
                } else {
                    console.error("Format data tidak sesuai, `ids` dan `names` bukan array:", ids, names);
                }
            } catch (error) {
                console.error("Error fetching tokens:", error);
            }
        };

        fetchTokens();
    }, []);
    // console.log(typeof(tokenId)) 

    const handleSelectChange = async (event) => {
        const selectedTokenId = event.target.value;
        setTokenId(selectedTokenId);
		console.log(selectedTokenId)

		// call axios untuk

        if (selectedTokenId) {
            // Panggil fungsi untuk mendapatkan detail token
            const details = await getDetailToken(selectedTokenId);
            console.log(details)
            setTokenDetails(details); // Simpan detail token di state
            setTokenSignerAddrList([])
            setTokenBalance('')

			try {
                // Memanggil API dengan axios
                const response = await axios.get('http://localhost:3001/get-program-token', {
                    params: { tokenProgramId: selectedTokenId }
                });
                console.log('Data dari database:', response.data);
				setProgramData(response.data);
                // setData(response.data); // Simpan data ke state jika perlu
            } catch (error) {
                console.error('Error fetching data:', error);
            }


        } else {
            setTokenDetails({}); // Reset jika tidak ada token yang dipilih
        }


    };

    const getDetailToken = async (id) => {
        try {
            const result = await contract.methods.getTokenDetails(id).call();
            // Mengembalikan objek dengan nama, simbol, dan total supply
            return {
                name: result[0],
                symbol: result[1],
                multiSigAddress: result[2],
                tokenAddress: result[3]
            };
        } catch (error) {
            console.error("Error fetching token details:", error);
            return {};
        }
    };

    const viewSigners = async () => {
        const tokenIdSig = tokenId;
		const result = await contract.methods.getSignersByTokenId(tokenIdSig).call();
        // console.log(result)
        setTokenSignerAddrList(result)
		console.log(`array signers ${tokenSignerAddrList}`);
        
	};

    const viewBalance = async () => {
        const tokenIdBalance = tokenId;
		const result = await contract.methods.getBalanceByTokenId(tokenIdBalance).call();
        setTokenBalance(result)
	};

    const handleSelectedDistributionToken = async (event) => {
        const tokenIdDistirbution = event.target.value;
        if (tokenIdDistirbution !== tokenId) {
            setSelectedDistributionTokenId(event.target.value);
			const details = await getDetailToken(tokenIdDistirbution);
			let tokenSymbolDistribution = details.symbol;
			setTokenSymbol(tokenSymbolDistribution)
          
        } else {
            alert("Token Distribusi tidak boleh sama dengan Token Umum.");
        }
    }

    const handleSuccessProposal = async () => {
		setIsClicked(true);
		try {
            const tokenIdUmumPendingProposal = tokenId;
            const result  = await contract.methods.getSuccessProposal(tokenIdUmumPendingProposal).call();
			const formattedProposals = result[0].map((note, index) => ({
				note,
				txIndex: result[1][index],
			}));
			console.log(formattedProposals)

        setSuccessProposals(formattedProposals);

        }catch (error) {
            console.error("Error fetching pending proposals:", error);
        }
    }

    const handlePendingProposal = async () => {
		setIsClicked(true);
        try {
            const tokenIdUmumPendingProposal = tokenId;
            const result  = await contract.methods.getPendingProposal(tokenIdUmumPendingProposal).call();
			const formattedProposals = result[0].map((note, index) => ({
				note,
				txIndex: result[1][index],
			}));
			console.log(formattedProposals)

        setPendingProposals(formattedProposals);

        }catch (error) {
            console.error("Error fetching pending proposals:", error);
        }

    }

    const handleCreateTransactionDistributionToken = async (e) => {
        e.preventDefault(); // Mencegah reload halaman saat form disubmit
		
        if (!account) {
			alert("Silakan hubungkan dompet terlebih dahulu!");
			return;
		}

		// DEBUG
        // console.log(amount);
        // console.log(receipent);
        // console.log(transactionNote);
        // console.log(`ID Token umum ${tokenId}`)
        // console.log(`ID Token Program ${selectedDistributionTokenId}`)

		// ambil semua txhash yang dimana nilai dari kolom tokenId pada table adalah dari variabel tokenId dan nilai pada kolom status adalah 0 dan nilai pada kolom Program dari variabel tokenProgram , gunakan axios post untuk mengirim nya


		console.log(`Ini token symbol distri ${tokenSymbol}`)
	

		try {	
			// let tokenId = 1;
			// let tokenSymbol = "TKQ";
			const response = await axios.post('http://localhost:3001/get-txhash-campaign', {
				tokenId,
				tokenSymbol
			});
			console.log('Response ambil tx hash campaign', response.data);
			const txHashData = response.data.map(item => item.txhash);
			// console.log(txHashData)

			const data = contract.methods.TransferDistributionTokens(txHashData,tokenId, selectedDistributionTokenId, amount, receipent).encodeABI();

			try {
				const gasPrice = await web3.eth.getGasPrice();

				const transaction = await contract.methods.createTransaction(
					tokenId,
					MintingAndMultiSigManagerContractAddress,
					0, // Tidak mengirim ETH
					data,
					transactionNote
				).send({ from: account, gasPrice });

			
				// DEBUG
			// const data = contract.methods.tesConfirm(tokenId).encodeABI();

			// try {
			// 	const gasPrice = await web3.eth.getGasPrice();

			// 	const tx = await contract.methods.createTransaction(
			//         tokenId,
			// 		MintingAndMultiSigManagerContractAddress,
			// 		0, // Tidak mengirim ETH
			// 		data,
			//         transactionNote
			//     ).send({ from: account, gasPrice });



				//  debug
				// const txIndex = tx.events.TransactionCreated.returnValues.txIndex;  
				// console.log(`Transaksi berhasil dibuat, txIndex:${txIndex}`);

			alert("Transaksi berhasil dibuat");
			// console.log(transaction)
			} catch (error) {
				console.error('Error saat membuat transaksi:', error);
			}

		} catch (error) {
			console.error('Error fetching transactions:', error);
		}

		
    };

    const handleExcuteProposal = async (e) => {
        e.preventDefault(); // Mencegah reload halaman saat form disubmit
        if (!account) {
			alert("Silakan hubungkan dompet terlebih dahulu!");
			return;
		}

        try {

            const gasPrice = await web3.eth.getGasPrice();
            const txIndexTest = parseInt(txIndexExecute)
            const tokenIdTest = parseInt(tokenId)
           

            const transaction = await contract.methods.confirmTransaction(tokenIdTest, txIndexTest).send({ from: account, gasPrice });

            alert("eksekusi berhasil")
			console.log(transaction)
            
        } catch (error) {
			const errorMessage = error.message || error.toString();
            
			if (errorMessage.includes("Not authorized: only owner")) {
				alert("Error: Anda bukan owner dari contract ini.");
			} else if (errorMessage.includes("Transaction does not exist")) {
				alert("Error: Transaksi tidak ditemukan.");
			} else if (errorMessage.includes("Transaction already executed")) {
				alert("Error: Transaksi sudah dieksekusi.");
			} else if (errorMessage.includes("Transaction already confirmed")) {
				alert("Error: Transaksi sudah dikonfirmasi.");
			} else {
				alert("Terjadi kesalahan yang tidak diketahui: " + errorMessage);
			}
	
			console.error("Error saat membuat transaksi:", errorMessage);
			}
          
    }

    return (
        <div>
			<div className='text-center m-3'>
				<h3>{status}</h3>
			</div>
            
			{!account && (
				<div className='text-center m-3'>
					<button className='btn btn-primary' onClick={connectToWallet}>Hubungkan MetaMask</button>
				</div>
			)}
            {account && (
                <div className="form-wrapper">

                    <div>
                        <label htmlFor="tokenSelect">Pilih Token:</label>
                        <select className="form-select" aria-label="Default select example" id="tokenSelect" value={tokenId} onChange={handleSelectChange}>
                            <option value="">Pilih Token</option>
                            {tokens.map((token) => (
                                <option key={token.id} value={token.id}>
                                    {token.id} - {token.name}
                                </option>
                            ))}
                        </select> 
                    </div>

                    <p>ID Token Terpilih: {tokenId}</p>
                    {/* Tampilkan detail token */}
                    {tokenDetails.name && (
                        <div>
                            <div className='text-center'>
                                <h4>Detail Token:</h4>
                                <br></br>
                                <p>Token Address: {tokenDetails.tokenAddress}</p>
                                {/* <p>Balance: {tokenDetails.balance.toString()}</p> */}
                                <p>Multi Signature Address: {tokenDetails.multiSigAddress}</p>
                                {/* <p>Signers: {tokenDetails.signers}</p> */}
                            </div>
                            <br></br>
                            <div className="row align-items-center">
                                <div className="col text-start ms-5">
                                    <span>Token Name: {tokenDetails.name}</span>
                                </div>
                                <div className="col text-end me-5">
                                    <span>Token Symbol: {tokenDetails.symbol}</span>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col d-flex justify-content-between align-items-start ms-5 me-5">
                                    <div className="text-start">
                                        <button className='btn btn-info' onClick={viewSigners}> View Signers</button>
                                        {/* Daftar Signer, tampilkan di bawah tombol tanpa mengubah perataan tombol */}
                                        {tokenSignerAddrList.length > 0 && (
                                            <ul className="mt-2">
                                                {tokenSignerAddrList.map((signer, index) => (
                                                    <li key={index}>{signer}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    <div className="text-end">
                                        <button className='btn btn-secondary' onClick={viewBalance}> View Balance</button>
                                        <p>Balance: {tokenBalance.toString()} {tokenDetails.symbol}</p>
                                    </div>
                                </div>
                            </div>

                            <hr></hr>
                            <div className="row mt-4">
                                <div className='col-sm-8'>
                                    <h3 className='text-center'>Distribution Token</h3>
                                    <label htmlFor="tokenSelect">Pilih Token:</label>
                                    <select className="form-select" aria-label="Default select example" id="tokenSelect" value={selectedDistributionTokenId} onChange={handleSelectedDistributionToken}>
                                        <option value="">Pilih Token Distribution</option>
                                        {tokens.map((token) => (
                                            <option key={token.id} value={token.id}>
                                                {token.id} - {token.name}
                                            </option>
                                        ))}
                                    </select>
                                    <form onSubmit={handleCreateTransactionDistributionToken}>
                                        <label for="amountToken" className="form-label mt-2">Amount</label>
                                        <input type="number" className="form-control" id="amountToken" placeholder='Amount Token' value={amount} onChange={handleAmountChange}/>

                                        <label for="receipentToken" className="form-label mt-2">Receipent</label>
                                        <input type="text" className="form-control" id="receipentToken" placeholder="Ethereuem Address Account" value={receipent} onChange={handleRecepeintChange} />
                                        <label for="transactionNote" className="form-label mt-2">Transaction Note</label>
                                        <textarea className="form-control" id="transactionNote" rows="4" placeholder="Transaction Note"  value={transactionNote} onChange={handleTransactionNoteChange}></textarea>

                                        <div className='text-center d-grid gap-2 col-4 mx-auto'>
                                            <button className='btn btn-secondary mt-4' > Send </button>
                                        </div>   
                                    </form>
                                </div>
                                <div className='col-sm-4 text-center'>
								{programData.length > 0 ? (
									<div>
										<h4>Data Program</h4>
										<ul className="list-group">
											{programData.map((item, index) => (
												<li key={index} className="list-group-item">
													<strong>Program:</strong> {item.program}<br />
													<strong>Total Amount:</strong> {item.totalAmount}<br />
													<strong>Jumlah Campign:</strong> {item.count}
												</li>
											))}
										</ul>
									</div>
								) : (
									<p>Tidak ada data program untuk token yang dipilih.</p>
								)}
							</div>

                            </div>
                            <hr className='mt-5'></hr>
                            <div className='row mt-'>
                                <div className='col-sm-4 text-center'>
                                    <button className='btn btn-secondary' onClick={handlePendingProposal}> Pending Proposal </button>
                                    <div className='mt-4 text-start'>
										{isClicked && (pendingProposals.length > 0 ? (
                                            <ul className="list-group">
                                                {pendingProposals.map((proposal, index) => (
                                                    <li key={index} className="list-group-item">
                                                        <strong className='text-start'>Tx Index:</strong> {proposal.txIndex.toString()}<br />
                                                        <strong className='text-start'>Transaction Note:</strong><small> {proposal.note}</small>
                                                    </li>
                                                ))}
                                            </ul>
											) : (
											<p>Tidak ada transaksi</p>
										))}
                                    </div>
                                </div>
                                <div className='col-sm-4 text-center'>
                                    <form onSubmit={handleExcuteProposal}>
                                        <input type="number" class="form-control"  placeholder="Input transaction index" value={txIndexExecute} onChange={handleTxIndexExecute}/>
                                        <button className='btn btn-secondary mt-3'> Execute Proposal </button>
                                    </form>
                                </div>
                                <div className='col-sm-4 text-center'>
                                    <button className='btn btn-secondary' onClick={handleSuccessProposal}> Success Proposal </button>
									<div className='mt-4 text-start'>
										{isClicked && (successProposals.length > 0 ? (
                                            <ul className="list-group">
                                                {successProposals.map((proposal, index) => (
                                                    <li key={index} className="list-group-item">
                                                        <strong className='text-start'>Tx Index:</strong> {proposal.txIndex.toString()}<br />
                                                        <strong className='text-start'>Transaction Note:</strong> <small> {proposal.note}</small>
                                                    </li>
                                                ))}
                                            </ul> 
											) : (
												<p>Tidak ada transaksi</p>
										))}                                      
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}

                    
                </div>
                )}
        </div>
    );

}

export default MintingMultiSig;