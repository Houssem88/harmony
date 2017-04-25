
function getSkinPack(){
	var zip = new JSZip();  
  zip.loadAsync( document.getElementById("skin-rep").files[0] /* = file blob */)
    .then(function(zip) {
         // process ZIP file content here

        /*NEED TO FIND A WAY TO GET THE CSS FILE INSIDE THE ZIP !!!!! BECAUSE NOW, IT'S HARD CODED */
        var insideZIP = zip.files["example/css/main.css"]; //<<<<<< i'm talking about this (see : fetch)
        /*console.log(insideZIP);*/
        /*document.getElementById("successZip").innerHTML = "skinpack chargé, et prêt à être modifié";*/
        $("#msgSkinpackImportation").empty().append("Skinpack chargé, et prêt à être modifié").css("color", "#2E7D32");
        /*setTimeout(function(){$('#msgSkinpackImportation').fadeOut();}, 3000);*/
        
  //NEXT is just to "see" the content of the css file
  zip.file(insideZIP.name).async("string").then(function success(content) {
    // use the content
    /*var json = JSON.stringify(content);
    console.log(json);*/
    console.log(content);
  }, function error(e) {
    // handle the error
    console.log("erreur");
  });

  }, function(){
    $("#msgSkinpackImportation").empty().append("Erreur lors du chargement").css("color", "red");
  }); 
}

function validateStyle(lastName){

}

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}