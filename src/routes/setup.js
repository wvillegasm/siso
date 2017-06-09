import express from 'express';
import UserModel from '../app/models/user';
import HttpStatus from 'http-status-codes';

let setup = express.Router();
let nick = new UserModel({
  firstName: 'Nick Postas',
  password: 'password',
  admin: true
});


setup.get("/", (req, res) => {
  // create a sample user
  nick.save((err) => {
    res.set('Content-Type', 'application/json');
    if (err) {
      res.statusCode = HttpStatus.BAD_REQUEST;
      res.json({err: err.message});
    }
    console.log('User saved successfully');
    res.statusCode = HttpStatus.CREATED;
    res.json({message: 'User created successfully'});
  });
});



export {setup};