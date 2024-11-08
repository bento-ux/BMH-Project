// database.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root', // sesuaikan dengan username MySQL Anda
    password: '', // sesuaikan dengan password MySQL Anda
    database: 'BC_EXPLORER_DB',
});

// Fungsi untuk mendapatkan jumlah total amount dan jumlah baris berdasarkan program dan tokenProgramId
async function getTotalAmountAndCountByProgram(tokenProgramId) {
    const query = `
        SELECT program, COUNT(*) as count, SUM(amount) as totalAmount
        FROM tokenUmumTable
        WHERE tokenProgramId = ?
        AND status = 0
        GROUP BY program
    `;
    const [rows] = await pool.execute(query, [tokenProgramId]);
    return rows;
}

module.exports = { getTotalAmountAndCountByProgram };
