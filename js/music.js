class BackgroundMusic {
    constructor() {
        this.audio = document.getElementById('background-music');
        this.isPlaying = false;
        this.setupMusic();
    }

    setupMusic() {
        // Попытка включить музыку автоматически (может не работать в некоторых браузерах)
        this.audio.volume = 0.3; // Устанавливаем комфортную громкость
        
        // Пытаемся включить музыку при первом взаимодействии пользователя
        document.addEventListener('click', this.playOnFirstInteraction.bind(this), { once: true });
        
        // Создаем кнопку управления музыкой
        this.createMusicControl();
    }

    playOnFirstInteraction() {
        if (!this.isPlaying) {
            this.audio.play().then(() => {
                this.isPlaying = true;
                this.updateMusicButton();
            }).catch(error => {
                console.log('Автовоспроизведение заблокировано:', error);
            });
        }
    }

    createMusicControl() {
        const musicControl = document.createElement('button');
        musicControl.innerHTML = '🔇';
        musicControl.className = 'music-control';
        musicControl.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(255,255,255,0.9);
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            transition: all 0.3s ease;
        `;

        musicControl.addEventListener('click', this.toggleMusic.bind(this));
        document.body.appendChild(musicControl);
        this.musicControl = musicControl;
    }

    toggleMusic() {
        if (this.isPlaying) {
            this.audio.pause();
            this.isPlaying = false;
            this.musicControl.innerHTML = '🔇';
        } else {
            this.audio.play().then(() => {
                this.isPlaying = true;
                this.musicControl.innerHTML = '🔊';
            }).catch(error => {
                console.log('Ошибка воспроизведения:', error);
                this.musicControl.innerHTML = '❌';
            });
        }
        
        // Анимация кнопки
        this.musicControl.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.musicControl.style.transform = 'scale(1)';
        }, 200);
    }

    updateMusicButton() {
        if (this.musicControl) {
            this.musicControl.innerHTML = this.isPlaying ? '🔊' : '🔇';
        }
    }
}

// Инициализируем управление музыкой
document.addEventListener('DOMContentLoaded', function() {
    new BackgroundMusic();
});