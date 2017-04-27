
function getSkinPack(){
	var zip = new JSZip();  
  zip.loadAsync( document.getElementById("skin-rep").files[0])
  .then(function(zip){
    var insideZIP = zip.files["example/css/stuff.css"];
    $("#msgSkinpackImportation").empty().append("Skinpack chargé, et prêt à être modifié").css("color", "#2E7D32");
 
    //NEXT is just to "see" the content of the css file
    zip.file(insideZIP.name).async("string").then(function success(content) {
      // use the content
      console.log(content);
    },
    function error(e) {
      // handle the error
      console.log("erreur");
    });
  },

  function(){
    $("#msgSkinpackImportation").empty().append("Erreur lors du chargement").css("color", "red");
  },
  function(){
    
  });
}

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

function validateStyle(){

}