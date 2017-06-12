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
  var contentSkinCss = skinPack.files["skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/skin.css"];
  var skinCssUpdated = skinPack.file(contentSkinCss.name).async("string").then((content) => {
    var content = content.replace(/#ffffff/g, 'Christmas');
    /*skinPack.file("skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/skin.css", content + x);*/
  });

  var contentMainCss = skinPack.files["skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/main.css"];
  var mainCssUpdated = skinPack.file(contentMainCss.name).async("string").then((content) => {
    var content = content.replace(/434e52/g, principalColor);
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
    skinPack.file("skin/JI4sQEkU9ogpyr5CKcd2yg.doss/img/tpl/menu-tools.svg", content);
  });

  var svgBtnNavIcon = skinPack.files["skin/JI4sQEkU9ogpyr5CKcd2yg.doss/img/tpl/buttons.svg"];
  var svgBtnNavUpdated = skinPack.file(svgBtnNavIcon.name).async("string").then((content) => {
    var content = content.replace(/434e52/g, principalColor); 
    skinPack.file("skin/JI4sQEkU9ogpyr5CKcd2yg.doss/img/tpl/buttons.svg", content);
  });

  var contentSkinXml = skinPack.files["skinSet.xml"];
  var skinXmlUpdated = skinPack.file(contentSkinXml.name).async("string").then((content) => {
    skinPack.file("skinSet.xml", content + "modify skinSet.xml");
  });
  return Promise.all([skinCssUpdated, mainCssUpdated, skinXmlUpdated]).then(() => skinPack)
}


function writeSkinPack(skinPack, outputName) {
  return skinPack.generateAsync({type: "blob"}).then((content) => {
    saveAs(content, outputName);
  });
}

function validateStyle() {
  loadSkinPack('starter/harmonySRC0-1_2.zip')
    .then((skinPack) => updateSkinPack(skinPack))
    .then((skinPack) => writeSkinPack(skinPack, "skinPack.zip"));
}