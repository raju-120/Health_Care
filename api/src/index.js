/* require('dotenv').config({path: '../../.env'}); */
import dotenv from "dotenv";
import connectDB from "./db/dbIndex.js";
import { app } from "./app.js";


dotenv.config({
    path: '../../env'
});

connectDB()
.then(() =>{
    app.listen(process.env.PORT || 5000, ()=>{
        console.log(`Server is running on ${process.env.PORT}`)
    });
})
.catch((error) =>{
    console.log('Mongo Db Connection failed!', error);
})












/* //effis collons

;( async() =>{
    try{
        await mongoose.connect(`${process.env.MONGODB}/${DB_NAME}`);
        app.listen(process.env.PORT, ()=>{
            console.log(`App is listening on ${process.env.PORT}`)
        })
    }catch(error){
        console.error("ERROR", error);
    }
})() */