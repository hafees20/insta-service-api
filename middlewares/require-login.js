import jwt from 'jsonwebtoken';
import Users from '../schema/user/user-schema.js';
import { CREDENTIALS } from '../constants/constants.js';

const requireLogin = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, CREDENTIALS.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in" });
    }

    const { _id } = payload;
    Users.findById(_id)
      .then((userdata) => {
        req.user = userdata;
        next();
      })
      .catch((err) => {
        return res.status(500).json({ error: "Internal Server Error" });
      });
  });
};

export default requireLogin;
