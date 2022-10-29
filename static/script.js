
// taken from https://stackoverflow.com/questions/55677/how-do-i-get-the-coordinates-of-a-mouse-click-on-a-canvas-element
// Oct 28, 2022
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.touches[0].clientX - rect.left;
    const y = event.touches[0].clientY - rect.top;
    return {x, y};
}

let start_x = 0;
let start_y = 0;

let tracking = false;
let wait = false;

(function(window, document, undefined) {
    window.onload = init;

    function init() {
        namespace = "/main";
        var socket = io(namespace);

        // get initial data on successful connection
        socket.emit("conn");
        socket.on("initialization", function(msg) {

        });

        const canvas = document.querySelector("canvas");

        canvas.ontouchmove = (function(e) {
            if (tracking && !wait) {
                let c = getCursorPosition(canvas, e);
                socket.emit("move", {x: (c["x"] - start_x)*10, y: (c["y"] - start_y)*10});
                start_x = c["x"];
                start_y = c["y"];

                wait = true;
                setTimeout(function() {
                    wait = false;
                }, 100);
            }
        });

        canvas.addEventListener("touchstart", function(e) {
            c = getCursorPosition(canvas, e);
            start_x = c["x"];
            start_x = c["y"];
            tracking = true;
        });

        canvas.addEventListener("touchend", function(e) {
            tracking = false;
        });

    }

})(window, document, undefined);
