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

    let goodToGo = true;

    let pCAC = $('[name="primaryCAC"]').val();
    let sCAC = $('[name="secondaryCAC"]').val();
    let tCAC = $('[name="thirdCAC"]').val();
    let out = 2;

    let epdid_one = $('[name="primaryCAC"]').val().substring(8,15);
    epdid_one = parseInt(epdid_one, 32);

    let epdid_two = $('[name="secondaryCAC"]').val().substring(8,15);
    epdid_two = parseInt(epdid_two, 32);




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


    if (goodToGo) {
      primaryDB.insert({
        primaryCAC: pCAC,
        secondaryCAC: sCAC,
        thirdCAC: tCAC,
        firstName: pCAC.substring(35, 50),
        secondName: sCAC.substring(35, 50),
        thirdName: tCAC.substring(35, 50),
        destination: dest,
        epdid_one: epdid_one,
        epdid_two: epdid_two,
        epdid_three: epdid_three,
        signOut: new Date(),
        sdoDate: moment().format("YYYYMMDD"),
        phoneOne: pOne,
        phoneTwo: pTwo,
        phoneThree: pThree,
        totalOut: out
      }, function(error, result) {
        if (error) {
          alert(error);
        }
      });
    }

    location.reload();

  }

})

Template.signOutOffBase.events({
  'click .signIn': function(event) {
    event.preventDefault();

    let goodToGo = true;

    let pCAC = $('[name="primaryCAC"]').val();
    let sCAC = $('[name="secondaryCAC"]').val();
    let tCAC = $('[name="thirdCAC"]').val();
    let out = 2;

    let epdid_one = $('[name="primaryCAC"]').val().substring(8,15);
    epdid_one = parseInt(epdid_one, 32);

    let epdid_two = $('[name="secondaryCAC"]').val().substring(8,15);
    epdid_two = parseInt(epdid_two, 32);




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


    if (goodToGo) {
      primaryDB.insert({
        primaryCAC: pCAC,
        secondaryCAC: sCAC,
        thirdCAC: tCAC,
        firstName: pCAC.substring(35, 50),
        secondName: sCAC.substring(35, 50),
        thirdName: tCAC.substring(35, 50),
        destination: dest,
        epdid_one: epdid_one,
        epdid_two: epdid_two,
        epdid_three: epdid_three,
        signOut: new Date(),
        sdoDate: moment().format("YYYYMMDD"),
        phoneOne: pOne,
        phoneTwo: pTwo,
        phoneThree: pThree,
        totalOut: out
      }, function(error, result) {
        if (error) {
          alert(error);
        }
      });
    }

    location.reload();

  }
});

Template.byname.events({
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
      }, function(error, result){
        if (error) {
          alert(error);
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
      signOut: new Date(),
      sdoDate: moment().format("YYYYMMDD"),
      phoneOne: $('[name="fPhone"]').val(),
      phoneTwo: $('[name="sPhone"]').val(),
      phoneThree: $('[name="tPhone"]').val(),
      totalOut: window.prompt("How many are leaving? 2 or 3?", 2)
    })
    Router.go('/sdo');
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
        signIn: new Date()
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
