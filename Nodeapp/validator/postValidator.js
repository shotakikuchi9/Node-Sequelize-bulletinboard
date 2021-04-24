const { check, validationResult } = require('express-validator');

module.exports = [
  check('title').not().isEmpty().withMessage('nust be a valid title'),
  check('content').isLength({ min:1, max:140 }).withMessage('must be a valid content')
]
