import joi from 'joi';

// Object schema validation

const Admin = joi.object({
  name: joi.string().optional(),
  phonenumber: joi.string().optional(),
  email: joi.string().email().optional(),
  password: joi.string().optional(),
});

const login = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const validationMiddleware = async (req, res, next, schema) => {
  console.log(schema,'in validation')
  const option = {
    abortEarly: false,
    allowUnknown: false,
  };

  if (schema === 'admin') {
    const { error } = Admin.validate(req.body, option);
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
};

export default validationMiddleware;


