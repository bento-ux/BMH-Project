// models/transactionModel.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root', // Sesuaikan dengan username MySQL Anda
    password: '', // Sesuaikan dengan password MySQL Anda
    database: 'BC_EXPLORER_DB',
});

// Fungsi untuk mendapatkan txhash berdasarkan tokenId dan program
async function getDetailTxHashCampaign(txHash) {
    try {
        const query = `
           SELECT * FROM tokenUmumTable WHERE txhash = ?
        `;
        const [rows] = await pool.execute(query, [txHash]);
        return rows;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

module.exports = { getDetailTxHashCampaign };
