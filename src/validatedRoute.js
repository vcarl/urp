import _ from 'lodash'
import Validator from 'validator'
import Restify from 'restify'

/**
 * (string, string) -> typedValue
 */
function convert(type, value) {
  switch (type) {
  case 'integer':
    return Validator.toInt(value);
  case 'float':
    return Validator.toFloat(value);
  case 'string':
    return Validator.toString(value);
  case 'date':
    return Validator.toDate(value);
  case 'json':
    return value;
  case 'uuid':
    return value;
  }
}

/**
 * (string, string) -> bool
 */
function isValid(type, value) {
  switch (type) {
  case 'integer':
    return Validator.isInt(value);
  case 'float':
    return Validator.isFloat(value);
  case 'string':
    return Validator.isString(value);
  case 'date':
    return Validator.isDate(value);
  case 'json':
    return Validator.isJSON(value);
  case 'uuid':
    return Validator.isUUID(value);
  }
}

/**
 * (function, array) -> function
 * validatedRoute takes a function to handle the route and an array of objects
 * with the shape {field, type, required}.
 */
export default function validatedRoute(handler, typeDefinitions) {
  let types = [
    'integer'
    ,'float'
    ,'string'
    ,'date'
    ,'json'
    ,'uuid'
  ];

  return function route(req, res, next) {
    let validationErrors = [];
    let fieldType = {};

    for (fieldType of typeDefinitions) {
      let { field, type, required } = fieldType;
      let value = req.body[field];

      // Check if the field is required and empty.
      if (required && Validator.isNull(value)) {
        validationErrors.push(`Missing required field: '${field}'`);
      }
      // Check if the field's value is valid.
      else if (!isValid(type, value)) {
        validationErrors.push(`Invalid value: ${field}: '${value}' should be of type '${type}'`);
      }
      // If we're all good, convert the value from a string.
      else {
        req.body[field] = convert(type, value);
      }
    }

    if (validationErrors.length > 0) {
      res.send(new Restify.errors.BadRequestError(validationErrors.join(', ')));
      return next();
    }
    else {
      return handler(req, res, next);
    }
  }
}
