// update-comida.js — Render dinámico multilenguaje para carta de comida

document.addEventListener("DOMContentLoaded", () => {
  renderMenu(getCurrentLang());

  document.addEventListener("languageChanged", (e) => {
    renderMenu(e.detail.lang);
  });
});

function getCurrentLang() {
  return localStorage.getItem("selectedLang") || "es";
}

async function renderMenu(lang) {
  const res = await fetch("JSON/menu_comida.json");
  const data = await res.json();
  const root = document.getElementById("menu-comida");
  root.innerHTML = "";

  data.sections.forEach((section) => {
    // Título principal de sección
    const title = document.createElement("h2");
    title.className = "menu-section-title";
    title.textContent =
      section[`${lang.toUpperCase()}_title`] || section.ES_title;
    root.appendChild(title);

    // Sub-secciones (si existen, como en "Raciones", "Tostas" ...)
    if (section.sub_sections) {
      section.sub_sections.forEach((sub) => {
        const subTitle = document.createElement("h3");
        subTitle.className = "sub-section-title";
        subTitle.textContent =
          sub[`${lang.toUpperCase()}_SubTitle`] || sub.ES_SubTitle;
        root.appendChild(subTitle);

        sub.items.forEach((item) => {
          root.appendChild(renderItem(item, lang));
        });
      });
    }

    // Items directos (sin sub-secciones)
    if (section.items) {
      section.items.forEach((item) => {
        root.appendChild(renderItem(item, lang));
      });
    }
  });
}

function renderItem(item, lang) {
  const row = document.createElement("div");
  row.className = "menu-item";

  // Manejar precios de raciones y medias (si existen)
  let priceHTML = "";
  if (item.portion_price && item.half_portion_price) {
    priceHTML = `
      <div class="item-price">
        <span>${item.portion_price}€</span>
        <span class="half-price">½ ${item.half_portion_price}€</span>
      </div>
    `;
  } else if (item.portion_price) {
    priceHTML = `<div class="item-price">${item.portion_price}€</div>`;
  } else if (item.half_portion_price) {
    priceHTML = `<div class="item-price">½ ${item.half_portion_price}€</div>`;
  } else if (item.price) {
    priceHTML = `<div class="item-price">${item.price}€</div>`;
  } else {
    priceHTML = "";
  }

  row.innerHTML = `
    <div class="item-name">${item[`name_${lang}`] || item.name_es}</div>
    ${priceHTML}
  `;
  return row;
}
