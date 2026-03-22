import { DataTypes, Model } from "sequelize";

export default (sequelize)=>{
    class PasswordHashModel extends Model{
        static associations(models){
            PasswordHashModel.belongsTo(models.userModel,{foreignKey:'userId'})
        }
    }

    PasswordHashModel.init({
        passwordHash:{
            type:DataTypes.STRING
        },
        isActive:{
            type:DataTypes.INTEGER
        },
        createdBy:{
            type:DataTypes.INTEGER
        },
        updatedBy:{
            type:DataTypes.INTEGER
        }
    },{
        sequelize,
        timestamps:true,
        underscored:true,
        tableName:'password_history',
        modelName:'Password'
    })

    return PasswordHashModel
}