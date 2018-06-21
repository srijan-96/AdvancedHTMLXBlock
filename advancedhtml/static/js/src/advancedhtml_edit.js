

function AdvancedHTMLXBlock_EditorInit(runtime, element) {
    "use strict";
    var editor;
    var editorContent = String.raw`<!DOCTYPE html>
<html>
    <head>
        <style>
        p {
            background-color: blue;
            color: white;
        }
        </style>
    </head>
    <body>
        <p>This is adv</p>
    </body>
</html>`;
    function updateEditorAfterAJAX(result) {
        editorContent = result.htmlcontent;
        editor.setValue(editorContent, -1);
        var preview = document.getElementById("AdVhTmLpReViEw");
        preview.contentWindow.document.open();
        preview.contentWindow.document.write(editorContent);
        preview.contentWindow.document.close();
    }
    $("#saveEditor", element).click(function(eventObject) {
        var setContentHandlerUrl = runtime.handlerUrl(element, 'set_html_content');
        editorContent = editor.getValue();
        $.ajax({
            type: "POST",
            url: setContentHandlerUrl,
            data: JSON.stringify({"set_data": editorContent}),
            success: updateEditorAfterAJAX
        });
    })
    $(function ($) {
        /* On Page Load */
        var getContentHandlerUrl = runtime.handlerUrl(element, 'get_html_content');
        $.ajax({
            type: "POST",
            url: getContentHandlerUrl,
            data: JSON.stringify({"need_data": "true"}),
            success: updateEditorAfterAJAX
        });
        /* Initialize CodeMirror */
        editor = CodeMirror.fromTextArea(document.getElementById("AdVeDiToR"), {
            lineNumbers: true,
            lineWrapping: false,
            mode: 'htmlmixed',
            tabSize: 4,
            indentUnit: 4,
            indentOnInit: true,
            autoCloseBrackets: true,
            autoCloseTags: true,
            foldGutter: true,
            gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
        });
        editor.on("change", function(cm, change) {
            var tmp = cm.getValue();
            var preview = document.getElementById("AdVhTmLpReViEw");
            preview.contentWindow.document.open();
            preview.contentWindow.document.write(tmp);
            preview.contentWindow.document.close();
        });
    });
}
