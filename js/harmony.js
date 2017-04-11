function getSkinPack(){
	var zip = new JSZip();
  	zip.loadAsync( document.getElementById("skin-rep").files[0] /* = file blob */)
    .then(function(zip) {
         // process ZIP file content here
        console.log(zip);
     }, function() {alert("Not a valid zip file")});
}

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}