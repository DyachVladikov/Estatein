import FAQ from "../models/FAQ.js";
import User from "../models/Users.js"

export const getFAQS = async (req, res) => {
    try {

        const faq = await FAQ.find().populate("author");  
        

        if(faq) {
            return res.json(faq)
        }
    
     
    } catch (error) {
        console.log(error);
        
    }
}