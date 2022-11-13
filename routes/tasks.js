var User = require('../models/user.js');
var Task = require('../models/task.js');

module.exports = function(router) {
    var taskRoute = router.route('/tasks');

    taskRoute.get(function(req, res) {
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

        Task.find(where)
        .sort(sort)
        .select(select)
        .skip(skip)
        .limit(limit)
        .then(function (data) {
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
        .catch(function (err) {
            return res.status(500).send({
                message: 'sever error',
                data: []
            });
        });
    });

    taskRoute.post(function (req, res) {
        var task = new Task();

        if (!req.body.name || req.body.name === undefined) {
            return res.status(400).send({
                message: 'missing name',
                data: []
            });
        } else {
            task.name = req.body.name;
        }

        if (!req.body.deadline || req.body.deadline === undefined) {
            return res.status(400).send({
                message: 'missing deadline',
                data: []
            });
        } else {
            task.deadline = req.body.deadline;
        }

        if (!req.body.description || req.body.description === undefined) {
            task.description = "no description";
        } else {
            task.description = req.body.description;
        }

        if (!req.body.completed || req.body.completed === undefined) {
            task.completed = false;
        } else {
            task.completed = req.body.completed;
        }

        if (!req.body.assignedUser || req.body.assignedUser === undefined || req.body.assignedUser.length === 0) {
            task.assignedUser = "";
            task.assignedUserName = "unassigned";

            task.save()
            .then(task => {
                return res.status(201).send({
                    message: 'created',
                    data: task
                });
            })
            .catch(err => {
                return res.status(500).send({
                    message: 'sever error',
                    data: []
                });
            });
        } else {
            User.findById(req.body.assignedUser)
            .then(found => {
                if (!found)  {
                    task.assignedUser = "";
                    task.assignedUserName = "unassigned";

                    task.save()
                    .then(task => {
                        return res.status(201).send({
                            message: 'created',
                            data: task
                        });
                    })
                    .catch(err => {
                        return res.status(500).send({
                            message: 'sever error',
                            data: []
                        });
                    });
                } else {
                    task.assignedUser = found.id;
                    task.assignedUserName = found.name;

                    task.save()
                    .then(task => {
                        if (task.assignedUser !== ""){
                            User.findByIdAndUpdate(task.assignedUser, {$addToSet: {"pendingTasks": task._id}})
                            .catch(err => {
                            });
                        }
                        return task;
                    })
                    .then(task => {
                        return res.status(201).send({
                            message: 'created',
                            data: task
                        });
                    })
                }
            })
            .catch(err => {});
        }
    });


    return router;
}