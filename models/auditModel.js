import { DataTypes, Model } from "sequelize";

export default (sequelize)=>{
    class AuditModel extends Model{
        static associate(models){
            AuditModel.belongsTo(models.User,{foreignKey:'userId'})
        }
    }

    AuditModel.init({
        userId:{
            type:DataTypes.INTEGER
        },
        action:{
            type:DataTypes.STRING
        },
        description:{
            type:DataTypes.STRING
        },
        isActive:{
            type:DataTypes.INTEGER
        }
    },{
        sequelize,
        underscored:true,
        tableName:'audits',
        timestamps:true,
        modelName:'Audit'
    })
    return AuditModel
}