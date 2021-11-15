var mongoose = require('mongoose');
  
var imageSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
  
  
module.exports = new mongoose.model('Image', imageSchema);