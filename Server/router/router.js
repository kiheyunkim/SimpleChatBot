
function Router(){
    
}
const desision = 
{
    'hi' : '안녕하세요',
    '안녕': '나도 안녕',
    '반갑습니다':'저도 반가워요',
    '시리야': '저는 시리가 아니에요',
    '뭐하니':'채팅해요',
    '넌 뭘로 되있니?' : 'node.js'
};

//Post Processing
let MessageProcess = (request,response)=>{
    var responseData = {
        'result' : desision[request.body.message] != undefined ? desision[request.body.message] : "올바르지 않은 요청입니다."
    };
    response.json(responseData);     // 서버에서는 JSON.stringify 필요없음
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

exports.routerGet = routerGet;
exports.routerPost= routerPost;