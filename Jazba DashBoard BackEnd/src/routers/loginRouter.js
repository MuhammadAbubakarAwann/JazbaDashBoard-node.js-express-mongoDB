import express from 'express';
import * as loginController from '../controllers/loginController.js'

const router = express.Router();

router.post('/signup', loginController.signup)
router.post('/signin', loginController.signin)


export default router