/*  Here we will get css properties */

/*	Hovering a harmony customize bloc */
$(".hr-elem-color").hover(function(){
	/*$(this).toggleClass("hover-current-bloc");*/
});

/*	Get/Set which Font-family */
function getFont(){
	var getFontFamily = $("#select-text-typo").val();

	$('#chosenFontFamily').empty().append(getFontFamily).css("font-family", getFontFamily);
}