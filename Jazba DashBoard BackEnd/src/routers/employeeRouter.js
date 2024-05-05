import express from 'express';
import *as employeeController from '../controllers/employeeController.js'
import multer from 'multer';
import auth from '../../middlewares/auth.js';

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './images/employee_images')
    },
    filename: function (req, file, cb) {
        return cb(null, `${file.originalname}`)
    }
})
const upload = multer({ storage })

router.post("/", upload.single('employee_image'), employeeController.addEmployee);
router.get("/", employeeController.getAllEmployees);
router.get("/:name", employeeController.searchEmployeeByName);
router.delete("/",auth, employeeController.deleteAllEmployees);
router.delete("/:_id", employeeController.deleteEmployeeByID);
router.put("/:id", employeeController.updateEmployeeByID);

export default router

