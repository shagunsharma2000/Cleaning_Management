import express from 'express';
import equipementController from '../controllers/equipementController';
import validationMiddleware from '../validators/joi.validator';

const router = express.Router();

//create a new Tool
router.post('/tool', (req, res, next) => validationMiddleware(req, res, next, 'tool'), equipementController.addTool);

//list all tools
router.get('/tools', (req, res, next) => validationMiddleware(req, res, next, 'listing'), equipementController.toolListing);

//get the specific tool
router.get('/:id', equipementController.getToolById);

//update the data for a specific tool
router.put('/:id', (req, res, next) => validationMiddleware(req, res, next, 'tool'), equipementController.toolUpdate);

//remove a specific tool
router.delete('/:id', equipementController.toolDelete);

export default router;
