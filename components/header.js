// Traducciones del título y botón volver por página
const pageTranslations = {
  "carta-bebida.html": {
    es: "🍹 Carta de Bebidas",
    en: "🍹 Drinks Menu",
    fr: "🍹 Carte des Boissons",
    it: "🍹 Menu Bevande",
    ru: "🍹 Меню напитков",
    back: {
      es: "Volver",
      en: "Back",
      fr: "Retour",
      it: "Indietro",
      ru: "Назад",
    },
  },
  "carta-comida.html": {
    es: "🍽️ Carta de Comida",
    en: "🍽️ Food Menu",
    fr: "🍽️ Menu Repas",
    it: "🍽️ Menu Cibo",
    ru: "🍽️ Меню еды",
    back: {
      es: "Volver",
      en: "Back",
      fr: "Retour",
      it: "Indietro",
      ru: "Назад",
    },
  },
  // ...añade más páginas si las tienes
};

function getCurrentPage() {
  const path = window.location.pathname.split("/");
  return path[path.length - 1];
}

async function loadHeader() {
  const container = document.getElementById("app-header");
  const html = await fetch("components/header.html").then((r) => r.text());
  container.innerHTML = html;
  // Cuando ya está en el DOM, lanza evento
  document.dispatchEvent(new Event("headerLoaded"));
}

// Llama al cargar
document.addEventListener("DOMContentLoaded", loadHeader);
