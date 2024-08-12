import mongoose, { Schema } from 'mongoose';

const departmentSchema = new Schema({
  deptname: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Department = mongoose.model('Department', departmentSchema);
