var User = require('../models/user.js');
var Pokemon = require('../models/pokemon.js');
const pokemon = require('../models/pokemon.js');

module.exports = function (router) {
    var addOwnedPokemonRoute = router.route('/addOwnedPokemon/:id');

    addOwnedPokemonRoute.put(function(req, res) {
        var pokemonToAdd = req.body.pokemonToAdd;
        pokemonToAdd.forEach(async pokemon => {
            Pokemon.findById(pokemon)
            .then(async found => {
                await User.findByIdAndUpdate(req.params.id, {$addToSet: {"ownedPokemons": found._id}})
            })
            .catch(err => {});
        });
        
        User.findById(req.params.id)
        .then(found => {
            return res.status(201).send({
                message: 'added',
                data: found
            });
        });
    });

    return router;
}