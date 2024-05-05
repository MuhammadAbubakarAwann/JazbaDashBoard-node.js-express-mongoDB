import { EmployeeModel } from '../models/employeeModel.js';
import { sendResponse } from '../utils/sendResponse.js';
import fs from 'fs';


export const addEmployee = async (req, res) => {

    const { employee_teamType } = req.body;

    if (!employee_teamType) {
        sendResponse(res, false, "Please select your team First", null, 403)
    }
    try {
        const employeeData = new EmployeeModel(req.body);
        employeeData.teamType = employee_teamType;

        if (req.file) {
            employeeData.employee_image = req.file.path;
        }
        await employeeData.save();
        const imageUrl = `http://localhost:3000/images/${req.file.filename}`;

        res.json({ success: true, message: "Employee Added Successfully.", imageUrl: imageUrl })
    } catch (error) {
        console.error(error);
        sendResponse(res, false, "Internal Server Error", null, 500)
    }

}

export const getAllEmployees = async (req, res) => {
    try {

        const employees = await EmployeeModel.find();

        sendResponse(res, true, "Employees retrieved successfully", employees );
    } catch (error) {
        console.error("Error in GET projects:", error);
        sendResponse(res, false, "Internal Server Error", null, 500);
    }
}

export const searchEmployeeByName = async (req, res) => {
    const employee_name = req.params.name;

    try {
        const employee = await EmployeeModel.findOne({ employee_name: employee_name });
        if (!employee) {
            sendResponse(res, false, "Employee not found", null, 404);
            return;
        }
        sendResponse(res, true, "Employee found : ", employee, 302);
    } catch (error) {
        console.error(error);
        sendResponse(res, false, "Internal Server Error", null, 500);
    }
}

export const deleteAllEmployees = async (req, res) => {
    try {
        const employees = await EmployeeModel.find({});
        employees.forEach(employee => {
            if (employee.employee_image && fs.existsSync(employee.employee_image)) {
                fs.unlinkSync(employee.employee_image);
            }
        });

        await EmployeeModel.deleteMany({});
        sendResponse(res, true, "Employees deleted Successfully.", null, 200);
    } catch (error) {
        console.log('Error Deleting Employees : ', error);
        sendResponse(res, false, "Internal Server Error.", null, 500);
    }
};

export const deleteEmployeeByID = async (req, res) => {
    const deleteEmployeeID = req.params._id
    try {
        const employee = await EmployeeModel.findOne({ _id: deleteEmployeeID });
        if (!employee) {
            throw new Error("Employee not found");
        }

        if (employee.employee_image && fs.existsSync(employee.employee_image)) {
            fs.unlinkSync(employee.employee_image);
        }

        await EmployeeModel.deleteOne({ _id: deleteEmployeeID });
        sendResponse(res, true, "Employee Deleted Successfully.", null, 200);
    } catch (error) {
        console.log(error);
        sendResponse(res, false, "Internal Server error", null, 500);
    }
};

export const updateEmployeeByID = async (req, res) => {
    const id = req.params.id;
    const updateData = {
        employee_name: req.body.employee_name,
        employee_designation: req.body.employee_designation,
        employee_phone: req.body.employee_phone,
        employee_bio: req.body.employee_bio,
        employee_teamType: req.body.employee_teamType,
        employee_image: req.body.employee_image,
    };

    try {
        const employee = await EmployeeModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!employee) {
            throw new Error("Employee not found");
        }
        else {
            sendResponse(res, true, "Employee Updated Successfully.", employee, 200);
        }

    } catch (err) {
        console.log(err);
        sendResponse(res, false, "Internal Server Error", null, 500);
    }
};


