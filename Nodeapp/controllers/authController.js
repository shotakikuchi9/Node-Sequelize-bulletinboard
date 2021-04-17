const jwt = require('jsonwebtoken');

module.exports = {
  vertifyToken: function(req, res, next) {
    console.log('vertify');
    const token = req.cookies.jwt
    if (token && req.isAuthenticated()) {
      jwt.verify(token, 'secret', (err, decodedToken) => {
        if(err) {
          console.log(err);
        } else {
          req.decoded = decodedToken
          next();
        }
      })
    } else {
      console.log('no token');
      res.redirect('/login')
    }
  },
  logout:function(req, res, next) {
    req.logout();
    console.log('ログアウト');
    res.redirect('/login')
  }
}