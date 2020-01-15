const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'toor',
    database : 'Messages'
});

function GetResponse(request,sending){
     return new Promise(function(resolve){  //끝난 다는 것을 보장한다.
        connection.query('SELECT * FROM `message` WHERE `request` = ?',[request],(error, results, fields)=>{
            if(error)
                throw error;

            var responseData = {
                  'result' :""
            }
            
            responseData['result'] = results.length==0 ? '올바르지 않은 값입니다' : results[0]['response'];
            sending.json(responseData);    //결과값 전달해줌
        })
    })
}
     
function RegisterResponse(request, response, sending){
    return new Promise(function(resolve){
        connection.query('insert `message` value(?,?)',[request,response],(error,results,fields)=>{
            if(error)
                throw error;

            var responseData = {
                'result' :""
            }

            responseData['result'] = results['affectedRows'] == 0 ? '등록에 실패하였습니다' : '등록되었습니다';
            sending.json(responseData); 
        })
    })
}

exports.GetResponse = GetResponse;
exports.RegisterResponse= RegisterResponse;