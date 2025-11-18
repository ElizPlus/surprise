class SecretPage {
    constructor() {
        this.correctPassword = "210625"; // Новый формат: ддммгг
        this.passwordSection = document.getElementById('password-section');
        this.secretMessage = document.getElementById('secret-message');
        this.passwordInput = document.getElementById('password-input');
        this.errorMessage = document.getElementById('error-message');
        this.passwordBtn = document.getElementById('password-btn');
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Обработчик нажатия Enter в поле пароля
        this.passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkPassword();
            }
        });

        // Обработчик клика на кнопку
        this.passwordBtn.addEventListener('click', () => {
            this.checkPassword();
        });

        // Автофокус на поле ввода
        this.passwordInput.focus();
    }

    checkPassword() {
        const enteredPassword = this.passwordInput.value.trim();
        
        if (enteredPassword === this.correctPassword) {
            this.showSecretMessage();
        } else {
            this.showError();
        }
    }

    showSecretMessage() {
        // Анимация скрытия поля ввода
        this.passwordSection.style.opacity = '0';
        this.passwordSection.style.transform = 'translateY(-20px)';
        this.passwordSection.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            this.passwordSection.style.display = 'none';
            this.secretMessage.classList.remove('hidden');
            
            // Анимация появления секретного сообщения
            setTimeout(() => {
                this.secretMessage.style.opacity = '0';
                this.secretMessage.style.transform = 'translateY(20px)';
                this.secretMessage.style.display = 'block';
                
                setTimeout(() => {
                    this.secretMessage.style.opacity = '1';
                    this.secretMessage.style.transform = 'translateY(0)';
                    this.secretMessage.style.transition = 'all 0.8s ease';
                }, 50);
            }, 100);
        }, 500);
    }

    showError() {
        // Анимация ошибки
        this.passwordInput.style.animation = 'shake 0.5s ease-in-out';
        this.errorMessage.textContent = 'А давай ещё раз попробуешь? 😉';
        this.errorMessage.style.opacity = '1';
        
        // Очищаем поле ввода
        this.passwordInput.value = '';
        this.passwordInput.focus();
        
        // Убираем анимацию тряски
        setTimeout(() => {
            this.passwordInput.style.animation = '';
        }, 500);
    }
}

// Добавляем CSS анимацию для тряски при ошибке
const shakeAnimation = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}

.hidden {
    display: none !important;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = shakeAnimation;
document.head.appendChild(styleSheet);

// Инициализируем секретную страницу когда DOM загружен
document.addEventListener('DOMContentLoaded', function() {
    new SecretPage();
});

// Также добавляем глобальную функцию для обратной совместимости
function checkPassword() {
    const secretPage = new SecretPage();
    secretPage.checkPassword();
}