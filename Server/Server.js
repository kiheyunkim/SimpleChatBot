const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const router = require('./router/router');

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

  console.log(router.routerPost);
  console.log(router.routerGet);
app.listen("8080",()=>{
    console.log("Start Start at 8080");
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
    //라우터 처리를 request.url을통해서
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

