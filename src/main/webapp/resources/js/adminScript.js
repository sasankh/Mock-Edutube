$(function() {
	//variables and generic stuff
	var users, userDialog, userForm, editDialog, editForm,
		emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
		tips = $(".validateTips"),
		
		firstName = $("#firstName"),
		lastName = $("#lastName"),
		email = $("#email"),
		password = $("#password"),
		classMod = $("#classMod"),
		classes = $("#classes"),
		allFields = $([]).add(lastName).add(firstName).add(email).add(password).add(classMod).add(classes),
		
		EfirstName = $("#EfirstName"),
		ElastName = $("#ElastName"),
		Eemail = $("#Eemail"),
		Epassword = $("#Epassword"),
		EclassMod = $("#EclassMod"),
		Eclasses = $("#Eclasses"),
		EallFields = $([]).add(ElastName).add(EfirstName).add(Eemail).add(Epassword).add(EclassMod).add(Eclasses);
	
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
	
	$( "#alertUser" ).dialog({
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
	
	$( "#alertPlaylist" ).dialog({
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
			"<td>" + "<input type=\"radio\" name=\"user\" value=\"" + email.val() + "\"/>" + "</td>" +
			"<td class=\"lastname\">" + lastName.val() + "</td>" +
			"<td class=\"firstname\">" + firstName.val() + "</td>" +
			"<td class=\"email\">" + email.val() + "</td>" +
			"<td class=\"password\">" + password.val() + "</td>" +
			"<td class=\"moderator\">" + classMod.val() + "</td>" +
			"<td class=\"class\">" + classes.val() + "</td>" +
			"</tr>" );
			userDialog.dialog( "close" );
		}
		return valid;
	}
	
	function editUser() {
		var valid = true;
		var row = $("input[name=user]:checked").closest('tr');
		EallFields.removeClass( "ui-state-error" );
		/*valid = valid && checkLength( ElastName, "Last Name", 3, 16 );
		valid = valid && checkLength( EfirstName, "First Name", 3, 16 );
		valid = valid && checkLength( Eemail, "email", 6, 80 );
		valid = valid && checkLength( Epassword, "password", 5, 16 );
		valid = valid && checkRegexp( ElastName, /^[a-z]([0-9a-z_\s])+$/i, "Last name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
		valid = valid && checkRegexp( EfirstName, /^[a-z]([0-9a-z_\s])+$/i, "First name may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
		valid = valid && checkRegexp( Eemail, emailRegex, "eg. name@service.com" );
		valid = valid && checkRegexp( Epassword, /^([0-9a-zA-Z])+$/, "Password field only allows : a-z 0-9" );*/
		valid
		if ( valid ) {
			row.replaceWith( "<tr>" +
			"<td>" + "<input type=\"radio\" name=\"user\" value=\"" + $("#Eemail").val() + "\"/>" + "</td>" +
			"<td class=\"lastname\">" + $("#ElastName").val() + "</td>" +
			"<td class=\"firstname\">" + $("#EfirstName").val() + "</td>" +
			"<td class=\"email\">" + $("#Eemail").val() + "</td>" +
			"<td class=\"password\">" + $("#Epassword").val() + "</td>" +
			"<td class=\"moderator\">" + $("#EclassMod").val() + "</td>" +
			"<td class=\"class\">" + $("#Eclasses").val() + "</td>" +
			"</tr>" );
			editDialog.dialog( "close" );
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
	
	$( "#delete-user-form" ).dialog({
		autoOpen: false,
		resizable: false,
		draggable: false,
		height:250,
		modal: true,
		buttons: {
			"Yes": function(){
				var row = $("input[name=user]:checked").closest('tr');
				row.remove();
				$(this).dialog("close");
			},
			"No": function(){
				$(this).dialog("close");
			}
		}
	});
	
	$( "#delete-user" ).click(function(){
		var userRow, email, checked;
		
		userRow = $("input[name=user]:checked").closest('tr');
		email = $(userRow).find(".email").html();
		checked = $("input[name=user]:checked").val();
		
		$("#delusr").replaceWith("<span id=\"delusr\">" + email + "</span>");
		
		if(checked != undefined){
			$( "#delete-user-form").dialog( "open" );
		} else {
			$('#alertUser').dialog("open");
		}
	});
	
	editDialog = $( "#edit-user-form" ).dialog({
		autoOpen: false,
		height: 300,
		width: 350,
		modal: true,
		buttons: {
			"Edit User": editUser,
			"Cancel": function(){
				$(this).dialog("close");
			}
		},
		close: function() {
			editForm[ 0 ].reset();
			EallFields.removeClass( "ui-state-error" );
		}
	});
	
	editForm = editDialog.find( "form" ).on( "submit", function( event ) {
		//event.preventDefault();
		editUser();
	});
	
	$( "#edit-user" ).click(function(){
		var userRow, checked;
		
		userRow = $("input[name=user]:checked").closest('tr');
		EfirstName = $(userRow).find(".firstname").html();
		ElastName = $(userRow).find(".lastname").html();
		Eemail = $(userRow).find(".email").html();
		Epassword = $(userRow).find(".password").html();
		EclassMod = $(userRow).find(".moderator").html();
		Eclasses = $(userRow).find(".class").html();
		
		$("#EfirstName").val(EfirstName);
		$("#ElastName").val(ElastName);
		$("#Eemail").val(Eemail);
		$("#Epassword").val(Epassword);
		$("#EclassMod").val(EclassMod);
		$("#Eclasses").val(Eclasses);
		
		checked = $("input[name=user]:checked").val();
		
		if(checked != undefined){
			$( "#edit-user-form").dialog( "open" );
		} else {
			$('#alertUser').dialog("open");
		}
	});
	
	//PLAYLISTS
	var playlistDB, playlists, playlistDialog, playlistForm,
	playlistID = $("#playlistID"),
	playlistTitle = $("#playlistTitle"),
	ownerEmail = $("#ownerEmail"),
	timestamps = $("#timestamps"),
	playlistFields = $([]).add(playlistID).add(playlistTitle).add(ownerEmail).add(timestamps);
		
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
		
		$("#delpl").replaceWith("<span id=\"delpl\">" + title + "</span>");
		
		if(checked != undefined){
			$( "#delete-playlist").dialog( "open" );
		} else {
			$('#alertPlaylist').dialog("open");
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