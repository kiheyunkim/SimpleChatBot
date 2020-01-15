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
app.use(express.static('public'));


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
        }else{
            console.log(request.url);
        }
    }else{
        response.send('<h1> HTTP 404 Forbidden</h1>');
    }
});

app.post('/*',(request,response)=>{
    console.log(request.url);
    if(router.routerPost!=undefined){
        if(router.routerPost[request.url] !=undefined){
            router.routerPost[request.url](request,response);
        }else{
            console.log(request.url);
        }
    }else{
        response.send('<h1> HTTP 404 Forbidden</h1>');
    }
})

function ErrorProcessing(request,response){
    
}