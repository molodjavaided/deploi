import { Router } from 'express'
import { User } from '../model/user.model.js';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const authRouter = Router();

// register
authRouter.post('/register', async (req,res) => {
    try {
        const { login, password } = req.body
        const existingUser = await User.findOne({ login })

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const hashedPassword = await bcryptjs.hash(password, 10)

        const user = await User.create({
            login,
            password: hashedPassword,
        })

        const token = await jwt.sign({ userId: user.user._id }, process.env.JWT_SECRET);

        res.cookie('token', token, { httpOnly: true })

        const { password: _, ...userData } = user.toObject();
        res.status(201).json({ userData, message: 'User created' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// login

authRouter.post('/login', async (req,res) => {
    try {
        const { login, password } = req.body;
        const existingUser = await User.findOne({ login })
        if (!existingUser) {
            return res.status(400).json({ message: "Authorization failed " })
        }

        const isMatch = await bcryptjs.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Authorization failed " })
        }

        const token = await jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
        );

        res.cookie('token', token, { httpOnly: true })

        const { password: _, ...userData } = existingUser.toObject();
        res.status(200).json({ userData, message: 'User logged in' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// logout
authRouter.post('/logout', async (req, res) => {
    try {
        // res.cookie('token', '', { httpOnly: true })
        res.clearCookie('token', { httpOnly: true });
        res.status(200).json({ message: "User logged out" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// me

authRouter.get('/me', async (req,res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'Авторизация не пройдена'})
        }

        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.userId);

        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' })
        }

        const userData = user.toJSON()

        // сюда

        res.status(200).json({ user: userData, message: 'User logged in' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// const { password: _, ...userData } = user.toObject();