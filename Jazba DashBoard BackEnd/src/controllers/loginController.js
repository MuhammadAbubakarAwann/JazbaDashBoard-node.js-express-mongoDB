import { LoginModel } from "../models/loginModel.js";
import { sendResponse } from "../utils/sendResponse.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET_KEY = "NOTESAPI";

export const signup = async (req, res) => {

    const { userName, userPassword, userEmail, role } = req.body;
    try {
        const existingUser = await LoginModel.findOne({ userEmail: userEmail })
        if (existingUser) {
            sendResponse(res, false, " User already Existes", null, 400)
            return
        }
        console.log("password: ", userPassword)
        console.log("name: ", userName)
        console.log("email: ", userEmail)
        console.log("role: ", role)

        const hasherPassword = await bcrypt.hash(userPassword, 10)
        const result = await LoginModel.create({
            userEmail: userEmail,
            userPassword: hasherPassword,
            userName: userName,
            role: role,
        })

        const token = jwt.sign({ userEmail: result.userEmail, id: result.id }, SECRET_KEY);
        sendResponse(res, true, "You are registered successfully", result, 200, token);

    } catch (error) {
        console.error(error);
        sendResponse(res, false, "Internal Server Error", null, 500);
    }
}

export const signin = async (req, res) => {
    const { userEmail, userPassword } = req.body;

    try {
        const existingUser = await LoginModel.findOne({ userEmail: userEmail });
        if (!existingUser) {
            return sendResponse(res, false, "User not found", null, 404, null);
        }

        const matchPassword = await bcrypt.compare(userPassword, existingUser.userPassword);
        if (!matchPassword) {
            return sendResponse(res, false, "Invalid password!", null, 404, null);
        }

        const userRole = existingUser.role;
        const token = jwt.sign({ userEmail: existingUser.userEmail, id: existingUser._id, role: userRole }, SECRET_KEY, { expiresIn: '1h' });

        sendResponse(res, true, "Login successfull.", existingUser, 200, token);

    } catch (error) {
        console.error(error);
        sendResponse(res, false, "Something went wrong", null, 500, null);
    }
};
