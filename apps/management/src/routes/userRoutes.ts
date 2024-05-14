// routes/userRoutes.js
import express from 'express';
import userController from '../controller/userController';
import validationMiddleware from '../validation/joi.validation';
// import auth from '../utils/middleWare/auth';

const router = express.Router();

// User register & login
router.post('/registerUser', userController.registerUser);
router.post('/login', userController.login);

// User CRUD
router.put('/update/:id', (req, res, next) => validationMiddleware(req, res, next, 'update'), userController.updateUser);
router.put('/changepassword/:id', (req, res, next) => validationMiddleware(req, res, next, 'user'), userController.changePassword);
router.get('/getUserById/:id', userController.getUserById);
router.delete('/delete/:id',  userController.deleteUser);

export default router;
