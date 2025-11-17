class ConfettiEffect {
    constructor() {
        this.container = document.getElementById('confettiContainer');
        this.colors = ['#ff6b93', '#ff8e53', '#ffd166', '#06d6a0', '#118ab2', '#ef476f'];
        this.createHearts();
    }

    createHearts() {
        // Создаём плавающие сердечки
        for (let i = 0; i < 15; i++) {
            this.createFloatingHeart();
        }
    }

    createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = this.getRandomHeart();
        heart.style.cssText = `
            position: fixed;
            font-size: ${this.random(20, 35)}px;
            opacity: ${this.random(0.3, 0.8)};
            top: -50px;
            left: ${this.random(0, 100)}%;
            animation: floatHeart ${this.random(15, 25)}s linear infinite;
            animation-delay: ${this.random(0, 5)}s;
            z-index: 9999;
            pointer-events: none;
        `;
        
        document.getElementById('heartsBackground').appendChild(heart);
    }

    getRandomHeart() {
        const hearts = ['❤️', '💖', '💝', '💕', '💗', '💓', '💞', '💘'];
        return hearts[Math.floor(Math.random() * hearts.length)];
    }

    launchConfetti() {
        for (let i = 0; i < 150; i++) {
            this.createConfettiPiece();
        }
    }

    createConfettiPiece() {
        const confetti = document.createElement('div');
        const isHeart = Math.random() > 0.7;
        
        if (isHeart) {
            confetti.innerHTML = this.getRandomHeart();
            confetti.style.fontSize = this.random(15, 25) + 'px';
        } else {
            confetti.style.width = this.random(10, 20) + 'px';
            confetti.style.height = this.random(10, 20) + 'px';
            confetti.style.backgroundColor = this.colors[Math.floor(Math.random() * this.colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
        }

        confetti.style.cssText += `
            position: fixed;
            top: -50px;
            left: ${this.random(0, 100)}%;
            opacity: ${this.random(0.7, 1)};
            animation: confettiFall ${this.random(3, 8)}s linear forwards;
            z-index: 10000;
            pointer-events: none;
            transform-origin: center;
        `;

        this.container.appendChild(confetti);

        // Удаляем конфетти после анимации
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 8000);
    }

    random(min, max) {
        return Math.random() * (max - min) + min;
    }
}

// Добавляем CSS анимации для конфетти
const confettiStyles = `
@keyframes floatHeart {
    0% {
        transform: translateY(0) translateX(0) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
        opacity: 0;
    }
}

@keyframes confettiFall {
    0% {
        transform: translateY(0) rotate(0deg) scale(1);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(${Math.random() * 720 - 360}deg) scale(0);
        opacity: 0;
    }
}

.confetti-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10000;
}
`;

// Добавляем стили в документ
const styleSheet = document.createElement('style');
styleSheet.textContent = confettiStyles;
document.head.appendChild(styleSheet);

// Инициализируем конфетти
let confettiEffect;

document.addEventListener('DOMContentLoaded', function() {
    confettiEffect = new ConfettiEffect();
});