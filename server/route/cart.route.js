import { Router } from "express";
import { isAuth } from "../middleware/isAuth.js";
import { Cart } from "../model/cart.model.js";
import { Product } from "../model/product.model.js";

export const cartRouter = Router()

// get cart

cartRouter.get('/', isAuth, async (req,res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user })

        if (!cart) {
            cart = await Cart.create({
                userId: req.user,
                items: []
            })
        }
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

// add item in cart

cartRouter.post('/items', isAuth, async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body

        if (!productId) {
            return res.status(400).json({ message: "ProductId required" })
        }

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        if (!product.inStock) {
            return res.status(400).json({ message: "Product is out stock" })
        }

        if (product.quantity < quantity) {
            return res.status(400).json({
                message: "Товара недостаточно на складе",
                available: product.quantity
            })
        }

        if (quantity < 1) {
            return res.status(400).json({ message: 'More than one is required' })
        }

        let cart = await Cart.findOne({ userId: req.user })
        if (!cart) {
            cart = new Cart({
                userId: req.user,
                items: []
            })
        }

        const existingItem = cart.items.findIndex(item => item.productId.toString() === productId.toString())

        if (existingItem !== -1) {
            cart.items[existingItem].quantity += quantity

            cart.items[existingItem].totalPrice = product.price * quantity

        } else {
            cart.items.push({
                productId,
                quantity,
                price: product.price,
                totalPrice: product.price * quantity,
                title: product.title,
                description: product.description || "",
                imageUrl: product.imageUrl || "",
                inStock: product.inStock
            })
        }

        await cart.save()

        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// change quantity item

cartRouter.patch('/items/:productId', isAuth, async (req,res) => {
    try {
        const { productId } = req.params
        const { quantity } = req.body

        if (!quantity && quantity !== 0) {
            return res.status(400).json({ message: 'Quantity required' })
        }
        if (quantity < 1) {
            return res.status(400).json({ message: 'More than one is required' })
        }

        const cart = await Cart.findOne({ userId: req.user })
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }

        const itemOnCartIndex = cart.items.findIndex(item => item.productId.toString() === productId.toString())

        if (itemOnCartIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' })
        }

        cart.items[itemOnCartIndex].quantity = quantity

        cart.items[itemOnCartIndex].totalPrice = cart.items[itemOnCartIndex].price * quantity

        await cart.save()

        res.status(200).json(cart)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// delete item from cart

cartRouter.delete('/items/:productId', isAuth, async (req,res) => {
    try {
        const { productId } = req.params
        const cart = await Cart.findOne({ userId: req.user })
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }
        cart.items = cart.items.filter(item => item.productId.toString() !== productId)
        await cart.save()
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
// clear cart
cartRouter.delete('/', isAuth, async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate(
            { userId: req.user },
            { items: [] },
            { new: true }
        )

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }

        res.status(200).json(cart)
    } catch (error) {
         res.status(500).json({ message: error.message })
    }
})

// availability items

cartRouter.get('/availability', isAuth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user })

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }

        if (cart.items.length === 0) {
            return res.status(200).json({ ok: true, message: "Empty cart", items: [], allAvailable: true })
        }

        const results = []
        let allAvailable = true

        for (const item of cart.items) {
            const product = await Product.findById(item.productId)

            if (!product) {
                results.push({
                    productId: item.productId,
                    title: item.title,
                    requested: item.quantity,
                    available: 0,
                    status: false
                })

                allAvailable = false
                continue
            }

            const available = product.quantity || 0
            const isAvailable = available >= item.quantity

            results.push({
              productId: product._id,
              title: product.title,
              requested: item.quantity,
              available: available,
              status: isAvailable
            })

            if (!isAvailable) {
              allAvailable = false
            }
        }

        res.status(200).json({
            ok: allAvailable,
            items: results,
            message: allAvailable ? 'All items available' : 'Some items not available'
        })
    } catch (error) {
         res.status(500).json({ message: error.message })
    }
})

// make order

cartRouter.post('/order', isAuth, async (req,res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user })


        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Корзина пуста" })
        }



        console.log(`Заказ оформлен!`);
        console.log('Детали заказа:');
        console.log('- Пользователь:', req.user);
        console.log('- Товаров в корзине:', cart.items.length);
        console.log('- Общая сумма:', cart.totalPrice);

        for (const item of cart.items) {
                await Product.findByIdAndUpdate(
                item.productId,
                { $inc: { quantity: -item.quantity } }
            )
        }

        await Cart.findOneAndUpdate(
            { userId: req.user },
            {
                items: [],
                totalPrice: 0,
                totalQuantity: 0
            }
        )

        res.status(200).json({
            success: true,
            message: 'Заказ успешно оформлен. Мы с вами свяжемся',
            order: {
                totalItems: cart.totalQuantity,
                totalPrice: cart.totalPrice,
                orderDate: new Date().toISOString()
            }
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})