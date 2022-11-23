// var User = require('../models/user.js');
// var Task = require('../models/task.js');

// module.exports = function(router) {
//     var userIdRoute = router.route('/users/:id');

//     userIdRoute.get(function(req, res) {
//         User.findById(req.params.id)
//         .then(found => {
//             if(found == null) {
//                 return res.status(404).send({
//                     message: 'id not found',
//                     data: []
//                 });
//             } else {
//                 return res.status(200).send({
//                     message: 'success',
//                     data: found
//                 });
//             }
//         })
//         .catch(err => {
//             return res.status(500).send({
//                 message: 'sever error',
//                 data: []
//             });
//         });
//     });

//     userIdRoute.put(async function (req, res) {
//         var temp = {};

//         if (!req.body.name || req.body.name === undefined || !req.body.email || req.body.email === undefined) {
//             return res.status(400).send({
//                 message: 'missing name or email',
//                 data: []
//             });
//         } else {
//             temp.name = req.body.name;
//             temp.email = req.body.email;
//         }

//         if (!req.body.pendingTasks || req.body.pendingTasks === undefined) {
//             temp.pendingTasks = [];
//         } else {
//             temp.pendingTasks = req.body.pendingTasks;
//         }

//         User.findById(req.params.id)
//         .then(user => {
//             if (!user) {
//                 return res.status(404).send({
//                     message: 'id not found',
//                     data: []
//                 });
//             } else {
//                 user.pendingTasks.forEach(task => {
//                     Task.findByIdAndUpdate(task, {$set:{"assignedUser": "", "assignedUserName": "unassigned"}})
//                     .catch(err => {});
//                 });
//             }
//         })
//         .catch(err => {});

//         User.findById(req.params.id)
//         .then(user => {
//             if(!user){
//                 return res.status(404).send({
//                     message: "id not found",
//                     data: []
//                 });
//             } 
//         })
//         .catch(err => {
//             return res.status(500).send({
//                 message: 'sever error',
//                 data: []
//             });
//         });

//         User.findOne({email: temp.email})
//         .then(user => {
//             if(user._id.toString() !== req.params.id){
//                 return res.status(400).send({
//                     message: "email already exists",
//                     data: []
//                 });
//             }
//         })
//         .catch(err => {});

//         var valid_tasks = []

//         if (typeof temp.pendingTasks === 'string') {
//             temp.pendingTasks = [temp.pendingTasks];
//         }

//         await Promise.all(temp.pendingTasks.map(id => {
//             return Task.findById(id);
//         }))
//         .then(async tasks => {
//             tasks.forEach(async task => {
//                 if (task) {
//                     valid_tasks.push(task._id);
//                     await User.findByIdAndUpdate(task.assignedUser, {$pull:{"pendingTasks": task._id}})
//                     .catch(err => {});
//                     await Task.findByIdAndUpdate(task._id, {$set:{"assignedUser": req.params.id, "assignedUserName": temp.name}});
//                 }
//             })
//         });

//         temp.pendingTasks = valid_tasks;

//         User.findByIdAndUpdate(req.params.id, temp)
//         .then(user => {
//             res.status(201).send({
//                     "message":"created",
//                     "data": user
//                 });
//         })
//         .catch(err => {});

//         return router;    
// 	});

//     userIdRoute.delete(function(req, res) {
//         User.findById(req.params.id)
//         .then(found => {
//             if(!found) {
//                 return res.status(404).send({
//                     message: 'id not found',
//                     data: []
//                 });
//             } else {
//                 Task.updateMany({assignedUser: found.id}, {assignedUser: "", assignedUserName: "unassigned"})
//                 .then( next => {
//                     found.delete()
//                     .then( next => {
//                         return res.status(200).send({
//                             message: 'success',
//                             data: []
//                         });
//                     });
//                 });
//             }
//         })
//         .catch(err => {
//             return res.status(500).send({
//                 message: 'sever error',
//                 data: []
//             });
//         });
//     });

//     return router;
// }