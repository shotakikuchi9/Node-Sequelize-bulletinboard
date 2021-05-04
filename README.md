# 掲示板アプリ
 
Expressを用いた掲示板アプリです。
 
# ライブラリ
 
*  huga 3.5.2
*  hogehuga 1.0.2
*  bcrypt: ^5.0.1
*  bootstrap: ^4.6.0
*  connect-flash: ^0.1.1
*  cookie-parser: ~1.4.4
*  debug: ~2.6.9
*  dotenv: ^8.2.0
*  ejs: ~2.6.1
*  express: ~4.16.1
*  express-session: ^1.17.1
*  express-validator: ^6.10.0
*  http-errors: ~1.6.3
*  jsonwebtoken: ^8.5.1
*  morgan: ~1.9.1
*  mysql: ^2.18.1
*  mysql2: ^2.2.5
*  passport: ^0.4.1
*  passport-jwt: ^4.0.0
*  passport-local: ^1.0.0
*  sequelize: ^6.6.2
*  sequelize-cli: ^6.2.0
 
# インストール

```bash
npm install
```
 
# 開発環境の立ち上げ

1.envファイルを作成する。
```bash
cp app.env.example app.env
cp src/env.example src/.env
cp mysql/mysql.env.example mysql/mysql.env
```
2.dockerイメージを作成する。
```bash
docker build
```
3.dockerコンテナを立ち上げる。
```bash
docker-compose up -d
```
 
 
# 作成者
* 菊池翔太
