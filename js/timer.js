class CountdownTimer {
    constructor() {
        this.countdownElement = document.getElementById('countdown');
        this.numbers = [3, 2, 1, 0];
        this.currentIndex = 0;
        this.startTimer();
    }

    startTimer() {
        this.showNumber(this.numbers[this.currentIndex]);
    }

    showNumber(number) {
        this.countdownElement.innerHTML = `
            <span class="countdown-number">${number}</span>
        `;

        if (number === 0) {
            setTimeout(() => {
                this.launchFinalEffects();
                this.redirectToMemories();
            }, 1000);
        } else {
            setTimeout(() => {
                this.currentIndex++;
                this.showNumber(this.numbers[this.currentIndex]);
            }, 1000);
        }
    }

    launchFinalEffects() {
        // Запускаем конфетти
        if (confettiEffect) {
            confettiEffect.launchConfetti();
        }
        
        // Добавляем дополнительные эффекты
        this.createExplosionEffect();
        
        // Воспроизводим звук хлопка (если нужно)
        this.playPopSound();
    }

    createExplosionEffect() {
        const explosion = document.createElement('div');
        explosion.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, #ff6b93, #ff8e53, transparent);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: explosion 0.5s ease-out forwards;
            z-index: 9999;
            pointer-events: none;
        `;
        
        document.body.appendChild(explosion);
        
        setTimeout(() => {
            if (explosion.parentNode) {
                explosion.parentNode.removeChild(explosion);
            }
        }, 500);
    }

    playPopSound() {
        // Можно добавить звук хлопка, если есть файл
        // const popSound = new Audio('music/pop.mp3');
        // popSound.volume = 0.3;
        // popSound.play().catch(e => console.log('Sound play failed:', e));
    }

    redirectToMemories() {
        // Добавляем анимацию исчезновения перед переходом
        document.body.style.opacity = '0.7';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            window.location.href = 'memories.html';
        }, 2000); // Даём время насладиться конфетти
    }
}

// Добавляем CSS для взрыва
const explosionStyles = `
@keyframes explosion {
    0% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 1;
    }
    50% {
        transform: translate(-50%, -50%) scale(2);
        opacity: 0.7;
    }
    100% {
        transform: translate(-50%, -50%) scale(3);
        opacity: 0;
    }
}
`;

const explosionStyleSheet = document.createElement('style');
explosionStyleSheet.textContent = explosionStyles;
document.head.appendChild(explosionStyleSheet);

// Запускаем таймер когда страница загрузится
document.addEventListener('DOMContentLoaded', function() {
    new CountdownTimer();
});