const { getTxHashesByTokenIdAndProgram } = require('../models/getTxHashCampaign');


exports.handleGetTxHashCampaignController  = async (req, res) => {
    const { tokenId, tokenSymbol } = req.body;
    console.log(tokenId)
    console.log(tokenSymbol)
        try {
            const txhashes = await getTxHashesByTokenIdAndProgram(tokenId, tokenSymbol);
            res.json(txhashes);
            // console.log(res.json(txhashes));
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
}
