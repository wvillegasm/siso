import express from 'express';
import PersonModel from '../app/models/person';
import {BAD_REQUEST, CREATED} from "http-status-codes";

let personAccess = express.Router();

personAccess.post('/', (req, res) => {
  res.set('Content-Type', 'application/json');
  console.log('What do I have: ', req.accepts('json'));
  if(!req.accepts('json')){
    res.statusCode = BAD_REQUEST;
    return res.json({err: 'The format received is not json'});
  }

  let person = new PersonModel({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    phone: req.body.phone,
    email: req.body.email,
    observations: req.body.observations,
  });


  person.save().then(() => {
    res.statusCode = CREATED;
    res.json({message: 'Person was created.'});
  }).catch(err => {
    res.statusCode = BAD_REQUEST;
    return res.json({err: err.message});
  });
});

export default personAccess;