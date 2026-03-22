import { DataTypes, Model } from "sequelize";

export default (sequelize)=>{

class ChatModel extends Model{
    static associate(models){
        ChatModel.belongsTo(models.User,{foreignKey:'userId'})

    }
}

ChatModel.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },title:{
            type:DataTypes.STRING
        },isActive:{
            type:DataTypes.INTEGER
        }
    },{
        sequelize,
        underscored:true,
        tableName:"chats",
        timestamps:true,
        modelName:"Chat"
    }
)

return ChatModel

}