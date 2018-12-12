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
    let x = confirm("Are you sure you want to Disconnect from server? NoLibo will not function.");
    if (x)
      Meteor.logout();
    else
      alert("Canceled Disconnect.")


  }
})


Template.purge.events({
  'click .purge': function() {
    let pCAC = $('[name="purgeCAC"]').val();

    //  Meteor.call('purge', pCAC);

    Meteor.call('purge', pCAC, (error, result) => {
      if (error) {
        alert(error);
      }

    });



    alert("Removed all records for " + pCAC.substring(35, 55));

    $('[name="purgeCAC"]').val(null);

  }
})

Template.signOut.events({
  'click .pChange': function(event) {
    let cac = window.prompt("Scan your CAC",null);
    //let oldPhone = phoneDB.findOne({CAC: cac}).Phone;
    let phone = window.prompt("Enter the new phone number...", )
  },
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

    let epdid_one = $('[name="primaryCAC"]').val().substring(8,15);
    epdid_one = parseInt(epdid_one, 32);

    let epdid_two = $('[name="secondaryCAC"]').val().substring(8,15);
    epdid_two = parseInt(epdid_two, 32);

    // If too short
    if (pCAC.length < 89) {
      pCAC = " " + pCAC;
    }
    else if (sCAC.length < 89) {
      sCAC = " " + sCAC;
    }
    else if (tCAC.length < 89) {
      tCAC = " " + tCAC;
    }


    if (pCAC == sCAC) {
      alert("You cannot sign out with yourself.");
      return;
    }


    let dest = $('[name="destination"]').val();

    let epdid_three = "";
    let pThree = "";

    if (phoneDB.find({
        CAC: tCAC
      }).count() > 0) {
      pThree = phoneDB.findOne({
        CAC: tCAC
      }).Phone;
      out++;
      epdid_three = $('[name="thirdCAC"]').val().substring(8,15);
      epdid_three = parseInt(epdid_three, 32);
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
      pOne = window.prompt(pCAC.substring(35, 50).trim() + " enter a phone number..");
      if (!(phoneDB.findOne({ CAC: pCAC}))) {
        phoneDB.insert({
          CAC: pCAC,
          Phone: pOne
        })
      }
    }

    if (phoneDB.findOne({
        CAC: sCAC
      })) {
      pTwo = phoneDB.findOne({
        CAC: sCAC
      }).Phone;
    } else {
      pTwo = window.prompt(sCAC.substring(35, 50).trim() + " enter a phone number..");
      if (!(phoneDB.findOne({ CAC: sCAC}))) {
        phoneDB.insert({
          CAC: sCAC,
          Phone: pTwo
        })
      }
    }

    // Prevent Doubble Sign Out
    if (primaryDB.find({ primaryCAC: pCAC, sdoDate: moment().format("YYYYMMDD"), signIn: null }).count() > 0) {
      alert(pCAC.substring(35, 50).trim() + " already have signed out. Sign back in!");
      return;
    }
    else if (primaryDB.find({ secondaryCAC: sCAC, sdoDate: moment().format("YYYYMMDD"), signIn: null }).count() > 0) {
      alert(sCAC.substring(35, 50).trim() + "You already have signed out. Sign back in!");
      return;
    }
    else if (primaryDB.find({ thirdCAC: tCAC, sdoDate: moment().format("YYYYMMDD"), signIn: null }).count() > 0) {
      alert(tCAC.substring(35, 50).trim() + "You already have signed out. Sign back in!");
      return;
    }

    // Insert record into DB
    if (goodToGo) {
      primaryDB.insert({
        primaryCAC: pCAC,
        secondaryCAC: sCAC,
        thirdCAC: tCAC,
        firstName: pCAC.substring(35, 50) + pCAC.substring(15,16),
        secondName: sCAC.substring(35, 50) + sCAC.substring(15,16),
        thirdName: tCAC.substring(35, 50) + tCAC.substring(15,16),
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
          alert(error);
        }
        else {
          alert("Successfully signed out!");
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
      alert("Try rescanning the first CAC.");
      return;
    }
    if (this.secondaryCAC.toUpperCase() != sCAC.toUpperCase()) {
      allPresent = false;
      alert("Try rescanning the second CAC.");
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
      }, function(error, result){
        if (error) {
          alert(error);
        }
        else {
          alert("Successfully signed back in.")
        }
      });


    }

    Router.go('/');

  }
})


Template.manual.events({
  'click .signOut' : function() {
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
      totalOut: window.prompt("How many are leaving? 2 or 3?", 2)
    })
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


  },
  'click .manSign': function() {
    primaryDB.update(this._id, {
      $set: {
        signIn: moment().format("H:mm  YYYYMMDD")
      }
    });
    alert("Signed in.")
  },
  'click .remove': function() {
    let x = window.confirm("Are you sure you want to delete this record?");
    if (x)
      primaryDB.remove(this._id);

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
