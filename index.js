var express = require('express');
var bodyParser = require('body-parser');
require('dotenv').config();
var path = require('path');
var secret = process.env.SECRET;


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('morgan')('dev'));

app.use('/api/users', expressJWT({secret: secret}).unless({
    path: [{ url: '/api/users', methods: ['POST'] }]
}), require('./controllers/users'));

app.post('/api/auth', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        // return 401 if error or no user
        if (err || !user) return res.status(401).send({ message: 'User not found' });

        // attempt to authenticate a user
        var isAuthenticated = user.authenticated(req.body.password);
        // return 401 if invalid password or error
        if (err || !isAuthenticated) return res.status(401).send({ message: 'User not authenticated' });

        // sign the JWT with the user payload and secret, then return
        var token = jwt.sign(user.toJSON(), secret);

        return res.send({ user: user, token: token });
    });
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

var server = app.listen(process.env.PORT || 3000)

module.exports = server;