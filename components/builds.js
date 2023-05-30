import { data, classes } from "../index.js";
let fede = document.getElementById("body");
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
// Crea el boton de cierre
export const createBtnClose = (type) => {
  const btnClose = document.createElement("button");
  btnClose.innerText = "X";
  btnClose.className = "close";
  if (type === "modal") {
    btnClose.onclick = () => closed();
  } else {
    btnClose.onclick = () => closeSubmodal();
    btnClose.className = `close closeModal`;
  }
  return btnClose;
};

// -- // -- // --- // -- // -- // -- // -- // --- // -- //

// Genera la clase en cuestion que se seleccione en el div myBtns
export const getClass = (e, value) => {
  const btn = document.createElement("button");
  btn.onclick = () => getBuild(value);
  btn.className = "btn-Build";
  btn.innerText = "Ver build";

  myClass.innerHTML = ` <div id="personaje" class="position-absolute circulo position-relative">
    <img class="position-absolute start-0 coso" src="${e.img}">
    </div>
    <h2 class="align-self-start fs-1 title-build">${e.name}</h2>
    <p class="description-p">${e.description}</p>
    <div class="d-flex flex-row w-100">
    <div class="d-flex flex-column text-start w-50 align-items-center justify-content-center">
    PvE<progress value='${e.pve}' max="100"></progress>
    PvP<progress value='${e.pvp}' max="100"></progress>
    Dificultad<progress value='${e.dif}' max="100"></progress>
    </div>
    <video src='${e.video}' class="video-builds " autoplay muted loop></video>
    </div>
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
  img.src = classes[e].imageBuild;
  img.className = "classImg";

  const btnClose = createBtnClose("modal");

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
  });

  //  botones dentro del modal
  const btnArr = ["paragon", "skills", "gems"];
  const btnBuildDiv = document.createElement("div");
  btnBuildDiv.className = "btnBuild";
  btnArr.forEach((arrElem) => {
    const btnBuild = document.createElement("button");
    btnBuild.className = "btnBuilds";
    btnBuild.innerText = arrElem;
    switch(arrElem) {
      case "paragon":
        btnBuild.onclick = () => getNada();
        break;
      case "skills":
        btnBuild.onclick = () => getSkills(e);
        break;
      case "gems":
        btnBuild.onclick = () => getGems(e);
        break;
    }
    btnBuildDiv.appendChild(btnBuild);
  });

  build.appendChild(btnClose);
  build.appendChild(gridL);
  build.appendChild(divImg);
  build.appendChild(gridR);
  build.appendChild(divDesc);
  build.appendChild(btnBuildDiv);
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
      <p class="p-desc-items">${e}</p>
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
        <p class="p-desc-items">Set: ${e}</p>
        `;
      } else {
        div.innerHTML += `
        <p class="p-desc-items">${e}</p>
        `;
      }
    });
    div.innerHTML += `
    <hr>
    `;
  }
  found.bonus.forEach((e) => {
    div.innerHTML += `
    <p class="p-desc-items">${e}</p>
    `;
  });

  if (found.req) {
    div.innerHTML += `
    <hr>
    `;
    found.req.forEach((e) => {
      div.innerHTML += `
    <p class="p-desc-items">${e}</p>
    `;
    });
  }
};
// Crea el modal para ver las skills
export const getSkills = (e) => {
  const bg = document.createElement("div");
  const modal = document.createElement("div");
  const skills = document.createElement("div");
  const btnClose = createBtnClose("submodal");
  const videoSkills = document.createElement("video");
  skills.className = "skillsContainer";
  bg.classList = "bgModal";
  modal.className = "skillsModal";
  videoSkills.className = "videoSkills";

  data[e].skills.forEach((e) => {
    skills.innerHTML += `
    <div class= "w-100 h-auto d-flex flex-row justify-content-evenly align-items-center mt-5">
    <img src=${e.img} class="img-builds-skills">
    <div class="d-flex flex-column w-50">
    <h3>${e.title}</h3>
    </div>
    </div>
    `;
    modal.appendChild(skills);
    bg.appendChild(modal);
    build.appendChild(bg);
  });

  videoSkills.src = classes[e].videoSkills;
  videoSkills.autoplay = true;
  videoSkills.controls = false;
  videoSkills.muted = true;

  modal.appendChild(btnClose);
  modal.appendChild(videoSkills);
};
const getGems = (e) => {
  const bg = document.createElement("div");
  const modal = document.createElement("div");
  const skills = document.createElement("div");
  const btnClose = createBtnClose("submodal");

  data[e].gems.forEach((e) => {
    skills.innerHTML += `
    <div class= "w-100 h-auto d-flex flex-row justify-content-evenly align-items-center mt-5">
    <img src=${e.img} class="img-builds-skills">
    <div class="d-flex flex-column w-50">
    <h3>${e.title}</h3>
    <p>${e.description}</p>
    </div>
    </div>
    `;
    modal.appendChild(skills);
    bg.appendChild(modal);
    build.appendChild(bg);
  });

  modal.appendChild(btnClose);
  modal.appendChild(videoSkills);
}
// Funcion provisoria hasta tener categorias
export const getNada = () => {
  const bg = document.createElement("div");
  const modal = document.createElement("div");
  const btnClose = createBtnClose("submodal");
  bg.classList = "bgModal";
  modal.className = "skillsModal";
  modal.innerHTML += `
  "No se actualizo la informacion"
  `;
  bg.appendChild(modal);
  modal.appendChild(btnClose);
  build.appendChild(bg);
};
