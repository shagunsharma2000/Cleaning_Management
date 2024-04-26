import *as express from 'express';
import customerController from '../controller/customerController'; 
import validationMiddleware from '../validation/joi.validations'

const router = express.Router();



//User register & login//
router.post('/registerCustomer',(req,res,next)=> validationMiddleware(req, res, next,'Customer'),customerController.registerCustomer);
router.post('/login',(req,res,next)=> validationMiddleware(req, res, next,'login'),customerController.login);



//admin crud//
router.put('/update/:id',(req,res,next)=> validationMiddleware(req, res, next,'Customer'),customerController.updateCustomer);
router.put('/changepassword/:id', (req, res, next) => validationMiddleware(req, res, next,'Customer'), customerController.changePassword);
router.get('/getCustomerById/:id', (req, res, next) => validationMiddleware(req, res, next,'Customer'), customerController.getCustomerById);
router.delete('/delete/:id',(req, res, next) => validationMiddleware(req, res, next,'Customer'),customerController.deleteCustomer);

export default router;


