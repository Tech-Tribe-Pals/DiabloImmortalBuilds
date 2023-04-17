import { data } from "../index.js";

const myClass = document.getElementById("class"); // Aca se muestran las clases
const myBtns = document.getElementById("btnClass"); // Botones de las clases
const build = document.getElementById("build"); // modal principal de build
let actual = []; // Se almacena el objeto de la clase seleccionada

// -- // Funciones internas para optimizar codigo // -- //

// Funciona igual que el find() de js
export const find = (e) => {
  let found = "";
  actual.items.map((search) => {
    if (search.type === e) found = search;
  });
  return found;
};
// El nombre de la funcion es demasiado explicita
export const sacaTildes = (texto) => {
  return texto
    .normalize("NFD")
    .replace(
      /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
      "$1"
    )
    .normalize();
};
// Cierra el modal principal con id: "build"
export const closed = () => {
  build.style.display = "none";
  build.innerHTML = "";
};
// Cierra un submodal
export const closeSubmodal = () => {
  build.removeChild(build.lastChild);
};

// -- // -- // --- // -- // -- // -- // -- // --- // -- //

// Genera la clase en cuestion que se seleccione en el div myBtns
export const getClass = (e, value) => {
  const btn = document.createElement("button");
  btn.onclick = () => getBuild(value);
  btn.className = "btnBuild";
  btn.innerText = "Ver build";
  myClass.innerHTML = ` <div id="personaje" class="position-absolute circulo position-relative">
    <img class="position-absolute start-0 img-builds" src="${e.img}">
    </div>
    <h2 class="align-self-start  fs-1">${e.name}</h2>
    <p class="description w-100">${e.description}</p>
    <div class="d-flex flex-row w-100 ">
    <div class="d-flex flex-column justify-content-center text-start w-50">
    PvE<progress value='${e.pve}' max="100"></progress>
    PvP<progress value='${e.pvp}' max="100"></progress>
    Dificultad<progress value='${e.dif}' max="100"></progress>
    </div>
    <video src='${e.video}' class="video-builds" controls muted></video>
    </div>
    `;
  myClass.appendChild(btn);
};
// Dentro del div myButns se generara el numero de clases que haya en el juego
export const getBtns = (e) => {
  e.map((e, i) => {
    const btn = document.createElement("button");
    const img = document.createElement("img");
    img.src = e.icon;
    btn.value = i;
    btn.appendChild(img);
    btn.onclick = () => getClass(e, i);
    myBtns.appendChild(btn);
  });
};
// Genera la build del personaje en cuestion.
export const getBuild = async (e) => {
  const gridL = document.createElement("article"); // Grid left de la izquierda
  gridL.className = "buildGridL";
  gridL.id = "buildGridL";

  const gridR = document.createElement("article"); // Grid right de la derecha
  gridR.className = "buildGridR";
  gridR.id = "buildGridR";

  const divImg = document.createElement("div"); // Div para la imagen con el dije
  divImg.className = "imgContainer";

  const divDesc = document.createElement("div"); // Div para la descripcion
  divDesc.className = "buildDescription";
  divDesc.innerText = "Sin items seleccionados";

  const img = document.createElement("img");
  img.src = "./img/imgBuilds.png"; // classes[e].img
  img.className = "classImg";

  const btnClose = document.createElement("button");
  btnClose.onclick = () => closed();
  btnClose.innerText = "X";
  btnClose.className = "close";

  actual = data[e];

  build.style.display = "grid";

  data[e].items.map((e) => {
    const div = document.createElement("div");
    const imgItem = document.createElement("img");
    div.className = `${e.class} ${e.type} bg`;
    div.onclick = () => getDescription(e.type);
    div.onmouseover = () => showDetails(e.type);
    div.onmouseleave = () => hideDetails(e.type);
    imgItem.src = e.img;
    div.appendChild(imgItem);
    if (e.class === "orange") {
      gridR.appendChild(div);
    } else if (e.class === "green") {
      gridL.appendChild(div);
    } else {
      divImg.appendChild(img);
      divImg.appendChild(div);
    }
    console.log(div);
  });

  build.innerHTML += `
  <div class="btnBuild">
  <button onclick="getNada()">Paragon</button>
  <button onclick="getSkills(${e})">Skills</button>
  <button onclick="getNada()">Gems</button>
  </div>
  `;
  build.appendChild(btnClose);
  build.appendChild(gridL);
  build.appendChild(divImg);
  build.appendChild(gridR);
  build.appendChild(divDesc);
};
// Muestra el titulo del item cuando haces hover en él
export const showDetails = async (e) => {
  const elem = document.getElementsByClassName(e)[0];
  const found = find(e);
  // Este if es para que no se creen un millon de details.
  if (elem.childNodes.length !== 2) {
    const div = document.createElement("div");
    div.className = "detail";
    div.innerText = found.title;
    elem.appendChild(div);
  }
};
// Desaparece el titulo que muestra con el hover de showDetails
export const hideDetails = (e) => {
  const elem = document.getElementsByClassName(e)[0];
  elem.removeChild(elem.lastChild);
};

// Genera la descripcion de cada item en el div "buildDescription"
export const getDescription = async (e) => {
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
export const getSkills = (e) => {
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
export const getNada = () => {
  const bg = document.createElement("div");
  const modal = document.createElement("div");
  bg.classList = "bgModal";
  modal.className = "skillsModal";
  modal.innerHTML += `
  <button class="close closeModal" onclick="closeSubmodal()">X</button>
  `;
  modal.innerHTML += `
  "Nada"
  `;
  bg.appendChild(modal);
  build.appendChild(bg);
};
