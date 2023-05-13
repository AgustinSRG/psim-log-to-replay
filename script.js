// Main script

function escapeHTML(html) {
    return ("" + html).replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function generateHTML(log) {
    return TemplateHTML.replace("${BATTLE_LOG}", escapeHTML(log));
}

function setReplay(log) {
    var html = generateHTML(log);

    var url = "data:text/html;charset=utf-8," + encodeURIComponent(html);

    var container = document.querySelector(".iframe-result-container");

    container.innerHTML = '<iframe src="' + url + '" referrerpolicy="no-referrer" allow="fullscreen"></iframe>';

    var hint = document.querySelector(".drag-notice-container");

    if (hint) {
        hint.remove();
    }
}

function uploadLog(logFile) {
    if (!logFile) {
        return;
    }
    var reader = new FileReader();

    reader.readAsText(logFile, "UTF-8");

    reader.onload = function (evt) {
        setReplay(evt.target.result)
    };

    reader.onerror = function (err) {
        console.error(err);
    };
}

function initialize() {
    var btn = document.querySelector("#upload-button");

    btn.addEventListener("click", function () {
        document.querySelector("#upload-file").click();
    });

    var file = document.querySelector("#upload-file");

    file.addEventListener("change", function (e) {
        var data = e.target.files;
        if (data && data.length > 0) {
            uploadLog(data[0]);
        }
    });

    var hint = document.querySelector(".drag-notice-container");

    hint.addEventListener("click", function () {
        document.querySelector("#upload-file").click();
    });
}

if (document.readyState !== 'loading') {
    initialize();
} else {
    document.addEventListener("DOMContentLoaded", initialize);
}

document.addEventListener("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var data = e.dataTransfer.files;
    if (data && data.length > 0) {
        uploadLog(data[0]);
    }
});

document.addEventListener("dragover", function (e) {
    e.preventDefault();
    e.stopPropagation();
});


