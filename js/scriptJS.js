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

            if(input.mask !== undefined){
                input.type = 'text';
                $(myInput).mask(input.mask);
            }

            if(input.type === 'technology') {
                let container = document.createElement('div');
                container.appendChild(myP);
                input.technologies.forEach((techelem,i) =>  container.append(buildTechnology(techelem, i)));

                function buildTechnology(techelem, i){
                    let technologies = document.createElement('input');
                    let label = document.createElement('label');

                    technologies.type = 'checkbox';

                    label.htmlFor = 'option' + i;
                    label.textContent = techelem;
                    label.className = 'btn btn-primary btn-tags';

                    technologies.append(myInput);
                    myDiv.appendChild(technologies);
                    return label;
                }
                myDiv = container;

                section.appendChild(myDiv);
                continue;
            }

            if(input.type === 'file' && input.filetype !== undefined){

                myInput.setAttribute('multiple', input.multiple);

                let arr = '';

                input.filetype.forEach(elem =>{
                    arr += '.' + elem + ', ';
                    myInput.setAttribute('accept', arr);
                });
            }

            if(input.type === 'color') {
                let datalist = document.createElement('datalist');
                myInput.setAttribute('list','colorlist' + i);

                for(let key  of input.colors){
                    let option = document.createElement('option');
                    option.value = key;
                    datalist.append(option);
                }
                myInput.append(datalist);
            }

            myInput.type = input.type;
            myInput.filetype = input.filetype;

            myDiv.appendChild(myP);
            myDiv.appendChild(myInput);

            section.appendChild(myDiv);

            console.log(input.mask, input.type);
            console.log(myInput);

        }
        // if (!references) {
        //     return false;
        // } else {
        //     for (let i = 0; i < references.length; i++) {
        //         let myRefInput = document.createElement('input');
        //         let myRef = document.createElement('a');
        //         myRef.setAttribute('href', '#');
        //
        //
        //         myRefInput.type = references[i].type;
        //         myRefInput.required = references[i].required;
        //         myRefInput.checked = references[i].checked;
        //
        //         myRef.innerText = references[i].text;
        //
        //         myDiv.appendChild(myRef);
        //         myDiv.appendChild(myRefInput);
        //         section.appendChild(myDiv);
        //
        //         console.log(myRefInput);
        //     }
        // }


        for (let i = 0; i < buttons.length; i++) {
            myButton.innerText = buttons[i].text;
            myDiv.appendChild(myButton);
            console.log(myButton);
        }
    }
});
