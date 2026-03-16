import Orders from "../models/Orders.js"

export const  setOrders = async(req, res) => {
    try {
        const order = req.body

        const newOrder = new Orders({...order})
        await newOrder.save()
         
        return res.status(200).json({
            message: "Order sent successfully",
            ok: 200,
        })
        
    } 
    catch (error) {
    }
}