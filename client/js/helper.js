Template.byname.helpers({
    primary: ()=> {
        name = Iron.Location.get().path.substring(3,22);


        return primaryDB.find({ $or: [ { firstName: name, signIn: null, sdoDate: moment().format("YYYYMMDD") }, { secondName: name, signIn: null, sdoDate: moment().format("YYYYMMDD") } , { thirdName: name, signIn: null, sdoDate: moment().format("YYYYMMDD")}]});
    },
});
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

Template.home.helpers({
  loggedin: function () {
    return Meteor.userId()
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
  }
})
