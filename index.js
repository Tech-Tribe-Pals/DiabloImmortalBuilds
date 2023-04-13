import { getClass, getBtns } from "./components/builds.js";

export let data = []
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
    icon: "./img/cazadora/icon.svg",
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

// Hace el fetch principal de datos en data
export const getFetched = async (url) => {
  const response = await fetch(url);
  const arr = await response.json();
  return arr
};

// Ejecuto las funciones para mostrar clases, botones, etc.
getClass(classes[0], 0);
getBtns(classes);
data = await getFetched("./db/db.json");