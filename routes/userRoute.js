import { Router } from "express";
import { userRegister } from "../controllers/userRegister.js";
import { userLogin } from "../controllers/userLogin.js";
import authenticate from "../utils/authenticate.js";

export const userRoute = Router()

userRoute.get("/",(req,res)=>{
    res.send("Welcome to user routes")
})

userRoute.post('/registerUser',userRegister)
userRoute.post('/loginUser',userLogin)
userRoute.get('/home',authenticate,(req,res)=>{
    res.send("Welcome to new over")
})