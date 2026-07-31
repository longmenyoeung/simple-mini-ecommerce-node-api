import dotenv from 'dotenv/config'
import express from 'express'
import connectDB from './src/config/db.js';
const app = express();
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoute from './src/routes/user.route.js';

//PORT
const PORT = process.env.PORT1 || process.env.PORT2;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
app.use(morgan('combined'));
app.use(helmet());
//connection db
await connectDB();

//route'
app.use('/api/users', userRoute);

//http running 
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})

