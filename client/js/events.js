Meteor.subscribe('primaryDB');

Template.base.events({
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

Template.phoneChange.events({
  'click .phoneChange': function() {
    let user = $('[name="telCAC"]').val();
    let newPhone = $('[name="newphone"]').val();

    user = phoneDB.findOne({ CAC: user })._id;
console.log(user + newPhone);
    phoneDB.update(user, {
      $set: {
        Phone: newPhone
      }
    }, function(error, result) {
      if (error) {
        bootbox.alert(error);
      } else {
        bootbox.alert("Successfully changed phone number.")
      }
    });
  }
})

Template.purge.events({
  'click .purge': function() {
    let pCAC = $('[name="purgeCAC"]').val();

    //  Meteor.call('purge', pCAC);

    Meteor.call('purge', pCAC, (error, result) => {
      if (error) {
        bootbox.alert(error);
      }

    });



    bootbox.alert("Removed all records for " + pCAC.substring(35, 55));

    $('[name="purgeCAC"]').val(null);

  }
})

Template.signOut.events({
  'click .signIn': function(event) {
    event.preventDefault();

    let goodToGo = true;

    let co = Meteor.user().emails[0].address;
    console.log(co);
    let cmpny = " ";

    if (co.includes("bravo")) {
      cmpny = "bravo";
    }
    if (co.includes("alpha")) {
      cmpny = "alpha";
    }

    let pCAC = $('[name="primaryCAC"]').val();
    let sCAC = $('[name="secondaryCAC"]').val();
    let tCAC = $('[name="thirdCAC"]').val();
    let out = 2;

    let epdid_one = $('[name="primaryCAC"]').val().substring(8, 15);
    epdid_one = parseInt(epdid_one, 32);

    let epdid_two = $('[name="secondaryCAC"]').val().substring(8, 15);
    epdid_two = parseInt(epdid_two, 32);

    let epdid_three = "";
    epdid_three = $('[name="thirdCAC"]').val().substring(8, 15);
    epdid_three = parseInt(epdid_two, 32);

    // If too short
    if (pCAC.length < 89 && pCAC.length > 80) {
      pCAC = " " + pCAC;
    }
    else {
      bootbox.alert("Ensure you scan the front barcode, not the back.");
      return;
    }
    if (sCAC.length < 89 && pCAC.length > 80) {
      sCAC = " " + sCAC;
    }
    else {
      bootbox.alert("Ensure you scan the front barcode, not the back.");
      return;
    }
    if (tCAC.length < 89 && pCAC.length > 80) {
      tCAC = " " + tCAC;
    }
    else {
      bootbox.alert("Ensure you scan the front barcode, not the back.");
      return;
    }


    if (pCAC == sCAC) {
      bootbox.alert("You cannot sign out with yourself.");
      return;
    }


    let dest = $('[name="destination"]').val();

    if ($('#a').hasClass('active')) {
      dest = dest + " Small Px";
    }
    if ($('#b').hasClass('active')) {
      dest = dest + " Big Px";
    }
    if ($('#c').hasClass('active')) {
      dest = dest + " McLaughlin Gym";
    }
    if ($('#d').hasClass('active')) {
      dest = dest + " Commissary";
    }
    if ($('#e').hasClass('active')) {
      dest = dest + " Performance Strength Center";
    }
    if ($('#f').hasClass('active')) {
      dest = dest + " Bowling Alley";
    }




    let pThree = "";

    if (phoneDB.find({
        CAC: tCAC
      }).count() > 0) {
      pThree = phoneDB.findOne({
        CAC: tCAC
      }).Phone;
      out++;
      epdid_three = $('[name="thirdCAC"]').val().substring(8, 15);
      epdid_three = parseInt(epdid_three, 32);
    } else {
      pThree = "";
    }

    // Fetch first phone number
    if (phoneDB.findOne({
        CAC: pCAC
      })) {
      pOne = phoneDB.findOne({
        CAC: pCAC
      }).Phone;
    } else {
      bootbox.alert("Error: No phone number found. Please register as new user.");
    }

    // Fetch second phone number
      if (phoneDB.findOne({
          CAC: sCAC
        })) {
        pTwo = phoneDB.findOne({
          CAC: sCAC
        }).Phone;
      } else {
        bootbox.alert("Error: No phone number found. Please register as new user.");
      }


    // Prevent Doubble Sign Out
    if (primaryDB.find({
        primaryCAC: pCAC,
        sdoDate: moment().format("YYYYMMDD"),
        signIn: null
      }).count() > 0) {
      bootbox.alert(pCAC.substring(35, 50).trim() + " already have signed out. Sign back in!");
      return;
    } else if (primaryDB.find({
        secondaryCAC: sCAC,
        sdoDate: moment().format("YYYYMMDD"),
        signIn: null
      }).count() > 0) {
      bootbox.alert(sCAC.substring(35, 50).trim() + "You already have signed out. Sign back in!");
      return;
    } else if (primaryDB.find({
        thirdCAC: tCAC,
        sdoDate: moment().format("YYYYMMDD"),
        signIn: null
      }).count() > 0) {
      bootbox.alert(tCAC.substring(35, 50).trim() + "You already have signed out. Sign back in!");
      return;
    }

    // Insert record into DB
    if (goodToGo) {
      primaryDB.insert({
        primaryCAC: pCAC,
        secondaryCAC: sCAC,
        thirdCAC: tCAC,
        firstName: pCAC.substring(35, 50) + pCAC.substring(15, 16),
        secondName: sCAC.substring(35, 50) + sCAC.substring(15, 16),
        thirdName: tCAC.substring(35, 50) + tCAC.substring(15, 16),
        destination: dest,
        epdid_one: epdid_one,
        epdid_two: epdid_two,
        epdid_three: epdid_three,
        signOut: moment().format("H:mm  YYYYMMDD"),
        sdoDate: moment().format("YYYYMMDD"),
        phoneOne: pOne,
        phoneTwo: pTwo,
        phoneThree: pThree,
        logDate: new Date(),
        totalOut: out,
        company: cmpny
      }, function(error, result) {
        if (error) {
          console.log(error);
        } else {
          bootbox.alert("Successfully signed out!");
        }
      });
    }


    location.reload();

  }

})



Template.byname.events({
  'click .signIn': function(doc) {

    let pCAC = $('[name="primaryCAC"]').val().trim();
    let sCAC = $('[name="secondaryCAC"]').val().trim();



    let allPresent = true;

    if (this.primaryCAC.toUpperCase() != pCAC.toUpperCase()) {
      allPresent = false;
      bootbox.alert("Try rescanning the first CAC.");
      return;
    }
    if (this.secondaryCAC.toUpperCase() != sCAC.toUpperCase()) {
      allPresent = false;
      bootbox.alert("Try rescanning the second CAC.");
      return;
    }

    /*    if (this.thirdCAC) {
          if (this.thirdCAC.toUpperCase() != tCAC.toUpperCase()) {
            allPresent = false;
            alert("Try rescanning the third CAC.");
          }
        }
    */

    if (allPresent) {
      primaryDB.update(this._id, {
        $set: {
          signIn: moment().format("H:mm  YYYYMMDD")
        }
      }, function(error, result) {
        if (error) {
          bootbox.alert(error);
        } else {
          bootbox.alert("Successfully signed back in.")
        }
      });


    }

    Router.go('/');

  }
})


Template.manual.events({
  'click .signOut': function() {
    let co = Meteor.user().emails[0].address;
    console.log(co);
    let cmpny = " ";

    if (co.includes("bravo")) {
      cmpny = "bravo";
    }
    if (co.includes("alpha")) {
      cmpny = "alpha";
    }


    primaryDB.insert({
      primaryCAC: 'Manual Entry',
      secondaryCAC: 'Manual Entry',
      thirdCAC: 'Manual Entry',
      firstName: $('[name="primaryCAC"]').val(),
      secondName: $('[name="secondaryCAC"]').val(),
      thirdName: $('[name="thirdCAC"]').val(),
      destination: $('[name="destination"]').val(),
      epdid_one: "Manual Entry",
      epdid_two: "Manual Entry",
      epdid_three: "Manual Entry",
      signOut: moment().format("H:mm  YYYYMMDD"),
      sdoDate: moment().format("YYYYMMDD"),
      phoneOne: $('[name="fPhone"]').val(),
      phoneTwo: $('[name="sPhone"]').val(),
      phoneThree: $('[name="tPhone"]').val(),
      logDate: new Date(),
      totalOut: 2,
      company: cmpny
    })
    Router.go('/');
  }
})



Template.sdo.events({
  'click .changeLoc': function() {
    bootbox.prompt({
      title: "Enter new location:",
      callback: function(result) {
        let newLocation = "<del>" + this.destination + "</del><br/>" + result;

        if (newLocation = null) {
          return;
        }

        primaryDB.update(this._id, {
          $set: {
            destination: newLocation
          }
        });
        bootbox.alert("Location successfully changed!");
      }
    })
  },
  'click .manSign': function() {
    primaryDB.update(this._id, {
      $set: {
        signIn: moment().format("H:mm  YYYYMMDD")
      }
    });
    bootbox.alert("Signed in.")
  },
  'click .remove': function() {
    primaryDB.remove(this._id);

    bootbox.alert("Record Removed");

  }

})

Template.sdoHistory.events({
  'click .manSign': function() {
    primaryDB.update(this._id, {
      $set: {
        signIn: moment().format("H:mm  YYYYMMDD")
      }
    });
    bootbox.alert("Signed in.")
  }
})

Template.yourself.events({
  'click .signOut': function() {
    let co = Meteor.user().emails[0].address;
    console.log(co);
    let cmpny = " ";

    if (co.includes("bravo")) {
      cmpny = "bravo";
    }
    if (co.includes("alpha")) {
      cmpny = "alpha";
    }

    let pCAC = $('[name="primaryCAC"]').val();

    let dest = " ";

    if ($('#a').hasClass('active')) {
      dest = dest + " Small Px";
    }
    if ($('#c').hasClass('active')) {
      dest = dest + " McLaughlin Gym";
    }
    if ($('#d').hasClass('active')) {
      dest = dest + " Religious Services";
    }
    if (dest == " ") {
      bootbox.alert("Please select a destination.");
      return;
    }

    if (phoneDB.findOne({
        CAC: pCAC
      })) {
      pOne = phoneDB.findOne({
        CAC: pCAC
      }).Phone;
    } else {
      bootbox.alert("Error: No phone number found. Please register as new user.");
    }

    //epdid_one
    let epdid_one = $('[name="primaryCAC"]').val().substring(8, 15);
    epdid_one = parseInt(epdid_one, 32);

    if (primaryDB.find({
        primaryCAC: pCAC,
        sdoDate: moment().format("YYYYMMDD"),
        signIn: null
      }).count() > 0) {
      bootbox.alert(pCAC.substring(35, 50).trim() + " already have signed out. Sign back in!");
      return;
    }




    primaryDB.insert({
      primaryCAC: $('[name="primaryCAC"]').val(),
      secondaryCAC: 'All by yourself',
      thirdCAC: 'All by yourself',
      firstName: pCAC.substring(35, 50) + pCAC.substring(15, 16),
      secondName: 'No Buddy',
      thirdName: null,
      destination: dest,
      epdid_one: epdid_one,
      epdid_two: "Single Entry",
      epdid_three: "Single Entry",
      signOut: moment().format("H:mm  YYYYMMDD"),
      sdoDate: moment().format("YYYYMMDD"),
      phoneOne: pOne,
      phoneTwo: null,
      phoneThree: null,
      logDate: new Date(),
      totalOut: 1,
      company: cmpny
    })
    Router.go('/');
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
  },
  'click .sub': function(event){
      event.preventDefault();
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();
      Meteor.loginWithPassword(email, password);

      setTimeout(function() {
        location.reload();
      }, 1500);

  }
})
