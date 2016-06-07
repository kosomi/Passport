var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Log in' });
}); 
 
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Create an Account' });
}); 
 
router.get('/dashboard', function(req, res, next) {
	if(!req.user){
		req.flash('error', 'You are not logged in');
		res.render('login', {title:'Please Log In'});
	} else {
		res.render('dashboard', {title:'Dashboard', layout:"dashboard_layout"});
	} 
});
 
router.post('/register', function(req, res, next) {

	var name 			= req.body.name;
	var email			= req.body.email;
	var username		= req.body.username;
	var password		= req.body.password;
	var password2		= req.body.password2;

	req.checkBody('name', 'Name field is requried').notEmpty();
	req.checkBody('email', 'Name field is requried').notEmpty();
	req.checkBody('email', 'Name field is requried').isEmpty();
	req.checkBody('username', 'Name field is requried').notEmpty();
	req.checkBody('password', 'Name field is requried').notEmpty();
	req.checkBody('password2', 'Name field is requried').notEmpty(); 

	var errors = req.validationErrors();

	if(errors){
		res.render('register', { 
		  	errors: errors 
		  }); 
	}	else {
		passport.authenticate('local-register', {
				 successRedirect: '/dashboard',
                 failureRedirect: '/',
                 failureFlash: true 
             })(req, res, next)
	}
}); 

router.post('/login', function(req, res){
	var username = req.body.username;
	var password = req.body.password;

	passport.authennticate('local-login', {
		successRedirect: '/dashboard', 
		failureRedirect: '/',
		failureFlash: true
	})(req, res, next);
})  

 
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success','You are now logged out');
  res.redirect('/');
});

module.exports = router; 