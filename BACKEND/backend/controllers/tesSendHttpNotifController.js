

exports.handleTesSendHttpNotif = async (req, res) => {

    try {
        const {order: {invoice_number, amount} } = req.body;
        res.status(201).send();
        console.log("berhasil kirim response 201 ke Doku")
        console.log(`invoice number ${invoice_number} dan amount ${amount}`)
        
    } catch (error) {
        console.log("error mengirim response".error)
    }

}