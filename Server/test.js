var age = 28;
var weight = 50.5;
var gender='여';
var isPretty= true;

console.log(age);
console.log(weight);
console.log(gender);
console.log(isPretty);

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.listen("8080",()=>{
    console.log("Start Start at 8080");
})
var desision = {'hi' : '안녕하세요'};

app.post('/simplechatBot', (req, res)=>{

    console.log(req.body);
    var responseData = {'result' : desision[req.body.message]};
    console.log(desision[req.body.message]);
    res.json(responseData);
    // 서버에서는 JSON.stringify 필요없음
})
