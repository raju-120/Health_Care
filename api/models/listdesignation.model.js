import mongoose, { Schema } from "mongoose";

const designationListSchema = new Schema({
    departmentname:{
        type: Array,
        required: true,
    },
    designation :{
        type : Array,
        required: true,
    },
    instute : {
        type: Array,
        required: true,
    }
},{timestamps: true});

const listDesignaton = mongoose.model("ListDesignation", designationListSchema);
export default listDesignaton; 