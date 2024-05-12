import { Request, Response, NextFunction } from 'express';
import joi, { ValidationError } from 'joi';

// Object schema validation
const listing = joi.object({
  limit: joi.number().required(),
  page: joi.number().required(),
  sortBy: joi.string().required(),
  sort: joi.number().required(),
  searchBy: joi.string().optional(),
  keyword: joi.string().optional(),
});

const tool = joi.object({
  toolName: joi.string().required(),
  slug: joi.string().required(),
  description: joi.string().required(),
});

const validationMiddleware = async (req: Request, res: Response, next: NextFunction, schema: string) => {
  const option = {
    abortEarly: false,
    allowUnknown: false,
  };

  let validationError: ValidationError | null = null;
  if (schema == 'listing') {
    const { error: listingError } = listing.validate(req.query, option);
    validationError = listingError || null;
  }

  if (schema == 'tool') {
    const { error: toolError } = tool.validate(req.body, option);
    validationError = toolError || null;
  }

  if (validationError) {
    res.status(400).json({ validationError: validationError.details[0].message });
  } else {
    next();
  }
};

export default validationMiddleware;
