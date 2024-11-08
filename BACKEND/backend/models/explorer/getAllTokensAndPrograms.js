const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'BC_EXPLORER_DB',
});

async function getAllTokensAndPrograms() {
  try {
    // Query untuk mendapatkan daftar tokenName beserta total amount per token
    const tokenListQuery = `
      SELECT tokenName, SUM(amount) AS total_amount
      FROM tokenUmumTable
      GROUP BY tokenName;
    `;

    // Query untuk mendapatkan daftar program beserta total amount per program
    const programListQuery = `
      SELECT program, SUM(amount) AS total_amount
      FROM tokenUmumTable
      GROUP BY program;
    `;

    const [tokenList] = await pool.execute(tokenListQuery);
    const [programList] = await pool.execute(programListQuery);

    return { tokenList, programList };
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

module.exports = { getAllTokensAndPrograms };
