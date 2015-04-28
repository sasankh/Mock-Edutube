var Dashboard = function () {
	var videoApi = "http://localhost:8080/spring-mongodb-tutorial/videos/";
	
	function initialize() {		
		$(".user-playlist, .class-playlist").on("change", function(event) {
			var videoId = $(this).val();
			
			$.jstree.destroy();
			
			$("#playlist").jstree({
		        "core" : {
		            "dblclick_toggle" : false,
		            "data" : {
		                "url" : videoApi + "tree?videoID=" + videoId,                   
		                "data" : function (node) {
		                    return { "id" : node.id };
		                }
		            },
		            "error": function (jqXHR, textStatus, errorThrown) { 
		            	$("#playlist").html("<h3>There was an error while loading data for this playlist.</h3>"); 
		            }
		        }           
		    });
		});
	}
	
	return {
		initialize: initialize
	}
	
}();