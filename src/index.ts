import 'dotenv/config';
import express, { NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import currentUserRoutes from './routes/currentUser.routes';
import errorHandler from './middleware/errorHandler';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log('Connected to db successfully');
});

const app = express();

app.use(express.json());

// Routes
// http://localhost:4041/api/v1/
app.get('/api/v1/', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    status: '200 - OK',
    message: 'Welcome to Royal Eats API. Connection is strong and healthy!',
  });
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/current-user', currentUserRoutes);
// app.use('/api/v1/users', userRoutes);

app.use(errorHandler);

app.listen(4041, () => {
  console.log('Server started on http://localhost:4041');
});
