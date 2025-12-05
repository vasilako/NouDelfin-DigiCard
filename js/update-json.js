document.addEventListener("DOMContentLoaded", () => {
  // Render inicial según idioma guardado
  renderMenu(getCurrentLang());

  // Vuelve a renderizar cuando cambie el idioma
  document.addEventListener("languageChanged", (e) => {
    renderMenu(e.detail.lang);
  });
});

function getCurrentLang() {
  return localStorage.getItem("selectedLang") || "es";
}

async function renderMenu(lang) {
  const res = await fetch("JSON/menu_bebidas.json");
  const data = await res.json();
  const root = document.getElementById("menu-bebidas");
  root.innerHTML = "";

  data.sections.forEach((section) => {
    // Título de sección
    const title = document.createElement("h2");
    title.className = "menu-section-title";
    title.textContent =
      section[`${lang.toUpperCase()}_title`] || section.ES_title;
    root.appendChild(title);

    // Si tiene items simples
    if (section.items) {
      section.items.forEach((item) => {
        root.appendChild(renderItem(item, lang));
      });
    }

    // Si tiene subsecciones (como los vinos)
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
  });
}

function renderItem(item, lang) {
  const row = document.createElement("div");
  row.className = "menu-item";
  row.innerHTML = `
    <div class="item-name">${item[`name_${lang}`] || item.name_es}</div>
    <div class="item-price">${item.price}€</div>
  `;
  return row;
}
