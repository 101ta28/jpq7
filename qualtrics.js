Qualtrics.SurveyEngine.addOnload(function () {
    /* ページが完全に表示されたときに実行するJavaScriptをここに配置 */
    var qthis = this;
    qthis.hideNextButton();

    var task_github = "https://101ta28.github.io/jpq7/";
    // https://<GitHubのユーザー名>.github.io/<レポジトリ名>/

    var requiredResources = [
        task_github + "jspsych-7.3.3/dist/jspsych.js",
        task_github + "jspsych-7.3.3/dist/plugin-html-keyboard-response.js",
        task_github + "jspsych-7.3.3/dist/plugin-image-keyboard-response.js",
        task_github + "jspsych-7.3.3/dist/plugin-preload.js",
        task_github + "main.js"
    ];

    function loadScript(idx) {
        console.log("Loading ", requiredResources[idx]);
        jQuery.getScript(requiredResources[idx], function () {
            if ((idx + 1) < requiredResources.length) {
                loadScript(idx + 1);
            } else {
                console.log("All resources for the task loaded.");
                initExp();
                console.log("Experiment initialized.");
            }
        });
    }

    if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
        loadScript(0);
    }

    jQuery("<div id='display_stage_background'></div>").appendTo('body');
    jQuery("<div id='display_stage'></div>").appendTo('body');

    function initExp() {
        initJsPsych({
            timeline: timeline,
            display_element: 'display_stage',
            on_finish: function () {
                var datajs = jsPsych.data.get().json();
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
