import { sequelize } from "../configs/db.js";
import { Chat, Message, User } from "../models/models.js";
import { audit } from "../utils/audit.js";
import { oneHitPerMin } from "../utils/googleapi.js";


export default class ChatController {
    static async getChats(userId){
        let loggedInUser = req.user
        let transaction= await sequelize.transaction()
        try {
            const userChats = await Chat.findOne({where:{userId},transaction})
            if(!userChats){
                return res.status(400).json({
                    success:false,
                    message:"User chat not found"
                })
            }
            await audit(loggedInUser.id,'GET USER Chats',`${loggedInUser.id} has requested chats of ${userId}`)
            await transaction.commit()
        } catch (error) {
            await transaction.rollback()
            return res.status(400).json({
                success:false,
                error:error.message
            })
        }   
    }

    static async getAllCharts(){
        let loggedInUser = req.user
        let transaction= await sequelize.transaction()
        try {
            const allChats = await Chat.findAll({transaction})
            if(!allChats){
                return res.status(400).json({
                    success:false,
                    message:"chats not found"
                })
            }
            await audit(loggedInUser.id,'GET ALL USERS Chats',`${loggedInUser.id} has requested chats of all users`)
            await transaction.commit()
        } catch (error) {
            await transaction.rollback()
            return res.status(400).json({
                success:false,
                error:error.message
            })
        }  
    }

    static async createChat(req,res) {
        const user = req.user
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }
        const {title,message} = req.body
        if(!message){
            return res.status(400).json({
                success:false,
                message:"data not found"
            })
        }
        let transaction = await sequelize.transaction()
        try {
            let chat =await Chat.create({userId:user.id,title,transaction})
            await Message.create({chatId:chat.id,message,role:"user",transaction})
            const response = await oneHitPerMin(user.id,message)
            if(!response.success){
                return res.status(400).json({
                    success:false,
                    message:"you can only send one request in a minute"
                })
            }
            await Message.create({chatId:chat.id,message:response.data,role:"ai",transaction})
            await transaction.commit()
            return res.status(200).json({
                success:true,
                data:chat
            })
        } catch (error) {
            await transaction.rollback()
            throw new Error(error.message)
        }
    }
}