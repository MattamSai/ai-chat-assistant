import { sequelize } from "../configs/db.js"
import { User } from "../models/models.js"
import bcrypt from "bcrypt"
import { audit } from "../utils/audit.js"
import {JWT} from "../utils/jwt.js"

export async function userLogin(req,res) {
    const {userEmail,userPassword}=req.body
    if(!userEmail || !userPassword){
        return res.status(400).send({
            success:false,
            message:'user details not found'
        })
    }
    let transaction=await sequelize.transaction()
    try {
        let user = await User.findOne({where:{userEmail},transaction})
        if(!user){
            return res.status(400).send({
                success:false,
                message:'user not available'
            })
        }
        let validatePassword = await bcrypt.compare(userPassword,user.userPassword)
        if(!validatePassword){
            return res.status(400).send({
                success:false,
                message:'Incorrect password'
            })
        }
        await audit(user.id,'LOGIN',`${user.id} has been loggedIn`,transaction)
        const token = JWT(user)
        if(!token){
            return res.status(400).send({
                success:false,
                message:"you invalid session"
            })
        }
        await transaction.commit()
        return res.status(200).send({
            success:true,
            data:user,
            token
        })
    } catch (error) {
        await transaction.rollback()
        return res.status(400).send({
            success:false,
            message:error.message
        })
    }
}