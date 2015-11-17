var angle = 0;
var speed = 0;
var interval = null;

const RESULTS = 3;
const captions = ["Hauptgewinn",
    "Gewonnen", "Trostpreis"];
const text = ["Du hast einen 50$ 3dhubs.com Gutschein gewonnen!",
    "Du kannst zwischen einem 3d gedruckten Objekt, welches wir entwerfen oder einem Toolbox T-Shirt entscheiden!",
    "Du bekommst einen Toolbox Schlüsselanhänger!"];
const colors = ["#F44336", "#4CAF50", "#2196F3"];
const angles = [5, 10, 345];

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

    var last_angle = Math.PI/2 + angle;
    var size = height<width?height*0.8:width*0.8;

    for( var counter=1; counter<=RESULTS; counter++) {
        ctx.moveTo(width, height);
        ctx.beginPath();
        ctx.lineTo(width, height);
        ctx.arc(width, height, size, last_angle, /*2 * Math.PI / RESULTS*/(angles[counter-1] /180 * Math.PI) + last_angle);
        ctx.lineTo(width, height);
        ctx.fillStyle = colors[counter-1];
        last_angle += (angles[counter-1] /180 * Math.PI);
        ctx.fill();
    }
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.moveTo(width,height);
    angle = Math.PI;
    ctx.lineTo((size * Math.sin(angle)) + width,(size*Math.cos(angle) + height));
    ctx.stroke();
}

$(document).ready(function(){
    $("#canvas").attr("width",$(".wheelHolder").width()+"px")
        .attr("height",$(".wheelHolder").height()+"px");
    draw(0);
});

$("#start").click(function(){
    try {
        clearInterval(interval);
        speed = (Math.random()*15) +10;
    }
    catch(e){}
    interval = setInterval(function(){
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

    angle = (angle+180)%360;
    var temp_angle = 0, counter = 0;
    while(temp_angle < angle){
        console.log(counter, temp_angle);
        temp_angle += angles[counter++];
    }
    counter--;

    $("#mTitle").html(captions[counter]);
    $("#mBody").html(text[counter]);
    $("#modalFertig").modal();

}