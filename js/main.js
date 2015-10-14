$(document).ready(function(){

	var options = {
		videoElement : $("video")[0]
	}
	var kast = new Kast(options);
	$(".kast-button-record").click(function(){
		kast.startStopRecording();
		if (kast.isRecording()){
			$(".kast-button-record").html("Stop recording");
		}else{
			$(".kast-button-record").html("Start recording");
		}
	});

});