

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}
/*******************************************************/

var zip = new JSZip();

/********** Relative paths & css Files  ***************/
var skinpack = "starter/harmonySRC0-1_2.zip";
var skincss = "css/skin.css";
var maincss = "css/main.css";

/**********  Variables de l'UI   *********************/
var content;
var clPrincipale;
var clSecond;
var fontFamilly;
var fontColorTitle;
var fontColorText;

/*ICI CHARGER LE SKINPACK DEJA PRESENT DANS LE REPERTOIRE DE HARMONY*/
/*JSZipUtils.getBinaryContent('starter/harmonySRC0-1_2.zip', function(err, data) {
  if(err) {
    throw err;
  }
  JSZip.loadAsync(data).then(function (zip) {
    //zip.files contient tous les fichiers du skinpack
    var insideZIP = zip.files["skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/skin.css"];
    
    zip.file(insideZIP.name).async("string").then(function success(contentSkinCSS) {
      
    });
  });
});
*/

function validateStyle(){
  JSZipUtils.getBinaryContent('starter/harmonySRC0-1_2.zip', function(err, data) {
    if(err) {
      throw err;
    }
    JSZip.loadAsync(data).then(function (zip) {
      //zip.files contient tous les fichiers du skinpack
      var contentSkinCss = zip.files["skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/skin.css"];
      
      zip.file(contentSkinCss.name).async("string").then(function success(content, contentSkinCss) {

        var getMainColor = "\n.header{ background-color:#"+$("#hrColorPrincipale").val()+";}\n";
        zip.file("skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/skin.css", content+getMainColor);

        zip.generateAsync({type:"blob"}).then(function(content) {
          saveAs(content, "skinpack.zip");
        });
      });
    });
  });
}

/*     TODO     */
/*
  1-  check if input colors changed (now we're writing in skin.css even if it is #FFFFFF)
  2-  load skin.css and main.css dynamicaly (not skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/skin.css)
  3-  check other way to get colors from the UI
  4-  modify index.html (just some UI/UX work on it)
*/