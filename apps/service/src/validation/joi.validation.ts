import  joi from 'joi';

// Object schema validation

// service create validation//
const service = joi.object({
  name: joi.string().min(2).max(25).optional(),
  description: joi.string().optional(),
  price: joi.string().required(),
  duration: joi.string().min(2).max(10).optional(),
  
 
 
 
  
});




const validationMiddleware = async (req, res, next, schema) => {
  console.log(schema,'in validation')
  const option = {
    abortEarly: false,
    allowUnknown: false,
  };

  if (schema === 'service') {
    const { error } = service.validate(req.body, option);

    if (error) {

      res.status(400).json({ validationError: error.details[0].message });

    } else {
      
      next();

    }
  }


};

export default validationMiddleware;


