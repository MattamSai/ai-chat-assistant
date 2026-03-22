import {verifyJWT} from "../utils/jwt.js"

export default function authenticate(req,res,next){
    if(!req.headers.authorization){
        return res.status(400).send({
            success:false,
            message:"token is not available in header"
        })
    }
    const token = req.headers.authorization.split(" ")[1]
    const verify = verifyJWT(token)
    req.user=verify.data
    next()
}