import  'dotenv/config'
import connectDB from './src/config/db.js';
import app from './src/app.js';

//PORT
const PORT = process.env.PORT1 || process.env.PORT2;

//connection db
await connectDB();


//http running 
app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});

