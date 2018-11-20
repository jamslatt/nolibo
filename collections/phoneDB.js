import SimpleSchema from 'simpl-schema';

//Create Collection
phoneDB = new Mongo.Collection('phoneDB');


// Collection permissoins
phoneDB.allow({
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
phoneDBmap = new SimpleSchema({
  CAC: {
    type: String
  },
  DOB: {
    type: String
  },
  Phone: {
    type: String
  }
});

phoneDB.attachSchema(phoneDBmap)
