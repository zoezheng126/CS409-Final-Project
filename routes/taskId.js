var User = require('../models/user.js');
var Task = require('../models/task.js');

module.exports = function(router) {
    var taskIdRoute = router.route('/tasks/:id');

    taskIdRoute.get(function(req, res) {
        Task.findById(req.params.id)
        .then(found => {
            if(found == null) {
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

    taskIdRoute.put(function(req, res) {
        Task.findById(req.params.id)
        .then (async found => {
            if (!found) {
                return res.status(404).send({
                    message: 'id not found',
                    data: []
                });
            } else {
                if (found.assignedUser !== "") {
                    User.findByIdAndUpdate(found.assignedUser, {$pull:{"pendingTasks": found._id}})
                    .catch(err => {
                        return res.status(500).send({
                            message: 'sever error',
                            data: []
                        });
                    });
                }

                var temp = {};

                if (!req.body.name || req.body.name === undefined) {
                    return res.status(400).send({
                        message: 'missing name',
                        data: []
                    });
                } else {
                    temp.name = req.body.name;
                }
        
                if (!req.body.deadline || req.body.deadline === undefined) {
                    return res.status(400).send({
                        message: 'missing deadline',
                        data: []
                    });
                } else {
                    temp.deadline = req.body.deadline;
                }
        
                if (!req.body.description || req.body.description === undefined) {
                    temp.description = "no description";
                } else {
                    temp.description = req.body.description;
                }
        
                if (!req.body.completed || req.body.completed === undefined) {
                    temp.completed = false;
                } else {
                    temp.completed = req.body.completed;
                }

                if (!req.body.assignedUser || req.body.assignedUser === undefined || req.body.assignedUser.length === 0) {
                    temp.assignedUser = "";
                    temp.assignedUserName = "unassigned";
                } else {
                    temp.assignedUser = req.body.assignedUser;
                    temp.assignedUserName = req.body.assignedUserName;

                    await User.findByIdAndUpdate(temp.assignedUser, {$addToSet:{"pendingTasks": found._id}})
                    .then(user => {
                        temp.assignedUser = user.id;
                        temp.assignedUserName = user.name;
                    })
                    .catch(err => {
                        return res.status(500).send({
                            message: 'sever error',
                            data: []
                        });
                    });
                }

                await Task.findByIdAndUpdate(req.params.id, temp)
                .then( next => {
                    return res.status(201).send({
                        message: 'created',
                        data: []
                    });
                }
                )
                .catch(err => {
                    return res.status(201).send({
                        message: 'created',
                        data: []
                    });
                });
            }
        })
        .catch (err => {
            return res.status(500).send({
                message: 'sever error',
                data: []
            });
        });
    });

    taskIdRoute.delete(function(req, res) {
        Task.findById(req.params.id)
        .then(found => {
            if(!found) {
                return res.status(404).send({
                    message: 'id not found',
                    data: []
                });
            } else {
                if(found.assignedUser != "") {
                    User.findById(found.assignedUser)
                    .then(user => {
                        if(!user) {
                            found.delete()
                            .then(function() {
                                return res.status(200).send({
                                    message: 'success',
                                    data: []
                                });
                            });
                        } else {
                            user.pendingTasks.remove(found.id);

                            user.save()
                            .then(function() {
                                found.delete()
                                .then(function() {
                                    return res.status(200).send({
                                        message: 'success',
                                        data: []
                                    });
                                });
                            }); 
                        }
                    });
                } else {
                    found.delete()
                    .then(function() {
                        return res.status(200).send({
                            message: 'success',
                            data: []
                        });
                    });
                }
            }
        })
        .catch(err => {
            // return res.status(500).send({
            //     message: 'sever error',
            //     data: []
            // });
        });
    });

    return router;
}