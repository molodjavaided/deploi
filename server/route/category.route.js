import { Router } from 'express'
import { Category } from '../model/category.model.js'
import { isAdmin } from '../middleware/isAdmin.js';

export const categoryRouter = Router()

// all categories
categoryRouter.get('/', async (req,res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// get category id

categoryRouter.get('/:id', async (req,res) => {
    try {
        const category = await Category.findById(req.params.id)

        if (!category) {
            return res.status(404).json({ message: "Category not found"})
        }

        res.status(200).json(category)
    } catch (error) {
         res.status(500).json({ message: error.message })
    }
});

// create category

categoryRouter.post('/', async (req, res) => {
    try {
        const { name } = req.body

        if (!name) {
            return res.status(400).json({ message: "Category name required" })
        }

        const category = await Category.create({
            name
        });

        res.status(201).json(category)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// update category

categoryRouter.patch('/:id', async (req,res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        }

        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// delete category

categoryRouter.delete('/:id', async (req,res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)

        if (!category) {
            return res.status(404).json({ message: "Category not found" })
        }

        res.status(200).json({ message: "Category delete" })
    } catch (error) {
         res.status(500).json({ message: error.message })
    }
})