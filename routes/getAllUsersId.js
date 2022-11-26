var User = require('../models/user.js');
var Pokemon = require('../models/pokemon.js');

module.exports = function(router) {
    var usersIdRoute = router.route('/getAllUsersId');
    //GET finished
    usersIdRoute.get(function(req, res) {
        User.find(eval("(" + req.query.where + ")")).sort(eval("(" + req.query.sort + ")")).select(eval("(" + req.query.select + ")")).skip(eval("(" + req.query.skip + ")")).limit(eval("(" + req.query.limit + ")")).exec()
        .then((data) => {
            if(req.query.count) {
                return res.status(200).send({
                    message: 'Count users',
                    data: data.length
                });
            } else {
                if (req.query.count == 0) {
                    return res.status(200).send({
                        message:'no user in database',
                        data: []
                    })
                }
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
    return router;
}