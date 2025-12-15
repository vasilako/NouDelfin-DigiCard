// update-comida.js — Render dinámico multilenguaje para carta de comida

document.addEventListener("DOMContentLoaded", () => {
  renderMenu(getCurrentLang());

  document.addEventListener("languageChanged", (e) => {
    renderMenu(e.detail.lang);
  });
});

function getCurrentLang() {
  return (localStorage.getItem("selectedLang") || "es").toLowerCase();
}

async function renderMenu(lang) {
  lang = lang.toLowerCase(); // Asegura que siempre sea minúscula
  const res = await fetch("JSON/menu_comida.json");
  const data = await res.json();
  const root = document.getElementById("menu-comida");
  root.innerHTML = "";
  data.sections.forEach((section) => console.log(section));

  data.sections.forEach((section) => {
    // No renderizar si no hay items ni sub-sections
    if (!(section.items || section.sub_sections)) return;

    const sectionWrapper = document.createElement("section");
    sectionWrapper.className = "menu-section";

    const title = document.createElement("h2");
    title.className = "menu-section-title";
    title.textContent =
      section[`${lang.toUpperCase()}_title`] || section.ES_title;

    sectionWrapper.appendChild(title);

    // Sub-secciones
    if (section.sub_sections) {
      section.sub_sections.forEach((sub) => {
        const subTitle = document.createElement("h3");
        subTitle.className = "sub-section-title";
        subTitle.textContent =
          sub[`${lang.toUpperCase()}_SubTitle`] || sub.ES_SubTitle;

        sectionWrapper.appendChild(subTitle);

        sub.items.forEach((item) => {
          sectionWrapper.appendChild(renderItem(item, lang));
        });
      });
    }

    // Items directos
    if (section.items) {
      section.items.forEach((item) => {
        sectionWrapper.appendChild(renderItem(item, lang));
      });
    }

    root.appendChild(sectionWrapper);
  });
}

function renderItem(item, lang) {
  lang = lang.toLowerCase();
  const row = document.createElement("div");
  row.className = "menu-item";

  // Precios
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
