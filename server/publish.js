Meteor.publish('primaryDB', function(group) {
  const user = Meteor.users.findOne(this.userId);
  const email = user.emails[0].address;


  if (email.includes("alpha")) {
    if (Roles.userIsInRole(this.userId, ['super-admin'])) {
      return primaryDB.find({company: "alpha"});
    } else {
      return primaryDB.find({ logDate: { $gte: new Date((new Date().getTime() - (10 * 24 * 60 * 60 * 1000)))}, company: "alpha"});
    }
  }

  if (email.includes("bravo")) {
    if (Roles.userIsInRole(this.userId, ['super-admin'])) {
      return primaryDB.find({company: "bravo"});
    } else {
      return primaryDB.find({logDate: { $gte: new Date((new Date().getTime() - (10 * 24 * 60 * 60 * 1000)))}, company: "bravo" });
    }
  }

});


Meteor.publish('phoneDB', function(group) {
  if (this.userId) {
    return phoneDB.find({});
  }
});
