import { DataTypes, Model } from "sequelize"

export default (sequelize)=>{

class UserModel extends Model{
    static associate(models){
        UserModel.hasMany(models.Chat,{foreignKey:'userId'})
        UserModel.hasMany(models.Audit,{foreignKey:'userId'})
    }
    static checkPasswordLength(pass){
        if(pass.length>=8 && pass.length<64){
            return pass
        } else {
            return false
        }
    }
}

UserModel.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },userName:{
        type:DataTypes.STRING,
        allowNull:false
    },userEmail:{
        type:DataTypes.STRING
    },userPassword:{
        type:DataTypes.STRING
    },isActive:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    tableName:"users",
    underscored:true,
    timestamps:true,
    modelName:"User"
})
return UserModel
}
