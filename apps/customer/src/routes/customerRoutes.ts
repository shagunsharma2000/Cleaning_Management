import  express from 'express';
import customerController from '../controller/customerController'; 
import validationMiddleware from '../validation/joi.validation';
import auth from '../utils/middleWare/auth'

const router = express.Router();



//Customer register & login//
router.post('/registerCustomer',(req,res,next)=> validationMiddleware(req, res, next,'Customer'),customerController.registerCustomer);
router.post('/login',(req,res,next)=> validationMiddleware(req, res, next,'login'),customerController.login);


//Customer update route//
router.put('/update/:id',(req,res,next)=> validationMiddleware(req, res, next,'update'),auth,customerController.updateCustomer);

//changepassword route//
router.put('/changepassword/:id', (req, res, next) => validationMiddleware(req, res, next,'Customer'),auth, customerController.changePassword);

//getCustomerbyid route//
router.get('/getCustomerById/:id',(req, res, next) => validationMiddleware(req, res, next,'Customer'),auth, customerController.getCustomerById);

//delete route//
router.delete('/delete/:id',(req, res, next) => validationMiddleware(req, res, next,'Customer'),auth,customerController.deleteCustomer);


export default router;


