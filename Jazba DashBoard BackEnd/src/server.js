import express, { json } from 'express';
import mongoose from 'mongoose';
import projectsRouters from './routers/projectRouter.js';
import employeeRouter from './routers/employeeRouter.js'
import loginRouter from './routers/loginRouter.js'


import cors from 'cors';

const app = express();
const port = 3000;


app.use(cors());
app.use('/images', express.static('./images/employee_images'))
app.use('/images', express.static('./images/project_images'))


mongoose.connect("mongodb+srv://Abubakar:abubakar101@dashboard.mywc2st.mongodb.net", {
	dbName: "Jazba_Data",
}).then(() => {
	console.log("Database connected");
	app.use(express.urlencoded({ extended: true }));

	app.use(json())

	app.use('/api/projects', projectsRouters)
	app.use("/api/employees", employeeRouter);
    app.use("/api/login", loginRouter)
    

	app.listen(port, () => {
		console.log("App running at port: " + port);
	});
}).catch((err) => {
	console.log(err);
	console.log("Database can't be connected");
});




