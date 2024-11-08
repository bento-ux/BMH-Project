const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root', // Sesuaikan dengan username MySQL Anda
    password: '', // Sesuaikan dengan password MySQL Anda
    database: 'BC_EXPLORER_DB',
});

// Fungsi untuk mendapatkan invoice_number dan melakukan update
async function getInvoiceNumberAndUpdate(txHash, txHashDistribusi, signers) {
    const querySelect = `
        SELECT invoice_number FROM tokenUmumTable WHERE txhash = ?
    `;
    const queryUpdate = `
        UPDATE tokenUmumTable SET status = 1, txhashtokenprogram = ?, tglDisalurkan = NOW(), signers = ? WHERE txhash = ?
    `;
    
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.execute(querySelect, [txHash]);
        
        if (rows.length > 0) {
            const invoiceNumber = rows[0].invoice_number;
            // Update status dan kolom lainnya
            await connection.execute(queryUpdate, [txHashDistribusi,JSON.stringify(signers), txHash]);
            return { invoiceNumber };
        } else {
            return null; // Tidak ditemukan
        }
    } catch (error) {
        console.error('Error dalam query:', error);
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = { getInvoiceNumberAndUpdate };
