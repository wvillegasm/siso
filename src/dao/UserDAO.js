import UserModel from '../app/models/user';

if (!UserModel.schema.options.toObject) UserModel.schema.options.toObject = {};
UserModel.schema.options.toObject.transform = (doc, ret, options) => {
  delete ret.password;
  return ret;
};

const findAllUsers = () => {
  return UserModel.find({ active: true }, 'id person role manager active lastLogin').//{password: 0}
  populate('person', 'firstName middleName lastName userName phone email observations decision createdOn updatedOn').populate({
    path: 'manager',
    select: { password: 0 },
    populate: {
      path: 'person',
      select: 'firstName middleName lastName'
    }
  });
};

const findUserById = (id) => {
  return UserModel.findById(id, 'person role manager').//{password: 0}
  populate('person', 'firstName middleName lastName userName phone email').populate({
    path: 'manager',
    select: 'person',
    populate: {
      path: 'person',
      select: 'firstName middleName lastName phone'
    }
  });
};

const saveUser = (newUser) => {
  let user = new UserModel(newUser);

  return user.save();
};

export { findAllUsers, findUserById, saveUser };
