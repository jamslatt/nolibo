// Scubscribe
Meteor.subscribe('classDB');


// Create a new class
Template.newClass.events({
  'click .create': function() {

   // Define
   require('bootstrap');
   require('jquery');
   require('bootbox');

    let number = $('[name="number"]').val();
    let school = $('[name="school"]').val();
    let fa = $('[name="fa"]').val();
    let grad = $('[name="grad"]').val();
    let ids = $('#edipiList').val().split('\n');

    if (number == null || school == null || fa == null || grad == null || ids == null) {
      bootbox.alert("Please ensure all the fields are filled in.");
      return;
    }

    let co = Meteor.user().emails[0].address;
    let cmpny = " ";

    if (co.includes("bravo")) {
      cmpny = "bravo";
    }
    if (co.includes("alpha")) {
      cmpny = "alpha";
    }


    // Add class number to each student record
    let count = 0;
    let bad = 0;

    for(var i = 0;i < ids.length;i++){
        let g = parseInt(ids[i]);

        if(phoneDB.findOne({edipi: g})) {
          student = phoneDB.findOne({ edipi: g})._id;

          phoneDB.update(student, {
            $set:  {
              classNumber: number
            }
          }, function(error, result) {
            if (error) {
              console.log(error)
            }
            else {
              count++;
            }
          })
        }
        else {
          bad++;
        }
    }
    // Finish up
    classDB.insert({
      classNumber: number,
      mos: school,
      company: cmpny,
      facultyAdvisor: fa,
      gradDate: grad
    }, function(error, result) {
      if (error) {
        console.log(error);
      } else {
        if (bad > 0) {
          bootbox.alert("New class created with " + count + " students! " + bad + " students records failed to be located and could not be added to the class. Make sure they have registered in the system.");
        }
        else {
          bootbox.alert("New class created with " + count + " students!");
        }
      }
    });
  }
})

Template .classManager.events({
  'click .archive': function() {
    let confirm = window.prompt("Type the class number into the box to confirm you want to DELETE the class and its studnets.");
    if (confirm == this.classNumber) {
      Meteor.call('archiveClass',this.classNumber);
    }
  },
  'click .checkout': function() {
    let confirm = window.prompt("Enter the Students class number to confirm you want to DELETE this student from NoLibo.");
    if (confirm == this.classNumber) {
      phoneDB.remove(this._id);
    }
  }
})

Template.classManager.helpers({
  classes: ()=> {
      return classDB.find({});
  },
  classSize: ()=> {
    let id = Iron.Location.get().path.substring(7,50);
    let cn = classDB.findOne({_id: id}).classNumber;

    return phoneDB.find({classNumber: cn}).count();
  },
  students: ()=> {
    let id = Iron.Location.get().path.substring(7,50);
    let cn = classDB.findOne({_id: id}).classNumber;

    return phoneDB.find({classNumber: cn});
  }
})

Template.marDetail.events({
  'click .save': function(event) {
    let uName = $('[name="Name"]').val();
    let uDOB = $('[name="DOB"]').val();
    let uPhone = $('[name="Phone"]').val();
    let uRoomKeySerial = $('[name="RoomKeySerial"]').val();
    let uClassNumber = $('[name="classNumber"]').val();
    let uNotes = $('#adminNotes').val();

    phoneDB.update(this._id,{
      $set: {
        Name: uName,
        DOB: uDOB,
        Phone: uPhone,
        RoomKeySerial: uRoomKeySerial,
        classNumber: uClassNumber,
        Notes: uNotes
      }
    })

    bootbox.alert("Saved Student Data");

  }
})
