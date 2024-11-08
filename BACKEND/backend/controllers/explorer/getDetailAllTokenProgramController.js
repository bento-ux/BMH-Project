const { getAllTokenProgram } = require('../../models/explorer/getAllTokenProgram');


exports.handleGetDetailAllTokenProgramController  = async (req, res) => {

        try {
            const result = await getAllTokenProgram();
            res.json(result);
        } catch (error) {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
}



