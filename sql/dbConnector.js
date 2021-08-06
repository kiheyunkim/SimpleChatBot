const mysql = require('mysql');

const dbProperties = {
	host: 'localhost',
	user: 'root',
	password: 'mysql',
	database: 'chatbot'
}

let dbConnection = mysql.createConnection(dbProperties);


let selectResponse = async (request) => {
	return new Promise((resolve, reject) => {
		dbConnection.query("SELECT * FROM MESSAGE WHERE request = ?", [request], (error, results, fields) => {
			if (error) {
				reject('error occurred');
				return;
			}

			if (results.length === 0) {
				resolve("등록되지 않은 질문입니다. 질문을 등록하려면 '$add,질문,답변' 형식으로 전송해주세요!");
				return;
			}

			resolve(results[results.length - 1]['response'])
		});
	});
};

let registerResponse = async (request, response) => {
	return new Promise(((resolve, reject) => {
		dbConnection.query(`INSERT INTO MESSAGE (request,response) VALUES('${request}','${response}') ON DUPLICATE KEY UPDATE request='${request}', response='${response}'`, (error, results, fields) => {
			if (error) {
				reject('error occurred');
				return;
			}

			let affectRowsCount = results['affectedRows'];
			if (affectRowsCount === 0) {
				resolve('등록에 실패했습니다');
				return;
			}

			resolve('등록되었습니다');
		})
	}));
}

exports.selectResponse = selectResponse
exports.registerResponse = registerResponse