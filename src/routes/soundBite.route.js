import express from 'express';
import pkg from 'express-openid-connect';
import * as soundbiteController from '../controllers/soundbite.controller.js'

const router = express.Router();

const { requiresAuth } = pkg;

router.get('/', requiresAuth(), soundbiteController.getAll);
router.post('/', requiresAuth(), soundbiteController.create);
router.delete('/:id', requiresAuth(), soundbiteController.remove);

export default router;