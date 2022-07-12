
import Joi from 'joi'
import Product from '../models/product.js'
import _ from 'underscore'
import { Op } from 'sequelize'

const index = async (r, w) => {

    try {

        const claims = r.claims

        const query = r.query

        let filters = {}

        if (_.size(query) > 0) {

            if (_.has(query, "name")) {
                filters.where = {
                    name: {
                        [Op.iLike]: `%${query.name}%`
                    }
                }
            }

            if (_.has(query, "sku")) {

                if (_.has(filters, "where")) {
                    filters.where.sku = {
                        [Op.iLike]: `%${query.sku}%`
                    }
                } else {
                    filters.where = {
                        sku: {
                            [Op.iLike]: `%${query.sku}%`
                        }
                    }
                }

            }

            if (_.has(query, "minprice")) {

                if (_.has(filters, "where")) {
                    filters.where.price = {
                        [Op.gte]: query.minprice
                    }
                } else {
                    filters.where = {
                        price: {
                            [Op.gte]: query.minprice
                        }
                    }
                }
                
            }

            if (_.has(query, "maxprice")) {

                if (_.has(filters, "where")) {
                    filters.where.price = {
                        [Op.lte]: query.maxprice
                    }
                } else {
                    filters.where = {
                        price: {
                            [Op.lte]: query.maxprice
                        }
                    }
                }

            }

            if(claims.role === 'SELLER') {

                if (_.has(filters, "where")) {
                    filters.where.userId = claims.id
                } else {
                    filters.where = {
                        userId: claims.id
                    }
                }
    
            }
    
            if(claims.role === 'ADMIN') {
    
                if (_.has(query, "userid")) {
                    
                    if (_.has(filters, "where")) {
                        filters.where.userId = query.userid
                    } else {
                        filters.where = {
                            userId: query.userid
                        }
                    }

                }
    
            }

        }

        const products = await Product.findAll(filters)

        return w.status(200).json({
            error: false,
            data: products,
            message: 'product list loaded successfully'
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

const store = async (r, w) => {

    try {

        const body = r.body
        const claims = r.claims

        const schema = Joi.object({
            name: Joi.string().required().min(2).max(100),
            sku: Joi.string().required().min(2).max(200),
            quantity: Joi.number().required(),
            price: Joi.number().required()
        })

        const values = await schema.validateAsync(body)

        const product = await Product.create({
            name: values.name,
            sku: values.sku,
            quantity: values.quantity,
            price: values.price,
            userId: claims.id
        })

        return w.status(200).json({
            error: false,
            data: product,
            message: 'product created successfully'
        })

    } catch (error) {
        return w.status(500).json({
            error: true,
            data: null,
            message: error
        })
    }
}

export {
    index,
    store
}