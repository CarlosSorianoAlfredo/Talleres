function saveUserName(){
    const username = document.getElementById('username').value;
    sessionStorage.setItem('username', username);
    alert('Nombre de usuario guardado en SesionStorage');
}

function loadUsername(){
    const storedUsername = sessionStorage.getItem('username');
    const usernameDisplay = document.getElementById('username-display');

    if(storedUsername){
        usernameDisplay.textContent = `Nombre de usuario almacenado: ${storedUsername}`; 
    }else{
        usernameDisplay.textContent = `No hay nombre de usuario almacenado en SesionStorage`;
    }
}