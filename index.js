const myClass = document.getElementById("class"); // Aca se muestran las clases
const myBtns = document.getElementById("btnClass"); // Botones de las clases
const build = document.getElementById("build"); // modal principal de build
let data = []; // Aca se hace el fetch de datos
let actual = []; // Se almacena el objeto de la clase seleccionada

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

// Hace el fetch principal de datos en data
const getFetched = async () => {
  const response = await fetch("../db/db.json");
  data = await response.json();
};
// Funciona igual que el find() de js
const find = (e) => {
  let found = "";
  actual.items.map((search) => {
    if (search.type === e) found = search;
  });
  return found;
};
// El nombre de la funcion es demasiado explicita
const sacaTildes = (texto) => {
  return texto
    .normalize("NFD")
    .replace(
      /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
      "$1"
    )
    .normalize();
};
// Cierra el modal principal con id: "build"
const closed = () => {
  build.style.display = "none";
  build.innerHTML = "";
};
// Cierra un submodal
const closeSubmodal = () => {
  build.removeChild(build.lastChild);
};

// -- // -- // --- // -- // -- // -- // -- // --- // -- //

// Genera la clase en cuestion que se seleccione en el div myBtns
const getClass = (e, value) => {
  myClass.innerHTML = `
    <p class="p-header">${e.name}</p>
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
  const gridL = document.createElement("article"); // Grid left de la izquierda
  const gridR = document.createElement("article"); // Grid right de la derecha
  const divImg = document.createElement("div"); // Div para la imagen con el dije
  const divDesc = document.createElement("div"); // Div para la descripcion
  const img = document.createElement("img");
  divDesc.className = "buildDescription";
  divDesc.innerText = "Sin items seleccionados";
  divImg.className = "imgContainer";
  img.src = "../img/imgBuilds.png"; // classes[e].img
  img.className = "classImg";
  actual = data[e];
  gridL.className = "buildGridL";
  gridL.id = "buildGridL";
  gridR.className = "buildGridR";
  gridR.id = "buildGridR";
  build.style.display = "grid";
  build.innerHTML = `
  <button class="close" onclick="closed()">X</button>
  `;
  data[e].items.map((e) => {
    if (e.class === "orange") {
      gridR.innerHTML += `
    <div onmouseover="showDetails('${e.type}')" onmouseleave="hideDetails('${e.type}')" class='${e.class} ${e.type} bg'>
    <img onclick="getDescription('${e.type}')" src=${e.img}>
    </div>
    `;
    } else if (e.class === "green") {
      gridL.innerHTML += `
    <div onmouseover="showDetails('${e.type}')" onmouseleave="hideDetails('${e.type}')" class='${e.class} ${e.type} bg'>
    <img onclick="getDescription('${e.type}')" src=${e.img}>
    </div>`;
    } else {
      divImg.appendChild(img);
      divImg.innerHTML += `
    <div onmouseover="showDetails('${e.type}')" onmouseleave="hideDetails('${e.type}')" class='${e.class} ${e.type} bg'>
    <img onclick="getDescription('${e.type}')" src=${e.img}>
    </div>`;
    }
  });
  build.innerHTML += `
  <div class="btnBuild">
  <button onclick="getNada()">Paragon</button>
  <button onclick="getSkills(${e})">Skills</button>
  <button onclick="getNada()">Gems</button>
  </div>
  `;
  build.appendChild(gridL);
  build.appendChild(divImg);
  build.appendChild(gridR);
  build.appendChild(divDesc);
};
// Muestra el titulo del item cuando haces hover en él
const showDetails = async (e) => {
  const elem = document.getElementsByClassName(e)[0];
  const found = find(e);
  // Este if es para que no se creen un millon de details.
  if (elem.childNodes.length !== 4) {
    const div = document.createElement("div");
    div.className = "detail";
    div.innerText = found.title;
    elem.appendChild(div);
  }
};
// Desaparece el titulo que muestra con el hover de showDetails
const hideDetails = (e) => {
  const elem = document.getElementsByClassName(e)[0];
  elem.removeChild(elem.lastChild);
};

// Genera la descripcion de cada item en el div "buildDescription"
const getDescription = async (e) => {
  const div = document.querySelector(".buildDescription");
  const found = find(e);
  if (div.classList[1]) {
    div.classList.remove(div.classList[1]);
  }
  div.classList.add(found.class);
  div.innerHTML = `
  <img src='${found.img}'>
  <h3 title'>${found.title}</h3>
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
};
// Crea el modal para ver las skills
const getSkills = (e) => {
  const bg = document.createElement("div");
  const modal = document.createElement("div");
  bg.classList = "bgModal";
  modal.className = "skillsModal";
  modal.innerHTML += `
  <button class="close" onclick="closeSubmodal()">X</button>
  `;
  data[e].skills.forEach((e) => {
    modal.innerHTML += `
    <div>
    <img src=${e.img}>
    <p>${e.title}</p>
    <p>${e.description}</p>
    </div>
    `;
    bg.appendChild(modal);
    build.appendChild(bg);
  });
};
// Funcion provisoria hasta tener categorias
const getNada = () => {
  const bg = document.createElement("div");
  const modal = document.createElement("div");
  bg.classList = "bgModal";
  modal.className = "skillsModal";
  modal.innerHTML += `
  <button class="close closeModal" onclick="closeSubmodal()">X</button>
  `;
  modal.innerHTML += `
  "Nada"
  `
  bg.appendChild(modal);
  build.appendChild(bg);
};

// Ejecuto las funciones para mostrar clases, botones, etc.
getClass(classes[0], 0);
getBtns(classes);
getFetched();
