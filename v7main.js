const repo_site = "https://101ta28.github.io/jpq7/";

/* create timeline */
let timeline = [];

/* preload images */
let preload = {
    type: jsPsychPreload,
    images: [`${repo_site}jspsych-6.3.1/examples/img/blue.png`, `${repo_site}jspsych-6.3.1/examples/img/orange.png`],
};
timeline.push(preload);

/* define welcome message trial */
let welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Welcome to the experiment. Press any key to begin.",
};
timeline.push(welcome);

/* define instructions trial */
let instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <p>In this experiment, a circle will appear in the center 
        of the screen.</p><p>If the circle is <strong>blue</strong>, 
        press the letter F on the keyboard as fast as you can.</p>
        <p>If the circle is <strong>orange</strong>, press the letter J 
        as fast as you can.</p>
        <div style='width: 700px;'>
        <div style='float: left;'><img src='jspsych-6.3.1/examples/img/blue.png'></img>
        <p class='small'><strong>Press the F key</strong></p></div>
        <div style='float: right;'><img src='jspsych-6.3.1/examples/img/orange.png'></img>
        <p class='small'><strong>Press the J key</strong></p></div>
        </div>
        <p>Press any key to begin.</p>
      `,
    post_trial_gap: 2000,
};
timeline.push(instructions);

/* test trials */
let test_stimuli = [
    {
        stimulus: "jspsych-6.3.1/examples/img/blue.png",
        correct_response: "f",
    },
    {
        stimulus: "jspsych-6.3.1/examples/img/orange.png",
        correct_response: "j",
    },
];

let fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: function () {
        return jsPsych.randomization.sampleWithoutReplacement(
            [250, 500, 750, 1000, 1250, 1500, 1750, 2000],
            1
        )[0];
    },
    data: {
        task: "fixation",
    },
};

let test = {
    type: jsPsychImageKeyboardResponse,
    // stimulus: jsPsych.timelineVariable("stimulus", true),
    stimulus: function () {
        return jsPsych.timelineVariable("stimulus", true);
    },
    choices: ["f", "j"],
    data: {
        task: "response",
        // correct_response: jsPsych.timelineVariable("correct_response", true),
        correct_response: function () {
            return jsPsych.timelineVariable("correct_response", true);
        },
    },
    on_finish: function (data) {
        data.correct = jsPsych.pluginAPI.compareKeys(
            data.response,
            data.correct_response
        );
    },
};

let test_procedure = {
    timeline: [fixation, test],
    timeline_variables: test_stimuli,
    repetitions: 5,
    randomize_order: true,
};
timeline.push(test_procedure);

/* define debrief */

let debrief_block = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
        let trials = jsPsych.data.get().filter({ task: "response" });
        let correct_trials = trials.filter({ correct: true });
        let accuracy = Math.round(
            (correct_trials.count() / trials.count()) * 100
        );
        let rt = Math.round(correct_trials.select("rt").mean());

        return `<p>You responded correctly on ${accuracy}% of the trials.</p>
          <p>Your average response time was ${rt}ms.</p>
          <p>Press any key to complete the experiment. Thank you!</p>`;
    },
};
timeline.push(debrief_block);
