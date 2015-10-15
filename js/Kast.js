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
function Kast(options){

	var recording = false;

	var recordWrapper = new RecordWrapper(options.videoElement);
	var viewerWrapper = new ViewerWrapper();
	var _this = this;


	/**
	*	Format chapter
	*	Associate a time to a given slide
	*/
	var _chapters = [];


	/**
	*	Associate a chapter to a time
	*/
	var _reverseChapterTime = [];

	var associate = function(time, chapter){
		var time = Math.round(time);
		_chapters[time] = chapter;
		_reverseChapterTime[chapter] = time;
	}

	this.init = function(){
		viewerWrapper.onPagePrev(function(page){
			if(recording){
				associate(recordWrapper.getCurrentTime(), page);	
			}
		});

		viewerWrapper.onPageNext(function(page){
			if(recording){
				associate(recordWrapper.getCurrentTime(), page);	
			}
		});		


	}

	this.startRecording = function(){
		if(!recording){
			recording = true;
			_chapters[0] = 1;
			recordWrapper.startRecording();
		}
		else{
			throw "Video is recording";
		}

	}

	this.stopRecording = function(){
		if(recording){
			recording = false;
			recordWrapper.stopRecording();
		}else{
			throw "Video is recording";
		}
		
	}

	this.startStopRecording = function(){
		if (recording){
			_this.stopRecording();
		}else{
			_this.startRecording();
		}
	}

	this.isRecording = function(){
		return recording;
	}


	this.save = function(){
		if (options && options.onSave){
			options.onSave(_chapters);
			recordWrapper.save();
		}
	}


}