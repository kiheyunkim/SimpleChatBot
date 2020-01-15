const sql = require('./sql');

const desision = 
{
    'help': "'$add,질문,답변' 형식으로 질문을 등록하세요! 원하는 질문을 입력해보세요",
    'hi' : '안녕하세요',
    '안녕': '나도 안녕',
    '반갑습니다':'저도 반가워요',
    '시리야': '저는 시리가 아니에요',
    '뭐하니':'채팅해요',
    '넌 뭘로 되있니?' : 'node.js'
};

//Post Processing
let MessageProcess = (request,response)=>{
    let requestMessage = request.body.message;
    if(requestMessage.charAt(0) == '$'){ //Command 인식
        if(requestMessage.substr(1,3) == 'add'){//추가 명령
            requestMessage.trim();
            let splits = requestMessage.split(',');
            sql.RegisterResponse(splits[1],splits[2],response);
        }else{
            
        }

    }else{
        sql.GetResponse(request.body.message,response);
    }
}

//Get Processing
let frontProcess = (request,response)=>{
    response.redirect('Client.html');
}

let directConnect = (request,response)=>{
    response.redirect('Client.html');
}

const routerPost ={
    '/simplechatBot':MessageProcess,
};

const routerGet ={
    '/':frontProcess,
    '/chat':directConnect
};

function ErrorHandling(response){
    resp    
}


exports.routerGet = routerGet;
exports.routerPost= routerPost;