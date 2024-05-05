import mongoose from 'mongoose';

const employeeDetailSchema = new mongoose.Schema({
    employee_name: { type: String },
    employee_designation: { type: String },
    employee_phone: { type: Number },
    employee_bio: { type: String },
    employee_teamType: { type: String },
    employee_image: { type: String },
});
const EmployeeModel = mongoose.model('Employee_Details', employeeDetailSchema);

export { EmployeeModel }
    
