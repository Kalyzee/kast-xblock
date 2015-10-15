# -*- coding: utf-8 -*-


"""
    This file is part of Kast.
    Kast is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    Knotes is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with Knotes.  If not, see <http://www.gnu.org/licenses/>.
    
    KNote Team (Alphabetical order) : 
        - Stephane Barbati  <stephane.barbati@kalyzee.com>
        - Ludovic Bouguerra <ludovic.bouguerra@kalyzee.com>
        - Anthony Gross     <anthony.gross@kalyzee.com>
        - Guillaume Laurie  <guillaume.laurie34@gmail.com>
        - Christian Surace  <christian.surace@kalyzee.com>          
        
        
"""

import pkg_resources

"""
    XBlock api import
"""
from xblock.core import XBlock
from xblock.fields import Scope, String
from xblock.fragment import Fragment


"""
    OpenEdx ACL import
"""
from student.auth import has_studio_write_access


"""
    Django models import
"""
from django.contrib.auth.models import User



class KastBlock(XBlock):
    """
    KastBlock
    """


    """Video URL
    """ 
    video_file = String(help="Video URL", default="", scope=Scope.content)
    pdf_file = String(help="Pdf file", default="", scope=Scope.content)
    data = String(help="data", default="", scope=Scope.content)

    def student_view(self, context):
        # Load the HTML fragment from within the package and fill in the template
        html_str = pkg_resources.resource_string(__name__, "static/html/kast_viewer.html")
        
        frag = Fragment(unicode(html_str).format(self=self, video_file="http://www.kalyzee.com/wp-content/uploads/2015/10/out.webm", pdf_file="http://www.kalyzee.com/wp-content/uploads/2015/10/openedx.pdf"))

        css_array = ["static/css/RecordWrapper.css", "static/css/ViewerWrapper.css","static/libs/material-design-lite/material.min.css", "static/libs/font-awesome/css/font-awesome.min.css"]
        
        for element in css_array:
            css_str = pkg_resources.resource_string(__name__, element)
            frag.add_css(unicode(css_str, "utf-8"))

        javascript_array = ["static/libs/jquery/dist/jquery.min.js", "static/libs/material-design-lite/material.min.js", "static/libs/pdfjs/web/compatibility.js", "static/libs/pdfjs/web/l10n.js",
        "static/libs/pdfjs/build/pdf.js", "static/js/KastListeners.js", "static/js/ViewerWrapper.js",
        "static/js/KastViewer.js", "static/js/viewer_main.js"]

        for element in javascript_array:
            js_str = pkg_resources.resource_string(__name__, element)
            frag.add_javascript(unicode(js_str, "utf-8"))


        #js_str = pkg_resources.resource_string(__name__, "static/js/videoknotes.js")
        #frag.add_javascript(unicode(js_str))
        #frag.initialize_js('VideoKNotesBlock', {"video" : self.href, "notes" : timecoded_data_array, "can_publish" : has_studio_write_access(student, self.scope_ids.usage_id.course_key)})


        return frag

    def studio_view(self, context):
        # Load the HTML fragment from within the package and fill in the template
        html_str = pkg_resources.resource_string(__name__, "static/html/kast_viewer.html")
        
        frag = Fragment(unicode(html_str).format(self=self, video_file=self.video_file, pdf_file=self.pdf_file))

        css_array = ["static/css/RecordWrapper.css", "static/css/ViewerWrapper.css","static/libs/material-design-lite/material.min.css", "static/libs/font-awesome/css/font-awesome.min.css"]
        
        for element in css_array:
            css_str = pkg_resources.resource_string(__name__, element)
            frag.add_css(unicode(css_str, "utf-8"))

        javascript_array = ["static/libs/jquery/dist/jquery.min.js", "static/libs/material-design-lite/material.min.js", 
        "static/libs/recordrtc/RecordRTC.min.js", "static/libs/pdfjs/web/compatibility.js", "static/libs/pdfjs/web/l10n.js",
        "static/libs/pdfjs/build/pdf.js", "static/libs/pdfjs/web/debugger.js", "static/js/KastListeners.js", "static/js/RecordWrapper.js", "static/js/ViewerWrapper.js",
        "static/js/Kast.js", "static/js/main.js"]

        for element in javascript_array:
            js_str = pkg_resources.resource_string(__name__, element)
            frag.add_javascript(unicode(js_str, "utf-8"))


        #js_str = pkg_resources.resource_string(__name__, "static/js/videoknotes.js")
        #frag.add_javascript(unicode(js_str))
        #frag.initialize_js('VideoKNotesBlock', {"video" : self.href, "notes" : timecoded_data_array, "can_publish" : has_studio_write_access(student, self.scope_ids.usage_id.course_key)})


        return frag

    @XBlock.json_handler
    def studio_submit(self, data, suffix=''):
        self.video_file = data.get('video_file')
        self.pdf_file = data.get('pdf_file')
        self.data = data.get('data')

        return {'result': 'success'}
