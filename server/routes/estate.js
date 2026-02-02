import { Router } from "express"
import Estate from"../models/Estate.js"

const router = new Router()

router.get("/estate/properties/:id",async (req, res) => {
    try {
        const estateId = req.params.id;

        const estate = await Estate.findById(estateId)
        
        
        if(estate) {
            return res.json(estate)
        }
    } catch (error) {
        
    }
})

router.get("/estates",async (req, res) => {
    try {
        const estate = await Estate.find()
        
        if(estate) {
            return res.json(estate)
        }
    } catch (error) {
        
    }
})

export default router