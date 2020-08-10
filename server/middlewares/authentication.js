const express_jwt = require('express-jwt');

const auth = express_jwt({
	secret: process.env.PRIVATE_KEY,
	algorithms: ['HS256'],
	resultProperty: 'user',
});

module.exports = auth;
