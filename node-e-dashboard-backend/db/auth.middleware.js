// eslint-disable-next-line import/no-extraneous-dependencies
// import { verify } from 'jsonwebtoken';
const Jwt = require('jsonwebtoken');
jwtKey = 'secret';

const auth = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.replace('Bearer ', '');
      try {
        const decoded = Jwt.verify(token, jwtKey  );
        req.user = decoded;
        next();
      } catch (err) {
        res.status(403).send({
          error: true,
          statusCode: 403,
          message: 'Invalid Authorization token!',
        });
      }
    } else {
      res.status(401).send({
        error: true,
        statusCode: 401,
        message: 'Required Authorization token!',
      });
    }
  } catch (e) {
    res.status(401).send({
      error: true,
      statusCode: 401,
      message: 'Required Authorization token!',
    });
  }
};

module.exports = auth



// "use strict";

// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports["default"] = void 0;

// var _jsonwebtoken = require("jsonwebtoken");

// // eslint-disable-next-line import/no-extraneous-dependencies
// var _default = function _default(req, res, next) {
//   try {
//     if (req.headers.authorization) {
//       var token = req.headers.authorization.replace('Bearer ', ''); // console.log('token',token);

//       try {
//         // console.log( process.env.JWT_SECRET_KEY)
//         var decoded = (0, _jsonwebtoken.verify)(token, process.env.JWT_SECRET_KEY);
//         req.user = decoded;
//         // console.log(decoded)
//         next();
//       } catch (err) {
//         res.status(403).send({
//           error: true,
//           statusCode: 403,
//           message: 'Invalid Authorization token!'
//         });
//       }
//     } else {
//       res.status(401).send({
//         error: true,
//         statusCode: 401,
//         message: 'Required Authorization token!'
//       });
//     }
//   } catch (e) {
//     res.status(401).send({
//       error: true,
//       statusCode: 401,
//       message: 'Required Authorization token!'
//     });
//   }
// };

// exports["default"] = _default;
