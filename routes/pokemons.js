var User = require('../models/user.js');
var Pokemon = require('../models/pokemon.js');

module.exports = function(router) {
    var pokemonsRoute = router.route('/pokemons');
    //GET finished
    pokemonsRoute.get(function(req, res) {
        Pokemon.find(eval("(" + req.query.where + ")")).sort(eval("(" + req.query.sort + ")")).select(eval("(" + req.query.select + ")")).skip(eval("(" + req.query.skip + ")")).limit(eval("(" + req.query.limit + ")")).exec()
        .then((data) => {
            if(req.query.count) {
                return res.status(200).send({
                    message: 'Count pokemons',
                    data: data.length
                });
            } else {
                return res.status(200).send({
                    message: 'OK',
                    data: data.map(s => s.id)
                });
            }
        })
        .catch((err) => {
            return res.status(500).send({
                message: 'Server Error',
                data: []
            });
        });
    });
    
    pokemonsRoute.post(function(req,res) {
        var pokemon = new Pokemon();
        pokemon.pokemon_id = req.body.pokemon_id;
        pokemon.identifier = req.body.identifier;
        pokemon.species_id = req.body.species_id;
        pokemon.height = req.body.height;
        pokemon.weight = req.body.weight;
        pokemon.base_experience = req.body.base_experience;
        pokemon.order = req.body.order;
        pokemon.is_default = req.body.is_default;
        pokemon.save()
        try{
            return res.status(201).send({
                message: 'created',
                data: pokemon
            });
        } catch {
            return res.status(500).send({
                message: 'Server Error',
                data: []
            });
        }
    });

    // pokemonsRoute.post(function (req, res) {
    //     var task = new Task();

    //     if (!req.body.name || req.body.name === undefined) {
    //         return res.status(400).send({
    //             message: 'missing name',
    //             data: []
    //         });
    //     } else {
    //         task.name = req.body.name;
    //     }

    //     if (!req.body.deadline || req.body.deadline === undefined) {
    //         return res.status(400).send({
    //             message: 'missing deadline',
    //             data: []
    //         });
    //     } else {
    //         task.deadline = req.body.deadline;
    //     }

    //     if (!req.body.description || req.body.description === undefined) {
    //         task.description = "no description";
    //     } else {
    //         task.description = req.body.description;
    //     }

    //     if (!req.body.completed || req.body.completed === undefined) {
    //         task.completed = false;
    //     } else {
    //         task.completed = req.body.completed;
    //     }

    //     if (!req.body.assignedUser || req.body.assignedUser === undefined || req.body.assignedUser.length === 0) {
    //         task.assignedUser = "";
    //         task.assignedUserName = "unassigned";

    //         task.save()
    //         .then(task => {
    //             return res.status(201).send({
    //                 message: 'created',
    //                 data: task
    //             });
    //         })
    //         .catch(err => {
    //             return res.status(500).send({
    //                 message: 'sever error',
    //                 data: []
    //             });
    //         });
    //     } else {
    //         User.findById(req.body.assignedUser)
    //         .then(found => {
    //             if (!found)  {
    //                 task.assignedUser = "";
    //                 task.assignedUserName = "unassigned";

    //                 task.save()
    //                 .then(task => {
    //                     return res.status(201).send({
    //                         message: 'created',
    //                         data: task
    //                     });
    //                 })
    //                 .catch(err => {
    //                     return res.status(500).send({
    //                         message: 'sever error',
    //                         data: []
    //                     });
    //                 });
    //             } else {
    //                 task.assignedUser = found.id;
    //                 task.assignedUserName = found.name;

    //                 task.save()
    //                 .then(task => {
    //                     if (task.assignedUser !== ""){
    //                         User.findByIdAndUpdate(task.assignedUser, {$addToSet: {"pendingTasks": task._id}})
    //                         .catch(err => {
    //                         });
    //                     }
    //                     return task;
    //                 })
    //                 .then(task => {
    //                     return res.status(201).send({
    //                         message: 'created',
    //                         data: task
    //                     });
    //                 })
    //             }
    //         })
    //         .catch(err => {});
    //     }
    // });


    return router;
}