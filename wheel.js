var angle = 0;
var speed = 0;

const RESULTS = 3;
const text = ["Gew", "Verl", "Nichts"];
const colors = ["#FF0000", "#00FF00", "#0000FF"];

function draw(angle)
{
    angle = (-angle+180)/180*Math.PI;

    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);

    ctx.beginPath();
    var width = ctx.canvas.width /2;
    var height = ctx.canvas.height /2;

    var last_angle = Math.PI/2;

    for( var counter=1; counter<=RESULTS; counter++) {
        ctx.moveTo(width, height);
        ctx.beginPath();
        ctx.lineTo(width, height);
        ctx.arc(width, height, height * 0.8, last_angle, 2 * Math.PI / RESULTS + last_angle);
        ctx.lineTo(width, height);
        ctx.fillStyle = colors[counter-1];
        last_angle += 2 * Math.PI / RESULTS;
        ctx.fill();
    }
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.moveTo(width,height);
    ctx.lineTo((height*0.8 * Math.sin(angle)) + width,(height*0.8*Math.cos(angle) + height));
    ctx.stroke();
}

$(document).ready(function(){
    $("#canvas").attr("width",$(".wheelHolder").width()+"px")
        .attr("height",$(".wheelHolder").height()+"px");
    draw(0);
});

$("#start").click(function(){
    speed = (Math.random()*15) +10;

    var interval = setInterval(function(){
        speed -= 0.04;
        angle += speed;
        if(speed<=0){
            clearInterval(interval);
            handleAngle(angle);
            return;
        }

        draw(angle);
    }, 40);
});

function handleAngle(angle){
    angle %= 360;
    angle = Math.floor(angle/(360/RESULTS));
    alert(text[angle]);
}