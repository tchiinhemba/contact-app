const express = require('express');
const route = express.Router();


const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

// Rotas da home
route.get('/', homeController.index);


// Login Routes
route.get('/login/index', loginController.index);
route.post('/login/register', login)


module.exports = route;