import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import testRoutes from './routes/testRoutes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

// app.set('view engine', 'ejs');
// app.set('views', './views');

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', testRoutes);

export default app;