// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

function loadSkinPack(url) {
  return new Promise((resolve, reject) => {
    JSZipUtils.getBinaryContent(url, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }).then((data) => {
    return JSZip.loadAsync(data);
  });
}

function updateSkinPack(skinPack) {
  var principalColor = document.getElementById('hrColorPrincipale').value;
  var secondColor = document.getElementById('hrColorSecondaire').value;

  var contentSkinCss = skinPack.files["skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/skin.css"];
  var skinCssUpdated = skinPack.file(contentSkinCss.name).async("string").then((content) => {

  });

  var contentMainCss = skinPack.files["skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/main.css"];
  var mainCssUpdated = skinPack.file(contentMainCss.name).async("string").then((content) => {
    /*Images BP & type Grain*/
    var noImgPed = document.getElementById("noImgPedago").checked;
    var noImgGrn = document.getElementById("noImgGrain").checked;
    
    if(noImgPed){
      var content = content.replace('background:url("../img/content/blocks.svg") no-repeat scroll transparent;', 'background:none;');
      skinPack.file("skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/main.css", content);
    }

    if(noImgGrn){
      var content = content.replace('background: url("../img/content/ico.svg") no-repeat scroll transparent;', 'background:none;');
      skinPack.file("skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/main.css", content);
    }

    /* Colors : principal & secondary */
    var content = content.replace(/434e52/g, principalColor);
    var content = content.replace(/a/g, secondColor);
    skinPack.file("skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/main.css", content);
  });

  var svgTopMenu = skinPack.files["skin/JI4sQEkU9ogpyr5CKcd2yg.doss/img/tpl/back-top.svg"];
  var svgTopMenuUpdated = skinPack.file(svgTopMenu.name).async("string").then((content) => {
    var content = content.replace(/434e52/g, principalColor); 
    skinPack.file("skin/JI4sQEkU9ogpyr5CKcd2yg.doss/img/tpl/back-top.svg", content);
  });

  var svgBottomMenu = skinPack.files["skin/JI4sQEkU9ogpyr5CKcd2yg.doss/img/tpl/back-bottom.svg"];
  var svgBottomMenuUpdated = skinPack.file(svgBottomMenu.name).async("string").then((content) => {
    var content = content.replace(/434e52/g, principalColor); 
    skinPack.file("skin/JI4sQEkU9ogpyr5CKcd2yg.doss/img/tpl/back-bottom.svg", content);
  });

  var svgIconGrain = skinPack.files["skin/JI4sQEkU9ogpyr5CKcd2yg.doss/img/content/ico.svg"];
  var svgIconGrainUpdated = skinPack.file(svgIconGrain.name).async("string").then((content) => {
    var content = content.replace(/434E52/g, principalColor); 
    skinPack.file("skin/JI4sQEkU9ogpyr5CKcd2yg.doss/img/content/ico.svg", content);
  });

  var svgBtnMenuIcon = skinPack.files["skin/JI4sQEkU9ogpyr5CKcd2yg.doss/img/tpl/menu-tools.svg"];
  var svgBtnIconUpdated = skinPack.file(svgBtnMenuIcon.name).async("string").then((content) => {
    var content = content.replace(/434e52/g, principalColor);
    var content = content.replace(/e0ecec/g, secondColor);
    skinPack.file("skin/JI4sQEkU9ogpyr5CKcd2yg.doss/img/tpl/menu-tools.svg", content);
  });

  var svgBtnNavIcon = skinPack.files["skin/JI4sQEkU9ogpyr5CKcd2yg.doss/img/tpl/buttons.svg"];
  var svgBtnNavUpdated = skinPack.file(svgBtnNavIcon.name).async("string").then((content) => {
    var content = content.replace(/434e52/g, principalColor); 
    skinPack.file("skin/JI4sQEkU9ogpyr5CKcd2yg.doss/img/tpl/buttons.svg", content);
  });
  
  /*XML*/
  var contentSkinXml = skinPack.files["skinSet.xml"];
  var skinXmlUpdated = skinPack.file(contentSkinXml.name).async("string").then((content) => {

    var getNewName = document.getElementById("skNewName").value;
    if(getNewName){
      getNewName = "title=\""+getNewName+"\"";
      var content = content.replace(/title="harmony"/i, getNewName);
    }

    var getVersionMaj = document.getElementById("skNewVersionMaj");
    var getVersionMed = document.getElementById("skNewVersionMed");
    var getVersionMin = document.getElementById("skNewVersionMin");

    skinPack.file("skinSet.xml", content);
  });
  return Promise.all([skinCssUpdated, mainCssUpdated, skinXmlUpdated]).then(() => skinPack)
}


function writeSkinPack(skinPack, outputName) {
  return skinPack.generateAsync({type: "blob"}).then((content) => {
    saveAs(content, outputName);
  });
}

function validateStyle() {
  var versionMaj = document.getElementById("skNewVersionMaj").checkValidity();
  var versionMed = document.getElementById("skNewVersionMed").checkValidity();
  var versionMin = document.getElementById("skNewVersionMin").checkValidity();

  if(versionMin && versionMed && versionMaj){
    $("#errorVersion").hide();
    loadSkinPack('starter/harmonySRC0-1_2.skinpack')
    .then((skinPack) => updateSkinPack(skinPack))
    .then((skinPack) => writeSkinPack(skinPack, "skinPack.zip"));
  }
  else{
    $("#errorVersion").show();
    $('body').scrollTop(0);
  }
}

$("#skNewVersionMaj, #skNewVersionMed, #skNewVersionMin").focus(function(){
  $("#errorVersion").hide();
})

