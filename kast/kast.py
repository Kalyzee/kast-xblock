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
        pass

    def studio_view(self, context):
        pass

    @XBlock.json_handler
    def studio_submit(self, data, suffix=''):
        self.video_file = data.get('video_file')
        self.pdf_file = data.get('pdf_file')
        self.data = data.get('data')

        return {'result': 'success'}
