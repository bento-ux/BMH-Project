// models/transactionModel.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root', // Sesuaikan dengan username MySQL Anda
    password: '', // Sesuaikan dengan password MySQL Anda
    database: 'BC_EXPLORER_DB',
});

// Fungsi untuk mendapatkan txhash berdasarkan tokenId dan program
async function getTxHashesByTokenIdAndProgram(tokenId, tokenSymbol) {
    try {
        const query = `
            SELECT txhash FROM tokenUmumTable 
            WHERE tokenProgramId = ? AND program = ? AND status = 0
        `;
        const [rows] = await pool.execute(query, [tokenId, tokenSymbol]);
        return rows;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

module.exports = { getTxHashesByTokenIdAndProgram };
