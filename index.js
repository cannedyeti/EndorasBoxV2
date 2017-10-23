var express = require('express');
var bodyParser = require('body-parser');
require('dotenv').config();
var path = require('path');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('morgan')('dev'));

app.use('/api/users', expressJWT({secret: secret}).unless({
    path: [{ url: '/api/users', methods: ['POST'] }]
}), require('./controllers/users'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

var server = app.listen(process.env.PORT || 3000)

module.exports = server;