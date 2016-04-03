window.onload = initAll;
var timer;


function initAll() {
	document.getElementById("opt_1").onclick = hideAll;
	//document.getElementById("opt_1").onclick = alert('hello');
	document.getElementById("submit").onclick = form_create;

}

function hideAll() {
 	$('#page').hide();
 	$('#loader').show();
 	  $('#loader').css({
        'position' : 'absolute',
        'left' : '50%',
        'top' : '50%',
    });
 	  setTimeout(tags_page, 2000);
}

function tags_page() {
	$('#loader').hide();
	$('#tags_page').show();
	// $('#value_field').show();
}

function form_create() {
	$(this).attr("disabled","disabled");
	var ele = [];
	var i = 0;
	if(document.getElementById("fn").checked) {
		ele[i++] = "fname";
		// alert("first-name");
	}
	if(document.getElementById("ln").checked) {
		ele[i++] = "lname";
		// alert("ls-name");
	}
	if(document.getElementById("gen").checked) {
		ele[i++] = "gen";
		// alert("Gender");
	}
	if(document.getElementById("dob").checked) {
		ele[i++] = "dob";
		// alert("dob");
	}
	if(document.getElementById("mob").checked) {
		ele[i++] = "phone";
		// alert("ct-no");
	}
	if(document.getElementById("em").checked) {
		ele[i++] = "email";
		// alert("email");
	}
	if(document.getElementById("loc").checked) {
		ele[i++] = "loc";
		// alert("loc");
	}
	if(document.getElementById("org").checked) {
		ele[i++] = "org";
		// alert("org");
	}
	if(document.getElementById("clg").checked) {
		ele[i++] = "college";
		// alert("clg");
	}
	//var str = "";
	var string = "";
	 string='<form class="col s12" method = "post" action = "#">';
	for (var i = 0; i <= ele.length - 1; i++) {
		string += ' <div class="input-field col s6">'+
          '<input id="'+ ele[i] +'" type="text" class="validate">'+
          '<label for="'+ ele[i] +'">'+ ele[i]+'</label>'+
        '</div>';
		//str += ele[i]+ " ";
	}
	 string += '</form>';
	 string += '<button id = "sub" class="btn waves-effect waves-light" type="submit" name="action" style="width: 100px;text-align:center;float: right;margin-right: 22px;" id="submit1">Submit'+
  '</button>';
//	$('#tags_page').hide();
	// var node = document.createElement('div');
	// node.innerHTML = string;
	// // node = node.firstChild;
	// document.getElementById('#form2').appendChild(node);

	
	// document.getElementById('#form2').innerHTML = s;
	$( "#form2" ).append(string);
	$("#sub").click(function() {
		//alert("hello");
		var arr = {};
		for (var i = 0; i <= ele.length - 1; i++) {
			if($('#'+ele[i]).val() !== '') {
				var v = $('#'+ele[i]).val();
				arr[ele[i]] = v;
			} 
			else {
				alert("error!");
				return false;
			}
		//str += ele[i]+ " ";
		}
		var js = JSON.stringify(arr);
		//var jso = $("#form2").serialize();
		console.log(js);

		//sent json post to server

// JSONTest = function() {

//     var resultDiv = $("#resultDivContainer");

//     $.ajax({
//         url: "http://172.20.53.31:3000/login",
//         type: "POST",
//         data: js,
//         dataType: "json",
//         success: function (result) {
//             switch (result) {
//                 case true:
//                     processResponse(result);
//                     break;
//                 default:
//                     resultDiv.html(result);
//             }
//         },
//         error: function (xhr, ajaxOptions, thrownError) {
//         alert(xhr.status);
//         alert(thrownError);
//         }
//     });
// };
		 // $.post( 
   //                "result.php",
   //                js,
   //                function(data) {
   //                  alert("sent");
   //                }
   //             );

	});

	return false;
	// $('#form2').show();
	// document.getElementById("#form2").style.display = "block";
	//$("#form2").css("display", "block");
	// alert(str);
}

