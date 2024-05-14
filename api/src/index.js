/* require('dotenv').config({path: '../../.env'}); */
import dotenv from "dotenv";
import connectDB from "./db/dbIndex.js";
import { app } from "./app.js";


dotenv.config({
    path: '../../env'
});

connectDB()
.then(() =>{
    app.listen(process.env.PORT || 5001, ()=>{
        console.log(`Server is running on ${process.env.PORT}`)
    });
})
.catch((error) =>{
    console.log('Mongo Db Connection failed!', error);
})