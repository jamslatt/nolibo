Meteor.subscribe('primaryDB');


Template.signOut.events({
  'click .signIn' : function (event) {
    event.preventDefault();

    let pCAC = $('[name="primaryCAC"]').val();
    let sCAC = $('[name="secondaryCAC"]').val();
    let dest = $('[name="destination"]').val();




    primaryDB.insert({
            primaryCAC: pCAC,
            secondaryCAC: sCAC,
            firstName: pCAC.substring(35,50),
            secondName: sCAC.substring(35,50),
            destination: dest,
            signOut: new Date(),
            sdoDate: moment().format("YYYYMMDD")
        });

        $('[name="primaryCAC"]').val(null);
        $('[name="secondaryCAC"]').val(null);
        $('[name="destination"]').val(null);
        document.getElementById("form").reset();
  }

})

Template.byname.events({
  'click #signIn': function(doc) {
    primaryDB.update(this._id, {$set:{
        signIn: new Date()
      }});
  }
})
