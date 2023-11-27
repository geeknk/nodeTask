require("dotenv").config();

exports.port = process.env.PORT_NO
exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
exports.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
exports.db_url = process.env.DB_URL
exports.ACCESS_TOKEN_EXPIRES = process.env.JWT_EXPIRY
exports.FPASS_EXPIRESIN = process.env.FPASS_EXPIRY
exports.API_KEY = process.env.APIKEY
exports.EMAIL_FROM = process.env.emailFrom
exports.EMAIL_TO = process.env.emailTo
exports.URL = process.env.url
exports.URL1 = process.env.url1
exports.snapURL = process.env.snapurl
exports.EMAIL_PASS = process.env.pass
exports.DB = process.env.database
exports.USERNAME = process.env.username
exports.PASS = process.env.password