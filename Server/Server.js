const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

//외부 스크립트
const ChatRouter = require('./router/ChatRouter');
const CommonRouter = require('./router/CommonRouter');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//use static files
app.use(express.static(__dirname + '/public'));
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc:["'self'"],
      scriptSrc:["'self'"]
    }
  }))

app.use('/',CommonRouter);
app.use('/simplechatBot',ChatRouter);

app.listen("3002",()=>{
    console.log("Start Chatbot at 3002");
});
