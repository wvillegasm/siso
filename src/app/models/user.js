import mongoose from 'mongoose';
import updateCreateDates from './updateCreationDates';

let userSchema = new mongoose.Schema({
  person: {type: mongoose.Schema.Types.ObjectId, ref: 'Person'},
  password: {type: String, require: [ true, 'Password is required' ]},
  role: {type: String, enum: ['person', 'manager', 'user', 'admin' ], default: 'person'},
  manager: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  active: {type: Boolean, default: false},
  lastLogin: {type: Date},
});

userSchema.plugin(updateCreateDates);

let UserModel = mongoose.model('User', userSchema);


export default UserModel;