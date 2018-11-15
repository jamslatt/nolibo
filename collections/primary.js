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
  firstName: {
    type: String,
  },
  secondName: {
    type: String,
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
  }
});

primaryDB.attachSchema(primaryDBmap)
