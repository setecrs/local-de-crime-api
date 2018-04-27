// carrega a estrategia usado pelo passport, neste caso autenticacao local
var LocalStrategy = require('passport-local').Strategy;

// carrega o modelo do perito
var Perito = require('../models/user');

// expoe esta funcao para o app
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        Perito.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'usuario',
        passwordField: 'senha',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, usuario, senha, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            Perito.findOne({ 'usuario': usuario }, function (err, perito) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!perito)
                    return done(null, false, req.flash('loginMessage', 'Usuário não encontrado.')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!perito.validPassword(senha))
                    return done(null, false, req.flash('loginMessage', 'Senha incorreta!')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, perito);
            });

        }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'usuario',
        passwordField: 'senha',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        function (req, usuario, senha, done) {

            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function () {

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                Perito.findOne({ 'usuario': usuario }, function (err, perito) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (perito) {
                        return done(null, false, req.flash('signupMessage', 'Este usuário já está cadastrado.'));
                    } else {

                        // if there is no user with that email
                        // create the user
                        var newPerito = new Perito();

                        // set the user's local credentials
                        newPerito.usuario = usuario;
                        newPerito.senha = newPerito.generateHash(senha);
                        newPerito.nome = req.body.nome;
                        newPerito.sede = req.body.sede;
                        newPerito.ativo = req.body.ativo;

                        // save the user
                        newPerito.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newPerito);
                        });
                    }

                });

            });

        }
    ));

};