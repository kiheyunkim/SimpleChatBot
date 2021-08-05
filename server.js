const express = require('express');
const bodyParser = require('body-parser');

const chatRouter = require('./router/chatRouter');
const commonRouter = require('./router/commonRouter');

const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

app.use('/', commonRouter);
app.use('/simplechatBot', chatRouter);

app.listen("3002", () => {
	console.log("Start Chatbot at 3002");
});
