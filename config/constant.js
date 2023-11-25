require("dotenv").config();

exports.port = process.env.PORT_NO
exports.secretKey = process.env.SECRET_KEY
exports.db_url = process.env.DB_URL
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRY
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