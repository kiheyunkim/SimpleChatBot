const CommonRouter = require('express').Router();

CommonRouter.get('/',( request,response)=>{
    response.redirect('Client.html');
});

CommonRouter.get('/chat',( request,response)=>{
    response.redirect('Client.html');
});

module.exports = CommonRouter;