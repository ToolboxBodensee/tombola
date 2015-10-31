var angle = 0;
var speed = 0;

const RESULTS = 4;
const captions = ["Gewonnen", "Verloren", "Weiterer Zustand", "Vierter Zustand"];
const text = ["Toll", "Versagt", "noch mehr Text", "Keine Kreativität"];
const colors = ["#F44336", "#4CAF50", "#2196F3", "#FF9800"];

function draw(angle)
{
    angle = (-angle+180)/180*Math.PI;

    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");

    ctx.fillStyle = "#eee";
    ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);

    ctx.beginPath();
    var width = ctx.canvas.width /2;
    var height = ctx.canvas.height /2;

    var last_angle = Math.PI/2;
    var size = height<width?height*0.8:width*0.8;

    for( var counter=1; counter<=RESULTS; counter++) {
        ctx.moveTo(width, height);
        ctx.beginPath();
        ctx.lineTo(width, height);
        ctx.arc(width, height, size, last_angle, 2 * Math.PI / RESULTS + last_angle);
        ctx.lineTo(width, height);
        ctx.fillStyle = colors[counter-1];
        last_angle += 2 * Math.PI / RESULTS;
        ctx.fill();
    }
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.moveTo(width,height);
    ctx.lineTo((size * Math.sin(angle)) + width,(size*Math.cos(angle) + height));
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
    $("#mTitle").html(captions[angle]);
    $("#mBody").html(text[angle]);
    $("#modalFertig").modal();

}