import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './Database/dbConfig.js';
import authRoute from './Routes/user.router.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());


app.get("/",(req,res)=>{
    res.status(200).send("Hello World");
})

app.use("/api/auth",authRoute);


const port = process.env.PORT || 5000;


app.listen(port,()=>{
    console.log("Server started");
    
})

