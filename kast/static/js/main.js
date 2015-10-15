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

function KastEditorBlock(runtime, element, init_args) {
	alert("HELLO");
    var _this = this;


	var options = {
		videoElement : $("video")[0],
		onSave : function(json){
			console.log(json);
		}

	}
	alert("ok");

	var kast = new Kast(options);
	kast.init();
	alert("ok");
	$(".kast-button-record").click(function(){
		alert("ok");
		kast.startStopRecording();
		if (kast.isRecording()){
			$(".kast-button-record").html("Stop recording");
		}else{
			$(".kast-button-record").html("Start recording");
		}
	});

	$(".kast-button-save").click(function(){
		kast.save();
		
	});	

}
