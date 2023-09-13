let constants = {
  "SUCCESS": false,
  "ERROR": true,
  "HTTP_SUCCESS": 200, // Success
  "HTTP_NOT_FOUND": 404, // Not Found
  "HTTP_SERVER_ERROR": 500, // Server Error
  "HTTP_ERROR" : 400,//D
  "is_debug": 1,
  //"DEBUG_TYPE": "email",
  "DEBUG_TYPE": "database", // email, database/ both
}
let messages = {
  "USER": {
    "SUCCESS": "Added successfully",
    "FAILURE": "Error while adding user",
    "ALREADYEXIST": "Email is taken",
    "NOTEXIST": "Email not found",
    "GENERATED": "OTP generated"
  },
  "LOGIN": {
    "SUCCESS": "login successfull",
    "FAILURE": "Username or password incorrect",
  },
  "ERRORHANDLER": {
    "SUCCESS": "Some error occured at global level"
  },
  "NOTFOUNDHANDLER": {
    "SUCCESS": "Route not found in the application"
  }
}
module.exports = {
  constants,
  messages
}

