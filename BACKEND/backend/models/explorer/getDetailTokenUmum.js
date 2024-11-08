const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', // Sesuaikan dengan username MySQL Anda
    password: '', // Sesuaikan dengan password MySQL Anda
    database: 'BC_EXPLORER_DB',
});

async function getDetailTokenUmum(tokenName) {
    try {
        // Query untuk mendapatkan totalAmount, currentToken, totalDistributed secara keseluruhan
        const query = `
            SELECT 
                tokenName,
                tokenUmumSymbol,
                SUM(amount) as totalAmount,
                SUM(CASE WHEN status = 0 THEN amount ELSE 0 END) as currentToken,
                SUM(CASE WHEN status = 1 THEN amount ELSE 0 END) as totalDistributed
            FROM 
                tokenUmumTable
            WHERE 
                tokenName = ?
        `;
        
        // Query untuk mendapatkan daftar program beserta jumlah amount per program (dengan status = 1)
        const programQuery = `
            SELECT 
                program,
                SUM(amount) as programTotalAmount
            FROM 
                tokenUmumTable
            WHERE 
                tokenName = ? AND status = 1
            GROUP BY 
                program
        `;

        const programQueryData = `
        SELECT * 
        FROM tokenUmumTable 
        WHERE tokenName = ?;
    `;

        // Eksekusi kedua query
        const [totalRows] = await pool.execute(query, [tokenName]);
        const [programRows] = await pool.execute(programQuery, [tokenName]);
        const [programData] = await pool.execute(programQueryData, [tokenName]);

        // Gabungkan hasil dari kedua query
        return { total: totalRows[0], programs: programRows,programData: programData };
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}



module.exports = { getDetailTokenUmum };

