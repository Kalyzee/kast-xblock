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

    
    Kast Team (Alphabetical order) : 
        - Stephane Barbati  <stephane.barbati@kalyzee.com>
        - Ludovic Bouguerra <ludovic.bouguerra@kalyzee.com>
        - Anthony Gross     <anthony.gross@kalyzee.com>
        - Guillaume Laurie  <guillaume.laurie34@gmail.com>
        - Christian Surace  <christian.surace@kalyzee.com>        
        
   
*	RecordRTC Wrapper specific for Kast
*	Capture 
*/
function RecordWrapper(videoElement){
	var _stream = null;
	var _recordRTC = null;

	var _mediaConstraints = { video: true, audio: true };
	var _options = {
      mimeType: 'video/webm', // or video/mp4 or audio/ogg
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000,
      disableLogs: true,
	};

	this.startRecording = function(){
		navigator.mediaDevices.getUserMedia(_mediaConstraints).then(function(stream){
			_stream = stream;
		    recordRTC = RecordRTC(stream, _options);
			recordRTC.startRecording();
			
			videoElement.srcObject = stream;
			videoElement.mozSrcObject = stream;
			
			videoElement.play();


		}).catch(function(error){
			alert(error)
		});

	
	}

	this.getCurrentTime = function(){
		return videoElement.currentTime;
	}

	this.stopRecording = function(){
	    recordRTC.stopRecording(function (audioVideoWebMURL) {

	        videoElement.src = audioVideoWebMURL;
			
			videoElement.srcObject = null;
			videoElement.mozSrcObject = null;
	        var recordedBlob = recordRTC.getBlob();
	        recordRTC.getDataURL(function(dataURL) { });
	        _stream.stop();
	        _stream = null;
	    });
	}

	this.save = function(){
		recordRTC.save();
	}

}