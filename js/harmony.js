function zipIt(){
	var zip = new JSZip();
	

	zip.file("file.txt", "content");

	console.log(zip);
}