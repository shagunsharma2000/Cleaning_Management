import express from 'express';
import userController from '../controller/userController'; 
import validationMiddleware from '../validation/joi.validation'
import auth from '../utils/middleWare/auth'
const router = express.Router();



//User register & login//
router.post('/registerUser',(req,res,next)=> validationMiddleware(req, res, next,'User'),userController.registerUser);
router.post('/login',(req,res,next)=> validationMiddleware(req, res, next,'login'),userController.login);



//admin crud//
router.put('/update/:id',(req,res,next)=> validationMiddleware(req, res, next,'User'),userController.updateUser);
router.put('/changepassword/:id', (req, res, next) => validationMiddleware(req, res, next,'User'), userController.changePassword);
router.get('/getUserById/:id', (req, res, next) => validationMiddleware(req, res, next,'User'), userController.getUserById);
router.delete('/delete/:id',(req, res, next) => validationMiddleware(req, res, next,'User'),userController.deleteUser);

export default router;


