// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 3009;
var mongoose = require('mongoose');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// variables containing the routes files
var userRouter = require('./routes/users');
var ocorrenciasRouter = require('./routes/ocorrencias');
var dadosGeraisRouter = require('./routes/dados_gerais');
var enderecoRouter = require('./routes/endereco');
var responsavelLocalRouter = require('./routes/responsavel_local');
var sobreLocalRouter = require('./routes/sobre_local');
var sobreFatoRouter = require('./routes/sobre_fato');
var vestigiosRouter = require('./routes/vestigios');
var policiaisAcionadosRouter = require('./routes/policiais_acionados');
var popularBancoRouter = require('./routes/popular_banco');
var obterListasRouter = require('./routes/obter_listas');
var testemunhasRouter = require('./routes/testemunhas');
var modusOperandiRouter = require('./routes/modus_operandi');

// configuration ===============================================================
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/policia_federal'); // connect to our database

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.json()); // these two get information from html forms
app.use(express.urlencoded({ extended: true }));

// routes ======================================================================
app.use('/', userRouter);
app.use('/ocorrencias', ocorrenciasRouter);
app.use('/dados_gerais', dadosGeraisRouter);
app.use('/endereco', enderecoRouter);
app.use('/responsavel_local', responsavelLocalRouter);
app.use('/sobre_local', sobreLocalRouter);
app.use('/sobre_fato', sobreFatoRouter);
app.use('/vestigios', vestigiosRouter);
app.use('/policiais_acionados', policiaisAcionadosRouter);
app.use('/popular_banco', popularBancoRouter);
app.use('/obter_listas', obterListasRouter);
app.use('/testemunhas', testemunhasRouter);
app.use('/modus_operandi', modusOperandiRouter);
// launch ======================================================================
app.listen(port);
console.log('Acesse localhost:' + port);