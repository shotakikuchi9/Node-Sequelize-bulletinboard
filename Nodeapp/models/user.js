const mysql = require('mysql')
const bcrypt = require('bcrypt')

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Shota0925',
  database: 'users'
})
con.connect(function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log('connect');
  }
}) 

module.exports = {
  createUser: function(userData) {
    const sql = "INSERT INTO users(name, email, password) VALUES(?,?,?)"
    const data = [userData.name, userData.email, userData.password]
    con.query(sql, data, function(err, result, fields) {
      if(err) throw err;
      console.log(result);
    })
  },
  checkUserData: async function(req, email, password, done) {
    const reqEmail = email
    const reqPass = password
    const sql = "SELECT * FROM users WHERE email = ? "
    con.query(sql, reqEmail, function(err, user, fields) {
      console.log(user);
      if(user.length === 1) {
        bcrypt.compare(reqPass, user[0].password)
        .then((isCorrectPassword) => {
          if(isCorrectPassword) {
            console.log('ログイン成功');
            done(null, email)
          } else {
            console.log('wrong password');
            done(null, false, {message: 'Eメールまたはパスワードが正しくありません。'})
          }
        })
      } else {
        console.log('ログイン失敗');
        done(null, false, {message: 'Eメールまたはパスワードが正しくありません。'})
      }
    })
  },
  fetchUserDara: function(email, done) {
    con.query('SELECT * FROM users WHERE email=?', [email], function(err, user) {
      console.log(user[0]);
      done(err, user[0])
    })
  }
}