const myClass = document.getElementById("class");
const myBtns = document.getElementById("btnClass");
const build = document.getElementById("build");
let data = []
let actual = []

const classes = [
  {
    name: "Bárbaro",
    pve: 90,
    pvp: 5,
    dif: 20,
    icon: "../img/barbaro/barbarian.svg",
    img: "../img/barbaro/img.png",
  },
  {
    name: "Cruzada",
    pve: 60,
    pvp: 80,
    dif: 10,
    icon: "../img/cruzada/cruzada.svg",
    img: "../img/cruzada/img.png",
  },
  {
    name: "Cazadora de Demonios",
    pve: 30,
    pvp: 10,
    dif: 10,
    icon: "../img/cazadora/icon.svg",
    img: "../img/cazadora/img.png",
  },
  {
    name: "Monje",
    pve: 50,
    pvp: 50,
    dif: 50,
    icon: "../img/monje/monje.svg",
    img: "../img/monje/img.png",
  },
  {
    name: "Nigromante",
    pve: 10,
    pvp: 100,
    dif: 80,
    icon: "../img/nigromante/nigromante.svg",
    img: "../img/nigromante/img.png",
  },
  {
    name: "Maga",
    pve: 50,
    pvp: 50,
    dif: 90,
    icon: "../img/maga/maga.svg",
    img: "../img/maga/img.png",
  },
];

// -- // Funciones internas para optimizar codigo // -- //

const getFetched = async () => {
  const response = await fetch("../db/db.json");
  data = await response.json();
}

const find = (e) => {
  let found = ''
  actual.items.map(search => {
    if (search.type === e) found = search
  })
  return found
}

const sacaTildes = (texto) => {
  return texto
    .normalize("NFD")
    .replace(
      /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
      "$1"
    )
    .normalize();
}

// -- // -- // --- // -- // -- // -- // -- // --- // -- //

// Genera la clase en cuestion que se seleccione en el div myBtns
const getClass = (e, value) => {
  myClass.innerHTML = `
    <p>${e.name}</p>
    <img src="${e.img}">
    PvE<progress value='${e.pve}' max="100"></progress>
    PvP<progress value='${e.pvp}' max="100"></progress>
    Dificultad<progress value='${e.dif}' max="100"></progress>
    <button class="btnBuild" onclick="getBuild(${value})">Ver builds</button>
    `;
};

// Dentro del div myButns se generara el numero de clases que haya en el juego
const getBtns = (e) => {
  e.map((e, i) => {
    const btn = document.createElement("button");
    const img = document.createElement("img");
    img.src = e.icon;
    btn.value = i;
    btn.appendChild(img);
    btn.onclick = () => getClass(classes[i], i);
    myBtns.appendChild(btn);
  });
};

// Genera la build del personaje en cuestion.
const getBuild = async (e) => {
  const grid = document.createElement('article')
  const img = document.createElement('img')
  img.src = classes[e].img
  img.className = 'classImg'
  actual = data[e]
  grid.className = 'buildGrid'
  grid.id = 'buildGrid'
  build.style.display = "flex";
  build.innerHTML = `
  <button class="close" onclick="closed()">X</button>
  `
  data[e].items.forEach(e => {
    grid.innerHTML += `
    <div onmouseover="showDetails('${e.type}')" onmouseleave="hideDetails('${e.type}')" class='${e.class} ${e.type}'>
    <img onclick="getDescription('${e.type}')" src=${e.img}>
    </div>
    `
  })
  build.innerHTML += `
  <div class="btnBuild">
  <button onclick="goTo('Paragon')">Paragon</button>
  <button onclick="goTo('Skills')">Skills</button>
  <button onclick="goTo('Gems')">Gems</button>
  </div>
  `
  build.appendChild(img)
  build.appendChild(grid)
};

const showDetails = async (e) => {
  const elem = document.getElementsByClassName(e)[0];
  const found = find(e)
  // Este if es para que no se creen un millon de details.
  if (elem.childNodes.length !== 4) {
    const div = document.createElement("div");
    div.className = "detail";
    div.innerText = found.title;
    elem.appendChild(div);
  }
};

const hideDetails = (e) => {
  const elem = document.getElementsByClassName(e)[0];
  elem.removeChild(elem.lastChild);
};

// Genera la descripcion de cada item
const getDescription = async (e) => {
  const bg = document.createElement("div");
  const div = document.createElement("div");
  const found = find(e)
  bg.classList = "bgModal";
  div.className = "buildDescription";
  div.innerHTML = `
  <button class="close" onclick="closeSubmodal()">X</button>
  <h3 class='${found.class} title'>${found.title}</h3>
  <hr>
  `;
  if (found.description) {
    found.description.forEach((e) => {
      div.innerHTML += `
      <p>${e}</p>
      `;
    });
    div.innerHTML += `
    <hr>
    `;
  }
  if (found.set) {
    found.set.map((e, i) => {
      if (i === 0) {
        div.innerHTML += `
        <p>Set: ${e}</p>
        `;
      } else {
        div.innerHTML += `
        <p>${e}</p>
        `;
      }
    });
    div.innerHTML += `
    <hr>
    `;
  }
  found.bonus.forEach((e) => {
    div.innerHTML += `
    <p>${e}</p>
    `;
  });

  if (found.req) {
    div.innerHTML += `
    <hr>
    `;
    found.req.forEach((e) => {
      div.innerHTML += `
    <p>${e}</p>
    `;
    });
  }
  bg.appendChild(div);
  build.appendChild(bg);
};

const closed = () => {
  build.style.display = "none";
  build.innerHTML = ""
};

const closeSubmodal = () => {
  build.removeChild(build.lastChild);
};

const goTo = (e) => {
  const grid = document.querySelector(".buildGrid")
  grid.innerHTML = ''
  grid.innerText = e
}

// Ejecuto las funciones para mostrar clases, botones, etc.
getClass(classes[0], 0);
getBtns(classes);
getFetched()