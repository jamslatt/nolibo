Meteor.publish('primaryDB', function (group) {
  return primaryDB.find({});
});

Meteor.publish('phoneDB', function (group) {
  return phoneDB.find({});
});
