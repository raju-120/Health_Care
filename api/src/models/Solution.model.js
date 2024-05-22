import mongoose, { Schema } from "mongoose";

const solutionSchema = new Schema({
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
    footer: {
        type: String
    },
});

const Solutions = mongoose.model('Solution', solutionSchema);

export default Solutions;