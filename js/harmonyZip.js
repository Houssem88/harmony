 
var zip = new JSZip();
var content;

function getSkinPack(content){

  zip.loadAsync( document.getElementById("skin-rep").files[0]).then(function(zip){
    var allSkin = zip.files;

    var insideZIP = zip.files["skin/Jm71SrwTAbhQaExrdSmV3d.doss/css/skin.css"]; // bad way, need to change it for a dynamic way
    var insideMain = zip.files["skin/Jm71SrwTAbhQaExrdSmV3d.doss/css/main.css"];

    $("#msgSkinpackImportation").empty().append("Skinpack chargé, et prêt à être modifié").css("color", "#2E7D32");

    //NEXT is to get the content of the css files

    /*Next is to open skin.css*/
    zip.file(insideZIP.name).async("string").then(function success(content) {
      localStorage.setItem("skinCSS", content);
    },
    function error(e) {
      console.log("erreur");
    });

    /*Next is to open main.css, and put it into localstorage*/
    zip.file(insideMain.name).async("string").then(function success(contentMain){
      localStorage.setItem("mainCSS", contentMain);
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

function validateStyle(content){

  var getSkinCss = localStorage.getItem("skinCSS");
  var getMainCss = localStorage.getItem("mainCSS");
  var getSkinAll = localStorage.getItem("all");

  /*Get some css properties from harmony*/
  var getMainColor = "\n.header{ background-color:#"+$("#hrColorPrincipale").val()+";}\n";

  zip.file("skin/Jm71SrwTAbhQaExrdSmV3d.doss/css/skin.css", getSkinCss+getMainColor);
  zip.file("skin/Jm71SrwTAbhQaExrdSmV3d.doss/css/main.css", getMainCss+getMainColor);
  
  zip.generateAsync({type:"blob"})
  .then(function(content) {
    saveAs(content, "skinpack.zip");
  });
}
