Meteor.subscribe('primaryDB');

Template.base.events({
  'click .download': function(event) {
  var nameFile = 'LibertyLog.csv';
  var date = window.prompt('Enter the date for the records you want to download.', moment().format("YYYYMMDD"))
  Meteor.call('download', date, function(err, fileContent) {
    if(fileContent){
      var blob = new Blob([fileContent], {type: "text/plain;charset=utf-8"});
      saveAs(blob, nameFile);
    }
  });
}
})

Template.base.events({
  'click .marSearchSubmit': function() {
    event.preventDefault();
    let marSearchSubmit = $('[name="marSearch"]').val();
    Router.go('/search/' + marSearchSubmit);
  }
})

Template.purge.events({
  'click .purge': function () {
    let pCAC = $('[name="purgeCAC"]').val();

  //  Meteor.call('purge', pCAC);

    Meteor.call('purge', pCAC, (error, result) => {
      console.log(error);
      console.log(result);
    });



    alert("Removed all records for " + pCAC.substring(35,55));
  }
})

Template.signOut.events({
  'click .signIn': function(event) {
    event.preventDefault();

    let pCAC = $('[name="primaryCAC"]').val();
    let sCAC = $('[name="secondaryCAC"]').val();
    let dest = $('[name="destination"]').val();
    let tCAC = $('[name="thirdCAC"]').val();
    let out = 2;

    let pThree = "";

    if (phoneDB.find({CAC: tCAC}).count() > 0) {
      pThree = phoneDB.findOne({CAC: tCAC}).Phone;
      out++;
    }




    primaryDB.insert({
      primaryCAC: pCAC,
      secondaryCAC: sCAC,
      thirdCAC: tCAC,
      firstName: pCAC.substring(35, 50),
      secondName: sCAC.substring(35, 50),
      thirdName: tCAC.substring(35, 50),
      destination: dest,
      signOut: new Date(),
      sdoDate: moment().format("YYYYMMDD"),
      phoneOne: phoneDB.findOne({CAC: pCAC}).Phone,
      phoneTwo: phoneDB.findOne({CAC: sCAC}).Phone,
      phoneThree: pThree,
      totalOut: out
    });

    $('[name="primaryCAC"]').val(null);
    $('[name="secondaryCAC"]').val(null);
    $('[name="thirdCAC"]').val(null);
    $('[name="destination"]').val(null);
    document.getElementById("form").reset();
  }

})

Template.signOutOffBase.events({
  'click .signIn': function(event) {
    event.preventDefault();

    let pCAC = $('[name="primaryCAC"]').val();
    let sCAC = $('[name="secondaryCAC"]').val();
    let dest = $('[name="destination"]').val();
    let tCAC = $('[name="thirdCAC"]').val();
    let contact = $('[name="phone"]').val();




    primaryDB.insert({
      primaryCAC: pCAC,
      secondaryCAC: sCAC,
      thirdCAC: tCAC,
      firstName: pCAC.substring(35, 50),
      secondName: sCAC.substring(35, 50),
      thirdName: tCAC.substring(35, 50),
      destination: dest,
      signOut: new Date(),
      sdoDate: moment().format("YYYYMMDD"),
      phone: contact
    });

    $('[name="primaryCAC"]').val(null);
    $('[name="secondaryCAC"]').val(null);
    $('[name="thirdCAC"]').val(null);
    $('[name="destination"]').val(null);
    $('[name="phone"]').val(null);
  }

})

Template.signInVerify.events({
  'click .signIn': function(doc) {

    let pCAC = $('[name="primaryCAC"]').val().substring(35, 50).trim();
    let sCAC = $('[name="secondaryCAC"]').val().substring(35, 50).trim();

    let tCAC = " ";

    if (this.thirdName) {
      tCAC = $('[name="thirdCAC"]').val().substring(35, 50).trim();

    }

    /*console.log("Testing for" + pCAC + sCAC + tCAC);
    console.log(this.firstName + this.secondName + this.thirdName);*/

    let allPresent = true;

    if (this.firstName != pCAC) {
      allPresent = false;
      console.log(allPresent);
    }

    if (this.secondName != sCAC) {
      allPresent = false;
    }

    if (this.thirdName) {
      if (this.thirdName != tCAC) {
        allPresent = false;
      }
    }

    //console.log(allPresent);

    if (allPresent) {
      primaryDB.update(this._id, {
        $set: {
          signIn: new Date()
        }
      });
      console.log("Signed in.")

    }

    Router.go('/');

  }
})

Template.sdo.events({
  'click .changeLoc': function() {
    let newLocation = window.prompt("Enter new location:", "");

    primaryDB.update(this._id, {
      $set: {
        destination: newLocation
      }
    });

    alert("Location successfully changed!");

  }
})


Template.intake.events({
  'click .register': function() {
    event.preventDefault();

    let iCAC = $('[name="intakeCAC"]').val();
    let iDOB = $('[name="DOB"]').val();
    let iPhone = $('[name="phone"]').val();




    phoneDB.insert({
      CAC: iCAC,
      DOB: iDOB,
      Phone: iPhone
    });


    $('[name="intakeCAC"]').val(null);
    $('[name="DOB"]').val(null);
    $('[name="phone"]').val(null);


  }

})

Template.login.events({
  'click .logout': function() {
    Meteor.logout();
  }
})
