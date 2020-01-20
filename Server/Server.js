const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

//외부 스크립트
const router = require('./router/router');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//use static files
app.use(express.static(__dirname+'/public'));
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc:["'self'"],
      scriptSrc:["'self'"]
    }
  }))

app.listen("8080",()=>{
    console.log("Start Chatbot at 8080");
});

app.get('/*',(request,response)=>{
    if(router.routerGet!=undefined){
        if(router.routerGet[request.url] !=undefined){
            router.routerGet[request.url](request,response);
            return;
        }
    }
    
    ErrorHandling(request,response,'invalid Get Access');
});

app.post('/*',(request,response)=>{
    if(router.routerPost!=undefined){
        if(router.routerPost[request.url] !=undefined){
            router.routerPost[request.url](request,response);
            return;
        }
    }

    ErrorHandling(request,response,'invalid Post Access');
})

function ErrorHandling(request,response,state){
    console.log("Error Occured :" + state + " url: " + request.url);
    response.send('<html><body><h1> HTTP 404 Forbidden</h1></body></html>')
}
