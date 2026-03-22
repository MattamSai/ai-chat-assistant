import { Audit } from "../models/models.js"

export async function audit (userId,action,description,transaction){
    const auditData = await Audit.create({userId,action,description},{transaction})
    if(!auditData){
        return res.status(400).send({
            success:false,
            message:"failed to create audit data"
        })
    }
    return auditData
}