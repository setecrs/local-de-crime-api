'use strict';

const user = require('../models/user');

exports.getProfile = username => 

	new Promise((resolve,reject) => {

		user.findOne({ username: username })

		.then((user) => resolve(user))

		.catch(err => reject({ status: 500, message: 'Erro interno!' }))

	});
