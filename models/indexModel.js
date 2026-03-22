import userModel from "./userModel.js";
import chatModel from "./chatModel.js";
import passwordHashModel from "./passwordHashModel.js";
import auditModel from "./auditModel.js";
import messageModel from "./messageModel.js";
import {sequelize} from "../configs/db.js"

let models ={}

const factors = [userModel,chatModel,passwordHashModel,auditModel,messageModel]

factors.forEach((factor)=>{
    const model = factor(sequelize)
    if(!model || !model.name){
        return console.log(`Model is not available for ${model}`)
    }
    // console.log('modelname',model.name)
    if(models[model.name]){
        return console.log(`Model has already beign cretaed ${model.name}`)
    }
    models[model.name]=model
})

// console.log('name',models.name)

Object.values(models).forEach((model)=>{
    if(model && model.associate){
        model.associate(models)
    }
})

export default models