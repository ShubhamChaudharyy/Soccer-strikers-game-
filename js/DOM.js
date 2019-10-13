var express =require('express');
var app=express();
app.get('/',(res,req,next)=>{
	res.render('game.html');
});