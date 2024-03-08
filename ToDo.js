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
    const addElement = document.createElement('div');
    addElement.setAttribute(`id`,`task-${task.id}`);

    const titre_element = document.createElement('h3');
    titre_element.textContent = task.titre;
    addElement.appendChild(titre_element);

    const description_element = document.createElement('p');
    description_element.textContent = task.description;
    addElement.appendChild(description_element);

    const delete_button = document.createElement('button');
    delete_button.textContent = 'Supprimer';
    delete_button.addEventListener('click',function(){
        addElement.remove();
        console.log(`Tâche suprimée : ${titre.textContent}`);
    });

    const modifie_button = document.createElement('Button');
    modifie_button.textContent = 'modifier';
    modifie_button.addEventListener('click', function(){
        modifie_task(titre_element, description_element);
    });
    
    addElement.appendChild(modifie_button);
    addElement.appendChild(delete_button);
    tasks_container.appendChild(addElement);

   console.log(`Tâche ajoutée : ${titre}`);
}

function modifie_task(titre_element, description_element){
    const new_title = prompt("Nouveau titre :", titre_element.textContent);
    if (new_title !== null && new_title.trim() !== ''){
        titre_element.textContent = new_title.trim();
    }

    const new_description = prompt("Nouvelle description :", description_element.textContent);
        if (new_description !== null && new_description.trim() !== ''){
            description_element.textContent = new_description.trim();
        }
}