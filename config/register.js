const user = require('../models/user');
const bcrypt = require('bcryptjs');

exports.registerUser = (name, username, password, sede) =>

	new Promise((resolve, reject) => {

		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);

		const newUser = new user({

			name: name,
			username: username,
			hashed_password: hash,
			sede: sede,
			created_at: new Date()
		});


		newUser.save()

		.then(() => resolve(

			{ status: 201, message: 'Usuário cadastrado com sucesso!' }))

		.catch(err => {

			if (err.code == 11000) {

				reject({ status: 409, message: 'Usuário já cadastrado!' });

			} else {

				reject({ status: 500, message: 'Erro interno!' });
			}
		});
	});
