// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    ownedPokemons: [String],
    dateCreated: {type: Number},
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
