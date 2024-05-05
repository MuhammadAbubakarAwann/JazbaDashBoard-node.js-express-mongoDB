import jwt from 'jsonwebtoken'
import { sendResponse } from '../src/utils/sendResponse.js';


const SECRET_KEY = "NOTESAPI";

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
            req.userRole = user.role;
            console.log("role: ", req.userRole);

            if (req.userRole === 'admin') {
                next();
            } else {
               
                return res.status(403).json({ status: false, message: "You are not authorized to access this resource" })
            }
        } else {
             res.status(401).json({ status: false, message: "Unauthorized user" })


        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ status: false, message: "Unauthorized user" })

        
    }
}

export default auth;
