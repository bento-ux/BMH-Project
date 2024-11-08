const { getDetailTxHashCampaign } = require('../../models/explorer/getDetailTxHashCampaign');


exports.handleTxHashCampaginExplorerController  = async (req, res) => {
    const txHash = req.query.txHash;

        if (!txHash) {
            return res.status(400).json({ error: 'Tx Hash is required' });
        }

        try {
            const result = await getDetailTxHashCampaign(txHash);
            res.json(result);
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
}



