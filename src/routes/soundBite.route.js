import express from 'express';
import * as soundBiteController from '../controllers/soundBite.controller.js'

const router = express.Router();

router.post('/', soundBiteController.create);

export default router;