var mongoose = require('mongoose');

var FaveSchema = mongoose.Schema({

		artist: String,
		title:  String,
		album: String,
		url: String
	
  // ,
  // favedBy: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'User'
	// }
})


var Fave = module.exports = mongoose.model('Fave', FaveSchema)
