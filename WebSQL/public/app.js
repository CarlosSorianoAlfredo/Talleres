// Función para cargar personas desde el servidor
async function cargarPersonas() {//  permiten hacer solicitudes HTTP usando fetch de forma más clara y secuencial:


    // Realiza una solicitud GET para obtener todas las personas desde la API
    const response = await fetch("/api/personas");
    // Convierte la respuesta en formato JSON
    const personas = await response.json();
    // Obtiene la lista en el DOM donde se mostrarán las personas
    const lista = document.getElementById("personas");
    // Limpia el contenido actual de la lista para evitar duplicados
    lista.innerHTML = "";

    // Recorre cada persona y crea un elemento <li> para mostrar su información
    personas.forEach(persona => {
        const item = document.createElement("li");  // Crea un nuevo elemento <li>
        item.textContent = `${persona.nombre} (${persona.edad} años)`;  // Agrega el texto con nombre y edad
        lista.appendChild(item);  // Añade el elemento a la lista en el DOM
    });
}

// Manejar el envío del formulario para agregar nuevas personas
// Asocia el evento 'submit' al formulario con ID 'personaForm'
document.getElementById("personaForm").addEventListener("submit", async (event) => {
    event.preventDefault();  // Previene el comportamiento predeterminado del formulario
    const formData = new FormData(event.target);  // Extrae los datos del formulario
    const data = new URLSearchParams(formData);  // Convierte los datos a un formato URL para enviar
    
    // Envía los datos al api usando una solicitud POST
    await fetch("/api/personas", {
        method: "POST",
        body: data
    });
    
    cargarPersonas();  // Actualiza la lista después de agregar la persona
    event.target.reset();  // Limpia el formulario para futuros envíos
});

// Cargar personas al cargar la página por primera vez
cargarPersonas();
