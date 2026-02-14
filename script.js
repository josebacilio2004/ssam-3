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
    button.addEventListener('click', function (e) {
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
envelope.addEventListener('click', function () {
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
continueBtn.addEventListener('click', function () {
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
    item.addEventListener('mouseenter', function (e) {
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
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Easter egg: clic en la foto de pareja
const couplePhoto = document.getElementById('couple-photo');
if (couplePhoto) {
    couplePhoto.addEventListener('click', function (e) {
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

// ===== SISTEMA DE CAJAS DE REGALO CON DESBLOQUEO POR HORA =====

function checkAndUnlockActivities() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    console.log(`Hora actual: ${currentHour}:${currentMinute}`);

    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        const unlockHour = parseInt(item.getAttribute('data-unlock-hour') || '0');
        const unlockMinute = parseInt(item.getAttribute('data-unlock-minute') || '0');

        // Convertir todo a minutos para comparación fácil
        const unlockTotalMinutes = (unlockHour * 60) + unlockMinute;
        const currentTotalMinutes = (currentHour * 60) + currentMinute;

        const isUnlocked = currentTotalMinutes >= unlockTotalMinutes;
        const isOpened = item.classList.contains('opened');

        console.log(`Actividad: ${item.getAttribute('data-time')}, Desbloqueo: ${unlockHour}:${unlockMinute}, Desbloqueado: ${isUnlocked}, Abierto: ${isOpened}`);

        if (isUnlocked && !isOpened) {
            // Hacer la caja clickeable
            if (!item.classList.contains('unlocked')) {
                item.classList.remove('locked');
                item.classList.add('unlocked');

                // Mostrar notificación de que ahora puede abrir
                showUnlockNotification(item.getAttribute('data-time'));
            }
        } else if (!isUnlocked && !isOpened) {
            // Mantener bloqueado
            if (!item.classList.contains('locked')) {
                item.classList.add('locked');
                item.classList.remove('unlocked');
            }
        }
    });
}

function showUnlockNotification(activityTime) {
    const notification = document.createElement('div');
    notification.textContent = `🎁 ¡Regalo disponible para ${activityTime}!`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.background = 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)';
    notification.style.color = 'white';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '50px';
    notification.style.fontSize = '1.1rem';
    notification.style.fontWeight = 'bold';
    notification.style.boxShadow = '0 4px 20px rgba(251, 191, 36, 0.5)';
    notification.style.zIndex = '10001';
    notification.style.animation = 'slideDown 0.5s ease-out';

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transition = 'all 0.5s ease-out';
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

function openGiftBox(item) {
    // Marcar como abierto
    item.classList.add('opened');
    item.classList.remove('unlocked');

    const giftContainer = item.querySelector('.gift-box-container');
    const content = item.querySelector('.timeline-content');

    // Crear explosión de confeti de regalo
    const rect = giftContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    createGiftConfetti(centerX, centerY);

    // Esperar a que la animación de apertura termine antes de mostrar contenido
    setTimeout(() => {
        // Ocultar la caja de regalo
        giftContainer.style.opacity = '0';
        giftContainer.style.transform = 'scale(0)';
        giftContainer.style.transition = 'all 0.5s ease';

        setTimeout(() => {
            giftContainer.style.display = 'none';

            // Mostrar el contenido con animación
            content.style.display = 'block';
            content.style.opacity = '0';
            content.style.transform = 'scale(0.8)';

            setTimeout(() => {
                content.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                content.style.opacity = '1';
                content.style.transform = 'scale(1)';
            }, 50);
        }, 500);
    }, 800);

    // Sonido de celebración (notificación visual)
    const celebration = document.createElement('div');
    celebration.textContent = '🎉 ¡Sorpresa! 🎉';
    celebration.style.position = 'fixed';
    celebration.style.top = '50%';
    celebration.style.left = '50%';
    celebration.style.transform = 'translate(-50%, -50%)';
    celebration.style.fontSize = '3rem';
    celebration.style.fontWeight = 'bold';
    celebration.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
    celebration.style.WebkitBackgroundClip = 'text';
    celebration.style.backgroundClip = 'text';
    celebration.style.WebkitTextFillColor = 'transparent';
    celebration.style.zIndex = '10002';
    celebration.style.animation = 'celebrationPop 1.5s ease-out forwards';
    celebration.style.pointerEvents = 'none';
    celebration.style.textShadow = '0 0 20px rgba(240, 147, 251, 0.5)';

    document.body.appendChild(celebration);

    setTimeout(() => {
        celebration.remove();
    }, 1500);
}

// Agregar estilos de animación celebration
const celebrationStyle = document.createElement('style');
celebrationStyle.textContent = `
    @keyframes celebrationPop {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(celebrationStyle);

function createGiftConfetti(x, y) {
    const confettiItems = ['🎊', '🎉', '✨', '⭐', '💖', '💝', '💕', '🌟', '💫', '🎈'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.textContent = confettiItems[Math.floor(Math.random() * confettiItems.length)];
            confetti.style.position = 'fixed';
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '10000';

            const angle = (Math.PI * 2 * i) / 30;
            const distance = Math.random() * 150 + 100;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.style.transition = 'all 1.5s ease-out';
                confetti.style.left = endX + 'px';
                confetti.style.top = endY + 'px';
                confetti.style.opacity = '0';
                confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
            }, 10);

            setTimeout(() => {
                confetti.remove();
            }, 1600);
        }, i * 30);
    }
}

// Agregar event listeners a las cajas de regalo
function setupGiftBoxListeners() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        const giftContainer = item.querySelector('.gift-box-container');

        if (giftContainer) {
            giftContainer.addEventListener('click', function (e) {
                // Solo abrir si está desbloqueado y no ha sido abierto
                if (item.classList.contains('unlocked') && !item.classList.contains('opened')) {
                    openGiftBox(item);
                } else if (item.classList.contains('locked')) {
                    // Efecto de shake si está bloqueado
                    this.style.animation = 'none';
                    setTimeout(() => {
                        this.style.animation = 'shake 0.5s ease-in-out';
                    }, 10);

                    // Mostrar mensaje temporal
                    const hint = document.createElement('div');
                    const unlockHour = item.getAttribute('data-unlock-hour');
                    const unlockMinute = item.getAttribute('data-unlock-minute') || '00';
                    hint.textContent = `🔒 Espera hasta las ${unlockHour}:${unlockMinute.padStart(2, '0')}`;
                    hint.style.position = 'fixed';
                    hint.style.left = e.clientX + 'px';
                    hint.style.top = (e.clientY - 50) + 'px';
                    hint.style.background = 'rgba(148, 163, 184, 0.9)';
                    hint.style.color = 'white';
                    hint.style.padding = '0.5rem 1rem';
                    hint.style.borderRadius = '20px';
                    hint.style.fontSize = '0.9rem';
                    hint.style.fontWeight = 'bold';
                    hint.style.zIndex = '10001';
                    hint.style.pointerEvents = 'none';
                    hint.style.animation = 'floatUp 2s ease-out forwards';

                    document.body.appendChild(hint);

                    setTimeout(() => {
                        hint.remove();
                    }, 2000);
                }
            });
        }
    });
}

// Agregar animación shake
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(shakeStyle);

// Agregar animación de slideDown
const slideDownStyle = document.createElement('style');
slideDownStyle.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
`;
document.head.appendChild(slideDownStyle);

// Ejecutar al cargar la pantalla de actividades
const originalContinueBtn = continueBtn;
continueBtn.addEventListener('click', function () {
    letterScreen.classList.remove('active');
    activitiesScreen.classList.add('active');

    // Efecto de confeti
    createConfetti();

    // Configurar listeners de cajas de regalo
    setTimeout(() => {
        setupGiftBoxListeners();
        checkAndUnlockActivities();
    }, 500);

    // Actualizar cada minuto
    setInterval(checkAndUnlockActivities, 60000);
});

// También verificar si ya estamos en la pantalla de actividades (por si se recarga)
if (activitiesScreen.classList.contains('active')) {
    setupGiftBoxListeners();
    checkAndUnlockActivities();
    setInterval(checkAndUnlockActivities, 60000);
}
