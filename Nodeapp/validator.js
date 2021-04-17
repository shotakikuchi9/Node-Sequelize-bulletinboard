const { check, validationResult } = require('express-validator');
const mysql = require('mysql')
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Shota0925',
  database: 'users'
})

module.exports = [
  check('name').not().isEmpty().withMessage('nust be a valid name'),
  check('email').not().isEmpty().isEmail().custom(async function (value) {
    const sql = "SELECT * FROM users WHERE email = ? "
    await con.query(sql, value, function(err, user, fields) {
      if(err) {
        console.log(err);
      } else {
        if(user.length !== 0) {
          throw new Error('E-mail already in use')
        }
        return true
      }
    })
  }).withMessage('must be a valid email'),
  check('password').not().isEmpty().isLength({ min: 7 }).withMessage('must be a valid password'),
  check('passwordConfirmation').custom((value, { req }) => {
    if(value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true
  }),
]
