document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.search-form');
    const cityInput = document.querySelector('.city-input');
    const cityElement = document.querySelector('.city');
    const dateElement = document.querySelector('.date');
    const descriptionText = document.querySelector('.description-text');
    const tempElement = document.querySelector('.temp');
    const windSpeedElement = document.querySelector('.wind-speed');
    const humidityElement = document.querySelector('.humidity');
    const visibilityElement = document.querySelector('.visibility-distance');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (city) {
            fetchWeatherData(city);
        }
    });

    function fetchWeatherData(city) {
        const apiKey = '12b30646e0e9d1471496e2f1ac1331b1';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const date = new Date();
                    cityElement.textContent = data.name;
                    dateElement.textContent = date.toDateString();
                    descriptionText.textContent = data.weather[0].description;
                    tempElement.textContent = `${data.main.temp}°C`;
                    windSpeedElement.textContent = `${data.wind.speed} KM/H`;
                    humidityElement.textContent = `${data.main.humidity}%`;
                    visibilityElement.textContent = `${data.visibility / 1000} KM`;
                } else {
                    alert('City not found');
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data');
            });
    }
});
