import { Sequelize } from "sequelize";

// Database instance
const instance = () => {

    try {

        let sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: './database.sqlite'
        });

        if (process.env.NODE_ENV != 'development' && process.env.NODE_ENV != undefined) {
            sequelize = new Sequelize(process.env.DBURL)
        }

        return sequelize

      } catch (error) {
        console.error('Unable to connect to the database:', error)
      }

}

const sequelize = instance()

export default sequelize
