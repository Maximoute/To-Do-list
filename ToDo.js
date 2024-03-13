"use strict"

document.addEventListener('DOMContentLoaded', (event) =>{


    document.getElementById('taskForm').addEventListener('submit', function(e){
        e.preventDefault();

        const titre = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        if (!titre){
            alert("Veuillez remplir le titre de la tâche");
            return;
        }
        add_task(titre, description);

        this.reset();
    });
});

let list_tasks = [];
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

    const titre_element = document.createElement('h3');
    titre_element.textContent = task.titre;
    div_task.appendChild(titre_element);

    const description_element = document.createElement('p');
    description_element.textContent = task.description;
    div_task.appendChild(description_element);

    const delete_button = document.createElement('button');
    delete_button.textContent = 'Supprimer';
    delete_button.addEventListener('click',function(){
        div_task.remove();
        console.log(`Tâche suprimée : ${titre_element.textContent}`);
    });

    const modifie_button = document.createElement('Button');
    modifie_button.textContent = 'modifier';
    modifie_button.addEventListener('click', function(){
        modifie_task(titre_element, description_element);
    });
    
    div_task.appendChild(modifie_button);
    div_task.appendChild(delete_button);
    tasks_container.appendChild(div_task);

   console.log(`Tâche ajoutée : ${titre}`);
}

/*     function get_task_id('task_id');
    return task_id;
 */
function modifie_task(titre_element, description_element){
    const modifie_form = document.createElement('div');
    modifie_form.innerHTML = `
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

        const tasks_container = titre_element.parentNode;
        tasks_container.innerHTML = '';
        tasks_container.appendChild(modifie_form);

        const delete_button = document.createElement('button');
            delete_button.textContent = 'Supprimer';
            delete_button.addEventListener('click',function(){
                tasks_container.remove();
            console.log(`Tâche suprimée : ${titre_element.textContent}`);
        });

        const modifie_button = document.createElement('Button');
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

                tasks_container.innerHTML = '';
                tasks_container.appendChild(titre_element);
                tasks_container.appendChild(description_element);
                tasks_container.appendChild(modifie_form.querySelector('#save-modification').parentNode);
                tasks_container.appendChild(modifie_button);
                tasks_container.appendChild(delete_button);
                modifie_form.remove();

                console.log(`Tâche modifiée : ${new_title}`);
                
            
        }});

        document.getElementById('cancel-modification').addEventListener('click',function(){
            tasks_container.innerHTML = '';
            tasks_container.appendChild(titre_element);
            tasks_container.appendChild(description_element);
            tasks_container.appendChild(modifie_form.querySelector('#save-modification').parentNode);
            tasks_container.appendChild(modifie_button);
            tasks_container.appendChild(delete_button);
            modifie_form.remove();
        })


    }