import express from 'express';
import serviceController from '../controller/serviceController';
import validationMiddleware from '../validation/joi.validation';
import auth from '../utils/middleware/auth';
// import auth from '../../../management/src/utils/middleWare/auth';
const router = express.Router();

//service create//
router.post('/create', (req, res, next) => validationMiddleware(req, res, next, 'service'), auth, serviceController.serviceCreate);

// getUserServiceById //
router.get('/getServiceById/:id', serviceController.getServiceById);

// service booking //
// router.post('/booking', serviceController.serviceBooking);

//  service assign  //
router.post('/assign-service', serviceController.assignServiceToStaff);

export default router;
