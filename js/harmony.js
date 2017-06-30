/*  Here we will get css properties */

/*	Hovering a harmony customize bloc */
$(".hr-elem-color").hover(function(){
	/*$(this).toggleClass("hover-current-bloc");*/
});

/*	Get/Set which Font-family */
function getFont(){
	var getFontFamily = $("#select-text-typo").val();
	$('.previs-inside-cours p, h5, #visTitle, .pervis-BP-content ').css("font-family", getFontFamily);
}

/*	get style on visualitaion bloc */
function getChangeColor1(){
	var getPrincipalColor = $("#hrColorPrincipale").val();
	$("#visHeard").css("background-color", "#"+getPrincipalColor);
	$(".visualisation-inside").css("border-bottom", "40px solid #"+getPrincipalColor);
	$(".pervis-BP-header").css("border-bottom", "1px solid #"+getPrincipalColor).css("border-right", "1px solid #"+getPrincipalColor);
	$(".pervis-BP-content").css("border-right", "1px solid #"+getPrincipalColor)

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

function ToggleBpIcone(){
	$("#BpIcone").toggleClass("toggleIcone");
}

function ToggleGrnIcone(){
	$("#GrIcone").toggleClass("toggleIcone");
}