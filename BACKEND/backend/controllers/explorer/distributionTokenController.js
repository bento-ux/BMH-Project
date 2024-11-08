const { distributionToken } = require('../../models/explorer/distributionToken');


exports.handleDistributionTokenController  = async (req, res) => {
    const txHash = req.query.txHash;

        if (!txHash) {
            return res.status(400).json({ error: 'Tx Hash is required' });
        }

        try {
            const result = await distributionToken(txHash);
            res.json(result);
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
}



