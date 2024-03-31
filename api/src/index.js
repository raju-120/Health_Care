/* require('dotenv').config({path: '../../.env'}); */
import dotenv from "dotenv";
import connectDB from "./db/dbIndex.js";


dotenv.config({
    path: '../../env'
});

connectDB();












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