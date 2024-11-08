// models/transactionModel.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Sesuaikan dengan username MySQL Anda
    password: '', // Sesuaikan dengan password MySQL Anda
    database: 'BC_EXPLORER_DB',
});

// Fungsi untuk mendapatkan txhash berdasarkan tokenId dan program
async function getAllTokenUmum() {
    try {
        const query = `
           SELECT tokenName, SUM(amount) as totalAmount
           FROM tokenUmumTable
           GROUP BY tokenName`;
        const [rows] = await pool.execute(query);
        return rows;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

module.exports = { getAllTokenUmum };
