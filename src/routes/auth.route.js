import express from 'express';
import * as authController from '../controllers/auth.controller.js'

const router = express.Router();

router.get('/login', authController.login);

export default router;