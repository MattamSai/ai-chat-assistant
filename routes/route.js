import { Router } from "express";
import { userRoute } from "./userRoute.js";
import { chatRoute } from "./chatRoute.js";

export const route = Router()

route.use(userRoute)
route.use("/chat",chatRoute)