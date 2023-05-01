

//Don't think I need this file, did if else. Have just in case

const validator = require('../helpers/validate');

const saveContact = (req, res, next) => {
  const validationRule = {
    movieTitle: 'required|string',
    releaseYear: 'required|integer',
    language: 'required|string',
    movieLength: 'required|integer',
    rating: 'required|string',
    specialFeatures: 'required|string',
    boxOfficeGross: 'required|string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveContact
};