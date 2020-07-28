let fileInput = document.querySelector('#file_input');

fileInput.addEventListener('change', function (event) {

    let file = fileInput.files[0];
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function() {
        let JsonResult = JSON.parse(reader.result);
        console.log(JsonResult);
    }
});