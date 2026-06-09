/**
 * Lógica de interacción principal y flujos de usuario (SPA)
 * para la presentación de químicos de Soluciones Singulares en Salud.
 */

// Estado global de la aplicación
const AppState = {
  activeArea: null,
  quoteCart: [], // Array de objetos { id, name, area, qty }
  isClickLocked: false, // Bloqueo permanente al hacer clic para evitar pérdidas por mouseleave accidental
};

// Variable para controlar el retraso (debounce) en las transiciones de hover y evitar el "hover storm"
let hoverTimeout = null;

document.addEventListener("DOMContentLoaded", () => {
  initColumnTransitions();
  initProductDrawer();
  initQuoteSystem();
  renderCatalogProducts();
  initAlbercaProductSwitcher();
  initSpaProductSwitcher();
  initGymProductSwitcher();
  initGastronomiaProductSwitcher();
  initMantenimientoProductSwitcher();
});

/**
 * 1. TRANSICIONES DE COLUMNAS (SPA)
 */
function initColumnTransitions() {
  const columns = document.querySelectorAll(".area-column");
  const container = document.querySelector(".columns-container");

  columns.forEach((column) => {
    // Evento de hover para computadoras (menú de inicio vertical)
    column.addEventListener("mouseenter", function () {
      // CRÍTICO: Si ya estamos en vista expandida o de pestañas superiores, ignorar por completo
      // el mouseenter directo en el cuerpo de las columnas. Las transiciones en modo horizontal
      // solo deben ser provocadas por los triggers estáticos (.tab-trigger) a z-index 150.
      if (container.classList.contains("has-hover-active") || container.classList.contains("has-active-column")) {
        return;
      }

      const areaId = this.getAttribute("data-area");
      
      // Limpiar cualquier transición pendiente anterior
      if (hoverTimeout) clearTimeout(hoverTimeout);

      // Debounce de 50ms en la primera apertura vertical para asegurar estabilidad
      hoverTimeout = setTimeout(() => {
        activateColumnHover(this, areaId, container);
      }, 50);
    });

    // Evento de click para bloquear vista y soporte táctil
    column.addEventListener("click", function (e) {
      if (e.target.closest("button") || e.target.closest(".close-section-btn") || e.target.closest(".product-actions")) return;

      // Limpiar cualquier transición por hover pendiente al hacer clic
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
      }

      const areaId = this.getAttribute("data-area");
      activateColumnClick(this, areaId, container);
    });
  });

  // Triggers estáticos para las pestañas superiores (evita el "hover storm" o "flickering" al deslizar por el menú horizontal)
  const tabTriggers = document.querySelectorAll(".tab-trigger");
  tabTriggers.forEach((trigger) => {
    const areaId = trigger.getAttribute("data-area");
    const targetCol = document.getElementById(`col-${areaId}`);

    trigger.addEventListener("mouseenter", function () {
      if (targetCol) {
        targetCol.classList.add("tab-hovered");
        
        // Limpiar cualquier transición por hover pendiente
        if (hoverTimeout) clearTimeout(hoverTimeout);

        // Debounce estratégico de 80ms para evitar parpadeos y cambios rápidos accidentales al deslizar el cursor a través de las pestañas
        hoverTimeout = setTimeout(() => {
          activateColumnHover(targetCol, areaId, container);
        }, 80);
      }
    });

    trigger.addEventListener("mouseleave", function () {
      if (targetCol) {
        targetCol.classList.remove("tab-hovered");
      }
      
      // Limpiar timeout si el cursor sale de la pestaña antes de cumplirse el debounce
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
      }
    });

    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      
      // Limpiar cualquier transición por hover pendiente al hacer clic
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
      }

      if (targetCol) {
        activateColumnClick(targetCol, areaId, container);
      }
    });
  });

  // Evento de salida del contenedor general (restablece al menú si no está bloqueado por clic)
  container.addEventListener("mouseleave", function () {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }
    if (!AppState.isClickLocked) {
      deactivateHoverTransitions(container);
    }
  });

  // Botones de cierre de sección
  const closeBtns = document.querySelectorAll(".close-section-btn");
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation(); // Detener propagación
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
      }
      deactivateAllColumns(container);
    });
  });
}

function activateColumnHover(columnElem, areaId, containerElem) {
  // Si ya es la columna hover-active actual, no hacer nada
  if (columnElem.classList.contains("hover-active")) return;

  AppState.activeArea = areaId;
  
  // Agregar clases para activar layouts y ocultar encabezado general
  document.body.classList.add("section-active");
  containerElem.classList.add("has-hover-active");
  
  // Limpiar hover activo y clase active de las demás para evitar superposiciones
  const allCols = containerElem.querySelectorAll(".area-column");
  allCols.forEach(c => {
    c.classList.remove("hover-active");
    if (c !== columnElem) {
      c.classList.remove("active");
    }
  });
  
  columnElem.classList.add("hover-active");
  
  // Si está bloqueado por clic, transferir la clase active a la columna actual
  if (AppState.isClickLocked) {
    columnElem.classList.add("active");
    containerElem.classList.add("has-active-column");
  }

  // Renderizar la calculadora correspondiente
  if (CALCULATORS[areaId]) {
    CALCULATORS[areaId].render(`calc-container-${areaId}`);
  }
}

function activateColumnClick(columnElem, areaId, containerElem) {
  AppState.isClickLocked = true;
  
  // Sincronizar el estado active con el estado hover para compatibilidad en estilos y touch
  containerElem.classList.add("has-active-column");
  
  const allCols = containerElem.querySelectorAll(".area-column");
  allCols.forEach(c => c.classList.remove("active"));
  columnElem.classList.add("active");
  
  activateColumnHover(columnElem, areaId, containerElem);
}

function deactivateHoverTransitions(containerElem) {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
    hoverTimeout = null;
  }

  containerElem.classList.remove("has-hover-active");
  const allCols = containerElem.querySelectorAll(".area-column");
  allCols.forEach(c => {
    c.classList.remove("hover-active");
    c.classList.remove("tab-hovered");
  });

  if (!AppState.isClickLocked) {
    document.body.classList.remove("section-active");
    AppState.activeArea = null;
  }
}

function deactivateAllColumns(containerElem) {
  if (hoverTimeout) {
    clearTimeout(hoverTimeout);
    hoverTimeout = null;
  }

  AppState.isClickLocked = false;
  AppState.activeArea = null;
  
  containerElem.classList.remove("has-hover-active");
  containerElem.classList.remove("has-active-column");
  
  const allCols = containerElem.querySelectorAll(".area-column");
  allCols.forEach(c => {
    c.classList.remove("hover-active");
    c.classList.remove("active");
    c.classList.remove("tab-hovered");
  });
  
  document.body.classList.remove("section-active");
}

/**
 * 2. RENDERIZADO DEL CATÁLOGO DE PRODUCTOS
 */
function renderCatalogProducts() {
  // Recorrer cada área en la base de datos
  Object.keys(PRODUCTS_DATA).forEach((areaId) => {
    const areaData = PRODUCTS_DATA[areaId];
    const catalogGrid = document.getElementById(`catalog-grid-${areaId}`);
    if (!catalogGrid) return;

    let cardsHtml = "";
    areaData.products.forEach((product) => {
      // Determinar icono SVG adecuado
      let iconSvg = getProductIconSvg(product.id);

      cardsHtml += `
        <div class="product-card" style="color: ${areaData.accentColor}" data-product-id="${product.id}">
          <div class="product-icon-container">
            ${iconSvg}
          </div>
          <div class="product-details">
            <span class="product-badge">${product.badge}</span>
            <h4 class="product-name">${product.name}</h4>
            <span class="product-tagline">${product.tagline}</span>
            <p class="product-description">${product.description.substring(0, 120)}...</p>
            <div class="product-actions">
              <button class="btn-details" onclick="showProductDetails('${product.id}', '${areaId}')">
                <svg style="width:14px; height:14px; fill:none; stroke:currentColor; stroke-width:2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
                </svg>
                Ficha Técnica
              </button>
            </div>
          </div>
        </div>
      `;
    });

    catalogGrid.innerHTML = cardsHtml;
  });
}

function getProductIconSvg(productId) {
  // Iconos SVG personalizados según el producto
  const icons = {
    // Taller de Servicio
    swipe_taller: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    motor_foam: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    shock: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-linecap="round" stroke-linejoin="round"/></svg>`, // Lightning bolt
    rust_off: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 8v4M12 16h.01" stroke-linecap="round" stroke-linejoin="round"/></svg>`, // Shield warning
    biodegreaser: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

    // Showroom
    magic_showroom: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" stroke-linecap="round"/></svg>`,
    sure_thing_showroom: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" stroke-linecap="round"/><path d="M12 8v4l3 3" stroke-linecap="round"/></svg>`,
    swipol_showroom: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    swipe_showroom: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

    // Estética
    somthin_else: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8" stroke-linecap="round"/></svg>`,
    car_shine: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    alubrite: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" stroke-linecap="round"/><path d="M12 6c-2.5 0-4 1.5-4 4 0 4 3 5 3 7.5S9.5 20 7 20" stroke-linecap="round"/></svg>`,
    steelbrite: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM16 8l3 3M9.5 14.5l-1.5 1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

    // Sanitarios
    brite_sanitarios: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    brite_gel_sanitarios: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    swipol_sanitarios: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" stroke-linecap="round"/><path d="M12 6c-2.5 0-4 1.5-4 4 0 4 3 5 3 7.5S9.5 20 7 20" stroke-linecap="round"/></svg>`,
    blue_genie_sanitarios: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    hand_soap_sanitarios: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

    // Oficinas
    magic_oficinas: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" stroke-linecap="round"/></svg>`,
    swipol_oficinas: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" stroke-linecap="round"/><path d="M12 6c-2.5 0-4 1.5-4 4 0 4 3 5 3 7.5S9.5 20 7 20" stroke-linecap="round"/></svg>`,
    swipe_oficinas: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    sure_thing_oficinas: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" stroke-linecap="round"/><path d="M12 8v4l3 3" stroke-linecap="round"/></svg>`,

    // Otros
    audit_service: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20V10M18 20V4M6 20v-4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    demo_cocina: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1.5-3-1 1-1.5 1.62-1.5 3a2.5 2.5 0 0 0 .5 2.5zM12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    swipe_concentrate: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  };
  
  return icons[productId] || icons.swipe_concentrate;
}
function initProductDrawer() {
  const overlay = document.getElementById("drawer-overlay");
  const closeBtn = document.getElementById("drawer-close");

  const closeDrawer = () => {
    overlay.classList.remove("open");
  };

  closeBtn.addEventListener("click", closeDrawer);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeDrawer();
  });
}

window.showProductDetails = function (productId, areaId) {
  AppState.isClickLocked = true; // Bloquear colapso durante visualización de ficha técnica
  const product = PRODUCTS_DATA[areaId].products.find((p) => p.id === productId);
  if (!product) return;

  const overlay = document.getElementById("drawer-overlay");
  const content = document.getElementById("drawer-content-body");

  // Inyectar el color de acento de la sección al drawer
  const accentColor = PRODUCTS_DATA[areaId].accentColor;
  const drawerEl = document.querySelector(".product-drawer");
  drawerEl.style.borderColor = accentColor;
  drawerEl.style.color = accentColor;

  // Construir HTML del cajón
  let benefitsHtml = product.benefits.map((b) => `<li class="drawer-list-item">${b}</li>`).join("");

  content.innerHTML = `
    <div class="drawer-header-info">
      <span class="product-badge" style="color: ${accentColor}; border-color: ${accentColor}">${product.badge}</span>
      <h2 class="product-name" style="font-size: 2.2rem; color: #fff; margin-top:0.5rem; font-family: var(--font-title); font-weight:800;">${product.name}</h2>
      <p class="product-tagline" style="color: ${accentColor}; font-weight:600; font-size:1rem; margin-top:0.2rem;">${product.tagline}</p>
    </div>
    
    <div class="drawer-content">
      <div class="drawer-section">
        <h4 class="drawer-sec-title" style="color: ${accentColor}">Descripción</h4>
        <p class="drawer-sec-content">${product.description}</p>
      </div>

      <div class="drawer-section">
        <h4 class="drawer-sec-title" style="color: ${accentColor}">Beneficios Clave</h4>
        <ul class="drawer-list" style="color: var(--color-glass-text)">
          ${benefitsHtml}
        </ul>
      </div>

      <div class="drawer-section" style="background: rgba(255,255,255,0.02); padding: 1.2rem; border-radius:12px; border: 1px solid rgba(255,255,255,0.04)">
        <h4 class="drawer-sec-title" style="color: ${accentColor}; margin-bottom: 0.5rem">Guía de Dosificación</h4>
        <div style="font-size: 0.85rem; line-height:1.5;">
          <p style="margin-bottom:0.4rem;"><strong>Aplicación:</strong> ${product.usage}</p>
          <p style="margin-bottom:0.4rem;"><strong>Dosificación:</strong> ${product.dosage}</p>
          <p><strong>Dilución / Método:</strong> ${product.dilution}</p>
        </div>
      </div>

      <div class="safety-alert-box">
        <span class="safety-icon">⚠️</span>
        <div class="safety-text">
          <strong>Seguridad y Manejo:</strong> ${product.safety}
        </div>
      </div>
    </div>
  `;

  // Abrir Drawer
  overlay.classList.add("open");
};

/**
 * 4. SISTEMA DE COTIZACIÓN (CARRITO Y FORMULARIO)
 */
function initQuoteSystem() {
  const floatingBar = document.getElementById("quotes-floating-bar-container");
  const openModalBtn = document.getElementById("btn-open-quotes");
  const modalOverlay = document.getElementById("quotes-modal-overlay");
  const closeModalBtn = document.getElementById("quotes-close-modal");
  const quoteForm = document.getElementById("quotes-form-submit");

  if (!floatingBar || !modalOverlay || !closeModalBtn || !quoteForm) return;

  // Abrir Modal
  floatingBar.addEventListener("click", (e) => {
    // Si se hace click en el botón o en la barra en general
    openQuotesModal();
  });

  // Cerrar Modal
  const closeQuotesModal = () => {
    modalOverlay.classList.remove("open");
  };

  closeModalBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeQuotesModal();
  });
  
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeQuotesModal();
  });

  // Envío de Formulario
  quoteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    submitQuoteRequest();
  });
}

window.addToQuoteCart = function (productId, areaId) {
  AppState.isClickLocked = true; // Bloquear colapso al añadir productos
  const product = PRODUCTS_DATA[areaId].products.find((p) => p.id === productId);
  if (!product) return;

  // Buscar si ya existe en el carrito
  const existingItem = AppState.quoteCart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    AppState.quoteCart.push({
      id: productId,
      name: product.name,
      area: areaId,
      areaTitle: PRODUCTS_DATA[areaId].title,
      qty: 1,
    });
  }

  updateQuoteUI();
  
  // Pequeño efecto visual en la tarjeta
  const card = document.querySelector(`.product-card[data-product-id="${productId}"]`);
  if (card) {
    card.style.transform = "scale(0.98)";
    setTimeout(() => {
      card.style.transform = "";
    }, 150);
  }
};

function updateQuoteUI() {
  const floatingBar = document.getElementById("quotes-floating-bar-container");
  const badgeCount = document.getElementById("quotes-badge-count");
  if (!floatingBar || !badgeCount) return;
  
  const totalItems = AppState.quoteCart.reduce((sum, item) => sum + item.qty, 0);

  if (totalItems > 0) {
    badgeCount.innerText = totalItems;
    floatingBar.classList.add("visible");
  } else {
    floatingBar.classList.remove("visible");
    const modalOverlay = document.getElementById("quotes-modal-overlay");
    if (modalOverlay) modalOverlay.classList.remove("open");
  }
}

function openQuotesModal() {
  AppState.isClickLocked = true; // Bloquear colapso al abrir el cotizador principal
  const modalOverlay = document.getElementById("quotes-modal-overlay");
  const itemsContainer = document.getElementById("quotes-items-container");
  if (!modalOverlay || !itemsContainer) return;
  
  // Limpiar vista de éxito previo si lo hubiera y restaurar formulario
  const formPanel = document.querySelector(".quotes-form-panel");
  const successPanel = document.getElementById("quotes-success-panel");
  if (formPanel) formPanel.style.display = "flex";
  if (successPanel) successPanel.style.display = "none";
  
  renderQuoteItems();
  modalOverlay.classList.add("open");
}

function renderQuoteItems() {
  const itemsContainer = document.getElementById("quotes-items-container");
  if (!itemsContainer) return;
  
  if (AppState.quoteCart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="empty-quote-msg">
        <svg style="width: 48px; height: 48px; stroke: var(--color-text-muted); stroke-width: 1.5; fill:none;" viewBox="0 0 24 24">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>No has seleccionado ningún producto aún.</span>
      </div>
    `;
    return;
  }

  let html = "";
  AppState.quoteCart.forEach((item) => {
    const areaColor = PRODUCTS_DATA[item.area].accentColor;
    html += `
      <div class="quote-item-row" style="border-left: 3px solid ${areaColor}">
        <div class="quote-item-info">
          <span class="quote-item-name">${item.name}</span>
          <span class="quote-item-area" style="color: ${areaColor}">${item.areaTitle}</span>
        </div>
        <div class="quote-item-controls">
          <button class="quote-qty-btn" onclick="adjustQuoteQty('${item.id}', -1)">-</button>
          <span class="quote-qty-val">${item.qty}</span>
          <button class="quote-qty-btn" onclick="adjustQuoteQty('${item.id}', 1)">+</button>
          <button class="quote-remove-btn" onclick="removeQuoteItem('${item.id}')">
            <svg style="width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width:2" viewBox="0 0 24 24">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  });

  itemsContainer.innerHTML = html;
}

window.adjustQuoteQty = function (productId, delta) {
  const item = AppState.quoteCart.find((i) => i.id === productId);
  if (!item) return;

  item.qty += delta;
  
  if (item.qty <= 0) {
    removeQuoteItem(productId);
  } else {
    updateQuoteUI();
    renderQuoteItems();
  }
};

window.removeQuoteItem = function (productId) {
  AppState.quoteCart = AppState.quoteCart.filter((item) => item.id !== productId);
  updateQuoteUI();
  renderQuoteItems();
};

function submitQuoteRequest() {
  const formPanel = document.querySelector(".quotes-form-panel");
  const successPanel = document.getElementById("quotes-success-panel");
  if (!formPanel || !successPanel) return;
  
  // Obtener valores de campos
  const name = document.getElementById("client-name") ? document.getElementById("client-name").value : "";
  const dept = document.getElementById("client-dept") ? document.getElementById("client-dept").value : "";
  const email = document.getElementById("client-email") ? document.getElementById("client-email").value : "";
  
  // Simulador de envío premium de cotización
  formPanel.style.display = "none";
  successPanel.style.display = "flex";
  
  // Vaciar carrito
  AppState.quoteCart = [];
  setTimeout(() => {
    updateQuoteUI();
  }, 3000);
}

/**
 * 5. CONTROLADOR INTERACTIVO DE QUIRÓFANOS & UCI
 */
// Generic product switcher initialization
function initProductSwitcher(areaKey, tabClass, selectorId) {
  const tabs = document.querySelectorAll(tabClass);
  const selector = document.getElementById(selectorId);
  if (!tabs.length || !selector) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.stopPropagation(); // Evitar cerrar o activar columnas del acordeón
      
      const productId = this.getAttribute("data-product-id");
      if (!productId) return;

      // Cambiar clase active en las pestañas
      tabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Buscar el producto en PRODUCTS_DATA
      const product = PRODUCTS_DATA[areaKey].products.find((p) => p.id === productId);
      if (!product) return;

      // Actualizar el panel correspondiente
      updateDisplay(areaKey, product);
    });
  });

  // Inicializar con el primer producto activo
  const activeTab = selector.querySelector(tabClass + ".active");
  if (activeTab) {
    const initialId = activeTab.getAttribute("data-product-id");
    const initialProduct = PRODUCTS_DATA[areaKey].products.find((p) => p.id === initialId);
    if (initialProduct) updateDisplay(areaKey, initialProduct);
  }
}

// 5 Area initializers wrappers called on load
function initAlbercaProductSwitcher() {
  initProductSwitcher("alberca", ".alberca-product-tab", "alberca-products-selector");
}
function initSpaProductSwitcher() {
  initProductSwitcher("spa", ".spa-product-tab", "spa-products-selector");
}
function initGymProductSwitcher() {
  initProductSwitcher("gimnasio", ".gym-product-tab", "gym-products-selector");
}
function initGastronomiaProductSwitcher() {
  initProductSwitcher("gastronomia", ".gastronomia-product-tab", "gastronomia-products-selector");
}
function initMantenimientoProductSwitcher() {
  initProductSwitcher("mantenimiento", ".mantenimiento-product-tab", "mantenimiento-products-selector");
}

// Generic display updater function for all sections
function updateDisplay(areaKey, product) {
  let prefix = areaKey;
  if (areaKey === "gimnasio") {
    prefix = "gym";
  }

  const spotlightCard = document.getElementById(`${prefix}-spotlight-card`);
  const imgEl = document.getElementById(`${prefix}-spotlight-img`);
  const svgContainer = document.getElementById(`${prefix}-spotlight-svg-container`);
  const quoteBtn = document.getElementById(`${prefix}-add-to-quote-btn`);
  const featuresColumn = document.getElementById(`${prefix}-features-column`);

  if (!spotlightCard || !featuresColumn) return;

  // Añadir un pequeño efecto de fade-out temporal para la transición
  featuresColumn.style.opacity = "0";
  featuresColumn.style.transform = "translateY(10px)";
  featuresColumn.style.transition = "all 0.3s ease";
  
  spotlightCard.style.opacity = "0.5";
  spotlightCard.style.transform = "scale(0.98)";

  setTimeout(() => {
    // 1. Actualizar imagen o SVG en el spotlight
    if (product.image) {
      if (imgEl) {
        imgEl.src = product.image;
        imgEl.style.display = "block";
      }
      if (svgContainer) svgContainer.style.display = "none";
    } else {
      if (imgEl) imgEl.style.display = "none";
      if (svgContainer) {
        const iconSvg = getProductIconSvg(product.id);
        svgContainer.innerHTML = iconSvg;
        const svgInner = svgContainer.querySelector("svg");
        if (svgInner) {
          svgInner.style.width = "120px";
          svgInner.style.height = "120px";
          svgInner.style.strokeWidth = "1.2";
        }
        svgContainer.style.display = "block";
      }
    }

    // 2. Actualizar botón de cotización
    if (quoteBtn) {
      quoteBtn.setAttribute("onclick", `addToQuoteCart('${product.id}', '${areaKey}')`);
    }

    // 3. Generar las características técnicas dinámicas en base al JSON
    let featuresHtml = `
      <div class="${prefix}-feature-card">
        <div class="${prefix}-feature-icon-container">
          <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="${prefix}-feature-text">
          <h4>Descripción del Producto</h4>
          <p>${product.description}</p>
        </div>
      </div>
      <div class="${prefix}-feature-card">
        <div class="${prefix}-feature-icon-container">
          <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="${prefix}-feature-text">
          <h4>Beneficios Clave</h4>
          <ul style="font-size: 0.85rem; line-height: 1.5; color: var(--color-glass-text); padding-left: 1.2rem; margin: 0.3rem 0 0 0;">
            ${product.benefits.map(b => `<li style="margin-bottom: 0.3rem;">${b}</li>`).join("")}
          </ul>
        </div>
      </div>
      <div class="${prefix}-feature-card">
        <div class="${prefix}-feature-icon-container">
          <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="${prefix}-feature-text">
          <h4>Guía de Uso Rápido y Dilución</h4>
          <p><strong>Uso Recomendado:</strong> ${product.usage}<br><strong>Dosificación / Dilución:</strong> ${product.dosage}<br><strong>Método:</strong> ${product.dilution}</p>
        </div>
      </div>
      <div class="${prefix}-feature-card">
        <div class="${prefix}-feature-icon-container">
          <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="${prefix}-feature-text">
          <h4>Seguridad e Impacto Ambiental</h4>
          <p><strong>Manejo Seguro:</strong> ${product.safety}<br><strong>pH en Solución:</strong> ${product.phImpact || 'Neutro.'}</p>
        </div>
      </div>
    `;

    featuresColumn.innerHTML = featuresHtml;

    // Restaurar opacidades con animaciones suaves
    featuresColumn.style.opacity = "1";
    featuresColumn.style.transform = "translateY(0)";
    
    spotlightCard.style.opacity = "1";
    spotlightCard.style.transform = "scale(1)";
  }, 150);
}
