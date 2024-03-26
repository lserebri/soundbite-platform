import express from 'express';
import * as userController from '../controllers/user.controller.js'
import pkg from 'express-openid-connect';

const router = express.Router();

const { requiresAuth } = pkg;

router.get('/', requiresAuth(), userController.getUser);

export default router;
