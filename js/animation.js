var x = 0;
var y = 0;
var frame = 0;

function gavinwareAnimation() {
    var gavinwareSpritesheet = document.getElementById("gavinware-animation");
    gavinwareSpritesheet.style.backgroundPosition = `-${x * 75}px -${y * 80}px`;
    if (frame < 15) {
        if (x < 6) {
            x++;
            frame++;
        } else {
            x = 0;
            if (y < 1) {
                y++;
            } else {
                y = 0;
            }
            frame++;
        }
    } else {
        x = 0;
        y = 0;
        frame = 0;
    }
}

setInterval(gavinwareAnimation, 1000 / 30); // 1000ms / 30 is 30 fps