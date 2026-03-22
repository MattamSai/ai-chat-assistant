import { DataTypes, Model } from "sequelize";

export default (sequelize)=>{
    class MessageModel extends Model {
        static associate(models){
            MessageModel.belongsTo(models.Chat,{foreignKey:'chatId'})
        }
    }

    MessageModel.init(
        {
            id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true,
                allowNull:false
            },message:{
                type:DataTypes.STRING,
                allowNull:false
            },role:{
                type:DataTypes.STRING
            },isActive:{
                type:DataTypes.INTEGER
            }
        },{
            sequelize,
            underscored:true,
            tableName:'messages',
            timestamps:true,
            modelName:'Message'
        }
    )
    return MessageModel
}