
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}
/*******************************************************/

var zip = new JSZip();

/********** Relative paths & css Files  ***************/

/**********  Variables de l'UI   *********************/
var content;
var getPrincipalColor = '';

/******************************************************/

//  Compresser et telecharger le skinpack modifié
function validateStyle(){
  var zip = new JSZip();
  JSZipUtils.getBinaryContent('starter/harmonySRC0-1_2.zip', function(err, data) {
  
    if(err) {
      throw err;
    }

    zip.loadAsync(data).then(function (zip){
      var skinpack = zip.files;
      return skinpack;
    })
    .then(function(skinpack){
      //Get skin.css
      var contentSkinCss = skinpack["skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/skin.css"];
      console.log("skin.css : ", contentSkinCss);
      zip.file(contentSkinCss.name).async("string").then(function success(content){
        // Get the color from UI
        /*var principalColor = "\n.header{ background-color:#"+$("#hrColorPrincipale").val()+";}\n";*/
        var x = document.getElementById('hrColorPrincipale').value;
        zip.file("skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/skin.css", content+x);
        return (content);
      });
      return(skinpack);
    })
    .then(function(skinpack){
      //Get main.css
      var contentMainCss = skinpack["skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/main.css"];
      console.log("main.css : ", contentMainCss);

      zip.file(contentMainCss.name).async("string").then(function success(content) {
        zip.file("skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/main.css", content+"modify main.css");
          return (content)
      });
      return(skinpack);
    })
    .then(function(skinpack){
      /*get skinSet.xml*/
      var contentSkinXml = skinpack["skinSet.xml"];
      console.log("skinSet.xml : ", contentSkinXml)

      zip.file(contentSkinXml.name).async("string").then(function success(contentXML){
        return content;
      });
      return skinpack;
    }).then(function(content){
      zip.generateAsync({type:"blob"}).then(function(content) {
        saveAs(content, "skinpack.zip");
      });
    });
  });
}
