import express from 'express';
import equipementController from '../controllers/equipementController';
import validationMiddleware from '../validators/joi.validator';

const router = express.Router();

router.post('/newTool', (req, res, next) => validationMiddleware(req, res, next, 'tool'), equipementController.addTool);
router.get('/tools', (req, res, next) => validationMiddleware(req, res, next, 'listing'), equipementController.toolListing);
router.get('/:id', (req, res, next) => validationMiddleware(req, res, next, 'tool'), equipementController.getToolById);
router.put('/:id', (req, res, next) => validationMiddleware(req, res, next, 'tool'), equipementController.toolUpdate);
router.delete('/:id', equipementController.userDelete);

export default router;
