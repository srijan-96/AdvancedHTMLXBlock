/* Javascript for AdvancedHTMLXBlock. */

function AdvancedHTMLXBlock(runtime, element) {
    var getContentHandlerUrl = runtime.handlerUrl(element, 'get_html_content');
    function updateIframeAfterSuccess(result) {
        var htmlcontent = result.htmlcontent;
        console.log(htmlcontent);
        var preview = document.getElementById("unique-id-iframe");
        preview.contentWindow.document.open();
        preview.contentWindow.document.write(htmlcontent);
        preview.contentWindow.document.close();
        preview.onload = function(e) {
            /*
             * Make sure that your <body> + <<html> margin fits within the given margin of 35px
             * It is recommended that you have your <body> and <html> margin is zero
             */
            preview.height = preview.contentWindow.document.body.scrollHeight + 60;
            console.log("This is new function " + preview.height);
            addBlankTargetForAnchorTags(preview);
        };
    }
    function addBlankTargetForAnchorTags(adv_iframe) {
        var anchorTags = adv_iframe.contentDocument.getElementsByTagName("A");
        for(var i = 0; i < anchorTags.length; i++) {
            var aTag = anchorTags[i];
            aTag.target = '_blank';
        }
    }
    $(function ($) {
        /* Here's where you'd do things on page load. */
        console.log(element);
        console.log(runtime);
        $.ajax({
            type: "POST",
            url: getContentHandlerUrl,
            data: JSON.stringify({"need_data": "true"}),
            success: updateIframeAfterSuccess,
            error: function(data) {
                var data = $.parseJSON(data);
                $.each(data.errors, function(index, value){
                    alert(value);
                });
            }
        });
    });
}
