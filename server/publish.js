Meteor.publish('primaryDB', function(group) {
  if (this.userId) {
    if (Roles.userIsInRole(this.userId, ['super-admin'])) {
      return primaryDB.find({});
    } else {
      return primaryDB.find({
        'logDate': {
          $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
        }
      });

    }
  }

});
Meteor.publish('phoneDB', function(group) {
  if (this.userId) {
    return phoneDB.find({});
  }
});
