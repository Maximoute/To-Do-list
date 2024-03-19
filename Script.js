"use strict"

let list_tasks = [];


document.addEventListener('DOMContentLoaded', (event) =>{

    document.getElementById('button-add-task-modal').addEventListener('click',function(e){
        e.preventDefault();
        openAddTaskModal();
    })

});

function openAddTaskModal () {
    const add_task_form = document.getElementById("div-add-task-modal");
    add_task_form.innerHTML = '';

    if (!document.getElementById("task-form-modal")) {
        const add_form = document.createElement('form');
        add_form.id ="task-form-modal";
        add_form.innerHTML =`
                <div id="modal-content" class="modal-content">
                    <span class="close">&times;</span>
                    <input type="text" id="task-title" placeholder="Titre"><br>
                    <textarea  id="task-description" cols="20" rows="10" placeholder="Description"></textarea><br>
                    <button type="submit">Ajouter</button>
                </div>
            `;
            add_task_form.appendChild(add_form);

    document.getElementById('button-add-task-modal').addEventListener('click', function(){
        document.getElementById('div-add-task-modal').style.display ='block'
    })

    document.querySelector('.close').addEventListener('click', function(){
        document.getElementById('div-add-task-modal').style.display ='none'
    })
    
    window.addEventListener('click', function(event){
        const modal = document.getElementById('div-add-task-modal');
        if (event.target == modal) {
            modal.style.display ='none'
        }
    })


        add_form.addEventListener('submit',function(e){
            e.preventDefault();
            const titre = document.getElementById('task-title').value.trim();
            const description = document.getElementById('task-description').value.trim();
            if (!titre){
                alert("Veuillez remplir le titre de la tâche");
                return;
            }
    
            addTask(titre, description);
            add_task_form.innerHTML = '';
            add_form.reset();
            add_form.remove();
            document.getElementById('div-add-task-modal').style.display ='none';
    });  
    
    }
}

function addTask(titre, description) {
    const task = { 
        id: Date.now(),
        titre : titre,
        description: description,
        completed : false,
    };
    list_tasks.push(task); // où ? -> quoi ? //
   // crée une div dans l'html
   
    const div_task = document.createElement('div');
    div_task.setAttribute(`id`,`task-${task.id}`);


    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('click', function(e){
        e.stopPropagation();
        taskDone(task.id, checkbox.checked);
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


    div_task.addEventListener('click', function(){
        openShowTaskModal(task.id);
        
    })

    document.getElementById('tasks-list').appendChild(div_task);
    

   console.log(`Tâche ajoutée : ${titre}`);
}

function openShowTaskModal(taskId){
    const task = list_tasks.find(t => t.id === taskId);
    if (!task) {
        console.error("Tâche non trouvée");
        return;
    }
    const add_modal_task = document.getElementById("div-add-show-task-modal");
    add_modal_task.innerHTML = '';
    const html_task_modal = document.createElement('div');
    html_task_modal.className = 'modal-content';
    html_task_modal.innerHTML = `
                    <span class="close">&times;</span>
                    <h3 id="modal-task-title"></h3>
                    <p id="modal-task-desription"></p>
                    <button id="edit-button" class="edit-button">Modifier</button>
                    <button id="delete-button" class="delete-button">Supprimer</button>
                    `;
    add_modal_task.appendChild(html_task_modal);

    document.getElementById('modal-task-title').textContent = task.titre
    document.getElementById('modal-task-desription').textContent = task.description;
    document.getElementById('div-add-show-task-modal').style.display = 'block';
    


    const modifie_button = document.getElementById('edit-button');
    modifie_button.addEventListener('click', function(){
        openModfieTaskModal(task.id, task.titre, task.description);
    });

    const delete_button = document.getElementById('delete-button');
    delete_button.onclick = () => deleteTask(task.id, task.titre);

    document.querySelector('.edit-button').addEventListener('click', function(){
        document.getElementById('div-add-show-task-modal').style.display ='none'
    })

    document.querySelector('.close').addEventListener('click', function(){
        document.getElementById('div-add-show-task-modal').style.display ='none'
    })
    
    window.addEventListener('click', function(event){
        const modal = document.getElementById('div-add-show-task-modal');
        if (event.target == modal) {
            modal.style.display ='none'
        }
    })

}

function openModfieTaskModal(taskId) {
    const task = list_tasks.find(t => t.id === taskId);
    if (!task) {
        console.error("Tâche non trouvée");
        return;
    }console.log(task.titre)

    const modifie_task_modal = document.getElementById('div-modifie-task-modal');
    modifie_task_modal.innerHTML ='';
    const html_modifie_task_modal = document.createElement('div');
    html_modifie_task_modal.className = 'modal-content';
    html_modifie_task_modal.innerHTML = `
                    <h3>Editez la tâche</h3>
                    <div> 
                        <label for="modifie-titre">Titre :</label>
                        <input type="text" id="modifie-titre" value="${task.titre}">
                    </div>
                    <div>
                        <label for="modifie-description">Description :</label>
                        <textarea id="modifie-description">${task.description}</textarea>
                    </div>
                    <button id="save-modification">Enregistrer</button>
                    <button id="cancel-modification">Annuler</button>
                    `;
    modifie_task_modal.appendChild(html_modifie_task_modal);

    document.getElementById('div-modifie-task-modal').style.display = 'block';

    document.getElementById('save-modification').addEventListener('click', function(){
        const new_title = document.getElementById('modifie-titre').value.trim();
        const new_description = document.getElementById('modifie-description').value.trim();

        if (new_title && new_description) {
            task.titre = new_title;
            task.description = new_description
            
            uptdateTask(task.id, new_title, new_description);

            console.log(`Tâche modifiée : ${new_title}`);
            document.getElementById('div-modifie-task-modal').style.display ='none' 
            
        
    }});

    document.getElementById('cancel-modification').addEventListener('click',function(){
        document.getElementById('div-modifie-task-modal').style.display ='none'
    })

    document.querySelector('.close').addEventListener('click', function(){
        document.getElementById('div-modifie-task-modal').style.display ='none'
    })
    
    window.addEventListener('click', function(event){
        const modal = document.getElementById('div-modifie-task-modal');
        if (event.target == modal) {
            modal.style.display ='none'
        }
    })

}

function taskDone(taskId, is_checked){
    const task = list_tasks.find(t => t.id === taskId);
    if (!task) {
        console.error("Tâche non trouvée");
        return;
    }

    const titre_element = document.querySelector(`#task-${taskId} .task-title`)
    const description_element = document.querySelector(`#task-${taskId} .task-description`)

    if (is_checked) {
        task.completed = true;
        if(titre_element) titre_element.classList.add('text-line-through');
        if(description_element) description_element.classList.add('text-line-through');
    } else {
        task.completed = false;
        if(titre_element) titre_element.classList.remove('text-line-through');
        if(description_element) description_element.classList.remove('text-line-through');
    }
}

function deleteTask(taskId, taskTitle){
    const task_element = document.getElementById(`task-${taskId}`);
    if (task_element) {
        task_element.remove();
    }
    console.log(`Tâche suprimée : ${taskTitle}`)
    list_tasks = list_tasks.filter(task => task.id !== taskId);
    document.getElementById('div-add-show-task-modal').style.display ='none'
}

function uptdateTask(taskId, newTitle, newDescription){
    const task_element = document.getElementById(`task-${taskId}`);

    if (task_element) {
        const title_element = task_element.querySelector('.task-title');
        const description_element = task_element.querySelector('.task-description')

        if (title_element) title_element.textContent = newTitle;
        if (description_element) description_element.textContent = newDescription;
    }
}

