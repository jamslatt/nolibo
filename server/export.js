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

    },
    /*'publishAll': function(doc) {
      Meteor.publish('primaryDB', function(group) {
        if (this.userId) {
          return primaryDB.find({'signOut': { $lt: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))}});
        }
      });
    }*/
})
