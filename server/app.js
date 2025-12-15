import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { productRouter } from './route/product.route.js'
import { authRouter } from './route/auth.route.js'
import { categoryRouter } from './route/category.route.js'
import { cartRouter } from './route/cart.route.js'

import { fileURLToPath } from 'url'
import { join, dirname } from 'path'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config();
const app = express();

const PORT = process.env.PORT

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use(express.static(join(__dirname, 'dist')))

app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.use('/api/product', productRouter)
app.use('/api/auth', authRouter)
app.use('/api/category', categoryRouter)
app.use('/api/cart', cartRouter)



const start = async () => {
    try {
        const mongoUser = process.env.MONGO_USER;
        const mongoPassword = process.env.MONGO_PASSWORD;
        const mongoDb = process.env.MONGO_DB;
        const mongoHost = process.env.MONGO_HOST;

        const mongoUri = `mongodb://user:mongopass@${mongoHost}:27017/${mongoDb}?authSource=admin`

        await mongoose.connect(mongoUri);
        console.log('connect MongoDB');

        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start()
