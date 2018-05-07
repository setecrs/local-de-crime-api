'use strict';

const user = require('../models/user');

exports.getProfile = username => 

	new Promise((resolve,reject) => {

		user.find({ username: username }, { name: 1, username: 1, created_at: 1, _id: 0 })

		.then(users => resolve(users[0]))

		.catch(err => reject({ status: 500, message: 'Erro interno!' }))

	});
