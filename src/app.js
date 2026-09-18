import  'dotenv/config'
import express from 'express'
const app = express();
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoute from './routes/user.route.js';
import categoryRoute from './routes/category.route.js';
import productRoute from './routes/product.route.js';
import reviewRoute from './routes/review.route.js';
import { authJwt } from './middleware/AuthMiddleware.js';


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());


//route'
app.use('/api/users', userRoute);
app.use('/api/categories',authJwt, categoryRoute);
app.use('/api/products',authJwt, productRoute);
app.use('/api/reviews',authJwt, reviewRoute)

export default app;

