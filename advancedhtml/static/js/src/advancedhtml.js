/* Javascript for AdvancedHTMLXBlock. */
function AdvancedHTMLXBlock(runtime, element) {

    function updateCount(result) {
        $('.count', element).text(result.count);
    }

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');

    $('p', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"hello": "world"}),
            success: updateCount
        });
    });

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}

function AdvancedHTMLXBlock_EditorInit(runtime, element) {
    $(function ($) {
        /* On Page Load */
        requirejs.config({
            paths: {
                'ace-editor': 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/'
            }
        });
        requirejs(['ace-editor/ace'], function() {
            ace.config.set("packaged", true);
            ace.config.set("basePath", require.toUrl("ace-editor"));
            ace.config.set("modePath", require.toUrl("ace-editor"));
            var editor = ace.edit("AdVeDiToR");
            var demoContent = String.raw`<!DOCTYPE html>
    <html>
        <body>
            <p>This is adv</p>
        </body>
    </html>`;
            editor.setValue(demoContent);
            editor.session.setUseWorker(true);
            editor.session.setMode("ace/mode/html");
        });
    });
}
