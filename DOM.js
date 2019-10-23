var alias_1;
var alias_2;
var socket;
var io=require('socket.io').listen(server)
var express =require('express');
var server=require('http').createServer(app);
var app=express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/img'));
app.set("view engine","ejs");
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get('/',(req,res,next)=>{
	res.render('landing');
});
app.get('/credentials',(req,res,next)=>{
	res.render('Playercredentials',{issingle:false});

});
app.get('/credentials-user',(req,res,next)=>{
	res.render('Playercredentials',{issingle:true});
})
app.post('/intermediate',(req,res,next)=>{
     var alias_1=req.body.p1alias;
     var alias_2=req.body.p2alias;
     if(alias_2)
     res.render('game',{p1name:alias_1,p2name:alias_2,isAuth:true,issingle:false});

    else
    	res.render('game',{p1name:alias_1,isAuth:true,issingle:true});
});

  app.listen(3000);
    


