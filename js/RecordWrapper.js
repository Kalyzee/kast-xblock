/**
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

	
/*		navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(function(audioVideoStream){

		}).catch(function(){

		});*/
	}

	this.stopRecording = function(){
	    recordRTC.stopRecording(function (audioVideoWebMURL) {

	        videoElement.src = audioVideoWebMURL;
			
			videoElement.srcObject = null;
			videoElement.mozSrcObject = null;
	        var recordedBlob = recordRTC.getBlob();
	        recordRTC.getDataURL(function(dataURL) { });
	        recordRTC = null;
	        _stream.stop();
	        _stream = null;
	    });
	}

}