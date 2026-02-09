import { Router } from "express"
import Estate from"../models/Estate.js"
import Reviews from "../models/Rewies.js"
import mongoose from "mongoose"
import Users from "../models/Users.js"

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
router.get("/reviews", async (req, res) => {
    try {

        const reviews = await Reviews.find().populate("user");  

        if(reviews) {
            return res.json(reviews)
        }
    
     
    } catch (error) {
        console.log(error);
        
    }
})

export default router