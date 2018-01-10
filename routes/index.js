var express = require('express');
var mongoose = require('mongoose')
var router = express.Router();
var User = require('../models/user')
var Fave = require('../models/fave')

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

router.put('/', function(req, res){
	User.findOne({_id: req.user._id}, function(err, user){
		if (err) {
			console.log(err)
		} else {
			var artist = req.body.artist
			var title = req.body.song
			var album = req.body.album
			var url = req.body.url
			var newFave = new Fave({
				artist: artist,
				title: title,
				album: album,
				url: url
			})
			user.faves.push(newFave)
			user.save(function(err){
				if (!err) {
					console.log('success')
				}
			})
		}
	})
})

router.get('/faves', function(req, res){
	User.findOne({email: req.user.email}, function(err, user){
		if (err) {
			console.log(err)
		} else {
			res.render('faves', { faves: user.faves, user: user })
		}
	})
})

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
