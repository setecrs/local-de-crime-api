const user = require('../models/user');
const bcrypt = require('bcryptjs');

exports.loginUser = (username, password) => 

	new Promise((resolve, reject) => {

		user.find({username: username})

		.then(users => {

			if (users.length == 0) {

				reject({ status: 404, message: 'Usuário não encontrado' });

			} else {

				return users[0];

			}
		})

		.then(user => {

			const hashed_password = user.hashed_password;

			if (bcrypt.compareSync(password, hashed_password)) {

				resolve({ status: 200, username: username, id: user._id });

			} else {

				reject({ status: 401, message: 'Credenciais inválidas' });
			}
		})

		.catch(err => reject({ status: 500, message: 'Erro interno!' }));

	});
