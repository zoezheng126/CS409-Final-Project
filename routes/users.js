var User = require('../models/user.js');
var Pokemon = require('../models/pokemon.js');

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
        .then(function (found) {
            if (found) {
                return res.status(400).send({
                    message: 'username already exists',
                    data: []
                });
            } else {
                user.name = req.body.name;
                user.password = req.body.password;
                user.ownedPokemons = [];

                var promises = [];
                if (req.body.ownedPokemons && req.body.ownedPokemons !== undefined) {
                    req.body.ownedPokemons.forEach((id) => {
                        var pokemon = Pokemon.findById(id); //找不到id 我操我操 气死我了
                        if (pokemon != null) {
                            promises.push(pokemon);
                        }
                    })
                }

                Promise.all(promises)
                .then(pokemon_ => {
                    pokemon_.forEach(function (pokemon) {
                        user.ownedPokemons.push(pokemon.id);
                    });
                });

                user.save()
                
                return res.status(201).send({
                    message: 'created',
                    data: user
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

    // userRoute.post(function(req, res) {
	// 	var tmpUser = new User();
    //     if (req.body.name === undefined) {
    //         return res.status(500).send({
    //             message: 'The user without a name',
    //             data: []
    //         });
    //     }
    //     if (req.body.password === undefined) {
    //         return res.status(500).send({
    //             message: 'The user without an password',
    //             data: []
    //         });
    //     }
	// 	User.findOne({name: req.body.name}).exec()
	// 	.then((existUser) => {
	// 		if(existUser === null) {
    //             tmpUser.name = req.body.name;
    //             tmpUser.password = req.body.password;
    //             if (req.body.ownedPokemons === undefined || req.body.ownedPokemons === []) {
    //                 tmpUser.ownedPokemons = [];
    //                 tmpUser.save()
    //                 .then((user)=> {
    //                     return res.status(200).send({
    //                         message: 'User created',
    //                         data: user
    //                     });
    //                 });
    //             } else {    
    //                 var PokeArray = []
    //                 req.body.ownedPokemons.forEach((pokeId) => {
    //                     Pokemon.findById(new ObjectId(pokeId)).exec()
    //                     .then((Id)=>{
    //                         PokeArray.push(Id)
    //                     });    
    //                 }); 
    //                 tmpUser.ownedPokemons = PokeArray;
    //                 tmpUser.save()
                    
    //                 return res.status(200).send({
    //                     message: 'User created with ownedPokemons',
    //                     data: tmpUser
    //                 });
                    
    //             }
	// 		}
	// 		else {
    //             return res.status(500).send({
    //                 message: 'The username already exists', 
    //                 data: []
    //             });
    //         }
 	// 	})
	// 	.catch((err) => {
	// 		return res.status(500).send({message: 'Server error', data: []});
	// 	});
	// });

    return router;
}