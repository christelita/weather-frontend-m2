const imageCities = ["scl", "nyc", "lon", "tok", "syd", "par", "rio", "ber", "msc", "cph"];

/***********************
 * Datos mock (≥10)
 ***********************/
const CITIES = [
  { id: "scl", name: "Santiago, CL", temp: 18, state: "Parcialmente nublado", humidity: 60, wind: "8 km/h", coords: "-33.45, -70.66",
    weekly: mockWeek() },
  { id: "nyc", name: "New York, US", temp: 12, state: "Soleado", humidity: 50, wind: "10 km/h", coords: "40.71, -74.00", weekly: mockWeek() },
  { id: "lon", name: "London, UK", temp: 9, state: "Lluvioso", humidity: 75, wind: "12 km/h", coords: "51.51, -0.13", weekly: mockWeek() },
  { id: "tok", name: "Tokyo, JP", temp: 20, state: "Nublado", humidity: 68, wind: "6 km/h", coords: "35.68, 139.69", weekly: mockWeek() },
  { id: "syd", name: "Sydney, AU", temp: 24, state: "Soleado", humidity: 55, wind: "14 km/h", coords: "-33.86, 151.21", weekly: mockWeek() },
  { id: "par", name: "Paris, FR", temp: 11, state: "Llovizna", humidity: 72, wind: "9 km/h", coords: "48.85, 2.35", weekly: mockWeek() },
  { id: "rio", name: "Rio de Janeiro, BR", temp: 28, state: "Soleado", humidity: 65, wind: "11 km/h", coords: "-22.90, -43.20", weekly: mockWeek() },
  { id: "ber", name: "Berlin, DE", temp: 10, state: "Parcialmente nublado", humidity: 67, wind: "7 km/h", coords: "52.52, 13.40", weekly: mockWeek() },
  { id: "msc", name: "Moscow, RU", temp: -2, state: "Frío", humidity: 80, wind: "15 km/h", coords: "55.75, 37.62", weekly: mockWeek() },
  { id: "cph", name: "Copenhagen, DK", temp: 7, state: "Viento", humidity: 70, wind: "20 km/h", coords: "55.68, 12.57", weekly: mockWeek() }
];

function getCityById(id) {
  return CITIES.find(city => city.id === id);
}

function mockWeek(){
  const days = [];
  const states = ["Soleado","Nublado","Lluvioso","Parcialmente nublado","Tormenta","Llovizna","Ventoso"];
  for(let i=0;i<7;i++){
    days.push({
      day: new Date(Date.now() + i*86400000).toLocaleDateString('es-CL',{weekday:'short', day:'numeric', month:'short'}),
      max: Math.round(Math.random()*15+5),
      min: Math.round(Math.random()*7-5),
      state: states[Math.floor(Math.random()*states.length)]
    });
  }
  return days;
}

/************************************
 * ESTADÍSTICAS SEMANALES
 ************************************/
function calculateWeeklyStats(weeklyForecast) {
  let minTemp = weeklyForecast[0].min;
  let maxTemp = weeklyForecast[0].max;
  let sumTemp = 0;

  let weatherCount = {}; // { Soleado: 3, Lluvioso: 2, ... }

  for (let i = 0; i < weeklyForecast.length; i++) {
    const day = weeklyForecast[i];

    // Mínimo y máximo
    if (day.min < minTemp) minTemp = day.min;
    if (day.max > maxTemp) maxTemp = day.max;

    // Promedio (usamos el punto medio del día)
    sumTemp += (day.min + day.max) / 2;

    // Conteo de estados
    if (weatherCount[day.state]) {
      weatherCount[day.state]++;
    } else {
      weatherCount[day.state] = 1;
    }
  }

  const avgTemp = Math.round(sumTemp / weeklyForecast.length);

  // Estado predominante
  let dominantWeather = "";
  let maxDays = 0;

  for (const state in weatherCount) {
    if (weatherCount[state] > maxDays) {
      maxDays = weatherCount[state];
      dominantWeather = state;
    }
  }

  // Resumen textual
  let summary = "";

  if (dominantWeather === "Soleado") {
    summary = "Semana mayormente soleada ☀️";
  } else if (dominantWeather === "Lluvioso" || dominantWeather === "Llovizna") {
    summary = "Semana con varias lluvias 🌧️";
  } else if (avgTemp < 10) {
    summary = "Semana fría ❄️";
  } else {
    summary = "Semana con clima variable 🌤️";
  }

  return {
    minTemp,
    maxTemp,
    avgTemp,
    weatherCount,
    summary
  };
}

/* RENDER HOME */
const grid = document.getElementById('cities-grid');
function renderHome(){
  grid.innerHTML = '';
  CITIES.forEach(city => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';

    col.innerHTML = `
      <article class="card place-card h-100" data-id="${city.id}" role="button" tabindex="0">
        <img src="Assets/cities/${city.id}.png" class="card-img-top place-card__img" alt="${city.name}">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 class="card-title place-card__name">${city.name}</h5>
            <p class="card-text text-muted mb-1 place-card__state">${city.state}</p>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <div class="fs-4 fw-bold">${city.temp}°C</div>
            <span class="badge bg-info text-dark">${city.humidity}%</span>
          </div>
        </div>
      </article>
    `;
    grid.appendChild(col);

    col.querySelector('.place-card').addEventListener('click', () => {
      location.hash = '#city=' + city.id;
    });

    col.querySelector('.place-card').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') location.hash = '#city=' + city.id;
    });
  });
}

/* RENDER DETAIL */
function renderDetail(city){
  document.getElementById('detail-name').textContent = city.name;
  document.getElementById('detail-temp').textContent = city.temp + '°C';
  document.getElementById('detail-state').textContent = city.state;
  document.getElementById('detail-humidity').textContent = city.humidity + '%';
  document.getElementById('detail-wind').textContent = city.wind;
  document.getElementById('detail-coords').textContent = city.coords;
  document.getElementById('detail-icon').innerHTML = `<i class="bi bi-cloud-sun-fill" style="font-size:2.2rem"></i>`;

  const weekly = document.getElementById('weekly-forecast');
  weekly.innerHTML = '';
  city.weekly.forEach(day => {
    const col = document.createElement('div');
    col.className = 'col-6 col-md-4';
    col.innerHTML = `
      <div class="card">
        <div class="card-body p-2 text-center">
          <div class="small text-muted">${day.day}</div>
          <div class="fw-bold">${day.max}° / ${day.min}°</div>
          <div class="small text-muted">${day.state}</div>
        </div>
      </div>
    `;
    weekly.appendChild(col);
  });

  // ===============================
// MOSTRAR ESTADÍSTICAS SEMANALES
// ===============================
const stats = calculateWeeklyStats(city.weekly);

// Si no existe el contenedor, lo creamos
let statsContainer = document.getElementById("weekly-stats");

if (!statsContainer) {
  statsContainer = document.createElement("div");
  statsContainer.id = "weekly-stats";
  statsContainer.className = "mt-3 p-3 border rounded bg-light";

  document
    .getElementById("weekly-forecast")
    .parentElement
    .appendChild(statsContainer);
}

statsContainer.innerHTML = `
  <h5>Estadísticas de la semana</h5>
  <ul class="list-group mb-2">
    <li class="list-group-item">🌡️ Mínima: ${stats.minTemp}°C</li>
    <li class="list-group-item">🔥 Máxima: ${stats.maxTemp}°C</li>
    <li class="list-group-item">📊 Promedio: ${stats.avgTemp}°C</li>
  </ul>
  <p><strong>${stats.summary}</strong></p>
`;


}



/* VISTAS */
const homeView = document.getElementById('home-view');
const detailView = document.getElementById('detail-view');
const backBtn = document.getElementById('back-btn');

backBtn.addEventListener('click', () => { location.hash = '#home'; });

function showHome(){
  homeView.classList.remove('d-none');
  detailView.classList.add('d-none');
}

function showDetail(city){
  homeView.classList.add('d-none');
  detailView.classList.remove('d-none');
  renderDetail(city);
}

/* ROUTING */
function handleHash(){
  const hash = location.hash || '#home';
  if (hash.startsWith('#city=')){
    const id = hash.split('=')[1];
    const city = getCityById(id);
    if (city) showDetail(city);
    else showHome();
  } else {
    showHome();
    renderHome();
  }
}

window.addEventListener('hashchange', handleHash);
window.addEventListener('load', () => {
  renderHome();
  handleHash();
});


/* BÚSQUEDA DE CIUDADES */
const searchInput = document.getElementById('city-search');

searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();

  // Filtramos las cards según el nombre de la ciudad
  CITIES.forEach(city => {
    const col = document.querySelector(`.place-card[data-id="${city.id}"]`)?.parentElement;
    if (!col) return;

    if (city.name.toLowerCase().includes(query)) {
      col.style.display = '';
    } else {
      col.style.display = 'none';
    }
  });
});
