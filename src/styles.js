//create simple styles of the circles 
//rainbow changing effect 


//watercolor effect - nipples 
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = `rgba(255, 255, 255, .8)`;
ctx.fillRect(0, 0, canvas.width, canvas.height);

let last_x = 0;
let laxt_y = 0;
let penDown = false;

// Shadow
let circleR = 20;
let blurFx = 2;
let x = 100,
    y = 100;

let r = 255,
    g = 0,
    b = 0,
    a = 0.8;

    let clicked = false;

function nipples() {

    ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${a})`;
    ctx.shadowBlur = blurFx;

    //small circle 
    a = 1;
    // ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    ctx.arc(x, y, circleR / 5, 20, 2 * Math.PI);
    ctx.fill();
    // Filled circle 
    a = 0.1;
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    ctx.arc(x, y, circleR, 0, 2 * Math.PI);
    ctx.fill();


}
// window.setInterval(nipples, 1000)
//how do i just change the color without adding on top of it
canvas.addEventListener("click", function(){
    waves();

})


function eyes(){

    ctx.beginPath();
    ctx.fillStyle=`rgba(255,0,0,1)`;
    ctx.arc(x, y, circleR / 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.arc(x, y, circleR, 0, 2 * Math.PI);
    ctx.fillStyle=`rgba(0,255,0,1)`; 
    ctx.stroke();
   
}

//source:https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors
function waves(){
    var lineJoin = ['round', 'bevel', 'miter'];
    ctx.lineWidth = 10;
    for (var i = 0; i < lineJoin.length; i++) {
      ctx.lineJoin = lineJoin[i];
      ctx.beginPath();
      ctx.moveTo(-5, 5 + i * 40);
      ctx.lineTo(35, 45 + i * 40);
      ctx.lineTo(75, 5 + i * 40);
      ctx.lineTo(115, 45 + i * 40);
      ctx.lineTo(155, 5 + i * 40);
      ctx.stroke();
    }

}