import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import snippetsRoutes from './routes/snippetsRoutes';
import { corsConfig } from './config/cors';

dotenv.config();

const app = express();

app.use(cors(corsConfig));

app.use(morgan('dev'));

app.use(express.json());

// Routes
app.use('/api/snippets', snippetsRoutes);

export default app;
