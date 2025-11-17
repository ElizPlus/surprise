class MemoryMap {
    constructor() {
        this.map = null;
        this.markers = [];
        this.initMap();
    }

    initMap() {
        // Инициализируем карту с центром в Новосибирске
        this.map = L.map('map').setView([55.030199, 82.920430], 12);

        // Добавляем слой карты (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(this.map);

        // Добавляем метки значимых мест Новосибирска
        this.addMemoryMarkers();
    }

    addMemoryMarkers() {
        const memories = [
            {
                coords: [55.030199, 82.920430],
                title: "Центр Новосибирска",
                description: "Сердце нашего города",
                date: "Наше первое свидание",
                photo: "images/photos/center.jpg"
            },
            {
                coords: [55.018184, 82.933952],
                title: "Набережная Оби",
                description: "Наши вечерние прогулки",
                date: "Многие вечера",
                photo: "images/photos/river.jpg"
            },
            {
                coords: [55.040841, 82.895731],
                title: "ПКиО им. Кирова",
                description: "Место наших летних встреч",
                date: "Лето 2024",
                photo: "images/photos/park.jpg"
            },
            {
                coords: [55.059563, 82.910324],
                title: "Новосибирский зоопарк",
                description: "Наше первое совместное посещение зоопарка",
                date: "Весна 2024",
                photo: "images/photos/zoo.jpg"
            },
            {
                coords: [55.028611, 82.921389],
                title: "Театр Оперы и Балета",
                description: "Первый культурный вечер вместе",
                date: "Осень 2023",
                photo: "images/photos/theater.jpg"
            },
            {
                coords: [55.006111, 82.936667],
                title: "Академгородок",
                description: "Наши научные прогулки",
                date: "Разные дни",
                photo: "images/photos/academy.jpg"
            },
            {
                coords: [55.016667, 82.950000],
                title: "ТРЦ ",
                description: "Наши киновечера и шоппинг",
                date: "Частые визиты",
                photo: "images/photos/mall.jpg"
            }
        ];

        memories.forEach((memory, index) => {
            this.addMarker(memory, index + 1);
        });
    }

    addMarker(memory, number) {
        // Создаем кастомную иконку для метки
        const markerIcon = L.divIcon({
            className: 'memory-marker',
            html: `<span>${number}</span>`,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });

        // Создаем метку
        const marker = L.marker(memory.coords, { icon: markerIcon })
            .addTo(this.map)
            .bindPopup(this.createPopupContent(memory), {
                className: 'memory-popup',
                maxWidth: 300
            });

        this.markers.push(marker);
    }

    createPopupContent(memory) {
        return `
            <div class="memory-popup-content">
                <div class="memory-photo-placeholder">
                    📸 ${memory.photo.split('/').pop()}
                </div>
                <h3>${memory.title}</h3>
                <div class="memory-date">${memory.date}</div>
                <p class="memory-description">${memory.description}</p>
                <small>Загрузи своё фото для этого места!</small>
            </div>
        `;
    }

    // Метод для добавления новой метки (можно использовать позже)
    addNewMemory(coords, title, description, date, photo) {
        const newMemory = {
            coords,
            title,
            description,
            date,
            photo
        };
        this.addMarker(newMemory, this.markers.length + 1);
    }
}

// Инициализируем карту когда страница загрузится
document.addEventListener('DOMContentLoaded', function() {
    new MemoryMap();
    
    // Добавляем обработчики для галереи фото
    initPhotoGallery();
});

function initPhotoGallery() {
    const photoPlaceholders = document.querySelectorAll('.photo-placeholder');
    
    photoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const photoId = this.getAttribute('data-id');
            alert(`Место для фото ${photoId}! Загрузи своё фото в папку images/photos/ и обнови страницу.`);
        });
        
        // Добавляем анимацию при наведении
        placeholder.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(45deg, #ff6b93, #ff8e53)';
            this.style.color = 'white';
            this.style.transform = 'scale(1.05)';
        });
        
        placeholder.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255,255,255,0.9)';
            this.style.color = '#ff6b93';
            this.style.transform = 'scale(1)';
        });
    });
}