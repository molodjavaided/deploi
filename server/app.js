import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { productRouter } from './route/product.route.js'
import { authRouter } from './route/auth.route.js'
import { categoryRouter } from './route/category.route.js'
import { cartRouter } from './route/cart.route.js'

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use('/api/product', productRouter)
app.use('/api/auth', authRouter)
app.use('/api/category', categoryRouter)
app.use('/api/cart', cartRouter)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(process.env.PORT, () => console.log(`Сервер запущен на порту ${process.env.PORT}`));
    } catch (error) {
        console.log(error);

    }
}

start()