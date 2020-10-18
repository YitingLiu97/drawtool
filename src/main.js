let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.fillStyle = `rgba(255, 0, 0, .8)`;
ctx.fillRect(0, 0, canvas.width, canvas.height);

let last_x = 0;
let laxt_y = 0;
let penDown = false;

// creating watercolor effect: https://www.infoworld.com/article/3332931/javascript-tutorial-create-a-watercolor-edge-with-p5js.html

// draw scribbles randomized; inspo: https://tylerxhobbs.com/#/reach/

// change the bg into texture 

// steps:
// 1. thinner start and thicker end - during paint move 
// 2. graident color through 
// 3. replacing line with circles 

// record the time of the pressing 

let startTime = 0,
    endTime = 0,
    holdTime = 0;



// holdTime determines the lineWidth
function paintStart(x, y) {
    startTime = Date.now();
    console.log('startTime', startTime)
    penDown = true;
    ctx.beginPath();
    ctx.arc(x - 20, y - 20, 40, 0, 2 * Math.PI);
    ctx.closePath();

    // ctx.lineWidth = holdTime*2;

    // gradient - making water color effect - why doesn't it show? 
    // for (let i = 6; i > 0; i--) {
    //     ctx.lineWidth = i;
    //     ctx.strokeStyle = 'rgb(0,' + Math.floor(255 - 22.5 * i) + ', 0)';
    //     console.log("i is "+ i)
    // }

    ctx.stroke();
    last_x = x;
    last_y = y;
}

function paintMove(x, y) {

    ctx.beginPath();
    ctx.moveTo(last_x, last_y);
    ctx.lineTo(x, y);

    //when it is moving, changing the color of the line 

    // ctx.strokeStyle = "black"


    ctx.stroke();

    for (let i = 0; i < holdTime; i++) {
        ctx.lineWidth = i;

    }
    console.log("holdTime", holdTime)


    last_x = x;
    last_y = y;

    let r = 255,
        g = 0,
        b = 0,
        a = 1;

    for (let i = 0; i < holdTime; i += 0.01) {


        r--;
        g++;
        b++;

        if (r < 0) {
            r = 255;
        }

        if (g > 255) {
            g = 0
        }
        if (b > 255) {
            b = 0
        }
    }

    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;

    //     for(let i =0; i< holdTime; i+=0.01){
    //         if(r=255){
    //             r=r-i/holdTime;
    //         }else{
    //             r=0;
    //         }
    // ctx.fillStyle = `rgba(${r}, 0, 0, .8)`;

    //      }
}

function paintEnd(x, y) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    endTime = Date.now();
    console.log('endTime', endTime)
    holdTime = (endTime - startTime) / 1000; //in seconds
    console.log('holdTime', holdTime)

}

canvas.addEventListener("mousedown", function (e) {
    let x = e.clientX;
    let y = e.clientY;
    paintStart(x, y);
})

canvas.addEventListener("mousemove", function (e) {
    if (penDown === false) {
        return;
    }
    let x = e.clientX;
    let y = e.clientY;

    paintMove(x, y);

})

// mouse out so the canvas will consider it gone rather than still registering for the last x and last y 
canvas.addEventListener("mouseout", function (e) {
    penDown = false;
});

canvas.addEventListener("mouseup", function (e) {
    penDown = false;
    let x = e.clientX;
    let y = e.clientY;
    paintEnd(x, y);
});