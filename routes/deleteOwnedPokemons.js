var User = require('../models/user.js');
var Pokemon = require('../models/pokemon.js');
const pokemon = require('../models/pokemon.js');

module.exports = function (router) {
    var deleteOwnedPokemonRoute = router.route('/deleteOwnedPokemon/:id');

    deleteOwnedPokemonRoute.delete(function(req, res) {
        var pokemonToDelete = req.body.pokemonToDelete;

        var forLoop = new Promise((resolve, reject) => {
            pokemonToDelete.forEach(async pokemon => {
                Pokemon.findById(pokemon)
                .then(async found => {
                    await User.findByIdAndUpdate(req.params.id, {$pull: {"ownedPokemons": found._id}})
                })
                .catch(err => {});
            });
        });
        
        User.findById(req.params.id)
        .then(found => {
            return res.status(201).send({
                message: 'deleted',
                data: found
            });
        });
    });

    return router;
}