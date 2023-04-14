import { newsData } from "../index.js";

const news = document.getElementById("newsField");
news.innerHTML = `<p class="loading">Cargando...</p>`
export const getNews = () => {
    news.innerHTML = ""
  if (newsData.length === 0) {
    news.innerHTML += `<p>No se encontró información.</p>`;
  } else {
    newsData.forEach((e) => {
    news.innerHTML += `
    <div class="newsCard" style="background-image: url(${e.img})">
    <h3>${e.title}</h3>
    <a target="_blank" href="${e.link}">>></a>
    </div>`;
    });
  }
};

const btnsNews = document.querySelector(".newsBtns");
  const obj = btnsNews.childNodes
  obj.forEach((e) => {
    e.addEventListener('click', (e) => {
      if (e.target.className === '') {
        obj[1].className = ''
        obj[3].className = ''
        obj[5].className = ''
        e.target.className = 'selected'
      }
    })
  })