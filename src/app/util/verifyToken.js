import jwt from 'jsonwebtoken';
import {FORBIDDEN, UNAUTHORIZED} from "http-status-codes";

function verifyToken(req, res, next) {
  const token = req.headers[ 'authorization' ];

  res.set('Content-type', 'application/json');
  if (token) {
    jwt.verify(token,
      req.app.get('publicKey'), {
        algorithms: [ 'RS256' ],
        ignoreExpiration: true
      },
      (err, decoded) => {
        if (err) {
          res.statusCode = UNAUTHORIZED;
          return res.json({err: err.message});
        }

        req.userinfo = decoded._doc;
        next();

      });
  } else {
    return res.status(FORBIDDEN).send({
      message: 'No token provided'
    });
  }

}

export default verifyToken;