const axios = require('axios');
const { getInvoiceNumberAndUpdate } = require('../models/getTxHashAndUpdateDistribution');

// Fungsi untuk menangani pengiriman notifikasi
async function handleSendDistributionController(txHashes, txHashDistribusi, signers) {
    for (const txHash of txHashes) {
        try {
            // Ambil invoice_number dan update status di database
            const { invoiceNumber } = await getInvoiceNumberAndUpdate(txHash, txHashDistribusi, signers);
            
            if (invoiceNumber) {
                // Kirim ke endpoint eksternal
                const response = await axios.post('https://uat-pay.bmh.or.id/api/v1/distribute/invoice', {
                    invoice_number : invoiceNumber,
                    transactionHash : txHash
                });
                console.log(`Notifikasi Distribusi terkirim untuk invoice: ${invoiceNumber}, txHash: ${txHash}`, response.data);
            } else {
                console.log(`Invoice number tidak ditemukan untuk txHash: ${txHash}`);
            }
        } catch (error) {
            console.error('Error dalam menangani notifikasi:', error);
        }
    }
}

module.exports = { handleSendDistributionController };
