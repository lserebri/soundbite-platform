import express from 'express';
import * as soundbiteController from '../controllers/soundbite.controller.js'

const router = express.Router();

router.post('/', soundbiteController.create);

export default router;