const sql = require('../sql/sql');

//Post Processing
let MessageProcess = (request,response)=>{
    let requestMessage = request.body.message;
    if(requestMessage.charAt(0) == '$'){            //Command 인식
        if(requestMessage.substr(1,3) == 'add'){    //추가 명령
            requestMessage.trim();
            let splits = requestMessage.split(',');//쪼갯을때 3개가 아니면잘못된 형식
            if(splits.length != 3){
                ErrorHandling(request,response,'add command form invalid');
                return;
            }

            sql.RegisterResponse(splits[1],splits[2],response);
        }else{
            ErrorHandling(request,response,'InvalidCommand request');
        }
    }else{      //질의 요청
        sql.GetResponse(request.body.message,response);
    }
}

//Get Processing
let moveToChat = (request,response)=>{
    response.redirect('Client.html');
}

const routerPost ={
    '/simplechatBot':MessageProcess,
};
const routerGet ={
    '/':moveToChat,
    '/chat':moveToChat  
};

function ErrorHandling(request,response,state){
    console.log("Router Error Occured :" + state + "url: " + request.url);
    sql.ErrorResponse(request,response);
    //response.send('<html><body><h1> HTTP 404 Forbidden</h1></body></html>')
}

exports.routerGet = routerGet;
exports.routerPost= routerPost;