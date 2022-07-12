import User from '../models/user.js'
import bcrypt from "bcrypt"
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import _ from 'underscore'

const login = async (r, w) => {

    try {

        const body = r.body

        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })

        const values = await schema.validateAsync(body)

        const user = await User.findOne({
            where: {
                email: values.email
            }
        })

        if (user === null) {
            return w.status(422).json({
                error: true,
                data: null,
                message: "invalid credentials"
            })
        }

        if (!bcrypt.compareSync(values.password, user.password)) {
            return w.status(400).json({
                error: true,
                data: null,
                message: 'invalid credentials'
            })
        }

        const claims = _.pick(user, ['id', 'firtname', 'lastname', 'email', 'role'])

        const token = jwt.sign(claims, process.env.APP_SECRET_KEY, { expiresIn: process.env.JWT_EXDATE });

        return w.status(200).json({
            error: false,
            data: {
                user: claims,
                token
            },
            message: null
        })

    } catch (error) {
        console.log(error)
        return w.status(500).json({
            error: true,
            data: null,
            message: error
        })
    }

}


const register = async (r, w) => {

    try {

        const body = r.body
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds);

        const schema = Joi.object({
            firstname: Joi.string().alphanum().min(3).max(30).required(),
            lastname: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            repeat_password: Joi.ref('password'),
            account_type: Joi.string().required().valid('BUYER', 'SELLER')
        }).with('password', 'repeat_password');

        const values = await schema.validateAsync(body)

        const validate = await validateExistEmail(values.email)
        if (validate) {
            return w.status(422).json({
                error: true,
                data: null,
                message: {
                    email: "email moust be unique"
                }
            })
        }

        const user = await User.create({
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: bcrypt.hashSync(values.password, salt),
            role: values.account_type
        })

        const data = _.pick(user, ['id', 'firstname', 'lastname', 'email', 'role', 'createdAt', 'updatedAt'])

        return w.status(200).json({
            error: false,
            data,
            message: 'user created successfully'
        })

    } catch (error) {
        return w.status(500).json({
            error: true,
            data: null,
            message: error
        })
    }

}

const validateExistEmail = async (value) => {

    const count = await User.count({
        where: {
            email: value
        }
    })

    if (count > 0) {
        return true
    }

    return false

}

export {
    login,
    register
}