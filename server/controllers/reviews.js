import Reviews from "../models/Reviews.js"
import User from "../models/Users.js"

export const getReviews = async (req, res) => {
    try {

        const reviews = await Reviews.find().populate("user");  
        

        if(reviews) {
            return res.json(reviews)
        }
    
     
    } catch (error) {
        console.log(error);
        
    }
}