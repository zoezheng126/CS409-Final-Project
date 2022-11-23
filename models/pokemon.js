// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var pokemonSchema = new mongoose.Schema({
    pokemon_id: {type: String},
    identifier : {type: String},
    species_id: {type: Number},
    height: {type: Number},
    weight: {type: Number},
    base_experience: {type: Number},
    order: {type: Number},
    is_default: {type: Number},
    // ownedUsers: {type: [String]},
    // worthPoints: {type: Number, required: true},
});

// Export the Mongoose model
module.exports = mongoose.model('Pokemon', pokemonSchema);
