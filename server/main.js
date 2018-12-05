import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  Roles.addUsersToRoles('Gk8qdHDm9Jev8CQKK', ['admin'])
  Roles.addUsersToRoles('mjr5BrH63iXrWngQs', ['admin','super-admin'])

/*Accounts.config({
  forbidClientAccountCreation : true
});*/

Accounts.createUser({email: 'admin@bravo.co', password : 'MarD3t_Bco'});
Accounts.createUser({email: 'connect@bravo.co', password : 'FtN3verLe4ve'});
Accounts.createUser({email: 'super@bravo.co', password : 'FtM4rD3t_nolibo'});


});
