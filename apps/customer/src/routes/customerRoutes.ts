import express from 'express';
import customerController from '../controller/customerController';
import validationMiddleware from '../validation/joi.validation';
// import auth from '../utils/middleWare/auth';

const router = express.Router();

//Distance
router.post('/distance', customerController.findServiceProvider);

//Customer register & login//
router.post('/registerCustomer', customerController.registerCustomer);
router.post('/login', (req, res, next) => validationMiddleware(req, res, next, 'login'), customerController.login);

//Customer update route//
router.put('/update/:id', (req, res, next) => validationMiddleware(req, res, next, 'update'), customerController.updateCustomer);

//changepassword route//
router.put('/changepassword/:id', (req, res, next) => validationMiddleware(req, res, next, 'Customer'), customerController.changePassword);

//getCustomerbyid route//
router.get('/getCustomerById/:id', customerController.getCustomerById);

//delete route//
router.delete('/delete/:id', customerController.deleteCustomer);

export default router;
