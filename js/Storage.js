// Initialisation de la BDD
function createDatabase(){
    const request = window.indexedDB.open("userDatabase", 1); //creé la BDD et donne un nom 

    request.onupgradeneeded = function(event) {
        const database = event.target.result;

        // créer l'objet store pour le user
        const user_store = database.createObjectStore("users", { keyPath: "id", autoIncrement: true});
        user_store.createIndex("username", "username", {unique : true });
        user_store.createIndex("email", "email", {unique : true });
        user_store.createIndex("password", "password", {unique : false });

        // crer l'objet store pour les tâches
        const task_store = database.createObjectStore("tasks", { keyPath: "id", autoIncrement: true});
        task_store.createIndex("userID", "userID", {unique : false });
        task_store.createIndex("title", "title", {unique : false });
        task_store.createIndex("description", "description", {unique : false });
        task_store.createIndex("status", "status", {unique : false });

        // créer les sous-tâches
        const sub_task_store = database.createObjectStore("subtasks", { keyPath: "id", autoIncrement: true});
        sub_task_store.createIndex("taskID", "taskID", {unique : false });
        sub_task_store.createIndex("title", "title", {unique : false });
        sub_task_store.createIndex("description", "description", {unique : false });
        sub_task_store.createIndex("status", "status", {unique : false });
    }

    // si erreur
    request.onerror = function(event) {
        console.error("Database error : " + event.target.errorCode);
    }
    // creation reussie
    request.onsuccess = function(event){
        console.log("Database initiolized succefully")
    }
}

createDatabase();
