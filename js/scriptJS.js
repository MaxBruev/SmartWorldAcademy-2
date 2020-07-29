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
    let buttons = jsonObj['buttons'];
    let myButton = document.createElement('button');
    let myDiv = document.createElement('div');

    for (let i = 0; i < fields.length; i++) {
        let myP = document.createElement('p');
        let myInput = document.createElement('input');

        myP.textContent = fields[i].label;

        let input = fields[i].input;

        myInput.placeholder = input.placeholder;
        myInput.type = input.type;

        myDiv.appendChild(myP);
        myDiv.appendChild(myInput);

        section.appendChild(myDiv);

        console.log(myInput);
    }
    for (let i = 0; i < buttons.length; i++) {
        myButton.innerText = buttons[i].text;
        myDiv.appendChild(myButton);
        console.log(myButton);
    } 
}