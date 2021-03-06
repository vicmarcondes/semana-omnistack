const { Router } = require('express');
const DevController = require('./controllers/DevController');

const routes = Router();

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);
routes.get('/devs/:github_username', DevController.show);
routes.delete('/devs/:github_username', DevController.destroy);

module.exports = routes;