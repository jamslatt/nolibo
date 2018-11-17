Router.configure({
    layoutTemplate: 'base'
});

// URL Routes
Router.route('/', function() {
  this.render('home');
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});

Router.route('/in', function() {
  this.render('signIn');
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});

Router.route('/out', function() {
  this.render('signOut');
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});

Router.route('/offbase', function() {
  this.render('signOutOffBase');
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});

Router.route('/sdo', function() {
  this.render('sdo');
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});

Router.route('/purge', function() {
  this.render('purge');
  Router.onAfterAction(function() {
    document.title = "No Libo!"
  });
});

Router.route('/n/:_id', function () {
    this.render('byname', {
        data: function () {
            return primaryDB.findOne({ firstName: this.params._id });
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
