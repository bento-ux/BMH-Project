const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root', // Sesuaikan dengan username MySQL Anda
    password: '', // Sesuaikan dengan password MySQL Anda
    database: 'BC_EXPLORER_DB',
});

async function getDetailTokenProgram(tokenNameProgram) {
    try {
        // Query untuk mendapatkan data program berdasarkan nama program tertentu
        const programQueryData = `
            SELECT * 
            FROM tokenUmumTable 
            WHERE program = ? AND status=1;
        `;

        // Query untuk mendapatkan daftar tokenName dan total per tokenName, serta total keseluruhan amount
        const tokenListQuery = `
            SELECT 
                tokenName,
                SUM(amount) AS total_amount
            FROM 
                tokenUmumTable
            WHERE 
                program = ? AND status = 1
            GROUP BY 
                tokenName;
        `;

        const totalAmountQuery = `
            SELECT 
                SUM(amount) AS total_program_amount
            FROM 
                tokenUmumTable 
            WHERE 
                program = ? AND status = 1;
        `;

        // Eksekusi ketiga query
        const [programData] = await pool.execute(programQueryData, [tokenNameProgram]);
        const [tokenListData] = await pool.execute(tokenListQuery, [tokenNameProgram]);
        const [totalAmountData] = await pool.execute(totalAmountQuery, [tokenNameProgram]);

        // Gabungkan hasil dari ketiga query
        return {
            programData: programData,
            tokenList: tokenListData,                       // Daftar tokenName dan total per tokenName
            totalProgramAmount: totalAmountData[0].total_program_amount  // Total keseluruhan amount
        };
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

module.exports = { getDetailTokenProgram };
