const commonRouter = require('express').Router();

commonRouter.get('/', (request, response) => {
	response.redirect('client.html');
});

commonRouter.get('/chat', (request, response) => {
	response.redirect('client.html');
});

module.exports = commonRouter;