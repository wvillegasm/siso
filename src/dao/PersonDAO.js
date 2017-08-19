import PersonModel from '../app/models/person';

const savePerson = (person) => {
  let person = new PersonModel(person);
  return person.save();
};

export { savePerson };
