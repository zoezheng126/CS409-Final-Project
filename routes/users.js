var User = require('../models/user.js');
var Task = require('../models/task.js');

module.exports = function (router) {
    var userRoute = router.route('/users');

    userRoute.get(function (req, res) {
        var where = {};
        if (req.query.where) {
            where = JSON.parse(req.query.where);
        }

        var sort = {};
        if (req.query.sort) {
            sort = JSON.parse(req.query.sort);
        }

        var select = {};
        if (req.query.select) {
            select = JSON.parse(req.query.select);
        }

        var skip = 0;
        if (req.query.skip) {
            skip = JSON.parse(req.query.skip);
        }

        var limit = 0;
        if (req.query.limit) {
            limit = JSON.parse(req.query.limit);
        }

        User.find(where)
        .sort(sort)
        .select(select)
        .skip(skip)
        .limit(limit)
        .then(data => {
            if (req.query.count) {
                return res.status(200).send({
                    message: 'success',
                    data: data.length
                });
            } else {
                return res.status(200).send({
                    message: 'success',
                    data: data
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

    userRoute.post(function (req, res) {
        var user = new User();

        if (!req.body.name || req.body.name === undefined || !req.body.email || req.body.email === undefined) {
            return res.status(400).send({
                message: 'missing name or email',
                data: []
            });
        }

        user.name = req.body.name;

        User.findOne({email: req.body.email})
        .then(function (found) {
            if (found) {
                return res.status(400).send({
                    message: 'email already exists',
                    data: []
                });
            } else {
                user.email = req.body.email;
                user.pendingTasks = [];

                var promises = [];
                if (req.body.pendingTasks && req.body.pendingTasks !== undefined) {
                    req.body.pendingTasks.forEach(id => {
                        var task = Task.findById(id);
                        if (task != null) {
                            promises.push(task);
                        }
                    })
                }

                Promise.all(promises)
                .then(tasks_ => {
                    tasks_.forEach(function (task) {
                        user.pendingTasks.push(task.id);
                    });
                });

                user.save()
                .then(user => {
                    Task.updateMany({"_id":{$in: user.pendingTasks}}, {$set:{"assignedUser": user._id, "assignedUserName": user.name}});
                })
                
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

    return router;
}