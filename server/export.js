Meteor.methods({
    'download': function(date) {
      var collection = primaryDB.find({ sdoDate: date}).fetch();
      var heading = true; // Optional, defaults to true
      var delimiter = ";" // Optional, defaults to ",";
      return exportcsv.exportToCSV(collection, heading, delimiter);
    },
    'purge': function (cac) {
      console.log(cac);
      phoneDB.remove({ CAC: cac });
      primaryDB.remove({ primaryCAC: cac});
      primaryDB.remove({ secondaryCAC: cac});
      primaryDB.remove({ thirdCAC: cac});
      
    }
})
