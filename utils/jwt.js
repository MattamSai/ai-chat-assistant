import jwt from "jsonwebtoken"

export const JWT=(data)=>{
    const  token = jwt.sign({data},process.env.SECRET_KEY,{expiresIn:'8h'})
    return token
}

export const verifyJWT=(token)=>{
    const verify = jwt.verify(token,process.env.SECRET_KEY)
    if(!verify){
        return resizeBy.status(400).send({
            success:false,
            message:"JWT token is not valid"
        })
    }
    return verify
}