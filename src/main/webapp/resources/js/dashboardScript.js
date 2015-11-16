$(function() {
		//generic widget data
		$( "#tabs" ).tabs();
		
		$("#playlistButton").button({
			disabled: true
		});
		$("#playlistButtonSm").button({
			disabled: true
		});
		
		$( "#alert" ).dialog({
			autoOpen: false,
			resizable: false,
			draggable: false,
			height:250,
			width:250,
			modal: true,
			buttons: {
				"Okay": function(){
					$(this).dialog("close");
				},
			}
		});
		
		//LOCAL PLAYLISTS
		$( "#shareBox" ).dialog({
			autoOpen: false,
			resizable: false,
			draggable: false,
			height:250,
			modal: true,
			buttons: {
				"Share Playlist": function(){
					$(this).dialog("close");
				},
				"Cancel": function(){
					$(this).dialog("close");
				}
			}
		});
		
		$( "#shareButton" ).on("click",function(){
			var playlistRow, title, checked;
			
			playlistRow = $("input[name=userPlaylist]:checked").closest('tr');
			title = $(playlistRow).find(".ttl").html();
			checked = $("input[name=userPlaylist]:checked").val();
			
			$("#sharepl").replaceWith("<span id=\"sharepl\">" + title + "</span>");
			
			if(checked != undefined){
				$( "#shareBox").dialog( "open" );
			} else {
				$('#alert').dialog("open");
			}
		});
		
		$( "#playButton" ).click(function(){
			var playlistID = $("input[name=userPlaylist]:checked").val();
			
			if(playlistID != undefined){
				window.location="viewer/ID/" + playlistID;
			} else {
				$('#alert').dialog("open");
			}
		});
		
		//CLASS PLAYLISTS TAB
		$( "#classButton" ).click(function(){
			var playlistID = $("input[name=classPlaylist]:checked").val();

			if(playlistID != undefined){
				window.location="viewer/ID/" + playlistID;
			} else {
				$('#alert').dialog("open");
			}
		});
	});