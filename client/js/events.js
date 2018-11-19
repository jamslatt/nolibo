Meteor.subscribe('primaryDB');

Template.base.events({
  'click .download': function(event) {
    var nameFile = 'LibertyLog.csv';
    var date = window.prompt('Enter the date for the records you want to download.', moment().format("YYYYMMDD"))
    Meteor.call('download', date, function(err, fileContent) {
      if (fileContent) {
        var blob = new Blob([fileContent], {
          type: "text/plain;charset=utf-8"
        });
        saveAs(blob, nameFile);
      }
    });
  },
  'click .autopub': function(event) {
    Meteor.call('publishAll');
  },
  'click .marSearchSubmit': function() {
    event.preventDefault();
    let marSearchSubmit = $('[name="marSearch"]').val();
    Router.go('/search/' + marSearchSubmit);
  },
  'click .logout': function() {
    Meteor.logout();
  }
})


Template.purge.events({
  'click .purge': function() {
    let pCAC = $('[name="purgeCAC"]').val();

    //  Meteor.call('purge', pCAC);

    Meteor.call('purge', pCAC, (error, result) => {
      console.log(error);
      console.log(result);
    });



    alert("Removed all records for " + pCAC.substring(35, 55));

    $('[name="purgeCAC"]').val(null);

  }
})

Template.signOut.events({
  'click .signIn': function(event) {
    event.preventDefault();

    let pCAC = $('[name="primaryCAC"]').val();
    let sCAC = $('[name="secondaryCAC"]').val();
    let tCAC = $('[name="thirdCAC"]').val();
    let out = 2;

    let dest = $('[name="destination"]').val();
    //let dest = " ";

    /*if ($('.a').hasClass('active')) {
      dest = dest + " Small Px";
    }
    if ($('.b').hasClass('active')) {
      dest = dest + " Chow Hall";
    }
    if ($('.c').hasClass('active')) {
      dest = dest + " Main Px";
    }
    if ($('.d').hasClass('active')) {
      dest = dest + " Bravo Troop Store";
    }
    if ($('.e').hasClass('active')) {
      dest = dest + " Performance Strength Center";
    }
    if ($('.f').hasClass('active')) {
      dest = dest + " McLaughlin Gym";
    }
    if ($('.g').hasClass('active')) {
      dest = dest + " Medical";
    }
    if ($('.j').hasClass('active')) {
      dest = dest + " Other";
    }*/





    let pThree = "";

    if (phoneDB.find({
        CAC: tCAC
      }).count() > 0) {
      pThree = phoneDB.findOne({
        CAC: tCAC
      }).Phone;
      out++;
    }
    else {
      pThree = "";
    }

    if (phoneDB.findOne({
        CAC: pCAC
      })) {
      pOne = phoneDB.findOne({
        CAC: pCAC
      }).Phone;
    } else {
      //alert("Try scanning the first CAC card again. (Read Error/No Intake Record Found)")
      pOne = "";
    }

    if (phoneDB.findOne({
        CAC: sCAC
      })) {
      pTwo = phoneDB.findOne({
        CAC: sCAC
      }).Phone;
    } else {
      //alert("Try scanning the second CAC card again. (Read Error/No Intake Record Found)")
      pTwo = "";

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
      phoneOne: pOne,
      phoneTwo: pTwo,
      phoneThree: pThree,
      totalOut: out
    });

    /*  $('[name="primaryCAC"]').val(null);
      $('[name="secondaryCAC"]').val(null);
      $('[name="thirdCAC"]').val(null);
      $('[name="destination"]').val(null);
      document.getElementById("form").reset();*/
    location.reload();

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
    let out = 2;


    if (phoneDB.findOne({
        CAC: pCAC
      })) {
      pOne = phoneDB.findOne({
        CAC: pCAC
      }).Phone;
    } else {
      //alert("Try scanning the first CAC card again. (Read Error/No Intake Record Found)")
      pOne = "";
    }

    if (phoneDB.findOne({
        CAC: sCAC
      })) {
      pTwo = phoneDB.findOne({
        CAC: sCAC
      }).Phone;
    } else {
      //alert("Try scanning the second CAC card again. (Read Error/No Intake Record Found)")
      pTwo = "";
    }
    if (phoneDB.findOne({
        CAC: tCAC
      })) {
      pThree = phoneDB.findOne({
        CAC: tCAC
      }).Phone;
      out++;
    } else {
      //alert("Try scanning the third CAC card again. (Read Error/No Intake Record Found)")
      pThree = "";
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
      phone: contact,
      totalOut: out
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


    let allPresent = true;

    if (this.firstName != pCAC) {
      allPresent = false;
      alert("Try rescanning the first CAC.");
    }
    if (this.secondName != sCAC) {
      allPresent = false;
      alert("Try rescanning the second CAC.");
    }

    if (this.thirdName) {
      if (this.thirdName != tCAC) {
        allPresent = false;
        alert("Try rescanning the third CAC.");
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
    let newLocation = "<del>" + this.destination + "</del><br/>" + window.prompt("Enter new location:", "");

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

    let insert = confirm("Insert data for " + iCAC.substring(35,55));



    if (insert) {
      phoneDB.insert({
        CAC: iCAC,
        DOB: iDOB,
        Phone: iPhone
      });
    }
    else {
      alert("Intake record canceled.")
    }


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
