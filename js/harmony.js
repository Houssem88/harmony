/*  Here we will get css properties */

/*	Hovering a harmony customize bloc */
$(".hr-elem-color").hover(function(){
	/*$(this).toggleClass("hover-current-bloc");*/
});

/*	Get/Set which Font-family */
function getFont(){
	var getFontFamily = $("#select-text-typo").val();
	$('#visTitle').css("font-family", getFontFamily);
}

/*	get style on visualitaion bloc */
function getChangeColor1(){
	var getPrincipalColor = $("#hrColorPrincipale").val();
	$("#visHeard").css("background-color", "#"+getPrincipalColor);
	$("#visRightMenu").css("background-color", "#"+getPrincipalColor);
}

function getChangeColor2(){
	var getSecondColor = $("#hrColorSecondaire").val();
	$(".previs-btn-menu").css("background-color", "#"+getSecondColor);
}

function getChangeColorTitle(){
	var getTitleColor = $("#hrColorTitle").val();
	$("#visTitle").css("color", "#"+getTitleColor);
}

function getChangeColorText(){
	var getTextColor = $("#hrColorPargraph").val();
	$("#visParag").css("color", "#"+getTextColor);
}
