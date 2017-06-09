import mongoose from 'mongoose';
import updateCreationDates from './updateCreationDates';

let personSchema = new mongoose.Schema({
  firstName: {type: String, require: [ true, 'Name is required' ]},
  middleName: {type: String, require: [ false ]},
  lastName: {type: String, require: [ true, 'Last Name is required' ]},
  userName: {type: String, index: true, unique: true, require: [ true, 'User Name is required' ]},
  phone: {type: String, require: [ true, 'Phone number is required' ], min: 10, max: 10},
  email: {type: String, require: [ true, 'Phone number is required' ]},
  observations: {type: String, max: 100},
  decision: {type: String, enum: [ 'granted', 'denied', 'pending' ]},
});

personSchema.plugin(updateCreationDates);


let PersonModel = mongoose.model('Person', personSchema);


export default PersonModel;