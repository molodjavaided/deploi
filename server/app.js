import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import { productRouter } from './route/product.route.js'
import { authRouter } from './route/auth.route.js'
import { categoryRouter } from './route/category.route.js'
import { cartRouter } from './route/cart.route.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3001'],  // добавил localhost:3001
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());
//
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date(),
        message: 'Server is running',
        mongo: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});
//
app.use('/api/product', productRouter)
app.use('/api/auth', authRouter)
app.use('/api/category', categoryRouter)
app.use('/api/cart', cartRouter)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// SPA маршрутизация - для всех остальных маршрутов
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(process.env.PORT, () => console.log(`Сервер запущен на порту ${process.env.PORT}`));
    } catch (error) {
        console.log(error);

    }
}

start()