import { Router } from 'express'
import { Product } from '../model/product.model.js';
import { isAuth } from '../middleware/isAuth.js';
import { isAdmin } from '../middleware/isAdmin.js';

export const productRouter = Router();


productRouter.get('/', async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({ products, message: 'success' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}) // all products

productRouter.get('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json({product, message: `This product ${id}`})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}) // by id


productRouter.post('/', isAuth, isAdmin, async (req, res) => {
    try {
        const productData = req.body;
        productData.inStock = productData.quantity > 0;

        const product = await Product.create(productData);

        res.status(201).json({ product, message: 'Created product' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}) // create

productRouter.patch('/:id', isAuth, isAdmin, async (req,res) => {
    try {
        const { id } = req.params;

        if (req.body.quantity !== undefined) {
            req.body.inStock = req.body.quantity > 0
        }

        const updateProduct = await Product.findByIdAndUpdate(
            { _id: id },
            req.body,
            { new: true },
        );
        res.status(200).json({ product: updateProduct, message: 'Product updated' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}) // update

productRouter.delete('/:id', isAuth, isAdmin, async (req,res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndDelete(id)
        res.status(200).json({ message: `Product ${id} delete` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}) // delete