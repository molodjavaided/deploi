import express from 'express'

const router = express.Router({ mergeParams: true })

router.use('/api/product', productRouter)
router.use('/api/auth', authRouter)
router.use('/api/category', categoryRouter)
router.use('/api/cart', cartRouter)