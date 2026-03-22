import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";
configDotenv()

export const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DB_USER_NAME,
    process.env.DB_PASSWORD,
    {
        host:process.env.HOST,
        port:process.env.DB_PORT,
        dialect:'mysql'
    })
    
    try {
    await sequelize.authenticate()
    console.log("db connection succesfull")

    } catch (error) {
        console.log("failed to connect to db")
        throw new Error(error)
    }

