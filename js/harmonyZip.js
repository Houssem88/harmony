var maLib = {
  skinFiles : {
    "main.css":content,
  },
  onLoad : function(pEvent){
    console.log("aaa");
  },
  loadSkinPackValues : function(pEvent){
    console.log("b");
  }
};

/*window.addEventListener("load", maLib.onLoad, false);*/
/*console.log(maLib);*/

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

document.getElementById('hrColorPrincipale').addEventListener('change', function(getPrincipalColor){
  getPrincipalColor = this.value;
  console.log(getPrincipalColor); //Je veux retourner getPrincipalColr et l'utiliser à la ligne 41
}, false);

/******************************************************/

/*  Validation du style et génération du nouveau skinpack */
/*$(".validate-bloc").show();*/




/*******************************************************************************************/
/*    zip.file(skinsetXML.name).async("string").then(function success(contentXML){
      parsSkinXML = new DOMParser();
      xmlDoc = parsSkinXML.parseFromString(contentXML,"text/xml");

      var version_skin = xmlDoc.getElementsByTagName("skinSet")[0].getAttribute("version");
      version_skin = parseInt(version_skin);
      new_version = version_skin+1;
      document.getElementById("oldVersion").innerHTML = version_skin;
      console.log("version : "+version_skin);

      code_skin = xmlDoc.getElementsByTagName("skinSet")[0].getAttribute("code");
      document.getElementById("oldCode").innerHTML = code_skin;
      console.log("code : "+code_skin);

      title_skin = xmlDoc.getElementsByTagName("description")[0].getAttribute("title");
      console.log("skin title : "+title_skin);

      opale_version = xmlDoc.getElementsByTagName("description")[0].getAttribute("usedIn");
      document.getElementById("opaleVersion").innerHTML = opale_version;
      console.log("opale version : "+opale_version);

      var nbrSkin = xmlDoc.getElementsByTagName('skin');

      for(var i=0; i < nbrSkin.length ; i++){
        var subFile_skin = xmlDoc.getElementsByTagName("skin")[i].getAttribute("generatorCode");
        if(subFile_skin == "auroraMS"){
          var auroraMS_src = xmlDoc.getElementsByTagName("skin")[i].getAttribute("src");
        }
      }
    });


    //zip.files contient tous les fichiers du skinpack
    var contentSkinCss = zip.files["skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/skin.css"];
    
    zip.file(contentSkinCss.name).async("string").then(function success(content) {
      
      var getMainColor = "\n.header{ background-color:#"+$("#hrColorPrincipale").val()+";}\n";
      zip.file("skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/skin.css", content+getMainColor);

    });
  });

});
*/

function modifyXML(){
  var getNewTitle = $('#insertTitle').val();
  return getNewTitle;
}


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

  /*zip.generateAsync({type:"blob"}).then(function(skinpack) {
    saveAs(skinpack, "skinpack.zip");
  });*/

}
/*
function getChangeColor1(){
  return document.getElementById("hrColorPrincipale").value;
}
*/