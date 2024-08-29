document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.formTaskA1');
    const taskInput = document.querySelector('.taskInput');
    const ulList = document.querySelector('.ulListA1');
    const searchA = document.getElementById('search');
    const weatherDisplay = document.querySelector('.weatherDisplay');
    
    const apiKey = '9dc49cfba87bc03c693b9baf5992860a'; // API anahtarınızı buraya ekleyin
    const apiUrl = 'https://api.openweathermap.org/data/2.5/';

    // Hava durumu arama işlemi için event listener
    searchA.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Enter tuşuna basıldığında formun gönderilmesini engelle
            getWeatherData(searchA.value);
        }
    });

    // Hava durumu verilerini getirme fonksiyonu
    const getWeatherData = (city) => {
        const queryUrl = `${apiUrl}weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

        fetch(queryUrl)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    displayWeather(data);
                } else {
                    weatherDisplay.innerHTML = `<p>City not found.</p>`;
                }
            })
            .catch(error => {
                weatherDisplay.innerHTML = `<p>Error fetching weather data.</p>`;
                console.error('Error fetching weather data:', error);
            });
    };

    // Hava durumu verilerini ekranda gösterme fonksiyonu
    const displayWeather = (data) => {
        weatherDisplay.innerHTML = `
            <h2>${data.name}</h2>
            <p>${data.weather[0].description}</p>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    };

    // Görev ekleme formu için event listener
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Formun sayfayı yeniden yüklemesini engelle
        const taskText = taskInput.value.trim();

        if (taskText) {
            addTask(taskText);
            taskInput.value = ''; // Giriş kutusunu temizle
        }
    });

    // Görev ekleme fonksiyonu
    const addTask = (text) => {
        const li = document.createElement('li');
        li.classList.add('item');

        // Görev metnini oluştur
        const taskText = document.createElement('span');
        taskText.textContent = text;

        // `checked` ikonunu oluştur
        const checkIcon = document.createElement('i');
        checkIcon.classList.add('fa-regular', 'fa-square-check');
        checkIcon.addEventListener('click', () => {
            li.classList.toggle('checked');
            checkIcon.classList.toggle('fa-square-check');
            checkIcon.classList.toggle('fa-check-square');
        });

        // `trash` ikonunu oluştur
        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash');
        trashIcon.addEventListener('click', () => {
            ulList.removeChild(li);
        });

        // Öğeleri liste elemanına ekle
        li.appendChild(checkIcon);
        li.appendChild(taskText);
        li.appendChild(trashIcon);

        // Listeye elemanı ekle
        ulList.appendChild(li);
    };
});
