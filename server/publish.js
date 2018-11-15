Meteor.publish('primaryDB', function (group) {
  return primaryDB.find({});
});
