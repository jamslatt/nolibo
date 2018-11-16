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
  }
});

//DB SimpleSchema
primaryDBmap = new SimpleSchema({
  primaryCAC: {
    type: String,
  },
  secondaryCAC: {
    type: String,
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
  },
  thirdName: {
    type: String,
    optional: true
  },
  destination: {
    type: String,
  },
  signOut: {
    type: Date
  },
  signIn: {
    type: Date,
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
  totalOut: {
    type: Number,
    optional: true
  }
});

primaryDB.attachSchema(primaryDBmap)
