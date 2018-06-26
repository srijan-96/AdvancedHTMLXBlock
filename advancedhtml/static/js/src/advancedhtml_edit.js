

function AdvancedHTMLXBlock_EditorInit(runtime, element) {
    var editor;
    var toggle;
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
    $(element).find('.save-button').bind('click', function () {
        /* Disable live preview by default */
        toggle = document.getElementById("live_preview_toggle");
        toggle.checked = false;
        var live_preview = document.getElementById("advancedhtml_preview");
        live_preview.classList.remove('col-6');
        live_preview.style.display = "none";
        var editor_wrapper = document.getElementById("advancedhtml_editor");
        editor_wrapper.classList.remove('col-6');
        editor_wrapper.classList.add('col-12');
        var setContentHandlerUrl = runtime.handlerUrl(element, 'set_html_content');
        editorContent = editor.getValue();
        runtime.notify('save', {state: 'start'});
        var data = {
            "set_data" : editorContent
        };
        $.post(setContentHandlerUrl, JSON.stringify(data)).done(function(response) {
            runtime.notify('save', {state: 'end'});
        });
    });
    $(element).find('.cancel-button').bind('click', function() {
        /* Disable live preview by default */
        toggle = document.getElementById("live_preview_toggle");
        toggle.checked = false;
        var live_preview = document.getElementById("advancedhtml_preview");
        live_preview.classList.remove('col-6');
        live_preview.style.display = "none";
        var editor_wrapper = document.getElementById("advancedhtml_editor");
        editor_wrapper.classList.remove('col-6');
        editor_wrapper.classList.add('col-12');
        runtime.notify('cancel', {});
    });
    $(element).find('#live_preview_toggle').bind('click', function() {
        toggle = document.getElementById("live_preview_toggle");
        var editor_wrapper = document.getElementById("advancedhtml_editor");
        var live_preview = document.getElementById("advancedhtml_preview");
        if(toggle.checked) {
            live_preview.classList.add('col-6');
            editor_wrapper.classList.remove('col-12');
            editor_wrapper.classList.add('col-6');
            live_preview.style.display = "block";
        }
        else {
            live_preview.classList.remove('col-6');
            live_preview.style.display = "none";
            editor_wrapper.classList.remove('col-6');
            editor_wrapper.classList.add('col-12');
        }
    });
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
        /* Disable live preview by default */
        toggle = document.getElementById("live_preview_toggle");
        toggle.checked = false;
        var live_preview = document.getElementById("advancedhtml_preview");
        live_preview.classList.remove('col-6');
        live_preview.style.display = "none";
        var editor_wrapper = document.getElementById("advancedhtml_editor");
        editor_wrapper.classList.remove('col-6');
        editor_wrapper.classList.add('col-12');

        /* Add the editor tabs */
        /*
         * Reference :
         * https://github.com/appsembler/xblock-video/blob/27a4a2e3441cb0bb21c2693e4a33cc3efe39055e/video_xblock/static/js/studio-edit/studio-edit.js#L67
         * If this is not working, you might want to check values of
         * variables over log
         */
        function toggleEditorTab(event, tabName) {
            var $tabDisable;
            var $tabEnable;
            var $otherTabName;
            if (tabName === 'Editor') {
                $tabEnable = $('#advancedhtml_edit_wrapper');
                $tabDisable = $('#advancedhtml_settings_wrapper');
                $otherTabName = 'Settings';
            } else if (tabName === 'Settings') {
                $tabEnable = $('#advancedhtml_settings_wrapper');
                $tabDisable = $('#advancedhtml_edit_wrapper');
                $otherTabName = 'Editor';
            }
            $(event.currentTarget).addClass('current');
            $('.edit-menu-tab[data-tab-name=' + $otherTabName + ']').removeClass('current');
            $tabDisable.addClass('is-hidden');
            $tabEnable.removeClass('is-hidden');
        }

        var $modalHeaderTabs = $('.editor-modes.action-list.action-modes');
        var isNotDummy = $('#sb-field-edit-href').val() !== '';
        var currentTabName;
        if(isNotDummy) {
            $modalHeaderTabs
                .append(
                    '<li class="inner-tab-wrap">' +
                    '   <button class="edit-menu-tab" data-tab-name="Settings">Settings</button>' +
                    '</li>',
                    '<li class="inner-tab-wrap">' +
                    '   <button class="edit-menu-tab current" data-tab-name="Editor">Editor</button>' +
                    '</li>'
                );
            // Bind listeners to the toggle buttons
            $('.edit-menu-tab').click(function(event) {
                currentTabName = $(event.currentTarget).attr('data-tab-name');
                toggleEditorTab(event, currentTabName);
            });
        }
        document.getElementById("advancedhtml_component_id").innerHTML = element.getAttribute("data-usage-id");
    });
}
