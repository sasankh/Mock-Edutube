
function YouTubeGetID(url){
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
    return ID;
}

$( document ).ready(function() {
    $("#youtubeUrl").keypress(function(e)
    {
       var key = e.which
       if(key==13)
       {
    	   window.location.href = "http://localhost:8080/SpringMVCmongoDBTest/viewer/ID/" + YouTubeGetID($("#youtubeUrl").val());
       }

    });
});