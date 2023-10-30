const repo_site = "https://101ta28.github.io/jpq7/";

/* create timeline */
let timeline = [];

const hello_trial = {
    type: 'html-keyboard-response',
    stimulus: function () {
        const html = `<img id="rotate-image" src="${repo_site}jspsych-6.3.1/examples/img/9.gif">`;
        return html;
    },
    on_load: function () {
        let image = document.getElementById("rotate-image");
        let startAngle = 0;
        let rotation = 0;

        image.onmousedown = function (event) {
            // Get the center of the image
            let rect = image.getBoundingClientRect();
            let centerX = rect.left + rect.width / 2;
            let centerY = rect.top + rect.height / 2;

            startAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI);

            document.onmousemove = function (event) {
                let moveAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI);
                let angleDiff = moveAngle - startAngle;

                rotation += angleDiff;

                image.style.transition = "none"; // Disable smooth transition while dragging
                image.style.transform = `rotate(${rotation}deg)`;

                startAngle = moveAngle; // Set the new start angle for the next movement
            };

            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    },
};

timeline.push(hello_trial);
