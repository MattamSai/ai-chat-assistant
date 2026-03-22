import { sequelize } from "../configs/db.js"
import { User } from "../models/models.js"
import bcrypt from "bcrypt"
import { audit } from "../utils/audit.js"


export async function userRegister(req,res){
    // console.log(req)
    const {userName,userEmail,userPassword} = req.body
    if(!userName || !userEmail || !userPassword){
        return res.status(400).send({
            success:false,
            message:"user data not found"
        })
    }
    const userExist = await User.findOne({where:{userEmail}})
    if(userExist){
        return res.status(400).send({
            success:false,
            message:"User is already created"
        })
    }
    const validatePassword = await User.checkPasswordLength(userPassword)
    if(!validatePassword){
        return res.status(400).send({
            success:false,
            message:"password length should be atleast 8 letters"
        })
    }
    const hash = await bcrypt.hash(userPassword,10)
    if(!hash){
        return res.status(400).send({
            success:false,
            message:"failed to hash password"
        })
    }
    let transaction= await sequelize.transaction()
    try {
        const user = await User.create({userName,userEmail,userPassword:hash},{transaction})
        if(!user){
            return res.status(400).send({
                success:false,
                message:"user was not created"
            })
        }
        await audit(user.id,"Register",`User ${user.id} has been registered`,transaction)
        await transaction.commit()
        return res.status(200).send({
            success:true,
            data:user
        })
    } catch (error) {
        await transaction.rollback()
        throw new Error(error.message)
    }
    
}