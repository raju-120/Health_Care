import mongoose, { Schema } from "mongoose";

const servicesSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    one: {
        type: String
    },
    two: {
        type: String
    },
    three: {
        type: String
    },
    four: {
        type: String
    },
    five: {
        type: String
    },
    six: {
        type: String
    },
    seven: {
        type: String
    },
    eight: {
        type: String
    },
    footer: {
        type: String
    },
});


const Services = mongoose.model('Services', servicesSchema);
export default Services;