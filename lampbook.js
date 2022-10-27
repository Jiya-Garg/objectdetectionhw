object_status = "";
objects = [];
function setup() {
    canvas = createCanvas(700, 500);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'Status - Detecting Objects';
}
function modelLoaded() {
    console.log('Model is loaded!');
    object_status = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, result) {
    if (error) {
        console.error(error);
    }
    console.log(result);
    objects = result;
}
img ="";
function preload() {
    img = loadImage('lampbook.jpg');
}
function draw() {
    image(img, 0, 0, 700, 500)
    if (object_status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Objects Detected";
            percentage = floor(objects[i].confidence * 100);
            fill('red');
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 20);
            textSize(20)
            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}
function back() {
    window.location = "index.html";
}