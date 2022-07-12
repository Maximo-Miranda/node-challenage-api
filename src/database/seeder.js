import User from "../models/user.js";
import bcrypt from "bcrypt"

const run = async () => {

    const [user, created] = await User.findOrCreate({
        where: {
            email: 'admin@gmail.com',
        },
        defaults: {
            firstname: 'Developer',
            lastname: 'Admin',
            email: 'admin@gmail.com',
            password: bcrypt.hashSync('secret', 10),
            role: 'ADMIN'
        }
    })

    console.log('User ADMIN', user.email)

}

export default run