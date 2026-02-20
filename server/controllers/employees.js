import User from "../models/Users.js"

export const getEmployee = async (req, res) => {
    try {

        const Employee = await User.find({role: "employee"})
        

        if(Employee) {
            return res.status(200).json(Employee)
        }
    
     
    } catch (error) {
        return res.status(402).json({
            message: "Employee didnt found",
            ok: 402,
        })
    }
}