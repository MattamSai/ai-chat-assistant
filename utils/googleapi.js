import { GoogleGenAI } from "@google/genai";
import { redis } from "./redis.js";
let userId={}
export async function oneHitPerMin (id,data) {
    let now = Date.now()
    const goggleAi = new GoogleGenAI({})
    if(!data){
        return {
            success:false,
            message:"data not found"
        }
    }

    if(data.length>1000){
        return res.status(400).json({
            success:false,
            message:"Input length is very high"
        }) 
    }

    let message= data.toLowerCase().replace(/[^\w\s]/gi,'').trim()
    let cacheData = await redis.get(message)


    if(cacheData){
        return {
            success:true,
            data:cacheData
        }
    }

    if(userId[id] && now-userId[id]<60000){
        return {
            success:false
        }
    }
    userId[id]=now

    const response = await goggleAi.models.generateContent({
        model:'gemini-2.5-flash',
        contents:[
            {
                parts:[{
                    text:data
                }]
            }
        ],
        generationConfig:{
            maxOutputTokens:100
        }
    })
    console.log("api called")
    await redis.set(message,response.text || "no response from ai",{EX:3600})
    return {
        success:true,
        data:response.text
    }    
}
