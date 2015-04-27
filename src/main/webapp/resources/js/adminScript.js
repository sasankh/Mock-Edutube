$(function() {
	//Manage Users variables
	var userDB, users, userDialog, userForm,
		emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
		firstName = $("#firstName"),
		lastName = $("#lastName"),
		email = $("#email"),
		password = $("#password"),
		classMod = $("#classMod"),
		classes = $("#classes"),
		allFields = $([]).add(lastName).add(firstName).add(email).add(password).add(classMod).add(classes),
		tips = $(".validateTips");
	
	function updateTips(t){
		tips
			.text(t)
			.addclass("ui-state-highlight");
		setTimeout(function(){
			tips.removeClass("ui-state-highlight", 1500);
		}, 500);
	}
	
	function checkLength( o, n, min, max ) {
		if ( o.val().length > max || o.val().length < min ) {
		o.addClass( "ui-state-error" );
		updateTips( "Length of " + n + " must be between " +
		min + " and " + max + "." );
		return false;
		} else {
		return true;
		}
	}
	
	function checkRegexp( o, regexp, n ) {
		if ( !( regexp.test( o.val() ) ) ) {
		o.addClass( "ui-state-error" );
		updateTips( n );
		return false;
		} else {
		return true;
		}
	}
	
	//USERS
	function addUser() {
		var valid = true;
		allFields.removeClass( "ui-state-error" );
		valid = valid && checkLength( lastName, "Last Name", 3, 16 );
		valid = valid && checkLength( firstName, "First Name", 3, 16 );
		valid = valid && checkLength( email, "email", 6, 80 );
		valid = valid && checkLength( password, "password", 5, 16 );
		valid = valid && checkRegexp( lastName, /^[a-z]([0-9a-z_\s])+$/i, "Last name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
		valid = valid && checkRegexp( firstName, /^[a-z]([0-9a-z_\s])+$/i, "First name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
		valid = valid && checkRegexp( email, emailRegex, "eg. name@service.com" );
		valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allows : a-z 0-9" );
		valid 
		if ( valid ) {
			$( "#users tbody" ).append( "<tr>" +
			"<td>" + lastName.val() + "</td>" +
			"<td>" + firstName.val() + "</td>" +
			"<td>" + email.val() + "</td>" +
			"<td>" + password.val() + "</td>" +
			"<td>" + classMod.val() + "</td>" +
			"<td>" + classes.val() + "</td>" +
			"</tr>" );
			userDialog.dialog( "close" );
		}
		return valid;
	}
	
	userDialog = $( "#create-user-form" ).dialog({
		autoOpen: false,
		height: 300,
		width: 350,
		modal: true,
		buttons: {
			"Create User": addUser,
			Cancel: function() {
				userDialog.dialog( "close" );
			}
		},
		close: function() {
			userForm[ 0 ].reset();
			allFields.removeClass( "ui-state-error" );
		}
	});
	
	userForm = userDialog.find( "form" ).on( "submit", function( event ) {
		event.preventDefault();
		addUser();
	});
	
	$( "#create-user" ).button().on( "click", function() {
		userDialog.dialog( "open" );
	});
	
	//PLAYLISTS
	var playlistDB, playlists, playlistDialog, playlistForm,
	playlistID = $("#playlistID"),
	playlistTitle = $("#playlistTitle"),
	ownerEmail = $("#ownerEmail"),
	timestamps = $("#timestamps"),
	playlistFields = $([]).add(playlistID).add(playlistTitle).add(ownerEmail).add(timestamps);
	
	function deletePlaylist() {
		var valid = true;
		allFields.removeClass( "ui-state-error" );
		valid = valid && checkLength( lastName, "Last Name", 3, 16 );
		valid = valid && checkLength( firstName, "First Name", 3, 16 );
		valid = valid && checkLength( email, "email", 6, 80 );
		valid = valid && checkLength( password, "password", 5, 16 );
		valid = valid && checkRegexp( lastName, /^[a-z]([0-9a-z_\s])+$/i, "Last name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
		valid = valid && checkRegexp( firstName, /^[a-z]([0-9a-z_\s])+$/i, "First name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
		valid = valid && checkRegexp( email, emailRegex, "eg. name@service.com" );
		valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
		valid 
		if ( valid ) {
			$( "#users tbody" ).append( "<tr>" +
			"<td>" + "<input type=\"radio\" name=\"user\" value=\"" + email.val() + "\"/>" + "</td>" +
			"<td>" + lastName.val() + "</td>" +
			"<td>" + firstName.val() + "</td>" +
			"<td>" + email.val() + "</td>" +
			"<td>" + password.val() + "</td>" +
			"<td>" + classMod.val() + "</td>" +
			"<td>" + classes.val() + "</td>" +
			"</tr>" );
			userDialog.dialog( "close" );
		}
		return valid;
	}
		
	$( "#delete-playlist" ).dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		height:250,
		modal: true,
		buttons: {
			"Yes": function(){
				var row = $("input[name=playlist]:checked").closest('tr');
				row.remove();
				$(this).dialog("close");
			},
			"No": function(){
				$(this).dialog("close");
			}
		}
	});
	
	$( "#playlistsButton" ).click(function(){
		var playlistRow, title, checked;
		
		playlistRow = $("input[name=playlist]:checked").closest('tr');
		title = $(playlistRow).find(".ttl").html();
		checked = $("input[name=playlist]:checked").val();
		
		$("#delpl").replaceWith(title);
		
		if(checked != undefined){
			$( "#delete-playlist").dialog( "open" );
		} else {
			//$('#alert').dialog("open");
		}
		
	});
	
	
	//CLASSES
	$( "#edit-class" ).dialog({
		autoOpen: false,
		show: {
			effect: "fade",
			duration: 700
		},
		hide: {
			effect: "fade",
			duration: 700
		}
	});
		
	$( "#classesButton" ).click(function(){
		$( "#edit-class").dialog( "open" );
	});
		
	$( "#tabs" ).tabs({
		collapsible: true,
		active: false
	});
});