const commonRouter = require('express').Router();

commonRouter.get('/', (request, response) => {
	response.redirect('Client.html');
});

commonRouter.get('/chat', (request, response) => {
	response.redirect('Client.html');
});

module.exports = commonRouter;