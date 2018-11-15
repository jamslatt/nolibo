Template.byname.helpers({
    primary: ()=> {
        name = Iron.Location.get().path.substring(3,22);
        return primaryDB.find({ firstName: name, signIn: null, sdoDate: moment().format("YYYYMMDD") });
    },
    secondary: ()=> {
        name = Iron.Location.get().path.substring(3,22);
        return primaryDB.find({ secondName: name, signIn: null, sdoDate: moment().format("YYYYMMDD") });
    },
});
Template.sdo.helpers({
    primaryDB: ()=> {
        return primaryDB.find({sdoDate: moment().format("YYYYMMDD")});
    }

});

Template.sdoHistory.helpers({
  primaryDB: ()=> {
      date = Iron.Location.get().path.substring(3,22);
      return   primaryDB.find({ sdoDate: date });
  }
})
