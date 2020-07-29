const section = document.querySelector('section');
const header = document.querySelector('header');
let fileInput = document.querySelector('#file_input');

fileInput.addEventListener('change', function (event) {

    let file = fileInput.files[0];
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function() {
        let jsonResult = JSON.parse(reader.result);

        nameHeader(jsonResult);
        fieldsSection(jsonResult);
        console.log(jsonResult);
    }

});

function nameHeader (jsonObj) {
    let myH1 = document.createElement('h1');

    myH1.textContent = jsonObj['name'];
    header.appendChild(myH1);
}

function fieldsSection(jsonObj) {
    let fields = jsonObj['fields'];

    for (let i = 0; i < fields.length; i++) {
        let myDiv = document.createElement('div');
        let myP = document.createElement('p');
        let myInput = document.createElement('input');

        myP.textContent = fields[i].label;

        let input = fields[i].input;

        for (let j = 0; j < input.length; j++) {
            let listInput= document.createElement('input');
            myInput.appendChild(listInput);
            myInput.getAttribute('placeholder');
        }

        myDiv.appendChild(myP);
        myDiv.appendChild(myInput);

        section.appendChild(myDiv);

        console.log(myInput)
    }
}









