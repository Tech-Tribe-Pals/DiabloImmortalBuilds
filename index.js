const myClass = document.getElementById("class");
const myBtns = document.getElementById("btnClass");
const build = document.getElementById("build");

const classes = [
  {
    name: "Bárbaro",
    pve: 90,
    pvp: 5,
    dif: 20,
    icon: "./img/barbaro/barbarian.svg",
    img: "./img/barbaro/img.png",
  },
  {
    name: "Cruzada",
    pve: 60,
    pvp: 80,
    dif: 10,
    icon: "./img/cruzada/cruzada.svg",
    img: "./img/cruzada/img.png",
  },
  {
    name: "Cazadora de Demonios",
    pve: 30,
    pvp: 10,
    dif: 10,
    icon: "./img/cazadora/cazadora.svg",
    img: "./img/cazadora/img.png",
  },
  {
    name: "Monje",
    pve: 50,
    pvp: 50,
    dif: 50,
    icon: "./img/monje/monje.svg",
    img: "./img/monje/img.png",
  },
  {
    name: "Nigromante",
    pve: 10,
    pvp: 100,
    dif: 80,
    icon: "./img/nigromante/nigromante.svg",
    img: "./img/nigromante/img.png",
  },
  {
    name: "Maga",
    pve: 50,
    pvp: 50,
    dif: 90,
    icon: "./img/maga/maga.svg",
    img: "./img/maga/img.png",
  },
];

// funcion para sacar tildes del nombre como por ej: 'barbaro'.
function sacaTildes(texto) {
  return texto
    .normalize("NFD")
    .replace(
      /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
      "$1"
    )
    .normalize();
}

// Genera la clase en cuestion que se seleccione en el div myBtns
const getClass = (e) => {
  myClass.innerHTML = `
    <p>${e.name}</p>
    <img src="${e.img}">
    PvE<progress value='${e.pve}' max="100"></progress>
    PvP<progress value='${e.pvp}' max="100"></progress>
    Dificultad<progress value='${e.dif}' max="100"></progress>
    <button class="btnBuild" onclick="getBuild()">Ver builds</button>
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
    btn.onclick = () => getClass(classes[i]);
    myBtns.appendChild(btn);
  });
};

// Genera la build del personaje en cuestion.
// * en mantenimiento hasta terminar JSON
const getBuild = async () => {
  const response = await fetch("./db/cazadora.json");
  const data = await response.json();

  build.style.display = "block";
  build.innerHTML = `
  <button onclick="closed()">X</button>
  <img onclick="getDescription('head')" src=${data.items.head.img}>
  <img onclick="getDescription('shoulders')" src=${data.items.shoulders.img}>
  <img onclick="getDescription('weapon')" src=${data.items.weapon.img}>
  <img onclick="getDescription('offhand')" src=${data.items.offhand.img}>
  <img onclick="getDescription('legs')" src=${data.items.legs.img}>
  <img onclick="getDescription('torso')" src=${data.items.torso.img}>
  <img onclick="getDescription('rings', 1)" src=${data.items.rings[0].img}>
  <img onclick="getDescription('rings', 2)" src=${data.items.rings[1].img}>
  <img onclick="getDescription('wrists')" src=${data.items.wrists.img}>
  <img onclick="getDescription('feet')" src=${data.items.feet.img}>
  <img onclick="getDescription('waist')" src=${data.items.waist.img}>
  `;
};

// Genera la descripcion de cada item
// * De esto se encargan ustedes
const getDescription = async (e, aux) => {
  const response = await fetch("./db/cazadora.json");
  const data = await response.json();
  let obj = [];

  // Si el item en cuestion es un array de objetos, se buscara el numero del array con 'aux'
  if (aux) {
    obj = data.items[e][aux - 1];
  } else {
    obj = data.items[e];
  }

  // Si ya hay un item seleccionado se borrara el ultimo seleccionado para mostarar uno nuevo
  if (build.childNodes[25]) {
    build.removeChild(build.childNodes[25]);
    const div = document.createElement("div");
    div.className = "buildDescription";
    div.innerHTML = `
  <p>${obj.title}</p>
  `;
    build.appendChild(div);
  } else {
    const div = document.createElement("div");
    div.className = "buildDescription";
    div.innerHTML = `
  <p>${obj.title}</p>
  `;
    build.appendChild(div);
  }
};

const closed = () => {
  build.style.display = "none";
};

// Ejecuto las funciones para mostrar clases y botones
getClass(classes[0]);
getBtns(classes);
