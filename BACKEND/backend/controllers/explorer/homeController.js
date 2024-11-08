const { getAllTokensAndPrograms } = require('../../models/explorer/getAllTokensAndPrograms');


exports.handleHomeController  = async (req, res) => {

        try {
            const result = await getAllTokensAndPrograms();
            res.json(result);
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
}



