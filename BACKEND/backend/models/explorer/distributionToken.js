// const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root', // Sesuaikan dengan username MySQL Anda
//     password: '', // Sesuaikan dengan password MySQL Anda
//     database: 'BC_EXPLORER_DB',
// });

// async function distributionToken(txHash) {
//     try {

//         const programQueryData = `
//         SELECT * 
//         FROM tokenUmumTable 
//         WHERE txhashtokenprogram = ?;
//     `;

//         // Eksekusi kedua query
//         const [programData] = await pool.execute(programQueryData, [txHash]);

//         // Gabungkan hasil dari kedua query
//         return {programData: programData };
//     } catch (error) {
//         console.error('Database query error:', error);
//         throw error;
//     }
// }



// module.exports = { distributionToken };


const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root', // Sesuaikan dengan username MySQL Anda
    password: '', // Sesuaikan dengan password MySQL Anda
    database: 'BC_EXPLORER_DB',
});

async function distributionToken(txHash) {
    try {
        // Query untuk mendapatkan data program berdasarkan txHash
        const programQueryData = `
            SELECT * 
            FROM tokenUmumTable 
            WHERE txhashtokenprogram = ?;
        `;

        // Query untuk mendapatkan nama program dan total amount serta tanggal terakhir tglDisalurkan
        const additionalDataQuery = `
            SELECT 
            tokenName,
                program, 
                signers,
                SUM(amount) AS totalAmount, 
                MAX(tglDisalurkan) AS lastDistributionDate 
            FROM tokenUmumTable 
            WHERE txhashtokenprogram = ?;
        `;

        const [programData] = await pool.execute(programQueryData, [txHash]);
        const [additionalData] = await pool.execute(additionalDataQuery, [txHash]);

        // Gabungkan hasil dari kedua query
        return {
            programData: programData,
            additionalData: additionalData[0] // Karena ini hanya satu baris hasil
        };
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

module.exports = { distributionToken };

