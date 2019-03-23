import SimpleSchema from 'simpl-schema';

//Create Collection
classDB = new Mongo.Collection('classDB');


// Collection permissoins
classDB.allow({
  insert: function(userId, doc) {
    return true;
  },
  update: function(userId, doc) {
    return true;
  },
  remove: function(userId, doc) {
    if (Roles.userIsInRole(userId, ['admin'])) {
      return true;
    }

    return true;
  }
});

//DB SimpleSchema
classDBmap = new SimpleSchema({
  classNumber: {
    type: String
  },
  company: {
    type: String
  },
  mos: {
    type: String
  },
  facultyAdvisor: {
    type: String
  },
  gradDate: {
    type: String
  },
  createDate: {
    type: String,
    defaultValue: moment().format("YYYYMMDD")
  }
});

classDB.attachSchema(classDBmap)
