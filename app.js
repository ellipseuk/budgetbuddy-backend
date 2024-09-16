import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import userRoutes from './routes/user.js';
import transactionRoutes from './routes/transaction.js';
import categoriesRoutes from './routes/category.js';
import subcategoriesRoutes from './routes/subcategory.js';

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/subcategories', subcategoriesRoutes);

export default app;