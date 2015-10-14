function Kast(options){

	var recording = false;

	var recordWrapper = new RecordWrapper();
	var viewerWrapper = new ViewerWrapper();
	var _this = this;

	this.startRecording = function(){
		if(!recording){
			recording = true;
		}
		else{
			throw "Video is recording";
		}

	}

	this.stopRecording = function(){
		if(recording){
			recording = false;
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

}