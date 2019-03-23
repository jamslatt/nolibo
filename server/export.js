Meteor.methods({
    'download': function(date) {
      var collection = primaryDB.find({ sdoDate: date}).fetch();
      var heading = true; // Optional, defaults to true
      var delimiter = ";" // Optional, defaults to ",";
      return exportcsv.exportToCSV(collection, heading, delimiter);
    },
    'archiveClass': function (cn) {
      phoneDB.remove({ classNumber: cn});
      classDB.remove({ classNumber: cn});
    },
})
