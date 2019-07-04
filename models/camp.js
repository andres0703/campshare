var mongoose = require('mongoose')
const keys = require('../config/keys')
mongoose.connect(keys.mongoUri, { useNewUrlParser: true })

var campSchema = new mongoose.Schema({
	  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})
module.exports = mongoose.model('Camp', campSchema)
