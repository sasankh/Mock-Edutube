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
	function getLastString(str)
	{
        var arr = str.split("-");
        return arr[arr.length-1].trim();
	}
	$('#evts_button').on("click", function() {
		var instance = $('#evts').jstree(true);
		instance.deselect_all();
		instance.select_node('1');
	});
	$('#evts')
			.on(
					"changed.jstree",
					function(e, data) {
						if (data.selected.length) {
							//alert('The selected node is: ' + data.instance.get_node(data.selected[0]).text);
							player.seekTo(parseInt(getLastString(data.instance.get_node(data.selected[0]).text)), true);
						}
					}).jstree({
						"core" : {
							"dblclick_toggle" : false,
							"data" : {
								"url" : "http://localhost:8080/spring-mongodb-tutorial/videos/tree?videoID="+document.getElementById('vidId').innerHTML,					
								"data" : function (node) {
									return { "id" : node.id };
								}
							}
						}			
					});

}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		done = true;
	}
}
function stopVideo() {
	player.stopVideo();
}
