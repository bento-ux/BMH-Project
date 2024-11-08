const { getDetailTokenProgram } = require('../../models/explorer/getDetailTokenProgram');


exports.handleGetDetailTokenProgramController  = async (req, res) => {
    const tokenName = req.query.tokenName;

    if (!tokenName) {
        return res.status(400).json({ error: 'Token Name is required' });
    }
        try {
            const result = await getDetailTokenProgram(tokenName);
            res.json(result);
        } catch (error) {
            console.error('Error fetching dat conterooa:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
}



