const chatRouter = require('express').Router();
const sql = require('../sql/dbConnector')

chatRouter.post('/', (request, response) => {
	let requestMessage = request.body.message;
	if (requestMessage.charAt(0) === '$') {            //Command 인식
		if (requestMessage.substr(1, 3) === 'add') {    //추가 명령
			requestMessage.trim();
			let splits = requestMessage.split(',');//쪼갯을때 3개가 아니면잘못된 형식
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

		response.json(makeResponse(result));
	} else {      //질의 요청
		sql.selectResponse(request.body.message).then((result) => {
			makeResponse(result);
		}).catch((result) => {
			console.log('select mysql Error');
			response.json(makeResponse(result));
		});
	}
})

let makeResponse = (response) => {
	return {response}
}

ErrorHandling = (request, response, state) => {
	console.log("Router Error Occured :" + state + "url: " + request.url);
	sql.ErrorResponse(request, response);
}

module.exports = chatRouter;