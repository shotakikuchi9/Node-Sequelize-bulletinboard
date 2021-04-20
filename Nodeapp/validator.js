const { check, validationResult } = require('express-validator');
const { userModel } = require('./models/index');

module.exports = [
  check('name').not().isEmpty().withMessage('nust be a valid name'),
  check('email').not().isEmpty().isEmail().custom(async function (value) {
    await userModel.findAll({
      where: { email: value }
    }).then((users, err) => {
      if (err) {
        console.log(err);
      } else {
        if (users.length !== 0) {
          throw new Error('E-mail already in use')
        }
        return true
      }
    })

  }).withMessage('must be a valid email'),
  check('password').not().isEmpty().isLength({ min: 7 }).withMessage('must be a valid password'),
  check('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true
  }),
]
