import express, { type Request, type Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import currentUserRoutes from './routes/currentUser.routes';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
    console.log('Connected to db successfully')
})

const app = express();

app.use(express.json());
app.use(cors());

// Routes
// http://localhost:4041/api/v1
app.get('/', async (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to Royal Eats API. Connection is strong and healthy!'
    });
});
app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/users', userRoutes);
app.use('/api/v1/me', currentUserRoutes);

app.listen(4041, () => {
    console.log('Server started on http://localhost:4041')
})