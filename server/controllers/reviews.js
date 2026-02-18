import Reviews from "../models/Reviews.js"
import User from "../models/Users.js"

export const getReviews = async (req, res) => {
    try {

        const reviews = await Reviews.find().populate("user");  
        
        if(reviews) {
            return res.json(reviews)
        }

        return res.status(200).json({
            message: "Review finded",
            ok: 200,
        })
    
     
    } catch (error) {

        return res.status(402).json({
            message: "Review didnt found",
            ok: 402,
        })
        
    }
}