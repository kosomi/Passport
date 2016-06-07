var LocalStrategy = requrie('passport-local').Strategy;
var User = require('../models/user');
var bcrypt = requrie('bcryptjs');


module.exprots = function(passport){
	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.getUserById(id, function(err, user) {
	    done(err, user);
	  });
	});

	// Login
	passport.use('local-login', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done){
		User.getUserByUsername(username, function(err, user){
			if(err){
				return done(err);
			}
			if(!user){
				req.flash('error', 'User not');
				return done(null, false);
			}
			if(!isValidPassword(user, password)){
				req.flash('error', 'Invalid Password');
				return done(null, false);
			}

			req.flash('success', 'You are now logged in');
			return done(null, user);
		});
	}
	));

	// Register
	passport.use('local-register', new LocalStrategy({
		passReqToCallback: true
	}, function(req, username, password, done){
		findOrCreateUser = function(){
			User.findOne({username: username}, function(err, user){
				if(err){ 
					console.log('Error: ' + err);
					return done(err); }
				if(user){
					console.log('That user already exists');
					return done(null, false, req.flash( 'message', 'Incorrect username.'));
				} else {
					var newUser = new User();

					newUser.username = username;
					newUser.password = createHash(password);
					newUser.email = req.param('email');
					newUser.name = req.param('name');
					newUser.join_date = new Date();

					// Add User
					User.addUser(newUser, function(err, user){
						if(err){
							console.log('Error: ' +err);
							throw err;
						} else {
							req.flash('success','You are now registerd and logged in');
							return done(null, newUser);
						}
					})

				}


				if(!user.validPassword(password)){
					return done(null, false, { message: "Incorrect password." });
				}

				return done(null, user);
			});
		};

		process.nextTick(findOrCreateUser);
	}
	));

	var isValidPassword = function(user, password){
		return bcrypt.compareSync(password, user.password);
	}


	var createHash = function(password){
		return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
	} 
}





