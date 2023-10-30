Qualtrics.SurveyEngine.addOnload(function () {
    /* ページが完全に表示されたときに実行するJavaScriptをここに配置 */
    let qthis = this;
    qthis.hideNextButton();

    let task_github = "https://101ta28.github.io/jpq7/";
    // https://<GitHubのユーザー名>.github.io/<レポジトリ名>/

    let requiredResources = [
        task_github + "jspsych-6.3.1/jspsych.js",
        task_github + "jspsych-6.3.1/plugins/jspsych-html-keyboard-response.js",
        task_github + "exp1.js"
    ];

    function loadScript(idx) {
        console.log("Loading ", requiredResources[idx]);
        jQuery.getScript(requiredResources[idx], function () {
            if ((idx + 1) < requiredResources.length) {
                loadScript(idx + 1);
            } else {
                initExp();
                console.log("All resources for the task loaded.");
            }
        });
    }

    if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
        loadScript(0);
    }

    jQuery("<div id='display_stage'></div>").appendTo('body');
    jQuery("<div id='display_stage_background'></div>").appendTo('body');
    jQuery("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: task_github + "jspsych-6.3.1/css/jspsych.css"
    }).appendTo('head');

    function initExp() {
        jsPsych.init({
            timeline: [hello_trial],
            on_finish: function () {
                const datajs = jsPsych.data.get().json();
                Qualtrics.SurveyEngine.setEmbeddedData("datajs", datajs);
                jQuery('#display_stage').remove();
                jQuery('#display_stage_background').remove();
                qthis.clickNextButton();
            }
        });
    };
});

Qualtrics.SurveyEngine.addOnReady(function () {
    /* ページが完全に表示されたときに実行するJavaScriptをここに配置 */
});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /* ページがアンロードされるときに実行するJavaScriptをここに配置 */
});
