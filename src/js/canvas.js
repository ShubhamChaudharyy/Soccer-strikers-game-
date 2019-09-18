import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
innerWidth=1560;
canvas.width = innerWidth/2
canvas.height = innerHeight/1.5
var collision1;
var collision2;
const mouse = {
    x: innerWidth/4,
    y: innerHeight / 2
}
const mousecom={
    x:3*(innerWidth/4),
    y: innerHeight/2
}
const net = {
    x : (innerWidth-2)/4,
    y : 0,

    height : 10,
    width : 6,
    color : "#ffdedb"
}
const p1net={
      x : 3*(innerWidth-2)/16,
    y :0,
  
    height : 10,
    width : 6,
    color : "#c2deff"
}
const p2net={
      x : 5*(innerWidth-2)/16,
    y :0,
  
    height : 10,
    width : 6,
    color : "#c2deff"
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    
  
    mouse.x =event.clientX 
    mouse.y = event.clientY
    
})
function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}
function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2/ (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m1/ (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}


addEventListener('resize', () => {
    canvas.width = innerWidth/2
    canvas.height = innerHeight/2

    init()
})
function drawNet(){
    for(let m = 0; m <= innerHeight/1.5; m++){
        drawRect(net.x, net.y+m, net.width, net.height, net.color);
        drawRect(p1net.x, p1net.y+m, p1net.width, p1net.height, p1net.color);
        drawRect(p2net.x, p2net.y+m, p2net.width, p2net.height, p2net.color);
    }
}

function drawRect(x, y, w, h, color){
    c.fillStyle = color;
    c.fillRect(x, y, w, h);
}
function randomIntFromRange(min,max)
{
    return Math.floor(Math.random()*(max-min+1)*min);
}
function FC(x, y, radius, color) 
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass=3;
    
    this.color = color;
    this.update=function(){
        this.draw();
        

    };
    this.draw=function(){
         c.beginPath();
    c.arc(this.x, this.y, this.radius,0 , Math.PI * 2, false);
    c.lineWidth=6;
    c.strokeStyle = this.color;
   c.fillStyle='#edf1f5';
    c.fill();

    c.stroke();
    c.closePath();
    };
}
function Circle1(x, y, radius, color) 
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass=3;
    
    this.color = color;
    this.update=function(){
        this.draw();
        

    };
    this.draw=function(){
         c.beginPath();
    c.arc(this.x, this.y, this.radius,Math.PI*0.5 , Math.PI * 1.5, false);
    c.fillStyle = this.color;
       c.strokeStyle='#c2deff';
c.lineWidth=10;
    c.stroke();
    c.fill();
    c.closePath();
    };
}
function goal1(x, y, radius, color) 
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass=3;
    
    this.color = color;
    this.update=function(){
        this.draw();
        

    };
    this.draw=function(){
         c.beginPath();
    c.arc(this.x, this.y, this.radius,Math.PI*0.5 , Math.PI * 1.5, false);
    c.fillStyle = this.color;
 
   
    c.fill();
    c.closePath();
    };
}
function goal(x, y, radius, color){
     this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass=3;
    
    this.color = color;
    this.update=function(){
        this.draw();
        

    };
    this.draw=function(){
         c.beginPath();
    c.arc(this.x, this.y, this.radius,Math.PI*1.5 , Math.PI * 0.5, false);
 
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    };

}
function Circle(x, y, radius, color) 
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass=3;
    
    this.color = color;
    this.update=function(){
        this.draw();
        

    };
    this.draw=function(){
         c.beginPath();
    c.arc(this.x, this.y, this.radius,Math.PI*1.5 , Math.PI * 0.5, false);
    c.strokeStyle='#c2deff';
c.lineWidth=10;
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    };
}
function comp(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity={
       x:0,
       y:0
    }
   this.mass=50;
    this.radius = radius;
    this.acceleration=4;
    this.color = color;
    this.maxs=5;
    this.update=function(){
        this.draw();
        this.x+=this.velocity.x;
        this.y+=this.velocity.y;
        if(this.y>=innerHeight/1.5-this.radius)
        {
            
         this.velocity.y=-0.5*(this.velocity.y)
         this.x+=this.velocity.x;
        this.y+=this.velocity.y;
        }
        else if(this.x<=(innerWidth/4)+this.radius)
        {
             this.velocity.x=-0.5*(this.velocity.x);
         this.x+=this.velocity.x;
        this.y+=this.velocity.y;
        }
        else if(this.y<=this.radius)
        {
            this.velocity.y=-0.5*(this.velocity.y)
             this.x+=this.velocity.x;
             this.y+=this.velocity.y;
  
        }
          else if(this.x>=(innerWidth/2)-this.radius)
        {
            this.velocity.x=-0.5*(this.velocity.x)
         this.x+=this.velocity.x;
         this.y+=this.velocity.y;
        

        }
        else if(this.x<=(innerWidth/4)-this.radius)
        {
            this.velocity.x=-0.5*(this.velocity.x)
         this.x+=this.velocity.x;
        
        }
       
        
        
       


    };
  






    this.draw=function()
    {
         c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      
                this.shadowOffsetX = 0;
                this.shadowOffsetY = 3;
                this.shadowBlur = 6;
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    };
}
function scorer(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity={
       x:0,
       y:0
    }
    this.maxs=5;
    this.acceleration=4;
   this.mass=50;
    this.radius = radius;
    this.color = color;
    this.update=function(){
        this.draw();
        this.x+=this.velocity.x;
        this.y+=this.velocity.y;
        if(this.y>innerHeight/1.5-this.radius)
        {
            
         this.velocity.y=-0.5*(this.velocity.y)
         this.x+=this.velocity.x;
        this.y+=this.velocity.y;
        }
        else if(this.x>innerWidth/4-this.radius)
        {
             this.velocity.x=-0.5*(this.velocity.x)
         this.x+=this.velocity.x;
        this.y+=this.velocity.y;
        }
        else if(this.y<=this.radius)
        {
            this.velocity.y=-0.5*(this.velocity.y)
       this.x+=this.velocity.x;
        this.y+=this.velocity.y;
        }
          else if(this.x<=this.radius)
        {
            this.velocity.x=-0.5*(this.velocity.x)
         this.x+=this.velocity.x;
        
 this.y+=this.velocity.y;
        }
        else if(this.x>(innerWidth/4)-this.radius)
        {
            this.velocity.x=-0.5*(this.velocity.x)
         this.x+=this.velocity.x;
        this.y+=this.velocity.y;
        }
       
        

    };
  

    this.draw=function(){
         c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    };
}
function baller(x, y,z, radius, color) {
    this.x = x;
    this.y = y;
   
    this.velocity={
       x:0,
       y:0,
      
    }
   this.mass=20;
    this.radius = radius;
    this.color = color;
    this.update=function(){
        this.draw();
        this.x+=this.velocity.x;
        this.y+=this.velocity.y;
        if(this.y>innerHeight/1.5-this.radius)
        {
            
         this.velocity.y=-1*(this.velocity.y)
         this.x+=this.velocity.x;
        this.y+=this.velocity.y;
        }

        else if(this.x>=innerWidth/2-this.radius)
        {
             this.velocity.x=-1*(this.velocity.x)
         this.x+=this.velocity.x;
        this.y+=this.velocity.y;
        }
        else if(this.y<=this.radius)
        {
            this.velocity.y=-1*(this.velocity.y)
         this.x+=this.velocity.x;
        this.y+=this.velocity.y;
        }
          else if(this.x<=this.radius)
        {
            this.velocity.x=-1*(this.velocity.x)
         this.x+=this.velocity.x;
        this.y+=this.velocity.y;

        }


        if(getDistancep1(this.x,this.y,controller.x,controller.y)-(controller.radius+this.radius)<=0)
        {
            resolveCollision(this,controller);
            this.update();
            controller.update();
        }
        else if(getDistancep2(this.x,this.y,com.x,com.y)-(com.radius+this.radius)<=0)
        {
            resolveCollision(this,com);
             this.update();
            com.update();
        }
        else if(getDistancep1(this.x,this.y,player11og.x,player11og.y)-(this.radius+player11og.radius)<=0)
        {
          this.y=innerHeight/3;
          this.x=innerWidth/4;
          this.velocity.x=0;
          this.velocity.y=0;
           com.y=innerHeight/3;
          com.x=3*(innerWidth/8);
          com.velocity.x=0;
          com.velocity.y=0;
           controller.y=innerHeight/3;
          controller.x=(innerWidth/8);
          controller.velocity.x=0;
          controller.velocity.y=0;

        }
        else if(getDistancep2(this.x,this.y,player22og.x,player22og.y)-(this.radius+player22og.radius)<=0)
         {
          this.y=innerHeight/3;
          this.x=innerWidth/4;
          this.velocity.x=0;
          this.velocity.y=0;
           com.y=innerHeight/3;
          com.x=3*(innerWidth/8);
          com.velocity.x=0;
          com.velocity.y=0;
           controller.y=innerHeight/3;
          controller.x=(innerWidth/8);
          controller.velocity.x=0;
          controller.velocity.y=0;

        }


    };


// Objects



function moveController(key) {

    // Up
    if (key === 38 &&  controller.velocity.y < controller.maxs ) {
        controller.velocity.y -= controller.acceleration;
        controller.update();
    }

    // Down
    if (key === 40 &&  controller.velocity.y < controller.maxs ) {
        controller.velocity.y += controller.acceleration;
         controller.update();
    }

    // Right
    if (key === 39 && controller.velocity.x < controller.maxs) {
        controller.velocity.x += controller.acceleration;
         controller.update();
    }

    // Left, decrease acceleration
    if (key === 37 ) {
        controller.velocity.x -= controller.acceleration;
         controller.update();
    }
  
}
document.addEventListener("keydown", function(e) {
    moveController(e.keyCode);
    moveController2(e.keyCode);
});
function moveController2(key){


if (key === 87 &&  com.velocity.y < com.maxs ) {
        com.velocity.y -= com.acceleration;
        com.update();
    }

    // Down
    if (key === 83 &&  com.velocity.y < com.maxs ) {
        com.velocity.y += com.acceleration;
         com.update();
    }

    // Right
    if (key === 68 && com.velocity.x < com.maxs) {
        com.velocity.x += com.acceleration;
         com.update();
    }

    // Left, decrease acceleration
    if (key === 65 ) {
        com.velocity.x -= com.acceleration;
         com.update();
    }

}



    this.draw=function(){
         c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.lineWidth=
    c.fillStyle =this.color;
    c.fill();
    c.closePath();
    };
}
function getDistancep2(x11,y11,x22,y22)
{
    let xD2=x22-x11;
    let yD2=y22-y11;
   

  
   return collision2= Math.sqrt(Math.pow(xD2,2)+Math.pow(yD2,2));
   
}
function getDistancep1(x1,y1,x2,y2)
{
    let xD1=x2-x1;
    let yD1=y2-y1;
   

  
   return collision1= Math.sqrt(Math.pow(xD1,2)+Math.pow(yD1,2));
   
}



// Implementation
let user;
let ball;
let com;
let controller;
let player1og;
let player2og;
let p1back;
let player11og;
let player22og;
let p1s1;
let p2s2;
let p1s2;
let p2s1;


function init() {
  
   ball= new baller(innerWidth/4,innerHeight/3,9999,30,'black');
   controller= new scorer(innerWidth/8,innerHeight/3,40,'blue');
   com=new comp(3*(innerWidth/8),innerHeight/3,40,'red');
  player1og=new Circle(0,innerHeight/3,80,'#e4e9f0');
   player11og=new goal(0,innerHeight/3,32,'#e4e9f0');
   player2og=new Circle1(innerWidth/2,innerHeight/3,80,'#e4e9f0');
   player22og=new goal1(innerWidth/2,innerHeight/3,32,'#e4e9f0');

  
     p1back=new FC(innerWidth/4,innerHeight/3,50,'#ffdedb');
     p1s1=new FC(innerWidth/8,innerHeight/6,30,'#ffdedb');
     p2s1=new FC(3*innerWidth/8,innerHeight/6,30,'#ffdedb');
     p2s2=new FC(3*innerWidth/8,innerHeight/2,30,'#ffdedb');
     p1s2=new FC(innerWidth/8,innerHeight/2,30,'#ffdedb');

   
  
   
}



// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
     drawNet();
     player1og.update();
     p1back.update();
   player2og.update();
   player11og.update();
   player22og.update();
  p1s2.update();
   p1s1.update();
   p2s1.update();
   p2s2.update();

   
com.update();

   ball.update();
   
  
   
   

   

   controller.update();
   
   

   
 

 
   
    // objects.forEach(object => {
    //  object.update()
    // })
}

init()
animate()


