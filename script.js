// Elementos del DOM
const questionScreen = document.getElementById('question-screen');
const letterScreen = document.getElementById('letter-screen');
const activitiesScreen = document.getElementById('activities-screen');
const answerButtons = document.querySelectorAll('.answer-btn');
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');
const continueBtn = document.getElementById('continue-btn');
const heartsContainer = document.getElementById('hearts-container');

// Emojis de corazones para efectos
const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💘', '💞'];

// Función para crear corazones flotantes en click
function createHearts(event) {
    const numberOfHearts = 15;
    
    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        
        // Posición basada en el click
        const x = event.clientX + (Math.random() - 0.5) * 100;
        const y = event.clientY + (Math.random() - 0.5) * 100;
        
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        
        heartsContainer.appendChild(heart);
        
        // Eliminar después de la animación
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
}

// Función para crear corazones de fondo
function createBackgroundHearts() {
    const heartsBg = document.getElementById('hearts-bg');
    const numberOfHearts = 20;
    
    for (let i = 0; i < numberOfHearts; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        heart.style.opacity = '0.3';
        heart.style.animation = `float ${Math.random() * 3 + 3}s ease-in-out infinite`;
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        heartsBg.appendChild(heart);
    }
}

// Animación de float para corazones de fondo
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(10deg);
        }
    }
`;
document.head.appendChild(style);

// Event listeners para los botones de respuesta
answerButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Crear efecto de corazones
        createHearts(e);
        
        // Esperar un poco antes de cambiar de pantalla
        setTimeout(() => {
            questionScreen.classList.remove('active');
            letterScreen.classList.add('active');
            
            // Mensaje de instrucción
            setTimeout(() => {
                alert('¡Haz clic en el sobre para abrir tu carta! 💌');
            }, 500);
        }, 1500);
    });
});

// Event listener para abrir el sobre
envelope.addEventListener('click', function() {
    envelope.classList.add('open');
    
    // Mostrar la carta después de que se abra el sobre
    setTimeout(() => {
        letter.classList.add('visible');
        
        // Mostrar botón de continuar
        setTimeout(() => {
            continueBtn.classList.add('visible');
        }, 800);
    }, 600);
});

// Event listener para el botón de continuar
continueBtn.addEventListener('click', function() {
    letterScreen.classList.remove('active');
    activitiesScreen.classList.add('active');
    
    // Efecto de confeti de corazones
    createConfetti();
});

// Función para crear efecto de confeti
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = '-50px';
            heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 50);
    }
}

// Event listener para hover interactivo en actividades
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    item.addEventListener('mouseenter', function(e) {
        // Pequeño efecto de corazón
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '💕';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = '1.5rem';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 3000);
    });
});

// Inicializar corazones de fondo
createBackgroundHearts();

// Prevenir clic derecho para mantener la experiencia
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Easter egg: clic en la foto de pareja
const couplePhoto = document.getElementById('couple-photo');
if (couplePhoto) {
    couplePhoto.addEventListener('click', function(e) {
        e.stopPropagation();
        createHearts(e);
        
        const messages = [
            '¡Qué linda pareja! 💕',
            '¡Los amo! ❤️',
            '¡Perfectos juntos! 💖',
            '¡Hermosos! 💝'
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // Crear elemento de mensaje temporal
        const messageEl = document.createElement('div');
        messageEl.textContent = randomMessage;
        messageEl.style.position = 'fixed';
        messageEl.style.left = e.clientX + 'px';
        messageEl.style.top = (e.clientY - 50) + 'px';
        messageEl.style.fontSize = '1.5rem';
        messageEl.style.fontFamily = 'Dancing Script, cursive';
        messageEl.style.color = '#c44569';
        messageEl.style.fontWeight = 'bold';
        messageEl.style.pointerEvents = 'none';
        messageEl.style.zIndex = '10000';
        messageEl.style.animation = 'floatUp 2s ease-out forwards';
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.remove();
        }, 2000);
    });
}
