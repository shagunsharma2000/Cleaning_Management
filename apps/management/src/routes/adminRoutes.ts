import express from 'express';
import Admincontroller from '../controller/adminController'; 
import auth from "../utils/auth";

const router = express.Router();



router.post('/create', Admincontroller.registerAdmin);
router.post('/login', Admincontroller.login);
router.put('/update/:id',auth, Admincontroller.updateAdmin);
router.delete('/delete/:id',auth, Admincontroller.deleteAdmin);
router.put('/changepassword/:id',auth, Admincontroller.changePassword);

export default router;