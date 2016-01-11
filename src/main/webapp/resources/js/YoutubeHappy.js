// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
height: '390',
width: '640',
videoId: document.getElementById('vidId').innerHTML,
events: {
'onReady': onPlayerReady,
'onStateChange': onPlayerStateChange
}
});
}



// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
    document.getElementById("title").innerHTML=player.getVideoData().title;
    document.getElementById("url").innerHTML=player.getVideoUrl();
	
    function getLastString(str)
    {
        var arr = str.split("-");
        return arr[arr.length-1].trim();
    }
    $('#evts_button').on("click", function() {
//        var instance = $('#evts').jstree(true);
//        instance.deselect_all();
//        instance.select_node('1');
    	jstreeob=$("#evts").jstree(true).get_json()[0]
    	updateendpoint="http://localhost:8080/spring-mongodb-tutorial/videos/update/"+document.getElementById('vidId').innerHTML
//    	updateendpoint="http://45.55.199.244:8080/spring-mongodb-tutorial/videos/update/"+document.getElementById('vidId').innerHTML
    	$.ajax({method:"POST",url:updateendpoint,contentType:"text/plain",data:JSON.stringify(jstreeob)})
    });
    $('#evts')
            .on(
                    "changed.jstree",
                    function(e, data) {
                        if (!(typeof data.event!=='undefined' && data.event.type=="contextmenu") && data.selected.length) {
                            //alert('The selected node is: ' + data.instance.get_node(data.selected[0]).text);
                        	var lastString = getLastString(data.instance.get_node(data.selected[0]).text);
                            var a = lastString.split(':');
                            var seconds; 
                            if(a.length == 1)
                            	{
                            		seconds = (+a[0]);
                            	}
                            if(a.length == 2)
                            	{
                            		seconds = (+a[0]) * 60 + (+a[1]);
                            	}
                            if(a.length == 3)
                            	{
                            		seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
                            	}
                            
                            player.seekTo(seconds, true);
                        }
                    }).jstree({
                        "core" : {
                        	"themes":
                        	{
                        		"icons":false
                        	},
                            "dblclick_toggle" : false,
                            "check_callback": true,
                            "data" : {
                                "url" : "http://localhost:8080/spring-mongodb-tutorial/videos/tree?videoID="+document.getElementById('vidId').innerHTML,                   
//                                "url" : "http://45.55.199.244:8080/spring-mongodb-tutorial/videos/tree?videoID="+document.getElementById('vidId').innerHTML,                   
                                "data" : function (node) {
                                    return { "id" : node.id };
                                }
                            }
                        },           
                        "plugins" : [ "contextmenu" , "dnd"] //"wholerow", "dnd" ]
                    });
    $('#evts').bind('loaded.jstree',function(e,data)
    {
    	$(".jstree-anchor:contains('Root node')").text(player.getVideoData().title);
    });
    	

}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
    interval=setInterval(function () 
    		{
    			document.getElementById("videoTime").innerHTML="elapsed time:  "+Math.floor(player.getCurrentTime()).toString().toHHMMSS();
    		}, 1000);
        done = true;
    }
}
function stopVideo() {
	window.clearInterval(interval)
    player.stopVideo();
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+':'+minutes+':'+seconds;
    return time;
}
