import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  houseNo: {
    type: String,
    required: true,
  },
  roadNo: {
    type: String,
    required: true,
  },
  po: {
    type: String,
    required: true,
  },
  ps: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  emergencyNumber: {
    type: String,
    required: true,
  },
});

const patientSchema = new mongoose.Schema(
  {
    uId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    // nationalId: {
    //   type: String,
    // },
    guardianName: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    /* placeOfBirth: {
      type: String,
      required: true,
    },
    passportNo: {
      type: String,
      required: true,
    }, */
    /*     language: {
      type: String,
    }, 
    citizenship: {
      type: String,
      required: true,
    },*/
    address: addressSchema,
  },
  { timestamps: true },
);

export const Patient = mongoose.model("Patient", patientSchema);
