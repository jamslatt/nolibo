import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  //Roles.addUsersToRoles('cJCj5icMSvuQh9BQW', ['admin'])
  //Roles.addUsersToRoles('M2qWTvyTizCNE4xM6', ['admin','super-admin'])

Accounts.config({
  //forbidClientAccountCreation : true
});


});
