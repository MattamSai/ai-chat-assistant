import { Router } from "express";
import ChatController from "../controllers/chat.js";
import authenticate from "../utils/authenticate.js";

export const chatRoute = Router()

chatRoute.get("/",(req,res)=>{
    res.send("Welcome to Chat Routes")
})

chatRoute.post("/createChat",authenticate,ChatController.createChat)