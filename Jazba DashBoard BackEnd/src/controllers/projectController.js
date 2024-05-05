import { ProjectsModel } from '../models/projectModel.js';
import { sendResponse } from '../utils/sendResponse.js';
import fs from 'fs'

export const addProject = async (req, res) => {
    const { projectType } = req.body;

    if (!projectType) {
        sendResponse(res, false, "No Project tye selected! Please select a project type...", null, 400)
    }
    try {
        const projectData = new ProjectsModel(req.body);
        projectData.projectType = projectType;

        if (req.file) {
            projectData.projectImage = req.file.path;
        }

        await projectData.save();

        sendResponse(res, true, "Project Added Successfully.", projectData, 200)
    } catch (error) {
        console.error(error);
        sendResponse(res, false, "Internal Server Error", 500)
    }

    console.log(req.body)
    console.log(req.file)
};

export const getAllProjects = async (req, res) => {
    try {
        const projects = await ProjectsModel.find();
        sendResponse(res, true, "Projects Retrived Successfully", projects, 200)

    } catch (error) {
        console.error("Error in GET projects:", error);
        sendResponse(res, false, "Internal Server Error", null, 500);
    }
};

export const searchProject = async (req, res) => {
    const projectId = req.params.id;
    try {
        const project = await ProjectsModel.findById(projectId);
        if (!project) {
            sendResponse(res, false, "Project not found", null, 404);
            return;
        }
        sendResponse(res, true, "Project retrieved successfully", project, 200);
    } catch (error) {
        console.error(error);
        sendResponse(res, false, "Internal Server Error", null, 500);
    }
};

export const deleteAllProjects = async (req, res) => {
    try {

        const projects = await ProjectsModel.find({})
        projects.forEach(projects => {
            if (projects.projectImage && fs.existsSync(projects.projectImage)) {
                fs.unlinkSync(projects.projectImage);
            }
        });

        await ProjectsModel.deleteMany({})
        sendResponse(res, true, "Projects deleted Successfully.", null, 200)
    }
    catch (error) {
        console.log('Error Deleting Projects ! ', error)
        sendResponse(res, false, "Internal Server Error.", null, 500)
    }

}

export const deleteProjectByID = async (req, res) => {
    const deleteProjectID = req.params._id
    try {

        const project = await ProjectsModel.findOne({ _id: deleteProjectID });
        if (!project) {
            throw new Error("project not found");
        }

        if (project.projectImage && fs.existsSync(project.projectImage)) {
            fs.unlinkSync(project.projectImage);
        }

        await ProjectsModel.deleteOne({ _id: deleteProjectID })
        sendResponse(res, true, "Project Deleted Successfully.", null, 200)
    } catch (error) {
        console.log(error)
        sendResponse(res, false, "Internal Server error", null, 500)

    }
}

export const updatePorjectByID = async (req, res) => {
    const id = req.params.id;
    const updateData = {
        projectName: req.body.projectName,
        projectDescription: req.body.projectDescription,
        projectImage: req.body.projectImage,
        projectType: req.body.projectType,
    };
    try {
        const project = await ProjectsModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!project) {
            throw new Error("Project not found");
        }
        else {
            sendResponse(res, true, "Project Updated Successfully.", project, 200);
        }

    } catch (err) {
        console.log(err);
        sendResponse(res, false, "Internal Server Error", null, 500);
    }
};

