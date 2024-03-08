document.addEventListener('DOMContentLoaded', (event) => {
  let tasks = [];

  document.getElementById('taskForm').addEventListener('submit', function(e) {
      e.preventDefault(); // Empêche le rechargement de la page

      const titre = document.getElementById('taskTitle').value;
      const description = document.getElementById('taskDescription').value;

      AddTask(titre, description);

      // Optionnel : réinitialiser le formulaire
      this.reset();
  });
});

function AddTask(titre, description) {
  const task = { 
      id: tasks.length + 1,
      titre: titre,
      description: description,
      complete: false,
  };
  tasks.push(task);

  const addElement = document.createElement('div');
  addElement.setAttribute('id', `task-${task.id}`);
  addElement.innerHTML = `
      <h3>${task.titre}</h3>
      <p>${task.description}</p>
  `;
  document.getElementById('tasksContainer').appendChild(addElement);

  console.log(`Tâche ajoutée : ${titre}`);
}

// Lire des tâches
function readTasks() {
  tasks.forEach(task => {
    console.log(`ID: ${task.id}, Description: ${task.description}, Completed: ${task.completed}`);
  });
}

// Supprimer des tâches
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  console.log(`Tâche avec l'ID ${id} supprimée`);
}

// Modifier des tâches
function modifyTask(id, newDescription) {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex > -1) {
    tasks[taskIndex].description = newDescription;
    console.log(`Tâche avec l'ID ${id} modifiée`);
  } else {
    console.log(`Tâche avec l'ID ${id} introuvable`);
  }
}

// Réorganiser des tâches
function reorderTasks(id, newPosition) {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex > -1) {
    const [task] = tasks.splice(taskIndex, 1);
    tasks.splice(newPosition - 1, 0, task);
    console.log(`Tâche avec l'ID ${id} réorganisée`);
  }
}

// Marquer une tâche comme terminée
function markTaskAsCompleted(id) {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex > -1) {
    tasks[taskIndex].completed = true;
    console.log(`Tâche avec l'ID ${id} marquée comme terminée`);
  } else {
    console.log(`Tâche avec l'ID ${id} introuvable`);
  }
}

// Exemples d'utilisation
addTask('Apprendre JavaScript');
addTask('Créer une to-do list');
readTasks();
modifyTask(1, 'Apprendre JavaScript avancé');
markTaskAsCompleted(2);
readTasks();
reorderTasks(2, 1);
readTasks();
deleteTask(1);
readTasks();
