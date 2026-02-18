import Estate from"../models/Estate.js"

export const  getCollection = async(req, res) => {
    try {
        const estate = await Estate.find()
            
        if(estate) {
            return res.json(estate)
        }

        } 
    catch (error) {
        return res.status(402).json({
            message: "Estate dont found",
            ok: 402,
        })
            
    }
}
export const getEstate = async(req, res) => {
    try 
    {
        const estateId = req.params.id;
    
        const estate = await Estate.findById(estateId)
            
            
        if(estate) {
            return res.json(estate)
        }
    } 

    catch (error) {
            return res.status(402).json({
            message: "Estate dont found",
            ok: 402,
        })
    }
}