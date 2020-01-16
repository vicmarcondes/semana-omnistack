const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

// linha de conexão pro banco
mongoose.connect('mongodb+srv://victor:omnistack@cluster0-p9pf6.mongodb.net/week10?retryWrites=true&w=majority', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(routes);

app.listen(3000, function() {
    console.log('Servidor rodando');
});
