
function getSkinPack(){
	
  var zip = new JSZip();  
  
  zip.loadAsync( document.getElementById("skin-rep").files[0])
  .then(function(zip){
    /*var insideZIP = zip.files["example/css/stuff.css"];*/
    var allSkin = zip.files;

    localStorage.setItem("allSkin", allSkin); // "allskin" contains all skins files.

    var insideZIP = zip.files["skin/Jm71SrwTAbhQaExrdSmV3d.doss/css/skin.css"]; // bad way, need to change it for a fetch
    
    $("#msgSkinpackImportation").empty().append("Skinpack chargé, et prêt à être modifié").css("color", "#2E7D32");
 
    //NEXT is just to "see" the content of the css file
    zip.file(insideZIP.name).async("string").then(function success(content) {
      // use the content
      /*console.log(content);*/
      localStorage.setItem("skinCSS", content);
    },
    function error(e) {
      // handle the error
      console.log("erreur");
    });
  },

  function(){
    $("#msgSkinpackImportation").empty().append("Erreur lors du chargement").css("color", "red");
  });
}

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

function validateStyle(){
  /*var updateSkinCss = localStorage.getItem("skinCSS");*/

  var updateSkinCss = localStorage.getItem("allSkin");
  console.log("from local"+updateSkinCss);
}

function test(){
  var zip = new JSZip();

  var getAllSkinFiles = localStorage.getItem("allSkin"); 
  console.log(getAllSkinFiles);
  /*var getSkinCss = localStorage.getItem("skinCSS");*/

 /* zip.file("skin.css", getSkinCss);*/
 /* zip.folder(getAllSkinFiles).file("skin.css", getSkinCss);*/

  zip.folder(getAllSkinFiles);
  zip.generateAsync({type:"blob"})
  .then(function(content) {
    // see FileSaver.js
    saveAs(content, "example.zip");
  });
}