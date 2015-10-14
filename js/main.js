$(document).ready(function(){

	var kast = new Kast();
	$(".kast-button-record").click(function(){
		kast.startStopRecording();
		if (kast.isRecording()){
			$(".kast-button-record").html("Stop recording");
		}else{
			$(".kast-button-record").html("Start recording");
		}
	});

});