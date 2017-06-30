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

function updateSkinPack(skinPack, principalColor, secondColor) {
  // Get principal & secondary color from UI
  var principalColor = document.getElementById('hrColorPrincipale').value;
  var secondColor = document.getElementById('hrColorSecondaire').value;

  // Get versions from UI
  var versionMaj = document.getElementById("skNewVersionMaj").value;
  var versionMed = document.getElementById("skNewVersionMed").value;
  var versionMin = document.getElementById("skNewVersionMin").value;

  // Check if user set new colors or not, if no new color, set initials ones
  switch(''){
    case principalColor || secondColor:
      principalColor = '434e52';
      secondColor = 'e0ecec';
    break;
    case principalColor:
      principalColor = '434e52';
    break;
    case secondColor:
      secondColor = 'e0ecec';
  }

  // Get font family from UI
  var getFontFamily = $("#select-text-typo").val();


  /*XML*/
  var contentSkinXml = skinPack.files["skinSet.xml"];
  var skinXmlUpdated = skinPack.file(contentSkinXml.name).async("string").then((content) => {

    parsSkinXML = new DOMParser();
    xmlDoc = parsSkinXML.parseFromString(content,"application/xml");

    //Modication du titre
    var getNewTitle = document.getElementById("skNewName").value;
    var getNewVersion = versionMaj+"-"+versionMed+"_"+versionMin;
    var setNewTitle = getNewTitle+getNewVersion;

    if(getNewTitle){
      xmlDoc.querySelector("description").setAttribute("title", getNewTitle);
      var serializer = new XMLSerializer();
      skinPack.file("skinSet.xml", serializer.serializeToString(xmlDoc));
    }
  });

  var auroraWPath = xmlDoc.querySelector('skin[generatorCode=auroraW]').getAttribute('src');
  
  var contentSkinCss = skinPack.files[auroraWPath+"/css/skin.css"];
  var skinCssUpdated = skinPack.file(contentSkinCss.name).async("string").then((content) => {

  });

  var contentMainCss = skinPack.files[auroraWPath+"/css/main.css"];
  var mainCssUpdated = skinPack.file(contentMainCss.name).async("string").then((content) => {
    /*Images BP & type Grain*/
    var noImgPed = document.getElementById("noImgPedago").checked;
    var noImgGrn = document.getElementById("noImgGrain").checked;
    
    if(noImgPed){
      var content = content.replace('background:url("../img/content/blocks.svg") no-repeat scroll transparent;', 'background:none;');
      skinPack.file(auroraWPath+"/css/main.css", content);
    }

    if(noImgGrn){
      var content = content.replace('background: url("../img/content/ico.svg") no-repeat scroll transparent;', 'background:none;');
      skinPack.file(auroraWPath+"/css/main.css", content);
    }

    if(getFontFamily){
      var content = content.replace('sans-serif',getFontFamily);
    }

    /* Colors : principal & secondary */
    var content = content.replace(/434e52/g, principalColor);
    var content = content.replace(/e0ecec/g, secondColor);
    skinPack.file(auroraWPath+"/css/main.css", content);
  });

  var svgPdg = skinPack.files[auroraWPath+"/img/tpl/back-home.svg"];
  var svgPdgUpdated = skinPack.file(svgPdg.name).async("string").then((content) => {
    var content = content.replace(/434e52/g, principalColor);
    var content = content.replace(/f2f2f2/g, secondColor);
    skinPack.file(auroraWPath+"/img/tpl/back-home.svg", content);
  });

  var svgTopMenu = skinPack.files[auroraWPath+"/img/tpl/back-top.svg"];
  var svgTopMenuUpdated = skinPack.file(svgTopMenu.name).async("string").then((content) => {
    var content = content.replace(/434e52/g, principalColor);
    skinPack.file(auroraWPath+"/img/tpl/back-top.svg", content);
  });

  var svgBottomMenu = skinPack.files[auroraWPath+"/img/tpl/back-bottom.svg"];
  var svgBottomMenuUpdated = skinPack.file(svgBottomMenu.name).async("string").then((content) => {
    var content = content.replace(/434e52/g, principalColor); 
    skinPack.file(auroraWPath+"/img/tpl/back-bottom.svg", content);
  });

  var svgBackMenu = skinPack.files[auroraWPath+"/img/tpl/back-menu.svg"];
  var svgBackMenuUpdated = skinPack.file(svgBackMenu.name).async("string").then((content) => {
    var content = content.replace(/434e52/g, secondColor); 
    skinPack.file(auroraWPath+"/img/tpl/back-menu.svg", content);
  });

  var svgIconGrain = skinPack.files[auroraWPath+"/img/content/ico.svg"];
  var svgIconGrainUpdated = skinPack.file(svgIconGrain.name).async("string").then((content) => {
    var content = content.replace(/434E52/g, principalColor); 
    skinPack.file(auroraWPath+"/img/content/ico.svg", content);
  });

  var svgBtnMenuIcon = skinPack.files[auroraWPath+"/img/tpl/menu-tools.svg"];
  var svgBtnIconUpdated = skinPack.file(svgBtnMenuIcon.name).async("string").then((content) => {
    var content = content.replace(/434e52/g, principalColor);
    var content = content.replace(/e0ecec/g, secondColor);
    skinPack.file(auroraWPath+"/img/tpl/menu-tools.svg", content);
  });

  var svgBtnNavIcon = skinPack.files[auroraWPath+"/img/tpl/buttons.svg"];
  var svgBtnNavUpdated = skinPack.file(svgBtnNavIcon.name).async("string").then((content) => {
    var content = content.replace(/434e52/g, principalColor); 
    skinPack.file(auroraWPath+"/img/tpl/buttons.svg", content);
  });

  var svgSearch = skinPack.files[auroraWPath+"/img/search/find.svg"];
  var svgSearchUpdated = skinPack.file(svgSearch.name).async("string").then((content) => {
    var content = content.replace(/434e52/g, principalColor);
    skinPack.file(auroraWPath+"/img/search/find.svg", content);
  });

  var svgToggle = skinPack.files[auroraWPath+"/img/tpl/menu-toggle.svg"];
  var svgToggleUpdated = skinPack.file(svgToggle.name).async("string").then((content) => {
    var content = content.replace(/434e52/g, principalColor);
    skinPack.file(auroraWPath+"/img/tpl/menu-toggle.svg", content);
  });

  var svgBottomQuiz = skinPack.files[auroraWPath+"/img/tpl/back-bottom-straight.svg"];
  var svgBottomQuizUpdated = skinPack.file(svgBottomQuiz.name).async("string").then((content) => {
    var content = content.replace(/434e52/g, principalColor);
    skinPack.file(auroraWPath+"/img/tpl/back-bottom-straight.svg", content);
  });
  return Promise.all([skinCssUpdated, mainCssUpdated, skinXmlUpdated, svgPdgUpdated,svgTopMenuUpdated ,svgBottomMenuUpdated ,svgBackMenuUpdated, svgIconGrainUpdated ,svgBtnIconUpdated ,svgBtnNavUpdated, svgSearchUpdated, svgToggleUpdated, svgBottomQuizUpdated]).then(() => skinPack)
  
}


function writeSkinPack(skinPack, outputName) {
  return skinPack.generateAsync({type: "blob"}).then((content) => {
    saveAs(content, outputName);
  });
}

function validateStyle() {
  var newNameCheck = document.getElementById("skNewName").checkValidity();
  var versionMaj = document.getElementById("skNewVersionMaj").checkValidity();
  var versionMed = document.getElementById("skNewVersionMed").checkValidity();
  var versionMin = document.getElementById("skNewVersionMin").checkValidity();

  var verMaj = document.getElementById("skNewVersionMaj").value;
  var verMed = document.getElementById("skNewVersionMed").value;
  var verMin = document.getElementById("skNewVersionMin").value;

  var getNewTitle = document.getElementById("skNewName").value;
  var getNewVersion = verMaj+"-"+verMed+"_"+verMin;
  var setNewTitle = getNewTitle+getNewVersion;

  if(newNameCheck && versionMaj && versionMed && versionMin){
    $("#errorVersion").hide();
    loadSkinPack('starter/OpaleSkinUp0-1_1.skinpack')
    .then((skinPack) => updateSkinPack(skinPack))
    .then((skinPack) => writeSkinPack(skinPack, setNewTitle+".skinpack"));
  }
  else{
    $("#errorVersion").show();
    $('body').scrollTop(0);
  }
}

$("#skNewVersionMaj, #skNewVersionMed, #skNewVersionMin").focus(function(){
  $("#errorVersion").hide();
})


loadSkinPack('starter/OpaleSkinUp0-1_1.skinpack').then((skinPack) => readSkinXml(skinPack))

function readSkinXml(skinPack){
  var contentSkinXml = skinPack.files["skinSet.xml"];
  var skinXmlUpdated = skinPack.file(contentSkinXml.name).async("string").then((content) => {
    parsSkinXML = new DOMParser();
    xmlDoc = parsSkinXML.parseFromString(content,"application/xml");
    var version_skin = xmlDoc.getElementsByTagName("skinSet")[0].getAttribute("code");
    version_skin = version_skin.replace(/[a-zA-Z~]+/g,'');
    version_skin = version_skin.replace(/[_-]+/g,'.');
    /*document.getElementById("oldSkinVersion").innerHTML = "(Version initiale : "+version_skin+")";*/

    var opale_version = xmlDoc.getElementsByTagName("description")[0].getAttribute("usedIn");
    document.getElementById("oldSkinVersion").innerHTML = "(compatible avec : "+opale_version+")";
  });
}