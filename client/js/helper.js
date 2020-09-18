Template.sdo.helpers({
    primaryDB: ()=> {
        return primaryDB.find({sdoDate: moment().format("YYYYMMDD")});
    },
    noSign: ()=> {
        return primaryDB.find({sdoDate: moment().format("YYYYMMDD"), signIn: null});
    },
    totalOut: ()=> {
      return (primaryDB.find({signIn: null, sdoDate: moment().format("YYYYMMDD"), totalOut: 2}).count() * 2) + (primaryDB.find({signIn: null, sdoDate: moment().format("YYYYMMDD"), totalOut: 3}).count() * 3);
    }

});


Template.print.helpers({
  primaryDB: ()=> {
      let date = Iron.Location.get().path.substring(7,16);

      return primaryDB.find({sdoDate: date});
  }
})

Template.home.helpers({
  loggedin: function () {
    return Meteor.userId()
    },
    noSign: () => {
        return primaryDB.find({ sdoDate: moment().format("YYYYMMDD"), signIn: null });
    }
})

Template.marDetail.helpers({
  record: function () {
    let name = Iron.Location.get().path.substring(6,30);

    return primaryDB.find({ $or: [ { epdid_one: name }, { epdid_two: name } , { epdid_three: name}]});
  }
})

Template.sdoHistory.helpers({
  primaryDB: ()=> {
      date = Iron.Location.get().path.substring(3,22);
      return   primaryDB.find({ sdoDate: date });
  }
})

Template.login.helpers({
  loggedin: function () {
    return Meteor.userId()
  }
})

Template.base.helpers({
  loggedin: function () {
    return Meteor.userId()
  },
  admin: function () {
    return Roles.userIsInRole(Meteor.user(), ['admin']);
  }
})
