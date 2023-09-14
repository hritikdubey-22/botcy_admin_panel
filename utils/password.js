const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {
  async getHash(pass) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);
    return hash;
  },
  genJwtToken(id, userName, permission) {
    const payload = { id: id, userName: userName, permission: permission };

    return jwt.sign(payload, `JWT_SECRET`, {
      expiresIn: "30d",
    });
  },
  async verifyJwtToken (req, res, next) {
    try {
      let token = req.headers.authorization
      if (!token) return res.status(401).send({ status: false, msg: "JWT Token must be present" });
      let splittoken = token.split(' ')
      // decoding token  
      jwt.verify(splittoken[1], "JWT_SECRET", (err, decode) => {
        if (err) {
          return res.status(401).send({
            status: false,
            message: err.message
          })
        } else {
          req.decodeToken = decode
          next()
        }
      })
    }
    catch (err) {
      return res.status(500).send({ msg: "Error", error: err.message })
    }
  }
};

 