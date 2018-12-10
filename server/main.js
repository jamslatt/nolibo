import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Roles.addUsersToRoles('cJCj5icMSvuQh9BQW', ['admin'])
  Roles.addUsersToRoles('6JuGLw3WcvrjS42XM', ['admin','super-admin'])

Accounts.config({
  forbidClientAccountCreation : true
});


// TelegramBot
TelegramBot.token = '571562300:AAGBfkpgNVM9t78enZJaIdEWFHD3dslLNqM';
TelegramBot.start();
TelegramBot.addListener('/help', function(command) {
	var msg = "I have the following commands loaded:\n";
	TelegramBot.triggers.text.forEach(function (post) {
	msg = msg + "- " + post.command + "\n";
	});
	return msg;
});
// You can also get the username via the second argument
TelegramBot.addListener('/in', function(command, username) {

  if (primaryDB.findOne({firstName: "Sanders", secondName: "Slattery", sdoDate: moment().format("YYYYMMDD"), signIn: null})) {
    var x = primaryDB.findOne({firstName: "Sanders", secondName: "Slattery", sdoDate: moment().format("YYYYMMDD"), signIn: null});

    primaryDB.update(x._id, {
      $set: {
        signIn: moment().format("H:mm  YYYYMMDD")
      }
    });
    if (!(primaryDB.findOne({firstName: "Sanders", secondName: "Slattery", sdoDate: moment().format("YYYYMMDD"), signIn: null}))) {
      return "Signed yo bitch ass back in."
    }
  }
  else {
    return "No records found for you boiii... try again."
  }

})


TelegramBot.addListener('/list', function(command) {
  var arr = primaryDB.find({sdoDate: moment().format("YYYYMMDD"), signIn: null}).map(function (doc) {
    return doc.firstName.replace(/\s\s+/g, ' ') + "/" + doc.secondName.replace(/\s\s+/g, ' ') + ": " + doc.signOut + "\n";
  });

  arr.toString();

  return "All records:\n" + arr;
})



TelegramBot.addListener('/out', function(command, username, messageraw) {
    TelegramBot.startConversation(username, messageraw.chat.id, function(username, message, chat_id) {
        var obj = _.find(TelegramBot.conversations[chat_id], obj => obj.username == username);
        switch(obj.stage) {
            case 0:
                obj.location = message;
                obj.stage++;

                primaryDB.insert({
                  primaryCAC: 'N29ASSES1DSHJG7Tyler               Sanders                   B4PUVM00PVT/LCME02BB98BCBFYJ',
                  secondaryCAC: 'NBRNQRGS1DV90SAJames               Slattery                  B4PLVM00PVT/LCME01BB8JBCAQ6M',
                  thirdCAC: null,
                  firstName: 'Sanders',
                  secondName: 'Slattery',
                  thirdName: null,
                  destination: obj.location,
                  epdid_one: '1539886599',
                  epdid_two: '1542751114',
                  epdid_three: null,
                  signOut: moment().format("H:mm  YYYYMMDD"),
                  sdoDate: moment().format("YYYYMMDD"),
                  phoneOne: '2069542184',
                  phoneTwo: '2069542184',
                  phoneThree: null,
                  logDate: new Date(),
                  totalOut: 2,
                  company: 'alpha'
                });


                TelegramBot.send('Alright dickhead, you signed out to  ' + obj.location + '!', chat_id);
                TelegramBot.endConversation(username, chat_id);
                break;
        }
        console.log('Conversation Status: ' + obj);
    }, {stage: 0, location: ""} );
    // The return in this listener will be the first prompt
    return "So you think you rate to sign out? FUCK YOU WHER U GOIN";

});

});
