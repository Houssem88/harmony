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
  var contentSkinCss = skinPack.files["skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/skin.css"];
  var skinCssUpdated = skinPack.file(contentSkinCss.name).async("string").then((content) => {
    // Get the color from UI
    /*var principalColor = "\n.header{ background-color:#"+$("#hrColorPrincipale").val()+";}\n";*/
    var x = document.getElementById('hrColorPrincipale').value;
    skinPack.file("skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/skin.css", content + x);
  });

  var contentMainCss = skinPack.files["skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/main.css"];
  var mainCssUpdated = skinPack.file(contentMainCss.name).async("string").then((content) => {
    skinPack.file("skin/JI4sQEkU9ogpyr5CKcd2yg.doss/css/main.css", content + "modify main.css");
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