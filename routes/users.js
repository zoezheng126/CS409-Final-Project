var User = require('../models/user.js');
var Pokemon = require('../models/pokemon.js');
const pokemon = require('../models/pokemon.js');

module.exports = function (router) {
    var userRoute = router.route('/users');

    userRoute.get(function (req, res) {
        User.find(eval("(" + req.query.where + ")")).sort(eval("(" + req.query.sort + ")")).select(eval("(" + req.query.select + ")")).skip(eval("(" + req.query.skip + ")")).limit(eval("(" + req.query.limit + ")")).exec()
        .then((data) => {
            if(req.query.count) {
                return res.status(200).send({
                    message: 'count users',
                    data: data.length
                });
            }
            return res.status(200).send({
                message: 'OK',
                data: data
            });
        })
        .catch((err) => {
            return res.status(500).send({
                message: 'Server Error',
                data: []
            });
        });
    });

    userRoute.post(function (req, res) {
        var user = new User();

        if (!req.body.name || req.body.name === undefined || !req.body.password || req.body.password === undefined) {
            return res.status(400).send({
                message: 'missing username or password',
                data: []
            });
        }

        User.findOne({name: req.body.name})
        .then(async function (found) {
            if (found) {
                return res.status(400).send({
                    message: 'username already exists',
                    data: []
                });
            } else {
                user.name = req.body.name;
                user.password = req.body.password;
                user.ownedPokemons = [];

                if (req.body.ownedPokemons && req.body.ownedPokemons !== undefined) {
                    req.body.ownedPokemons.forEach(async (id) => {
                        Pokemon.findById(id)
                        .then(async found => {
                            user.ownedPokemons.push(found._id);
                        });
                    })
                }

                user.save()
                .then(user_ => {
                    if (user.ownedPokemons) {
                        User.findByIdAndUpdate(user_._id, {$addToSet: {"ownedPokemons": user.ownedPokemons}})
                        .catch(err => {
                        });
                    }
                    return user_;
                })
                .then(user_ => {
                    return res.status(201).send({
                        message: 'created',
                        data: user_
                    });
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