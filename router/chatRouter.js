const chatRouter = require('express').Router();
const sql = require('../sql/dbConnector')

chatRouter.post('/', (request, response) => {
	let requestMessage = request.body.message;
	if (requestMessage.charAt(0) === '$') {
		if (requestMessage.substr(1, 3) === 'add') {
			requestMessage.trim();
			let splits = requestMessage.split(',');
			if (splits.length === 3) {
				sql.registerResponse(splits[1], splits[2]).then((result) => {
					response.json(makeResponse(result));
				}).catch((result) => {
					console.log('insert response Error');
					response.json(makeResponse(result));
				});

				return;
			}
		}

		let result = '잘못된 명령어 입니다'
		response.json(makeResponse(result));
	} else {
		sql.selectResponse(request.body.message).then((result) => {
			response.json(makeResponse(result));
		}).catch((result) => {
			console.log('select mysql Error');
			response.json(makeResponse(result));
		});
	}
})

let makeResponse = (response) => {
	return {response}
}

module.exports = chatRouter;