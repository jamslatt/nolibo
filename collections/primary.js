import SimpleSchema from 'simpl-schema';

//Create Collection
primaryDB = new Mongo.Collection('primaryDB');


// Collection permissoins
primaryDB.allow({
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
primaryDBmap = new SimpleSchema({
  primaryCAC: {
    type: String,
  },
  secondaryCAC: {
    type: String,
    optional: true
  },
  thirdCAC: {
    type: String,
    optional: true
  },
  firstName: {
    type: String,
  },
  secondName: {
    type: String,
    optional: true
  },
  thirdName: {
    type: String,
    optional: true
  },
  destination: {
    type: String,
  },
  epdid_one: {
    type: String,
  },
  epdid_two: {
    type: String,
    optional: true
  },
  epdid_three: {
    type: String,
    optional: true
  },
  signOut: {
    type: String
  },
  signIn: {
    type: String,
    optional: true
  },
  sdoDate: {
    type: String,
  },
  phoneOne: {
    type: String,
    optional: true
  },
  phoneTwo: {
    type: String,
    optional: true
  },
  phoneThree: {
    type: String,
    optional: true
  },
  logDate: {
    type: Date
  },
  totalOut: {
    type: Number,
    optional: true
  },
  company: {
    type: String
  }
});

primaryDB.attachSchema(primaryDBmap)
