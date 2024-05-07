// routes/userRoutes.js
import express from 'express';
import userController from '../controller/userController'; 
import validationMiddleware from '../validation/joi.validation';
import auth from '../utils/middleWare/auth';

const router = express.Router();

// User register & login
router.post('/registerUser',(req,res,next)=> validationMiddleware(req, res, next, 'User'), userController.registerUser);
router.post('/login', userController.login);

// User CRUD
router.put('/update/:id', auth,(req,res,next)=>  validationMiddleware(req, res, next, 'update'), userController.updateUser);
router.put('/changepassword/:id', auth,(req,res,next)=>  validationMiddleware(req, res, next, 'User'), userController.changePassword);
router.get('/getUserById/:id',userController.getUserById);
router.delete('/delete/:id', auth, userController.deleteUser);

export default router;




































































// import express from 'express';
// import userController from '../controller/userController'; 
// import validationMiddleware from '../validation/joi.validation'
// import checkRole from '../utils/middleWare/auth';
// const router = express.Router();



// //User register & login//
// router.post('/registerUser',(req,res,next)=> validationMiddleware(req, res, next,'User'),checkRole,userController.registerUser);
// router.post('/login',(req,res,next)=> validationMiddleware(req, res, next,'login'),userController.login);



// //user crud//
// router.put('/update/:id',(req,res,next)=> validationMiddleware(req, res, next,'update'),checkRole,userController.updateUser);
// router.put('/changepassword/:id', (req, res, next) => validationMiddleware(req, res, next,'User'),userController.changePassword);
// router.get('/getUserById/:id' ,userController.getUserById);
// // router.delete('/delete/:id',(req, res, next) => validationMiddleware(req, res, next,'User'),userController.deleteUser);
// router.delete('/delete/:id',userController.deleteUser);

// export default router;


