import express from 'express';
import UserModel from '../app/models/user';
import PersonModel from '../app/models/person';
import {UNAUTHORIZED, ACCEPTED, INTERNAL_SERVER_ERROR, BAD_REQUEST} from "http-status-codes";
import jwt from 'jsonwebtoken';
import cryto from 'crypto';


let auth = express.Router();

auth.post("/", (req, res) => {
  res.set('Content-type', 'application/json');
  if (!req.body.userName) {
    res.statusCode = BAD_REQUEST;
    res.json({err: 'You need send username'});
  }

  if (!req.body.password) {
    res.statusCode = BAD_REQUEST;
    res.json({err: 'You need send password'});
  }

  //console.log(cryto.createHash('md5').update(req.body.password).digest('hex'));

  UserModel.findOne({
    password: cryto.createHash('md5').update(req.body.password).digest('hex')
  }, 'person manager active role').populate({
    path: 'manager',
    select: 'person',
    populate: {
      path: 'person',
      select: 'firstName middleName lastName'
    }
  }).populate({
    path: 'person',
    select: 'firstName middleName lastName userName phone email',
    match: {userName: req.body.userName}
  }).then(user => {

    if (!user) {
      res.statusCode = UNAUTHORIZED;
      res.json({message: 'Authentication failed. User not found.'});

    } else if (user) {
      //console.log(user);
      jwt.sign(user, req.app.get('privateKey'), {
          expiresIn: 1440, // 24 hrs
          algorithm: 'RS256',
          issuer: 'MyCompany'
        },
        (err, token) => {
          if (err) {
            res.statusCode = UNAUTHORIZED;
            res.json({
              err: err.message
            });
          }

          res.statusCode = ACCEPTED;
          res.json({
            token: token,
            user: {
              name: `${user.person.lastName}, ${user.person.firstName}${user.person.middleName ? ' ' + user.person.middleName : ''}`,
              manager: `${user.manager.person.lastName}, ${user.manager.person.firstName}${user.manager.person.middleName ? ' ' + user.manager.person.middleName : ''}`
            }
          });

        });
    }
  }).catch(err => {
    res.statusCode = INTERNAL_SERVER_ERROR;
    res.json({
      err: err.message
    });
  });

});

export default auth;