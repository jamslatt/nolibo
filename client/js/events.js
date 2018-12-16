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

    // If too short
    if (pCAC.length < 89) {
      pCAC = " " + pCAC;
    } else if (sCAC.length < 89) {
      sCAC = " " + sCAC;
    } else if (tCAC.length < 89) {
      tCAC = " " + tCAC;
    }


    if (pCAC == sCAC) {
      bootbox.alert("You cannot sign out with yourself.");
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
      bootbox.prompt({
          title: pCAC.substring(35, 50) + " enter your phone number:",
          callback: function (result) {
            pOne = result;

            if (!(phoneDB.findOne({CAC: pCAC}))) {
              phoneDB.insert({
                CAC: pCAC,
                Phone: pOne
              })
            }
            return;
          }
      });
    }

    // Fetch second phone number
      if (phoneDB.findOne({
          CAC: sCAC
        })) {
        pTwo = phoneDB.findOne({
          CAC: sCAC
        }).Phone;
      } else {
        bootbox.prompt({
            title: sCAC.substring(35, 50) + " enter your phone number:",
            callback: function (result) {
              pTwo = result;

              if (!(phoneDB.findOne({CAC: sCAC}))) {
                phoneDB.insert({
                  CAC: sCAC,
                  Phone: pTwo
                })
              }
              return;
            }
        });
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
