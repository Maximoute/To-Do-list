document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('submit', function(event) {
        var form = document.getElementById('register-form');
        if (password !== confirm_password) {
            console.error("Passwords do not match.");
            return;
        }
        if (form) {
            console.log("Form found, adding event listener.");
            console.log("Form submitted");
            event.preventDefault();    
            
            var username = document.getElementById('username').value;
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            var confirm_password = document.getElementById('confirm-password').value;
            registerUser(username, email, password, confirm_password);
        }else {
            console.log("Form not found.");
        }
    }) 
})


function registerUser(username, email, password, confirm_password) {
    if (password !== confirm_password) {
        console.error("Passwords do not match.");
        return;
    }
    const bdd_promise = window.indexedDB.open("userDatabase", 1)

    bdd_promise.onsuccess = function(event){
        const bdd = event.target.result;
        const transaction = bdd.transaction("users", "readwrite")
        const store = transaction.objectStore("users")
        
        // verifie si l'email existe deja dans la bdd
        const email_index = store.index("email")
        const request = email_index.get(email);

        request.onsuccess = function() {
            if (request.result){
                console.error ("user already exists with this email")
                return;
            }

            store.add({
                username: username,
                email: email,
                password: password
            }).onsuccess = function() {
                console.log("user register successfully !")
                console.log("Registration:", username, email, password);
            }
        }
    };

    bdd_promise.onerror = function(event) {
        console.error("Database error: " + event.target.errorCode);
    }
};

function loginUser(email, password) {
    const bdd_promise = window.indexedDB.open("userDatabse", 1);

    bdd_promise.onsuccess = function(event){
        const bdd = event.target.result;
        const transaction = bdd.transaction("users", "readonly")
        const store = transaction.objectStore("users")
        const emailIndex = store.index("email");

        const request = email_index.get(email);

        request.onsuccess = function(){
            const user = request.result;
            if (user && user.password === password) {
                console.log("user logged in successfully!");
            } else {
                console.error("Invalid email or password!");
            }
        }
    };

    bdd_promise.onerror = function(event){
        console.error("Database error: " + event.target.errorCode);
    }
}