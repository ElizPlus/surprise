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
                this.redirectToMemories();
            }, 1000);
        } else {
            setTimeout(() => {
                this.currentIndex++;
                this.showNumber(this.numbers[this.currentIndex]);
            }, 1000);
        }
    }

    redirectToMemories() {
        // Добавляем анимацию исчезновения перед переходом
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            window.location.href = 'memories.html';
        }, 500);
    }
}

// Запускаем таймер когда страница загрузится
document.addEventListener('DOMContentLoaded', function() {
    new CountdownTimer();
});