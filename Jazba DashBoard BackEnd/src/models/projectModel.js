import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    projectName: { type: String },
    projectDescription: { type: String },
    projectImage: { type: String },
    projectType: { type: String },
});
const ProjectsModel = mongoose.model('Projects', projectSchema);

export { ProjectsModel };

