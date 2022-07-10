const author = document.getElementById('author');
const cryptoTop = document.getElementById('crypto-top');
const cryptoBottom = document.getElementById('crypto-bottom');
const weather = document.getElementById('weather');
const time = document.getElementById('time');
const sports = document.getElementById('sports');

//unsplash Image
fetch(
  'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=park'
)
  .then((response) => response.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    author.textContent = `Photo by: ${data.user.name}`;
  })

  .catch((error) => {
    //default backgroundImage and author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/hoto-1540848893531-5eece9a5fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MzEwNjUxNjg&ixlib=rb-1.2.1&q=80&w=1080)`;
  });

fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
  .then((response) => response.json())
  .then((data) => {
    cryptoTop.innerHTML = `
  <img src=${data.image.small}>
  <span id="crypto-name">${data.name}</span>
  `;

    cryptoBottom.innerHTML = `
  <div>
  <i class="fas fa-bulleye"></i>
  <span>$ ${data.market_data.current_price.cad}</span>
  </div>
  <div>
  <i class="fas fa-arrow-up"></i>
  <span>$ ${data.market_data.high_24h.cad}</span>
  </div>
  <div>
  <i class="fas fa-arrow-down"></i>
  <span>$ ${data.market_data.low_24h.cad}</span>
</div>
  `;

    console.log(data.market_data.current_price.cad);
  })
  .catch((error) => {
    console.error('Oh no!error!');
  });

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=3853bfd17fea2eb49ab64c0a91403c1c`
  )
    .then((response) => {
      if (!response.ok) {
        throw Error('Weather info not available');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      weather.innerHTML = `
  <img src=${iconUrl} id="weather-icon">
  <span id="temperature">${Math.round(data.main.temp)}°</span>
  <p id="feels-like">Feels like: ${Math.round(data.main.feels_like)}°</p>
  <p id="weather-city">${data.name}</p>
`;
    })
    .catch((error) => console.error(error));
});

function getTime() {
  const today = new Date();
  time.textContent = today.toLocaleTimeString('en-US', { timeStyle: 'medium' });
}

setInterval(getTime, 1000);

const date = new Date();
const thisYear = date.getFullYear();

fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/news')
  .then((response) => response.json())
  .then((data) => {
    sports.innerHTML = `
    <h1 id="sports-news-header"><i class="fas fa-basketball-ball fa-lg"></i> ${
      data.header
    }</h1>
    <a href=${data.articles[0].links.web.short.href}>
    <h4 id="headline">${data.articles[0].headline.substr(0, 30)}...</h3>
    `;
  })
  .catch((error) => {
    console.error(error);
  });
