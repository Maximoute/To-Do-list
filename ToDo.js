"use strict"

document.addEventListener('DOMContentLoaded', (event) =>{


    document.getElementById('taskForm').addEventListener('submit', function(e){
        e.preventDefault();

        const titre = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;

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
    addElement.innerHTML = `
      <h3>${task.titre}</h3>
      <p>${task.description}</p>
  `;

    const delete_button = document.createElement('button');
    delete_button.textContent = 'Supprimer';
    delete_button.addEventListener('click',function(){
        addElement.remove();
        console.log(`Tâche suprimée : ${titre}`);
    });
    
    addElement.appendChild(delete_button);
    tasks_container.appendChild(addElement);

   console.log(`Tâche ajoutée : ${titre}`);
}
