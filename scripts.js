// Validación del formulario
const form = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');

    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevenir el comportamiento predeterminado del formulario

        const formData = new FormData(form);

        // Enviar los datos del formulario utilizando Fetch API
        fetch(form.action, {
            method: form.method,
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Si la respuesta es exitosa, mostrar mensaje de éxito
                responseMessage.textContent = '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.';
                responseMessage.style.color = 'green';
                responseMessage.style.display = 'block';
                form.reset();  // Limpiar el formulario
            } else {
                // Si hubo un error, mostrar mensaje de error
                responseMessage.textContent = 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.';
                responseMessage.style.color = 'red';
                responseMessage.style.display = 'block';
            }
        })
        .catch(error => {
            // Manejar errores de la solicitud
            responseMessage.textContent = 'Hubo un error de conexión. Intenta de nuevo más tarde.';
            responseMessage.style.color = 'red';
            responseMessage.style.display = 'block';
        });
    });

// Carrusel Principal
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("carousel-main");
    const images = carousel.querySelectorAll("img");
    const prevButton = document.getElementById("prev-main");
    const nextButton = document.getElementById("next-main");
    let currentIndex = 0;

    // Función para mostrar la imagen actual
    function showImage(index) {
        images.forEach((img, i) => {
            if (i === index) {
                img.style.opacity = "1"; // Muestra la imagen activa
                img.style.zIndex = "2"; // Trae la imagen activa al frente
            } else {
                img.style.opacity = "0"; // Oculta las imágenes inactivas
                img.style.zIndex = "1"; // Envía las imágenes inactivas al fondo
            }
        });
    }

    // Función para avanzar a la siguiente imagen
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length; // Avanza al siguiente índice
        showImage(currentIndex);
    }

    // Función para retroceder a la imagen anterior
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Retrocede al índice anterior
        showImage(currentIndex);
    }

    // Eventos para los botones
    nextButton.addEventListener("click", () => {
        nextImage();
        resetInterval(); // Reinicia el temporizador
    });

    prevButton.addEventListener("click", () => {
        prevImage();
        resetInterval(); // Reinicia el temporizador
    });

    // Deslizamiento automático
    let autoSlide = setInterval(nextImage, 3000); // Cambia cada 3 segundos
    function resetInterval() {
        clearInterval(autoSlide); // Borra el temporizador actual
        autoSlide = setInterval(nextImage, 3000); // Reinicia el temporizador
    }

    // Mostrar la primera imagen al cargar la página
    showImage(currentIndex);
});
        
// Carrusel de Clientes

document.addEventListener('DOMContentLoaded', function() {
    // Obtener todas las imágenes del carrusel
    const imagesClientes = document.querySelectorAll('#carousel-clientes .carousel-inner img');
    
    // Convertir el NodeList en un array para poder reordenarlo
    const imagesArray = Array.from(imagesClientes);
    
    // Función para mezclar las imágenes aleatoriamente
    function shuffleImages() {
        for (let i = imagesArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Obtener índice aleatorio
            [imagesArray[i], imagesArray[j]] = [imagesArray[j], imagesArray[i]]; // Intercambiar
        }

        // Vuelve a añadir las imágenes en el orden aleatorio
        const carouselInner = document.querySelector('#carousel-clientes .carousel-inner');
        carouselInner.innerHTML = ''; // Limpiar el contenedor actual
        imagesArray.forEach(image => carouselInner.appendChild(image)); // Añadir imágenes aleatorias
    }

    // Llamar a la función para mezclar las imágenes al cargar la página
    shuffleImages();
});

let currentIndexClientes = 0; // Índice de la imagen actual
const imagesClientes = document.querySelectorAll('#carousel-clientes .carousel-inner img'); // Todas las imágenes del carrusel
const totalImagesClientes = imagesClientes.length; // Total de imágenes

// Función para cambiar la imagen activa
function changeImageClientes() {
    // Solo cambia si hay más imágenes para mostrar
    if (currentIndexClientes < totalImagesClientes - 1) {
        currentIndexClientes++;
    } else {
        return; // Si ya está en la última imagen, no hace nada
    }

    // Desplazar el carrusel
    const newTransformValue = -currentIndexClientes * 100; // Desplazamos por el 100% del ancho de la imagen
    document.querySelector('#carousel-clientes .carousel-inner').style.transform = `translateX(${newTransformValue}%)`;
}

// Configurar los botones de navegación
document.getElementById('prev-clientes').addEventListener('click', () => {
    // Cambiar al índice anterior
    if (currentIndexClientes > 0) {
        currentIndexClientes--;
        const newTransformValue = -currentIndexClientes * 100;
        document.querySelector('#carousel-clientes .carousel-inner').style.transform = `translateX(${newTransformValue}%)`;
    }
});

document.getElementById('next-clientes').addEventListener('click', () => {
    changeImageClientes();
});


// Seleccionar todos los botones con la clase 'load-content-btn' para las Cards
const buttons = document.querySelectorAll('.load-content-btn');
const contentContainer = document.getElementById('content-container');

// Agregar un evento de clic a cada botón
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const file = button.getAttribute('data-file'); // Obtener el archivo del atributo data-file
        contentContainer.style.backgroundColor = "gainsboro"; // Un color específico
       
        // Verificar si el contenido actual ya está cargado
        if (contentContainer.getAttribute('data-loaded') === file) {
            // Si el contenido ya está cargado, ocultarlo y resetear el contenedor
            contentContainer.innerHTML = '';
            contentContainer.removeAttribute('data-loaded');
            contentContainer.style.backgroundColor = "whitesmoke"; // Un color específico
        } else {
            // Usar fetch() para cargar el contenido del archivo
            fetch(file)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error al cargar el archivo: ${response.status}`);
                    }
                    return response.text(); // Convertir la respuesta a texto
                })
                .then(html => {
                    // Insertar el contenido cargado en el contenedor y marcarlo como cargado
                    contentContainer.innerHTML = html;
                    contentContainer.setAttribute('data-loaded', file);
                })
                .catch(error => {
                    // Manejar errores y mostrar un mensaje en el contenedor
                    contentContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
                    contentContainer.removeAttribute('data-loaded');
                });
        }
    });
});

// Función para mostrar el modal de Requisitos
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("info-container");
    const btn = document.getElementById("instalacion");

    btn.addEventListener("click", function () {
        container.style.display = "block"; // Mostrar el contenedor
    });

    window.closeInfo = function () {
        container.style.display = "none"; // Ocultar el contenedor
    };
});

// Obtener el botón de "Iniciar sesión"
var btn = document.getElementById("loginBtn");

// Al hacer clic en el botón, abre una nueva ventana para iniciar sesión
btn.onclick = function () {
    // Obtener las dimensiones de la pantalla para centrar la ventana
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var windowWidth = 400;
    var windowHeight = 400;

    // Calcular las coordenadas para centrar la ventana
    var left = (screenWidth - windowWidth) / 2;
    var top = (screenHeight - windowHeight) / 2;

    // Abrir la ventana de inicio de sesión
    var loginWindow = window.open(
        'login.html', // URL de la ventana de login
        'LoginWindow', // Nombre de la ventana
        `width=${windowWidth},height=${windowHeight},top=${top},left=${left},resizable=no,scrollbars=no` // Configuración de la ventana pequeña y centrada
    );

    // Estilo de la ventana
    loginWindow.document.body.style.margin = "0";
    loginWindow.document.body.style.fontFamily = "Arial, sans-serif";
    loginWindow.document.body.style.backgroundColor = "#f4f4f4";
    loginWindow.document.body.style.color = "#333";

    // Estilo para el contenedor del formulario de inicio de sesión
    var loginFormContainer = loginWindow.document.createElement('div');
    loginFormContainer.style.width = "100%";
    loginFormContainer.style.height = "100%";
    loginFormContainer.style.display = "flex";
    loginFormContainer.style.flexDirection = "column";
    loginFormContainer.style.justifyContent = "center";
    loginFormContainer.style.alignItems = "center";
    loginFormContainer.style.textAlign = "center";

    // Estilo para el formulario
    var loginForm = loginWindow.document.createElement('form');
    loginForm.style.padding = "20px";
    loginForm.style.border = "1px solid #ccc";
    loginForm.style.borderRadius = "8px";
    loginForm.style.backgroundColor = "#fff";

    // Añadir elementos al formulario (ejemplo)
    var usernameLabel = loginWindow.document.createElement('label');
    usernameLabel.textContent = "Usuario:";
    var usernameInput = loginWindow.document.createElement('input');
    usernameInput.type = "text";
    usernameInput.style.margin = "10px 0";
    usernameInput.style.padding = "10px";
    usernameInput.style.width = "100%";

    var passwordLabel = loginWindow.document.createElement('label');
    passwordLabel.textContent = "Contraseña:";
    var passwordInput = loginWindow.document.createElement('input');
    passwordInput.type = "password";
    passwordInput.style.margin = "10px 0";
    passwordInput.style.padding = "10px";
    passwordInput.style.width = "100%";

    var submitButton = loginWindow.document.createElement('button');
    submitButton.textContent = "Iniciar sesión";
    submitButton.type = "submit";
    submitButton.style.padding = "10px 20px";
    submitButton.style.backgroundColor = "#4CAF50";
    submitButton.style.color = "#fff";
    submitButton.style.border = "none";
    submitButton.style.cursor = "pointer";
    submitButton.style.borderRadius = "5px";

    // Agregar los elementos al formulario
    loginForm.appendChild(usernameLabel);
    loginForm.appendChild(usernameInput);
    loginForm.appendChild(passwordLabel);
    loginForm.appendChild(passwordInput);
    loginForm.appendChild(submitButton);

    // Añadir el formulario al contenedor
    loginFormContainer.appendChild(loginForm);

    // Añadir el contenedor al body de la ventana
    loginWindow.document.body.appendChild(loginFormContainer);

    // Verificar si la ventana se cerró sin realizar acción
    var checkLogin = setInterval(function () {
        if (loginWindow.closed) {
            clearInterval(checkLogin); // Detener la comprobación
            // No hacer nada si la ventana se cerró sin realizar acciones
            console.log("La ventana de inicio de sesión fue cerrada.");
        }
    }, 1000); // Verificar cada 1 segundo si la ventana está cerrada
};


