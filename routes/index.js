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
			console.log(req.body)
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
			console.log(newFave)
			user.faves.push(newFave)
			user.save()
		}
	})
})

router.get('/faves', function(req, res){
	User.find({email: req.user.email}, function(err, user){
		if (err) {
			console.log(err)
		} else {
			console.log(user[0].faves.id('5a54756240e6ec07693ce161').artist)
				}
			})
			// console.log(user.faves.id(ObjectId("5a546dd0318007060a5d6486")))
		// }
	// 	console.log(user.faves.id('5a5469c90bbe5e0526b4d204'))
	// User.find({_id: req.user._id}).exec(function(err, faves){
	// 	if(err){
	// 		console.log(err)
	// 	} else {
	// 		console.log(faves)
	// 	}
	// })

	// console.log(req)
	// User.findOne({_id: req.user._id})
	// .populate('faves')
	// .exec(function(err, user){
	// 	if (err) {
	// 		console.log(err)
	// 	} else {
	// 		console.log(user)
	// 	}
	// })
	// res.render('faves',
	// 	{
	// 		faves: req.user.faves
	// 	}

	// User.findOne({_id: req.user._id}, function(err, user){
	// 	if (err) {
	// 		console.log(err)
	// 	} else {
	// 		faves: user.faves
	// 	}
	// })
	// )
	// })
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
