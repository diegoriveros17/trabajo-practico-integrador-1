import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DIALECT
    }
)

const startDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(
            {
                // force: true 
            }
        )
        console.log(`Conexion a la BD establecida`)
    } catch (error) {
        console.error(`No se pudo conecta con la BD. Error: ${error}`)
    }
}
