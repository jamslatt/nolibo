import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Roles.addUsersToRoles('Gk8qdHDm9Jev8CQKK', ['admin'])
  Roles.addUsersToRoles('mjr5BrH63iXrWngQs', ['admin','super-admin'])

Accounts.config({
  forbidClientAccountCreation : true
});


});
