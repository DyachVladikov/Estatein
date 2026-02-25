import Clients from "../models/Clients.js"

export const getClientCard = async (req, res) => {
    try {

        const Client = await Clients.find()
        

        if(Client) {
            return res.status(200).json(Client)
        }
    } catch (error) {
        return res.status(402).json({
            message: "Card didnt found",
            ok: 402,
        })
    }
}