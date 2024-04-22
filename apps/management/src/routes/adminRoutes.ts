import express from 'express';
import Admincontroller from '../controller/adminController'; 

const router = express.Router();



router.post('/create', Admincontroller.registerAdmin);




export default router;