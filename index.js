import { getClass, getBtns } from "./components/builds.js";

export let data = [];
const classes = [
  {
    name: "Bárbaro",
    description:
      "Salvajes guerreros que protegen las teirras sagradas de sus ancentros con brutales ataques cuerpo a cuerpo y con una rabia inagotable que desatan sobre la horda de los demonios",
    pve: 70,
    pvp: 45,
    dif: 50,
    icon: "./img/barbaro/barbarian.svg",
    img: "./img/barbaro/img.png",
    video: "./videos/barbaro/barbaro.mp4",
  },
  {
    name: "Cruzado",
    description:
      "Inquebratables campeones de la fe que utilizan su magia sagrada y su armadura pesada para resistir los ataques del enemigo, al tiempo que fulminan a los demonios con fuego ardiente y luz cegadora",
    pve: 85,
    pvp: 80,
    dif: 40,
    icon: "./img/cruzada/cruzada.svg",
    img: "./img/cruzada/img.png",
  },
  {
    name: "Cazador de Demonios",
    description:
      "Vigilantes implacables que se cobran venganza de la horda demoníaca con una arsenal de flechas, explosivos y mecanismos mientras se mueven sin parar para mantenerse fuera de su alcanza",
    pve: 75,
    pvp: 85,
    dif: 75,
    icon: "./img/cazadora/icon.svg",
    img: "./img/cazadora/img.png",
  },
  {
    name: "Monje",
    description:
      "Artistas marciales sagrados que canalizan la energía divina en el campo de batalla para asestar potentes ataques cuerpo a cuerpo, activar movimientos veloces e invocar barreras para protegerse a sí mismo y a sus aliados",
    pve: 70,
    pvp: 45,
    dif: 70,
    icon: "./img/monje/monje.svg",
    img: "./img/monje/img.png",
  },
  {
    name: "Nigromante",
    description:
      "Maestros de la vida y la muerte que utilizan el poder de los muertos y atormentan a sus enemigos con esbirros esqueléticos y magia obscura",
    pve: 75,
    pvp: 60,
    dif: 70,
    icon: "./img/nigromante/nigromante.svg",
    img: "./img/nigromante/img.png",
  },
  {
    name: "Mago",
    description:
      "Hechizaros renegados que canalizan las energías arcanas para transformarlas en combinaciones de magia poderosa, capaces de manipular y destruir a sus enemigos",
    pve: 80,
    pvp: 50,
    dif: 70,
    icon: "./img/maga/maga.svg",
    img: "./img/maga/img.png",
  },
];

// Hace el fetch principal de datos en data
export const getFetched = async (url) => {
  const response = await fetch(url);
  const arr = await response.json();
  return arr;
};

// Ejecuto las funciones para mostrar clases, botones, etc.
getClass(classes[0], 0);
getBtns(classes);
data = await getFetched("./db/db.json");

//Ejecuto efecto de cenizas en seccion Build's.
