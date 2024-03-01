import express from 'express';
import soundBiteController from '../controllers/soundBite.controller'

export const router = express.Router();

router.post('/', soundBiteController.create);