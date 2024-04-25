import express from 'express';
import Admincontroller from '../controller/adminController'; 
import validationMiddleware from '../validation/joi.validation'

const router = express.Router();



//admin register & login//
router.post('/createAdmin',(req,res,next)=> validationMiddleware(req, res, next, 'admin'),Admincontroller.registerAdmin);
router.post('/login',(req,res,next)=> validationMiddleware(req, res, next, 'admin'),Admincontroller.login);



//admin crud//
router.put('/update/:id',(req,res,next)=> validationMiddleware(req, res, next, 'admin'),Admincontroller.updateAdmin);
router.delete('/delete/:id',(req,res,next)=> validationMiddleware(req, res, next, 'admin'),Admincontroller.deleteAdmin);
router.put('/changepassword/:id', (req, res, next) => validationMiddleware(req, res, next, 'admin'), Admincontroller.changePassword);
router.get('/getAdminById/:id', (req, res, next) => validationMiddleware(req, res, next, 'admin'), Admincontroller.getAdminById);


export default router;