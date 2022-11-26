var User = require('../models/user.js');
var Pokemon = require('../models/pokemon.js');

module.exports = function(router) {
    var GeneratorRoute = router.route('/pokemonGenerator/:id');
    //Generate a pokemon Id the user does not have
    GeneratorRoute.get(function(req, res) {
        Pokemon.find(eval("(" + req.query.where + ")")).sort(eval("(" + req.query.sort + ")")).select(eval("(" + req.query.select + ")")).skip(eval("(" + req.query.skip + ")")).limit(eval("(" + req.query.limit + ")")).exec()
        .then((data) => {
            var Id_list = data.map(s => s.id)
            User.findById(req.params.id).then((user)=>{
                var user_list = user.ownedPokemons;
                user_list.forEach(async (id) => {
                    Id_list = Id_list.filter(e => e!==id);
                });
                
                Promise.all(Id_list).then(()=> {
                    var randomNumber = Math.floor(Math.random()*Id_list.length);
                    return res.status(201).send({
                        meesage: 'here is your new Pokemon!',
                        data: Id_list[randomNumber]
                    })
                })
            })
        })
        .catch((err) => {
            return res.status(500).send({
                message: 'Server Error',
                data: []
            });
        });
    });
    return router;
}