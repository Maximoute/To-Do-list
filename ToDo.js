"use strict"
document.addEventListener('DOMContentLoaded', (event) =>{
    let list_tasks = [];

    document.getElementById('taskForm').addEventListener('submit', function(e){
        e.preventDefault();

        const titre = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;

        add_task(titre, description);

        this.reset();
    });
});

// attention TASK et pas TASKS création d'une nouvelle const dans la fonction //
function add_task (titre, description) {
    const task = { 
        id: task.length + 1,
        titre : titre,
        description: description,
        complete : false,
    };
   task.push(list_tasks);
   // crée une div dans l'html
    const addElement = document.createElement('div');
    addElement.setAttribute(`id','task-${task.id}`);
    addElement.innerHTML = `
      <h3>${task.titre}</h3>
      <p>${task.description}</p>
  `;
    document.getElementById('tasksContainer').appendChild(addElement);
   console.log(`Tâche ajoutée : ${titre}`);
}
