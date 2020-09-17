import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  //Roles.addUsersToRoles('cJCj5icMSvuQh9BQW', ['admin'])
  //Roles.addUsersToRoles('6JuGLw3WcvrjS42XM', ['admin','super-admin'])

Accounts.config({
  //forbidClientAccountCreation : true
});


});
