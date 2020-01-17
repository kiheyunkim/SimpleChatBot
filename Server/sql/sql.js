const mysql = require('mysql');

const connectionValue={
    host:'localhost',
    user:'root',
    password: 'toor',
    database : 'Messages'
}

let connection = mysql.createConnection(connectionValue);

//db 연결이 끊어졌을 때 db 연결에 대해서 복구하기 위한 부분.
connection.on('err',(err)=>{
    console.log('Database connection Error');
    if(err.code == 'PROTOCOL_CONNECTION_LOST'){
        connection = mysql.createConnection(connectionValue);
    }
});


//조회용 promise 함수
function GetResponse(request,sending){
     return new Promise((resolve)=>{
        connection.query('SELECT * FROM `message` WHERE `request` = ?',[request],(error, results, fields)=>{
            if(error)
                throw error;

            let responseData = {
                  'result' :""
            }
            
            responseData['result'] = results.length==0 ? '올바르지 않은 값입니다' : results[0]['response'];
            sending.json(responseData);
        })
    })
}

//등록용 promise 함수
function RegisterResponse(request, response, sending){
    return new Promise((resolve)=>{
        connection.query('insert `message` value(?,?)',[request,response],(error,results,fields)=>{
            if(error)
                throw error;

            let responseData = {
                'result' :""
            }

            responseData['result'] = results['affectedRows'] == 0 ? '등록에 실패하였습니다' : '등록되었습니다';
            sending.json(responseData); 
        })
    })
}

function ErrorResponse(request,response){
    let responseData ={'result':'Invalid Command Form'};
    response.json(responseData);
}

exports.ErrorResponse = ErrorResponse;
exports.GetResponse = GetResponse;
exports.RegisterResponse= RegisterResponse;