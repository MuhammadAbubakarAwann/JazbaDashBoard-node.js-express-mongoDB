import express from 'express';
import *as projectController from '../controllers/projectController.js'
import multer from 'multer';

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './images/project_images')
    },
    filename: function (req, file, cb) {
        return cb(null, `${file.originalname}`)
    }
})
const upload = multer({ storage })

router.post("/",upload.single('projectImage'), projectController.addProject);
router.get("/", projectController.getAllProjects); 
router.get("/:id", projectController.searchProject);
router.delete("/", projectController.deleteAllProjects);
router.delete("/:_id",projectController.deleteProjectByID)
router.put("/:id", projectController.updatePorjectByID);

export default router

