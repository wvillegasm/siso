import dynamoose from 'dynamoose';
import updateCreateDates from './updateCreationDates';

let userSchema = new dynamoose.Schema({
  person: {type: dynamoose.Schema.Types.ObjectId, ref: 'Person'},
  password: {type: String, require: [ true, 'Password is required' ]},
  role: {type: String, enum: ['person', 'manager', 'user', 'admin' ], default: 'person'},
  manager: {type: dynamoose.Schema.Types.ObjectId, ref: 'User'},
  active: {type: Boolean, default: false},
  lastLogin: {type: Date},
});

userSchema.plugin(updateCreateDates);

let UserModel = dynamoose.model('User', userSchema);


export default UserModel;