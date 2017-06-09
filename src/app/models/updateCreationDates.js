
let updateCreationDates = (schema, options) => {
  schema.add({createdOn: {type: Date, default: Date.now }});
  schema.add({updatedOn: {type: Date}});
};

export default updateCreationDates;