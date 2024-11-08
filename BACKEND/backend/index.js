// server.js
const express = require('express');
// const mintController = require('./controllers/mintControllerVersion2');
const mintController = require('./controllers/mintController');
const getProgramTokenController = require('./controllers/getProgramTokenController');
// const sendDistributionController = require('./controllers/sendDistributionController');
const getTxHashCampaignController = require('./controllers/getTxHashCampaignController');
const {handleSendDistributionController} = require('./controllers/sendDistributionController')
const tesSendHttpNotif =  require('./controllers/tesSendHttpNotifController');

const app = express();
const port = 3001;
const cors = require('cors');


// Middleware untuk menangani request body dalam format JSON
app.use(express.json());
app.use(cors());

// Endpoint untuk menerima POST request dari DOKU
app.post('/tes-http-notif/mint', tesSendHttpNotif.handleTesSendHttpNotif);
app.post('/http-notif/mint/:id', mintController.handleMintTokens);
app.get('/get-program-token', getProgramTokenController.handleGetProgramTokenController);
app.post('/get-txhash-campaign', getTxHashCampaignController.handleGetTxHashCampaignController);

// app.post('/send-distribution', sendDistributionController.handleSendDistributionController);
app.post('/send-distribution', async (req, res) => {
    const { txHashes, txHashDistribusi, signers } = req.body; // Mengharapkan array txHashes

    if (!Array.isArray(txHashes) || txHashes.length === 0) {
        return res.status(400).send('txHashes is required and must be a non-empty array');
    }

    await handleSendDistributionController(txHashes, txHashDistribusi, signers); // Kirim array txHash ke fungsi handleNotifications
    res.send('Notifikasi diproses');
});


// Testing untuk kirim wa notif di internal
app.post('/send-notification', async (req, res) => {
    const { invoiceNumber, txHash } = req.body;

    // Logika untuk mengirim notifikasi WhatsApp menggunakan invoiceNumber
    try {
        // Simulasi pengiriman notifikasi
        console.log(`Notifikasi berhasil dikirim untuk invoice ${invoiceNumber} dengan txHash ${txHash}`);
        
        // Jika Anda menggunakan API untuk mengirim pesan, Anda bisa memanggil fungsi di sini
        // await sendWhatsAppNotification(invoiceNumber);

        res.status(200).send(`Notifikasi berhasil dikirim untuk invoice ${invoiceNumber}`);
    } catch (error) {
        console.error('Gagal mengirim notifikasi:', error);
        res.status(500).send('Gagal mengirim notifikasi');
    }
});

// Explorer

const HomeController = require('./controllers/explorer/homeController');
const txHashCampaginExplorerController = require('./controllers/explorer/txHashCampaginExplorerController');
const getAllTokenUmumController = require('./controllers/explorer/getAllTokenUmumController');
const getDetailTokenUmumController = require('./controllers/explorer/getDetailTokenUmumController');
const distributionTokenController = require('./controllers/explorer/distributionTokenController');
const getDetailTokenProgramController = require('./controllers/explorer/getDetailTokenProgramController');
const getDetailAllTokenProgramController = require('./controllers/explorer/getDetailAllTokenProgramController');



app.get('/explorer/home', HomeController.handleHomeController);
app.get('/explorer/tx-hash-campaign', txHashCampaginExplorerController.handleTxHashCampaginExplorerController);
app.get('/explorer/get-all-token-umum', getAllTokenUmumController.handleGetAllTokenUmumController);
app.get('/explorer/token-umum-detail', getDetailTokenUmumController.handeGetDetailTokenUmumController);
app.get('/explorer/distribution-token', distributionTokenController.handleDistributionTokenController);
app.get('/explorer/token-program-detail', getDetailTokenProgramController.handleGetDetailTokenProgramController);
app.get('/explorer/token-all-token-program', getDetailAllTokenProgramController.handleGetDetailAllTokenProgramController);





// Menjalankan server
app.listen(port, () => {
    console.log(`Server running at port${port}`);
});
