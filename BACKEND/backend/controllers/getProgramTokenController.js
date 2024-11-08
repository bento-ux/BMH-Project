const { getTotalAmountAndCountByProgram } = require('../models/getProgram');


exports.handleGetProgramTokenController  = async (req, res) => {
    const tokenProgramId = req.query.tokenProgramId;

        if (!tokenProgramId) {
            return res.status(400).json({ error: 'Token Program ID is required' });
        }

        try {
            const result = await getTotalAmountAndCountByProgram(tokenProgramId);
            res.json(result);
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
}

