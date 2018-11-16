

Meteor.publish('primaryDB', function (group) {
    if (this.userId) {
      return primaryDB.find({});
    }
});
Meteor.publish('phoneDB', function (group) {
    if (this.userId) {
      return phoneDB.find({});
    }
});
