function getSkinPack(){
	var zip = new JSZip();

  	zip.loadAsync( document.getElementById("skin-rep").files[0] /* = file blob */)
    .then(function(zip) {
         // process ZIP file content here

        /*NEED TO FIND A WAY TO GET THE CSS FILE INSIDE THE ZIP !!!!! BECAUSE NOW, IT'S HARD CODED */
        var insideZIP = zip.files["example/css/stuff.css"]; //<<<<<< i'm talking about this 
        /*console.log(insideZIP);*/
        document.getElementById("successZip").innerHTML = "skinpack chargé, et prêt à être modifié";

  //NEXT is just to "see" the content of the css file
  zip.file(insideZIP.name).async("string").then(function success(content) {
    // use the content
    console.log(content);
  }, function error(e) {
    // handle the error
    console.log("erreur");
  });

  }, function() {
    document.getElementById("errorZip").innerHTML = "Veuillez importer un dossier .skinpack";
  });
}

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

function changeColorsText(){

}
