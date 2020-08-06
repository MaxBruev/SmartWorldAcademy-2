$(document).ready(function(){

    let section = document.querySelector('section');
    let header = document.querySelector('header');
    let fileInput = document.querySelector('#file_input');
    let myH1 = document.createElement('h1');
    let myDiv = document.createElement('div');

//Очищает страницу и переменную, для последующиего повторного записывания
    fileInput.onclick = function () {
        header.innerHTML = "";
        section.innerHTML = "";
        myDiv = null;
    };

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
//Создает тэг h1 и заполняет его элементом 'name' из массива файла json
    function nameHeader (jsonObj) {
        myH1.textContent = jsonObj['name'];
        header.appendChild(myH1);
    }
//Запоняет тэг section элементами 'fields', 'references', 'buttons' и их подэлементами 'input' из массива файла json
    function fieldsSection(jsonObj) {
        let fields = jsonObj['fields'];
        let references = jsonObj['references'];
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
            myInput.setAttribute('mask', input.mask || ' ');

            //$('[mask = "+7 (999) 99-99-999"]').mask('+7 (999) 999-99-99'); так не работает
            //$('[type = "tel"]').mask('+7 (999) 999-99-99'); так работает, если в json файле добавить атрибут type = "tel" 

            myDiv.appendChild(myP);
            myDiv.appendChild(myInput);

            section.appendChild(myDiv);

            console.log(myInput);
            console.log(myMask);
        }
        if (!references) {
            return false;
        } else {
            for (let i = 0; i < references.length; i++) {
                let myReferences = document.createElement('input');

                let input = references[i].input;

                myReferences.innerText = references[i].text;

                myReferences.type = references[i].type;
                myReferences.required = references[i].required;
                myReferences.checked = references[i].checked;
                myReferences.ref = references[i].ref;

                myDiv.appendChild(myReferences);

                section.appendChild(myDiv);

                console.log(myReferences);
            }
        }

        for (let i = 0; i < buttons.length; i++) {
            myButton.innerText = buttons[i].text;
            myDiv.appendChild(myButton);
            console.log(myButton);
        }
    }
});
