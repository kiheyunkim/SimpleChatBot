const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.listen("8080",()=>{
    console.log("Start Start at 8080");
});
const desision = 
{
    'hi' : '안녕하세요',
    '안녕': '나도 안녕',
    '반갑습니다':'저도 반가워요',
    '시리야': '저는 시리가 아니에요',
    '뭐하니':'채팅해요',
    '넌 뭘로 되있니?' : 'node.js'
};

app.post('/simplechatBot', (req, res)=>{

    //console.log(req.body);
    var responseData = {'result' : desision[req.body.message] != undefined ? desision[req.body.message] : "올바르지 않은 요청입니다."};
    //console.log(desision[req.body.message]);
    res.json(responseData);     // 서버에서는 JSON.stringify 필요없음

})
