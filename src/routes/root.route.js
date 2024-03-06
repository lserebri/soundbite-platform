import express from 'express';
import * as rootController from '../controllers/root.controller.js'

const router = express.Router();

router.get('/', rootController.authenticate);

export default router;