"""An XBlock to allow internal and external CSS in your course"""

import pkg_resources

import uuid

from xblock.core import XBlock
from xblock.fields import Integer, Scope, String, Boolean
from xblock.fragment import Fragment

from xblockutils.publish_event import PublishEventMixin

defaultHTMLString = """<!DOCTYPE html>
<html>
    <head>
        <style>
            /* 
             * Do not modify html, body margin and padding 
             * for best results
             */
            html, body {
                padding: 0 !important;
                margin: 0 !important;
                font-family: "Arial Black", Gadget, sans-serif !important;
            }
            h2 {
                color: #f1f1f1;
                padding-left: 30px;
                padding-right: 5px;
                padding-top: 30px;
                padding-bottom: 30px;
                background: linear-gradient(-45deg, #EE7752, #E73C7E, #23A6D5, #23D5AB);
                background-size: 400% 400%;
	            -webkit-animation: Gradient 15s ease infinite;
	            -moz-animation: Gradient 15s ease infinite;
	            animation: Gradient 15s ease infinite;
            }
            /* https://codepen.io/P1N2O/pen/pyBNzX */
            @-webkit-keyframes Gradient {
                0% {
                    background-position: 0% 50%
                }
                50% {
                    background-position: 100% 50%
                }
                100% {
                    background-position: 0% 50%
                }
            }

            @-moz-keyframes Gradient {
                0% {
                    background-position: 0% 50%
                }
                50% {
                    background-position: 100% 50%
                }
                100% {
                    background-position: 0% 50%
                }
            }

            @keyframes Gradient {
                0% {
                    background-position: 0% 50%
                }
                50% {
                    background-position: 100% 50%
                }
                100% {
                    background-position: 0% 50%
                }
            }
            p {
                color: #111111;
            }
        </style>
    </head>
    <body>
        <h2>Welcome to Advanced HTML Component</h2>
        <p>Make your courses beautiful by including CSS</p>
    </body>
</html>
"""
class AdvancedHTMLXBlock(XBlock, PublishEventMixin):
    """
    Advanced HTML XBlock

    This XBlock allows internal CSS and external CSS(fetched through <link>)
    to be included in your course content

    The XBlock will allow course creator to edit raw HTML content using 
    CodeMirror 5.38 (studio_view)
    After the contents are saved, the XBlock will wrap these contents inside 
    an iframe preserving and conficing all CSS in it.(student_view)

    Each iframe is given a unique id and hence you should be able to use 
    multiple XBlocks on same page.

    Notes:
    While dragging XBlock in studio, it is possible that after dragging your 
    XBlock shows nothing, don't worry, all your data is still stored.
    This is because studio does not call student_view after dragging
    If you want to preview in this case, click on edit once and save/cance
    """

    display_name = String(
        default="Advanced HTML",
        help="The display name of the XBlock"
    )
    name = String(
        default="Advanced HTML XBlock"
    )
    has_score=False
    icon_class="other"
    unique_id = String(
        default="unique-id",
        help="Unique ID of this xblock",
        scope=Scope.user_state
    )
    # Even though this is default field, it is used 
    # DONOT delete
    count = Integer(
        default=0, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )
    htmlcontent = String(
        default=defaultHTMLString, scope=Scope.content,
        help="Source code of HTML courseware"
    )
    live_preview = Boolean(
        default=True,
        scope = Scope.content,
        help="Live Preview Flag"
    )
    non_editable_metadata_fields=["display_name", "has_score", "icon_class", "htmlcontent", "unique_id"]

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    def student_view(self, context=None):
        """
        The primary view of the AdvancedHTMLXBlock, shown to students
        when viewing courses.
        """
        if(self.count == 0):
            self.unique_id = str(uuid.uuid4())
            self.count = 1
        html = self.resource_string("static/html/advancedhtml.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/advancedhtml_student.css"))
        frag.add_javascript(self.resource_string("static/js/src/advancedhtml.js"))
        frag.initialize_js('AdvancedHTMLXBlock', {"unique-id" : self.unique_id})
        return frag

    def studio_view(self, context=None):
        """
        The view that opens on clicking edit button in studio
        """
        html = self.resource_string("static/html/advancedhtml_edit.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/codemirror.css"))
        frag.add_css(self.resource_string("static/css/foldgutter.css"))
        frag.add_css(self.resource_string("static/css/bootstrap-grid.css"))
        frag.add_css(self.resource_string("static/css/advancedhtml.css"))
        # Load the main CodeMirror first
        frag.add_javascript(self.resource_string("static/js/src/codemirror/codemirror.js"))
        # Load the CodeMirror addons 
        # Folder : addons/edit
        frag.add_javascript(self.resource_string("static/js/src/codemirror/closebrackets.js"))
        frag.add_javascript(self.resource_string("static/js/src/codemirror/closetag.js"))
        # Folder : addons/fold
        frag.add_javascript(self.resource_string("static/js/src/codemirror/foldcode.js"))
        frag.add_javascript(self.resource_string("static/js/src/codemirror/foldgutter.js"))
        frag.add_javascript(self.resource_string("static/js/src/codemirror/brace-fold.js"))
        frag.add_javascript(self.resource_string("static/js/src/codemirror/comment-fold.js"))
        frag.add_javascript(self.resource_string("static/js/src/codemirror/indent-fold.js"))
        frag.add_javascript(self.resource_string("static/js/src/codemirror/xml-fold.js"))
        # Load the CodeMirror modes
        frag.add_javascript(self.resource_string("static/js/src/codemirror/css.js"))
        frag.add_javascript(self.resource_string("static/js/src/codemirror/htmlmixed.js"))
        frag.add_javascript(self.resource_string("static/js/src/codemirror/javascript.js"))
        frag.add_javascript(self.resource_string("static/js/src/codemirror/xml.js"))
        # Finally load our JavaScript
        frag.add_javascript(self.resource_string("static/js/src/advancedhtml_edit.js"))

        frag.initialize_js('AdvancedHTMLXBlock_EditorInit', {"live_preview" : self.live_preview})
        return frag

    # Default XBlock function
    @XBlock.json_handler
    def increment_count(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        # Just to show data coming in...
        assert data['hello'] == 'world'

        self.count += 1
        return {"count": self.count}

    @XBlock.json_handler
    def get_html_content(self, data, suffix=''):
        assert data['need_data'] == 'true'
        return {"htmlcontent": self.htmlcontent}
    
    @XBlock.json_handler
    def set_html_content(self, data, suffix=''):
        self.htmlcontent = data['set_data']
        self.display_name = data['set_display_name']
        self.live_preview = data['set_live_preview']
        return {"htmlcontent": self.htmlcontent}
    
    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("AdvancedHTMLXBlock",
             """<advancedhtml/>
             """),
            ("Multiple AdvancedHTMLXBlock",
             """<vertical_demo>
                <advancedhtml/>
                <advancedhtml/>
                <advancedhtml/>
                </vertical_demo>
             """),
        ]
