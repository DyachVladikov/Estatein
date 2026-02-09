import Estate from"../models/Estate.js"

export const  getCollection = async(req, res) => {
    try {
        const estate = await Estate.find()
            
        if(estate) {
            return res.json(estate)
        }

        } 
    catch (error) {
            
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
            
    }
}