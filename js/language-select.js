// -------------------------------------------------------------
// language-select.js
// Controlador de selección de idioma para Nou Delfín
// Funciona incluso si el header se carga dinámicamente vía JS
// -------------------------------------------------------------

document.addEventListener("DOMContentLoaded", initLanguageSelector);
document.addEventListener("headerLoaded", initLanguageSelector);

// Para evitar dobles inicializaciones
let languageSelectorInitialized = false;

function initLanguageSelector() {
  if (languageSelectorInitialized) return;

  // Intentar encontrar botones de idioma
  const buttons = document.querySelectorAll(
    ".language-selector button, .lang-btn"
  );

  if (buttons.length === 0) {
    // Header aún no cargado → reintentar más tarde
    setTimeout(initLanguageSelector, 50);
    return;
  }

  languageSelectorInitialized = true;

  // Idioma por defecto
  const defaultLang = "es";

  // Cargar idioma guardado
  const savedLang = localStorage.getItem("selectedLang") || defaultLang;

  // Aplicar idioma inicial
  applyLanguage(savedLang);

  // Activar eventos de botones
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;

      // Guardar idioma
      localStorage.setItem("selectedLang", lang);

      // Aplicar idioma
      applyLanguage(lang);
    });
  });
}

// -------------------------------------------------------------
// FUNCIÓN PRINCIPAL DE TRADUCCIÓN
// Lee los atributos data-xx y actualiza texto
// -------------------------------------------------------------
function applyLanguage(lang) {
  const translatableElements = document.querySelectorAll("[data-es]");

  translatableElements.forEach((el) => {
    const translation = el.dataset[lang];
    if (translation) el.textContent = translation;
  });

  highlightActiveFlag(lang);

  // Notificar cambio a otros módulos
  document.dispatchEvent(
    new CustomEvent("languageChanged", { detail: { lang } })
  );
}

// -------------------------------------------------------------
// MARCAR VISUALMENTE LA BANDERA ACTIVA
// -------------------------------------------------------------
function highlightActiveFlag(lang) {
  const buttons = document.querySelectorAll(
    ".language-selector button, .lang-btn"
  );

  buttons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
}
