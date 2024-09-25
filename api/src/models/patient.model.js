import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    houseNo: { type: String, required: true },
    roadNo: { type: String, required: true },
    po: { type: String, required: true },
    ps: { type: String, required: true },
    district: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    homeNumber: { type: String, required: true }
});

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    sex: { type: String, required: true },
    dob: { type: Date, required: true },
    bloodGroup: { type: String, required: true },
    fatherMotherName: { type: String, required: true },
    maritalStatus: { type: String, required: true },
    email: { type: String, required: true },
    nationalId: { type: String },
    spouseName: { type: String },
    occupation: { type: String },
    religion: { type: String },
    nationality: { type: String },
    placeOfBirth: { type: String },
    passportNo: { type: String },
    language: { type: String },
    citizenship: { type: String },
    address: addressSchema
}, { timestamps: true });

export const Patient = mongoose.model('Patient', patientSchema);

