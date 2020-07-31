let section = document.querySelector('section');
let header = document.querySelector('header');
let fileInput = document.querySelector('#file_input');
let myH1 = document.createElement('h1');
let myDiv = document.createElement('div');

fileInput.onclick = function () {
    header.innerHTML = "";
    section.innerHTML = "";
    myDiv = null;
}

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
    myH1.textContent = jsonObj['name'];
    header.appendChild(myH1);
}

function fieldsSection(jsonObj) {
    let fields = jsonObj['fields'];
    //let references = jsonObj['references'];
    let buttons = jsonObj['buttons'];
    let myButton = document.createElement('button');

    for (let i = 0; i < fields.length; i++) {
        let myP = document.createElement('p');
        let myInput = document.createElement('input');
        
        myDiv = document.createElement('div');
        myP.textContent = fields[i].label;

        let input = fields[i].input;

        myInput.placeholder = input.placeholder || ' ';
        myInput.type = input.type;

        myDiv.appendChild(myP);
        myDiv.appendChild(myInput);

        section.appendChild(myDiv);

        console.log(myInput);
    }
    // for (let i = 0; i < references.length; i++) {
    //     let myReferences = document.createElement('input');
    //
    //     let input = references[i].input;
    //
    //     myReferences.innerText = references[i].text;
    //
    //     myReferences.type = input.type;
    //     myReferences.required = input.required;
    //     myReferences.checked = input.checked;
    //     myReferences.ref = input.ref;
    //
    //     myDiv.appendChild(myReferences);
    //
    //     section.appendChild(myDiv);
    //
    //     console.log(myReferences);
    // }
    for (let i = 0; i < buttons.length; i++) {
        myButton.innerText = buttons[i].text;
        myDiv.appendChild(myButton);
        console.log(myButton);
    } 
}
