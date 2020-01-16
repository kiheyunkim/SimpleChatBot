const sql = require('../sql/sql');

//Post Processing
let MessageProcess = (request,response)=>{
    let requestMessage = request.body.message;
    if(requestMessage.charAt(0) == '$'){            //Command 인식
        if(requestMessage.substr(1,3) == 'add'){    //추가 명령
            requestMessage.trim();
            let splits = requestMessage.split(',');
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
    response.send('<html><body><h1> HTTP 404 Forbidden</h1></body></html>')
}

exports.routerGet = routerGet;
exports.routerPost= routerPost;