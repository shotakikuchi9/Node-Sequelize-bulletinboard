const jwt = require('jsonwebtoken');

module.exports = {
  vertifyToken: function (req, res, next) {
    const token = req.cookies.jwt
    if (token && req.isAuthenticated()) {
      jwt.verify(token, 'secret', (err, decodedToken) => {
        if (err) {
          console.log(err);
        } else {
          req.decoded = decodedToken
          next();
        }
      })
    } else {
      res.redirect('/login')
    }
  },
  logout: function (req, res, next) {
    req.logout();
    res.redirect('/login')
  }
}