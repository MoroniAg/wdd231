async function getWeather() {
    const apiKey = '84fecd6e66fd8637b1968f16c25d92b6'; // User should replace this with their actual key
    const city = 'Ambato';
    const country = 'EC';
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&APPID=${apiKey}`;

    const weatherContainer = document.getElementById('weather-container');
    if (!weatherContainer) return;

    try {
        const [currentRes, forecastRes] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);

        if (!currentRes.ok || !forecastRes.ok) {
            throw new Error('Weather data unavailable');
        }

        const currentData = await currentRes.json();
        const forecastData = await forecastRes.json();

        // Extract Current Weather
        const temp = Math.round(currentData.main.temp);
        const description = currentData.weather[0].description;

        // Extract 3-day forecast (API returns 3-hour intervals)
        // We take one reading per day (every 8th element = 24 hours)
        const dailyForecasts = [];
        for (let i = 8; i < forecastData.list.length && dailyForecasts.length < 3; i += 8) {
            const day = forecastData.list[i];
            const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            const dayTemp = Math.round(day.main.temp);
            dailyForecasts.push({ date, temp: dayTemp });
        }

        let forecastHtml = '';
        dailyForecasts.forEach(day => {
            forecastHtml += `<div class="forecast-item"><strong>${day.date}</strong>: ${day.temp}°C</div>`;
        });

        weatherContainer.innerHTML = `
            <div class="current-weather">
                <span class="temp">${temp}°C</span>
                <span class="desc">${description}</span>
            </div>
            <div class="forecast-grid">
                ${forecastHtml}
            </div>
        `;

    } catch (error) {
        console.error('Weather Error:', error);
        weatherContainer.innerHTML = `<p>Unable to load weather data at this time.</p>`;
    }
}

// Initialize weather on window load
window.addEventListener('DOMContentLoaded', getWeather);
