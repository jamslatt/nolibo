Router.configure({
    layoutTemplate: 'base'
});

// URL Routes
Router.route('/', function() {
  if (Meteor.user()) {
    if (Roles.userIsInRole(Meteor.user(), ['admin', 'superadmin'])) {
      this.render('adminHome')
    }
    else {
      this.render('home');
    }

  }
  else {
    this.render('login');
  }
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});


Router.route('/sdo', function() {
  if (Meteor.user()) {
    this.render('sdo');
  }
  else {
    this.render('login');
  }
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});

Router.route('/student/manage', function() {
  if (Meteor.user()) {
    this.render('studentManager');
  }
  else {
    this.render('login');
  }
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});

Router.route('/student/bulkcheckout', function() {
  if (Meteor.user()) {
    this.render('bulkCheckout');
  }
  else {
    this.render('login');
  }
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});


Router.route('/roomkey/:_id', function () {
    if (Meteor.user()) {
      this.render('studentCheckout', {
          data: function () {
            let key = parseInt(this.params._id);
            return phoneDB.findOne({ RoomKeySerial: key });
          }
      });
    }
    else {
      this.render('login');
    }
    Router.onAfterAction(function () {
        document.title = "No Libo!"
    })
});

Router.route('/in', function() {
  if (Meteor.user()) {
    this.render('signIn');
  }
  else {
    this.render('login');
  }
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});

// Class Mangagment

Router.route('/class/:_id', function() {
  if (Meteor.user()) {
    this.render('classManager', {
        data: function () {
          return classDB.findOne({ _id: this.params._id });
        }
    });
  }
  else {
    this.render('login');
  }
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});

Router.route('/new/class', function() {
  if (Meteor.user()) {
    this.render('newClass');
  }
  else {
    this.render('login');
  }
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});

Router.route('/out', function() {
  if (Meteor.user()) {
    this.render('signOut');
  }
  else {
    this.render('login');
  }
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});

Router.route('/out/single', function() {
  if (Meteor.user()) {
    this.render('yourself');
  }
  else {
    this.render('login');
  }
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});


Router.route('/print/:_id', function() {
  if (Meteor.user()) {
    this.layout('print');
  }
  else {
    this.render('login');
  }
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});

Router.route('/purge', function() {
  if (Meteor.user()) {
    this.render('purge');
  }
  else {
    this.render('login');
  }
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});

Router.route('/keys/out', function() {
  if (Meteor.user()) {
    this.render('keysOut');
  }
  else {
    this.render('login');
  }
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});

Router.route('/pchange', function() {
  if (Meteor.user()) {
    this.render('phoneChange');
  }
  else {
    this.render('login');
  }
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});

Router.route('/n/:_id', function () {
    if (Meteor.user()) {
      this.render('byname', {
          data: function () {
            return primaryDB.findOne({ $or: [ { epdid_one: this.params._id, signIn: null, sdoDate: moment().format("YYYYMMDD") }, { epdid_two: this.params._id, signIn: null, sdoDate: moment().format("YYYYMMDD") } , { epdid_three: this.params._id, signIn: null, sdoDate: moment().format("YYYYMMDD")}]});
          }
      });
    }
    else {
      this.render('login');
    }
    Router.onAfterAction(function () {
        document.title = "No Libo!"
    })
});

Router.route('/d/:_id', function () {
    if (Meteor.user()) {
      this.render('sdoHistory', {
          data: function () {
              return primaryDB.find({ sdoDate: this.params._id });
          }
      });
    }
    else {
      this.render('login');
    }
    Router.onAfterAction(function () {
        document.title = "No Libo!"
    })
});

Router.route('/manual', function() {
  if (Meteor.user()) {
    this.render('manual');
  }
  else {
    this.render('login');
  }
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});

Router.route('/view/:_id', function () {

  if (Meteor.user()) {
    this.render('marDetail', {
        data: function () {
            return phoneDB.findOne({edipi: parseInt(this.params._id)});
        }
    });
  }
  else {
    this.render('login');
  }
    Router.onAfterAction(function () {
        document.title = "No Libo!"
    })
});


Router.route('/intake', function() {
  if (Meteor.user()) {
    this.render('intake');
  }
  else {
    this.render('login');
  }
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});


Router.route('/login', function() {
  this.render('login');
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});
