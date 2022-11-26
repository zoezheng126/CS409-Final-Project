var User = require('../models/user.js');
var Pokemon = require('../models/pokemon.js');

module.exports = function(router) {
    var GetPokeRoute = router.route('/getOwnedPokemons/:id');

    GetPokeRoute.get(function(req, res) {
        User.findById(req.params.id)
        .then(found => {
            if(found === null) {
                return res.status(404).send({
                    message: 'id not found',
                    data: []
                });
            } else {
                return res.status(200).send({
                    message: 'success',
                    data: found
                });
            }
        })
        .catch(err => {
            return res.status(500).send({
                message: 'sever error',
                data: []
            });
        });
    });
    return router;
}