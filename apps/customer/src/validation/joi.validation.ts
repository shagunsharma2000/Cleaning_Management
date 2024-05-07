import  joi from 'joi';

// Object schema validation

// customer create validation//
const Customer = joi.object({
  name: joi.string().min(2).max(25).optional(),
  phonenumber: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(5).optional(),
  address:joi.string().min(10).optional(),
 
 
 
  
});
//customer login validations//
const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(5).optional(),
  
});

//customer update validations//
const update = joi.object({
  name: joi.string().min(2).max(25).optional(),
  email: joi.string().email().required(),
 
  
});

const validationMiddleware = async (req, res, next, schema) => {
  console.log(schema,'in validation')
  const option = {
    abortEarly: false,
    allowUnknown: false,
  };

  if (schema === 'Customer') {
    const { error } = Customer.validate(req.body, option);

    if (error) {

      res.status(400).json({ validationError: error.details[0].message });

    } else {
      
      next();

    }
  }

  if (schema === 'login') {
    const { error } = login.validate(req.body, option);

    if (error) {

      res.status(400).json({ validationError: error.details[0].message });

    } else {

      next();

    }
  }

  if (schema === 'update') {
    const { error } = update.validate(req.body, option);

    if (error) {

      res.status(400).json({ validationError: error.details[0].message });

    } else {

      next();

    }
  }

};

export default validationMiddleware;


