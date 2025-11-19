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

        // Добавляем метки значимых мест
        this.addMemoryMarkers();
    }

    addMemoryMarkers() {
        const memories = [
            {
                coords: [54.978176, 82.917369],
                title: "Cafe",
                description: "The day of our meeting",
                photo: "images/photos/cafe.jpg",
                hasPhoto: true 
            },
            {
                coords: [55.006166, 82.939746],
                title: "Ferris wheel",
                description: "Our evening walks",
                photo: "images/photos/coleso.jpg",
                hasPhoto: true
            },
            {
                coords: [55.030214, 82.917245],
                title: "Fry street food pub",
                description: "Our fun versions of walking",
                photo: "images/photos/fry.jpg",
                hasPhoto: true
            },
            {
                coords: [54.987163, 82.909922],
                title: "KFC",
                description: "The height of summer",
                photo: "images/photos/kfc.jpg",
                hasPhoto: true
            },
            {
                coords: [55.030812, 82.916918],
                title: "Square 'Wings of Siberia'",
                description: "Our fun versions of walking",
                photo: "images/photos/squar.jpg",
                hasPhoto: true
            },
            {
                coords: [54.988332, 82.903331],
                title: "Pavilion",
                description: "Our cute photo for the frame",
                photo: "images/photos/nstu.jpg",
                hasPhoto: true
            },
            {
                coords: [54.972374, 82.903267],
                title: "Street in the evening",
                description: "Our fun versions of walking",
                photo: "images/photos/kb.jpg",
                hasPhoto: true
            },
            {
                coords: [54.997563, 82.884696],
                title: "Railway",
                description: "Our amazing walk",
                photo: "images/photos/jd.jpg",
                hasPhoto: true
            },
            {
                coords: [54.983947, 82.89439],
                title: "Sushi",
                description: "Our first date",
                photo: "images/photos/date.jpg",
                hasPhoto: true
            },
            {
                coords: [54.980355, 82.895672],
                title: "Shopping malls",
                description: "The day before...",
                photo: "images/photos/we.jpg",
                hasPhoto: true
            },
            {
                coords: [54.990044, 82.89132],
                title: "Apartment",
                description: "The first time in your new home",
                photo: "images/photos/app.jpg",
                hasPhoto: true
            }
        ];

        memories.forEach((memory, index) => {
            if (memory.hasPhoto) { // добавляем только точки с фото
                this.addMarker(memory, index + 1);
            }
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
                maxWidth: 400,
                minWidth: 300
            });

        this.markers.push(marker);
    }

    createPopupContent(memory) {
        // Проверяем, есть ли фото
        const photoContent = memory.hasPhoto ? 
            `<div class="memory-photo-container">
                <img src="${memory.photo}" alt="${memory.title}" class="memory-photo" onerror="this.style.display='none'">
            </div>` :
            `<div class="memory-photo-placeholder">
                📸 Фото скоро появится!
            </div>`;

        return `
            <div class="memory-popup-content">
                ${photoContent}
                <div class="memory-info">
                    <h3>${memory.title}</h3>
                    <p class="memory-description">${memory.description}</p>
                </div>
            </div>
        `;
    }

    // Метод для добавления новой метки
    addNewMemory(coords, title, description, photo) {
        const newMemory = {
            coords,
            title,
            description,
            photo,
            hasPhoto: true
        };
        this.addMarker(newMemory, this.markers.length + 1);
    }
}

// Инициализируем карту когда страница загрузится
document.addEventListener('DOMContentLoaded', function() {
    new MemoryMap();
});