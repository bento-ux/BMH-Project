const { getAllTokenUmum } = require('../../models/explorer/getAllTokenUmum');


exports.handleGetAllTokenUmumController  = async (req, res) => {

        try {
            const result = await getAllTokenUmum();
            res.json(result);
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
}



