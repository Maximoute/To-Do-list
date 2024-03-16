"use strict"

let list_tasks = [];


document.addEventListener('DOMContentLoaded', (event) =>{

    document.getElementById('add-task-form').addEventListener('click',function(e){
        e.preventDefault();
        show_add_task_form();
    })
});

function show_add_task_form () {
    const button_add_task_form = document.getElementById('add-task-form');
    const add_task_form_container = document.getElementById("add-task-form-container");
    add_task_form_container.innerHTML = '';

    if (!document.getElementById("task-form")) {
    const add_form = document.createElement('form');
    add_form.id ="task-form";
    add_form.innerHTML =`
            <input type="text" id="task-title" placeholder="Titre"><br>
            <textarea  id="task-description" cols="20" rows="10" placeholder="Description"></textarea><br>
            <button type="submit">Ajouter</button>
        `;
        add_task_form_container.appendChild(add_form);

        add_form.addEventListener('submit',function(e){
            e.preventDefault();
            const titre = document.getElementById('task-title').value.trim();
            const description = document.getElementById('task-description').value.trim();
            if (!titre){
                alert("Veuillez remplir le titre de la tâche");
                return;
            }
    
            add_task(titre, description);
            add_task_form_container.innerHTML = '';
            document.getElementById('add-task-form').style.display = 'inline-block';
            add_form.reset();
            add_form.remove();
    });  
    
    }
    button_add_task_form.style.display = 'none';
}
    
// ajoute des tâches //
function add_task(titre, description) {
    const task = { 
        id: Date.now(),
        titre : titre,
        description: description,
        complete : false,
    };
    list_tasks.push(task); // où ? -> quoi ? //
   // crée une div dans l'html
   
    const div_task = document.createElement('div');
    div_task.setAttribute(`id`,`task-${task.id}`);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', function(){
        taskDone(titre_element, description_element, checkbox.checked);
    })
    div_task.appendChild(checkbox);

    const titre_element = document.createElement('h3');
    titre_element.textContent = task.titre;
    titre_element.classList.add('task-title');
    div_task.appendChild(titre_element);

    const description_element = document.createElement('p');
    description_element.textContent = task.description;
    description_element.classList.add('task-description');
    div_task.appendChild(description_element);

    const delete_button = document.createElement('button');
    delete_button.classList.add('delete-button');
    delete_button.textContent = 'Supprimer';
    delete_button.addEventListener('click',function(){
        div_task.remove();
        console.log(`Tâche suprimée : ${titre_element.textContent}`);
    });

    const modifie_button = document.createElement('Button');
    modifie_button.classList.add('edit-button');
    modifie_button.textContent = 'modifier';
    modifie_button.addEventListener('click', function(){
        modifie_task(titre_element, description_element);
    });

    
    div_task.appendChild(modifie_button);
    div_task.appendChild(delete_button);

    document.getElementById('tasks-container').appendChild(div_task);
    

   console.log(`Tâche ajoutée : ${titre}`);
}

/*     function get_task_id('task_id');
    return task_id;
 */
function modifie_task(titre_element, description_element){

    HideSections(false); // appel la fonction

    const modifie_form = document.createElement('div');
    modifie_form.innerHTML = `
        <h3>Editez la tâche</h3>
        <div> 
            <label for="modifie-titre">Titre :</label>
            <input type="text" id="modifie-titre" value="${titre_element.textContent}">
        </div>
        <div>
            <label for="modifie-description">Description :</label>
            <textarea id="modifie-description">${description_element.textContent}</textarea>
        </div>
        <button id="save-modification">Enregistrer</button>
        <button id="cancel-modification">Annuler</button>
        `;

        const form_container = document.getElementById('form-container');
        form_container.appendChild(modifie_form);

        const delete_button = document.createElement('button');
            delete_button.classList.add('delete-button');
            delete_button.textContent = 'Supprimer';
            delete_button.addEventListener('click',function(){
                form_container.remove();
            console.log(`Tâche suprimée : ${titre_element.textContent}`);
        });

        const modifie_button = document.createElement('button');
            modifie_button.classList.add('edit-button');
            modifie_button.textContent = 'modifier';
            modifie_button.addEventListener('click', function(){
            modifie_task(titre_element, description_element);
        });
    
        document.getElementById('save-modification').addEventListener('click', function(){
            const new_title = document.getElementById('modifie-titre').value.trim();
            const new_description = document.getElementById('modifie-description').value.trim();

            if (new_title && new_description) {
                titre_element.textContent = new_title;
                description_element.textContent = new_description

                cleaUpAndRestore()
                console.log(`Tâche modifiée : ${new_title}`);
                
            
        }});

        document.getElementById('cancel-modification').addEventListener('click',function(){
            cleaUpAndRestore()
        })


    }

function HideSections(enable) {

    // HideSections(true) -> show
    // HideSections(false) -> hide

    const section_add_task = document.querySelectorAll('.add-task');
    const section_tasks = document.querySelectorAll('.tasks');

    section_add_task.forEach(section => {
        section.style.display = enable ? '' : 'none';
    });
    section_tasks.forEach(section => {
        section.style.display = enable ? '' : 'none';
    })
}

function taskDone(titre, description, is_checked){
    if (is_checked) {
        titre.classList.add('text-line-through');
        description.classList.add('text-line-through');
    } else {
        titre.classList.remove('text-line-through');
        description.classList.remove('text-line-through');
    }
}

function cleaUpAndRestore() {
    document.getElementById('form-container').innerHTML = '';
    HideSections(true)
}