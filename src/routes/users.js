import express from 'express';
import UserModel from '../app/models/user';
import crypto from 'crypto';
import {BAD_REQUEST, CREATED, OK} from "http-status-codes";

let users = express.Router();


if (!UserModel.schema.options.toObject) UserModel.schema.options.toObject = {};
UserModel.schema.options.toObject.transform = (doc, ret, options) => {
  delete ret.password;
  return ret;
};


users.get("/", (req, res) => {
  res.set('Content-Type', 'application/json');
  UserModel.find({active: true}, 'id person role manager'). //{password: 0}
  populate('person', 'middleName lastName userName phone email observations').
  populate({
    path: 'manager',
    select: {password: 0},
    populate: {
      path: 'person',
      select: 'firstName middleName lastName'
    }
  }).
  then(users => {
    res.statusCode = OK;
    res.json(users);
  }).catch(err => {
    res.statusCode = BAD_REQUEST;
    res.json({err: err.message});
  });
});

users.get("/:id", (req, res) => {

  res.set('Content-Type', 'application/json');
  UserModel.findById(req.params.id, 'person role manager'). //{password: 0}
  populate('person', 'firstName middleName lastName userName phone email').
  populate({
    path: 'manager',
    select: 'person',
    populate: {
      path: 'person',
      select: 'firstName middleName lastName phone'
    }
  }).
  then(user => {

    res.statusCode = OK;
    res.json(user);

  }).catch(err => {
    res.statusCode = BAD_REQUEST;
    return res.json({err: err.message});
  });
});


users.post('/', (req, res) => {
  let user = new UserModel({
    person: req.body.person,
    password: crypto.createHash('md5').update(req.body.password).digest('hex'),
    role: req.body.role,
    manager: req.body.manager,
    active: true,
  });

  res.set('Content-Type', 'application/json');
  user.save().
  then(user => {
    res.statusCode = CREATED;
    res.json({message: 'User was created.', user: user.toObject()});
  }).catch(err => {
    res.statusCode = BAD_REQUEST;
    return res.json({err: err.message});
  });
});

export default users;