Router.configure({
    layoutTemplate: 'base'
});

// URL Routes
Router.route('/', function() {
  if (Meteor.user()) {
    this.render('home');
  }
  else {
    this.render('login');
  }
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
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

Router.route('/offbase', function() {
  if (Meteor.user()) {
    this.render('signOutOffBase');
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
Router.route('/print/:_id', function() {
  this.layout('print');
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

Router.route('/n/:_id', function () {
    this.render('byname', {
        data: function () {
          return primaryDB.findOne({ $or: [ { epdid_one: this.params._id, signIn: null, sdoDate: moment().format("YYYYMMDD") }, { epdid_two: this.params._id, signIn: null, sdoDate: moment().format("YYYYMMDD") } , { epdid_one: this.params._id, signIn: null, sdoDate: moment().format("YYYYMMDD")}]});
        }
    });
    Router.onAfterAction(function () {
        document.title = "No Libo!"
    })
});

Router.route('/d/:_id', function () {
    this.render('sdoHistory', {
        data: function () {
            return primaryDB.find({ sdoDate: this.params._id });
        }
    });
    Router.onAfterAction(function () {
        document.title = "No Libo!"
    })
});

Router.route('/manual', function() {
  this.render('manual');
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});

Router.route('/search/:_id', function () {
    this.render('marDetail', {
        data: function () {
            return this.params._id;
        }
    });
    Router.onAfterAction(function () {
        document.title = "No Libo!"
    })
});

Router.route('/si/:_id', function () {
    this.render('signInVerify', {
        data: function () {
            return primaryDB.findOne({ _id: this.params._id });
        }
    });
    Router.onAfterAction(function () {
        document.title = "No Libo!"
    })
});

Router.route('/intake', function() {
  this.render('intake');
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
