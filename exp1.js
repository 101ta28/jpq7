const repo_site = "https://101ta28.github.io/jpq7/";

/* create timeline */
let timeline = [];

const hello_trial = {
    type: 'html-keyboard-response',
    stimulus: function () {
        const html =
            `<img id="rotate-image" src="jspsych-6.3.1/examples/img/9.gif" style="transition: transform 2s;">`;
        setTimeout(() => {
            document.getElementById("rotate-image").style.transform =
                "rotate(360deg)";
        }, 0);
        return html;
    },
};

timeline.push(hello_trial);
