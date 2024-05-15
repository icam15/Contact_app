import Joi from "joi";
import { ResponseError } from "../lib/error.js";

const errorHandler = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  // if ((err = Joi.ValidationError)) {
  //   res.json({
  //     errors: Joi.ValidationError,
  //   });
  // }

  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        errors: err.message,
      })
      .end();
  } else {
    res.status(400).json({
      errors: err.message,
    });
  }
};

export { errorHandler };
