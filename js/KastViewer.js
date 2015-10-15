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
    
    var _seekLock = false;

    _chapters[0] = 1;
    _chapters[5] = 2;

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
        if (!_seekLock){
            var time = Math.round(time);
            if(_lastTime != time){
                if(_chapters[time]){
                    _viewerWrapper.setPage(_chapters[time]);
                }  
                _lastTime = time;    
            }
        }
    }

    var onSeek = function(time){
        _seekLock = true;
        var time = Math.round(time);
        var found = false;
        while(time >= 0 && !found){
            if (_chapters[time]){
                _lastTime = time;
                found = true;
                _viewerWrapper.setPage(_chapters[time]);
                _seekLock = false;

            }
            time--;
        }



        _seekLock = false;
    }

    this.init = function(){
        _viewerWrapper.onPageNext(_this.goToPage);
        _viewerWrapper.onPagePrev(_this.goToPage);
        element.ontimeupdate = function(){
            onTime(element.currentTime);
        };

        element.onseeking = function(){
            onSeek(element.currentTime);
        }
    }



}