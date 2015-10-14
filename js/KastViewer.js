/**

    This file is part of Kast.

    Kast is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Kast is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Kast.  If not, see <http://www.gnu.org/licenses/>.

    
    KNote Team (Alphabetical order) : 
        - Stephane Barbati  <stephane.barbati@kalyzee.com>
        - Ludovic Bouguerra <ludovic.bouguerra@kalyzee.com>
        - Anthony Gross     <anthony.gross@kalyzee.com>
        - Guillaume Laurie  <guillaume.laurie34@gmail.com>
        - Christian Surace  <christian.surace@kalyzee.com>        
        
    
*/
function KastViewer(element, video, chapters){
    var _timecodedEventsBegin = [];
    var _timecodedEventsEnd = [];

    var _lastTime = -1;

    var _chapters = [];

    _chapters[0] = 1;
    _chapters[5] = 2;
    _chapters[10] = 3;

    var _reverseChapterTime = [];
    _reverseChapterTime[1] = 0;
    _reverseChapterTime[2] = 5;
    _reverseChapterTime[3] = 10;

    var _viewerWrapper = new ViewerWrapper();

    var _this = this; 

    this.goToPage = function(page){
        if (_reverseChapterTime[page]){
            element.currentTime = _reverseChapterTime[page];
        }
    }


    var onTime = function(time){
        var time = Math.round(time);
        if(_lastTime != time){
            console.log("we are here ! "+ time);
            if(_chapters[time]){
                _viewerWrapper.setPage(_chapters[time]);
            }  
            _lastTime = time;    
        }
    }



    this.init = function(){
        _viewerWrapper.onPageNext(_this.goToPage);
        _viewerWrapper.onPagePrev(_this.goToPage);
        element.ontimeupdate = function(){
            onTime(element.currentTime);
        };
    }



}