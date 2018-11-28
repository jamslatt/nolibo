import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Roles.addUsersToRoles('Gk8qdHDm9Jev8CQKK', ['admin'])
  Roles.addUsersToRoles('NmdYk9hdiRYWj2a26', ['admin','super-admin'])

Accounts.config({
  forbidClientAccountCreation : true
});


});
