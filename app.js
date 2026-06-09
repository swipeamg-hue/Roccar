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
    shock_cloro: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    alguicida_max: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" stroke-linecap="round"/><path d="M12 6c-2.5 0-4 1.5-4 4 0 4 3 5 3 7.5S9.5 20 7 20" stroke-linecap="round"/></svg>`,
    clarificador_gold: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    ph_balance: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76zM16 8l3 3M9.5 14.5l-1.5 1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    eucalyptus_vapor: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" stroke-linecap="round"/></svg>`,
    organic_sanitizer: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    linen_relax: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    jacuzzi_clear: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" stroke-linecap="round"/><path d="M8 12h8" stroke-linecap="round"/></svg>`,
    gym_spray: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.5-2.5 3.5-2.5 5.5h20c0-2-1-4-2.5-5.5" stroke-linecap="round"/><path d="M12 2v14M8 5l4-3 4 3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    odor_kill: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" stroke-linecap="round"/><path d="M12 8v4l3 3" stroke-linecap="round"/></svg>`,
    floor_active: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M3 3h18v18H3V3zM9 9h6v6H9V9z" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    dermo_wash: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    grease_remover: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1.5-3-1 1-1.5 1.62-1.5 3a2.5 2.5 0 0 0 .5 2.5zM12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    dish_auto: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    fruit_wash: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" stroke-linecap="round"/><path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    surface_food: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    swipe_concentrate: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    brite_gel: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    blue_genie: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    eco_doser: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="4"/><path d="M12 8v8M8 12h8"/></svg>`,
    audit_service: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20V10M18 20V4M6 20v-4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    demo_alberca: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" stroke-linecap="round"/></svg>`,
    demo_cocina: `<svg class="product-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1.5-3-1 1-1.5 1.62-1.5 3a2.5 2.5 0 0 0 .5 2.5zM12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    swipol_mantenimiento: `<svg class="product-icon-svg" viewBox="0 0 24 24"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" stroke-linecap="round"/><path d="M12 6c-2.5 0-4 1.5-4 4 0 4 3 5 3 7.5S9.5 20 7 20" stroke-linecap="round"/></svg>`
  };
  
  return icons[productId] || icons.swipe_concentrate;
}

/**
 * 3. CAJÓN DE DETALLES (DRAWER DE PRODUCTO)
 */
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
function initAlbercaProductSwitcher() {
  const tabs = document.querySelectorAll(".alberca-product-tab");
  const selector = document.getElementById("alberca-products-selector");
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
      const product = PRODUCTS_DATA.alberca.products.find((p) => p.id === productId);
      if (!product) return;

      // Actualizar el panel derecho
      updateAlbercaDisplay(product);
    });
  });

  // Inicializar dinámicamente con el primer producto activo
  const activeTab = selector.querySelector(".alberca-product-tab.active");
  if (activeTab) {
    const initialId = activeTab.getAttribute("data-product-id");
    const initialProduct = PRODUCTS_DATA.alberca.products.find((p) => p.id === initialId);
    if (initialProduct) updateAlbercaDisplay(initialProduct);
  }
}

function updateAlbercaDisplay(product) {
  const spotlightCard = document.getElementById("alberca-spotlight-card");
  const imgEl = document.getElementById("alberca-spotlight-img");
  const svgContainer = document.getElementById("alberca-spotlight-svg-container");
  const quoteBtn = document.getElementById("alberca-add-to-quote-btn");
  const featuresColumn = document.getElementById("alberca-features-column");

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
      imgEl.src = product.image;
      imgEl.style.display = "block";
      svgContainer.style.display = "none";
    } else {
      imgEl.style.display = "none";
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

    // 2. Actualizar botón de cotización
    if (quoteBtn) {
      quoteBtn.setAttribute("onclick", `addToQuoteCart('${product.id}', 'alberca')`);
    }

    // 3. Generar las características técnicas dinámicas
    let featuresHtml = "";

    if (product.id === "swipol_quirurgico") {
      featuresHtml = `
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Acción Viricida y Bactericida en 30 Segundos</h4>
            <p>Su cuaternario de amonio de quinta generación actúa en tiempo récord, eliminando virus envueltos, bacterias multirresistentes (como MRSA), hongos y levaduras. Ideal para los tiempos de rotación rápidos que se requieren entre cirugías.</p>
          </div>
        </div>
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Seguridad Total para el Entorno Crítico</h4>
            <p>Fórmula incolora e inodora, cero vapores o aromas químicos irritantes. Seguro para el personal médico y para los pacientes bajo anestesia en UCI. No es irritante para la piel ni compromete el bienestar del paciente.</p>
          </div>
        </div>
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" stroke-linecap="round"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Compatibilidad con Equipo Médico de Alta Tecnología</h4>
            <p>Alta compatibilidad con plásticos técnicos, acrílicos, pantallas táctiles de monitores, ventiladores, bombas de infusión y acero inoxidable quirúrgico, sin deteriorar ni opacar las superficies.</p>
          </div>
        </div>
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Guía de Uso Rápido y Diluciones</h4>
            <p><strong>Superficies Generales (1:200):</strong> Aplicar con atomizador, frotar y dejar secar. Sin enjuague. <br><strong>Grado Quirúrgico - Alta Carga (1:100):</strong> Para áreas de riesgo biológico elevado. <br><strong>Pisos de Quirófano (1:120):</strong> Trapear regularmente. <br><strong>Nebulización Ambiental (1:60):</strong> Sanitización profunda del espacio. <br><span style="color: #05e6b4; font-weight: 600;">✓ Biodegradabilidad certificada 95.70%. No mezclar con jabones aniónicos o cloro.</span></p>
          </div>
        </div>
      `;
    } else if (product.id === "peracetic_esterilizante") {
      featuresHtml = `
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Esterilización de Amplio Espectro</h4>
            <p>Elimina de manera contundente todo tipo de microorganismos patógenos, incluyendo bacterias, virus, levaduras, hongos y esporas. Altamente recomendado para la desinfección profunda de equipo médico y superficies críticas del quirófano.</p>
          </div>
        </div>
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" stroke-linecap="round"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Esterilización en Frío de Instrumental Termosensible</h4>
            <p>Permite la esterilización de endoscopios, citoscopios y laparoscopios por simple inmersión, sin requerir autoclaves u otros sistemas de alto costo energético. Protocolos validados para instrumental delicado.</p>
          </div>
        </div>
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Fórmula Biodegradable e Inocua</h4>
            <p>Se descompone en agua, oxígeno y ácido acético, sin dejar ningún tipo de residuo tóxico o peligroso en los instrumentos, en el ambiente del quirófano ni en el sistema de drenaje del hospital. Cumple los más altos estándares ecológicos.</p>
          </div>
        </div>
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Guía de Uso Rápido y Precauciones</h4>
            <p><strong>Esterilización de Instrumental (Inmersión):</strong> Sumergir el equipo completamente en la solución diluida durante el tiempo recomendado por el fabricante del instrumento. <br><strong>Desinfección Superficial de Quirófanos (1:50):</strong> Diluir en agua desmineralizada y aplicar con rociador en toda el área quirúrgica. <br><span style="color: #ff5a5a; font-weight: 600;">⚠️ Obligatorio usar EPP completo (guantes, lentes y mascarilla). Trabajar en áreas ventiladas. No usar sobre aluminio o cobre.</span></p>
          </div>
        </div>
      `;
    } else if (product.id === "swipe_quirofanos") {
      featuresHtml = `
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Limpieza de Superficies Clínicas</h4>
            <p>Emulsiona de forma rápida y efectiva la suciedad y materia orgánica acumulada en mesas de operaciones, camillas, tripiés y mobiliario de Quirófanos y UCI, sin dañar ni rayar los materiales.</p>
          </div>
        </div>
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Preparación Óptima para Desinfección</h4>
            <p>Elimina de raíz la capa de materia orgánica, grasa corporal y polvo que sirve de refugio a los patógenos, permitiendo que los sanitizantes posteriores alcancen el 100% de efectividad germicida.</p>
          </div>
        </div>
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Sustentabilidad y Ahorro Financiero</h4>
            <p>Su ultra-concentración permite diluciones extremas en agua, reduciendo drásticamente el costo por litro de solución y garantizando ahorros del 35% al 50% en insumos de limpieza.</p>
          </div>
        </div>
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Guía de Uso Rápido y Aplicación</h4>
            <p><strong>Mantenimiento General (1:100):</strong> Diluir 1 parte de SWIPE por 100 de agua. Ideal para limpieza diaria de pisos epóxicos, paredes y vidrios. <br><strong>Lavado de Acero Inoxidable (1:12):</strong> Diluir 1 parte por 12 de agua para lavar mesas quirúrgicas, tripiés y equipos de acero. <br><span style="color: #05e6b4; font-weight: 600;">✓ Diluir preferentemente con la Pistola Rociadora SWIPE para obtener la dilución exacta sin mermas.</span></p>
          </div>
        </div>
      `;
    } else if (product.id === "hand_soap_foam_quirofanos") {
      featuresHtml = `
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Barrera Antimicrobiana Prolongada</h4>
            <p>Altamente efectivo en la eliminación de una amplia gama de bacterias, hongos y levaduras. Tras el lavado, su efecto permanece activo por 2 horas, protegiendo al personal médico en terapia intensiva.</p>
          </div>
        </div>
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Protección Dermatológica</h4>
            <p>Su pH balanceado (5.5 a 6.5) cuida la piel de las manos ante lavados frecuentes sin causar irritación. Para quirófanos se recomienda usar su versión sin fragancia ni color para evitar cualquier reactividad.</p>
          </div>
        </div>
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Control de Dosificación y Ahorro</h4>
            <p>Al dosificarse en espuma mediante el sistema SWIPE FOAMER, reduce el desperdicio y optimiza el consumo volumétrico, asegurando ahorros de entre el 35% y el 50% en insumos de higiene.</p>
          </div>
        </div>
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Guía de Uso Rápido</h4>
            <p><strong>Lavado Clínico:</strong> Aplicar espuma, frotar vigorosamente durante 1 minuto completo y enjuagar con agua. <br><strong>Asepsia Quirúrgica Estricta:</strong> Repetir la operación para una desinfección de nivel quirúrgico superior.</p>
          </div>
        </div>
      `;
    } else {
      // Fallback dinámico genérico
      featuresHtml = `
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Descripción del Producto</h4>
            <p>${product.description}</p>
          </div>
        </div>
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Beneficios Clave</h4>
            <ul style="font-size: 0.85rem; line-height: 1.5; color: var(--color-glass-text); padding-left: 1.2rem; margin: 0.3rem 0 0 0;">
              ${product.benefits.map(b => `<li style="margin-bottom: 0.3rem;">${b}</li>`).join("")}
            </ul>
          </div>
        </div>
        <div class="alberca-feature-card">
          <div class="alberca-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <div class="alberca-feature-text">
            <h4>Seguridad y Manejo</h4>
            <p><strong>Manejo Seguro:</strong> ${product.safety}<br><strong>Impacto en pH:</strong> ${product.phImpact || 'Neutro.'}</p>
          </div>
        </div>
      `;
    }

    featuresColumn.innerHTML = featuresHtml;

    // Restaurar opacidades con animaciones suaves
    featuresColumn.style.opacity = "1";
    featuresColumn.style.transform = "translateY(0)";
    
    spotlightCard.style.opacity = "1";
    spotlightCard.style.transform = "scale(1)";
  }, 150);
}

/**
 * 6. CONTROLADOR INTERACTIVO DE SPA & WELLNESS
 */
function initSpaProductSwitcher() {
  const tabs = document.querySelectorAll(".spa-product-tab");
  const selector = document.getElementById("spa-products-selector");
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
      const product = PRODUCTS_DATA.spa.products.find((p) => p.id === productId);
      if (!product) return;

      // Actualizar el panel derecho
      updateSpaDisplay(product);
    });
  });

  // Inicializar dinámicamente con el primer producto activo
  const activeTab = selector.querySelector(".spa-product-tab.active");
  if (activeTab) {
    const initialId = activeTab.getAttribute("data-product-id");
    const initialProduct = PRODUCTS_DATA.spa.products.find((p) => p.id === initialId);
    if (initialProduct) updateSpaDisplay(initialProduct);
  }
}

function updateSpaDisplay(product) {
  const spotlightCard = document.getElementById("spa-spotlight-card");
  const imgEl = document.getElementById("spa-spotlight-img");
  const svgContainer = document.getElementById("spa-spotlight-svg-container");
  const quoteBtn = document.getElementById("spa-add-to-quote-btn");
  const featuresColumn = document.getElementById("spa-features-column");

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
      imgEl.src = product.image;
      imgEl.style.display = "block";
      svgContainer.style.display = "none";
    } else {
      imgEl.style.display = "none";
      // Obtener el SVG correspondiente de getProductIconSvg
      const iconSvg = getProductIconSvg(product.id);
      svgContainer.innerHTML = iconSvg;
      // Hacer que el SVG sea grande y estilizado en el spotlight
      const svgInner = svgContainer.querySelector("svg");
      if (svgInner) {
        svgInner.style.width = "120px";
        svgInner.style.height = "120px";
        svgInner.style.strokeWidth = "1.2";
      }
      svgContainer.style.display = "block";
    }

    // 2. Actualizar botón de cotización
    if (quoteBtn) {
      quoteBtn.setAttribute("onclick", `addToQuoteCart('${product.id}', 'spa')`);
    }

    // 3. Generar las características técnicas dinámicas
    let featuresHtml = "";
    
    // Mapeo inteligente de características según el producto
    if (product.id === "hldh") {
      featuresHtml = `
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Poder Desinfectante a Base de Cloro</h4>
            <p>Integrado en la fórmula para garantizar la eliminación de patógenos comunes en sábanas, toallas y batas de pacientes.</p>
          </div>
        </div>
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8m-4-4v8"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Control de Espuma y Alta Eficiencia</h4>
            <p>Fórmula de baja espumación que protege las lavadoras industriales y optimiza el consumo de agua.</p>
          </div>
        </div>
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Agentes Antirredepositantes y Anticorrosivos</h4>
            <p>Previene que la suciedad disuelta se fije de nuevo en la tela y protege los componentes de acero inoxidable de los equipos.</p>
          </div>
        </div>
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Seguridad para Ropa Blanca y Colores Firmes</h4>
            <p>Su poder blanqueador es seguro para textiles hospitalarios que requieran desinfección sin decoloración.</p>
          </div>
        </div>
      `;
    } else if (product.id === "hldh_system_3") {
      featuresHtml = `
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Eliminación Especializada de Manchas de Sangre</h4>
            <p>Diseñado específicamente para erradicar las manchas de sangre, incluyendo el "mapa" residual en textiles clínicos, garantizando la recuperación de la prenda.</p>
          </div>
        </div>
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Aseguramiento de Desinfección Total</h4>
            <p>Su potente acción clorada garantiza la desinfección completa de las prendas, clave para romper la cadena de transmisión infecciosa en hospitales.</p>
          </div>
        </div>
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Blanqueo de Alto Rendimiento</h4>
            <p>Restaura y mantiene la blancura de sábanas, batas y toallas, proporcionando una apariencia de limpieza impecable y profesional.</p>
          </div>
        </div>
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Guía de Uso Rápido</h4>
            <p><strong>Uso:</strong> Exclusivo para prendas blancas. Ajustar dosis según clasificación. <strong>Precaución:</strong> Producto corrosivo (pH 11-14). No mezclar.</p>
          </div>
        </div>
      `;
    } else if (product.id === "emulsigraz") {
      featuresHtml = `
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1.5-3-1 1-1.5 1.62-1.5 3a2.5 2.5 0 0 0 .5 2.5zM12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Eliminación de Manchas Grasas Difíciles</h4>
            <p>Ideal para tratar ropa de cama, uniformes y mantelería de áreas de nutrición contaminados con aceites, pomadas o cremas medicinales.</p>
          </div>
        </div>
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Detergente Potenciador (Booster)</h4>
            <p>Refuerzo concentrado para emulsificar y dispersar grasas y aceites de origen vegetal, animal y mineral, previniendo la redeposición.</p>
          </div>
        </div>
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Alta Eficiencia Térmica</h4>
            <p>Formulado para funcionar óptimamente a altas temperaturas (80°C - 90°C), rango estándar utilizado en sanitización hospitalaria.</p>
          </div>
        </div>
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Guía de Uso Rápido</h4>
            <p><strong>Uso:</strong> Añadir en el ciclo principal. <strong>Dosis:</strong> 1.5 a 7 ml/kg de ropa seca. Operar a 80°C - 90°C por 8 minutos.</p>
          </div>
        </div>
      `;
    } else if (product.id === "soft") {
      featuresHtml = `
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Confort Superior para el Paciente</h4>
            <p>Imparte tersura y sensación esponjosa a sábanas, toallas y batas, mejorando la comodidad durante su estancia.</p>
          </div>
        </div>
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Percepción de Higiene Elevada</h4>
            <p>Deja un perfume delicado y persistente en las prendas, reforzando la sensación de limpieza e higiene impecable.</p>
          </div>
        </div>
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Eficiencia Operativa</h4>
            <p>Elimina la electricidad estática facilitando los procesos de planchado industrial, doblado y manipulación de blancos.</p>
          </div>
        </div>
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Cuidado del Equipo y Textiles</h4>
            <p>Fórmula biodegradable que no deja residuos en la maquinaria. Seguro para algodón, poliéster, lana, seda y ropa delicada.</p>
          </div>
        </div>
      `;
    } else {
      featuresHtml = `
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" stroke-linecap="round"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Descripción del Producto</h4>
            <p>${product.description}</p>
          </div>
        </div>
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Beneficios Clave</h4>
            <ul style="font-size: 0.85rem; line-height: 1.5; color: var(--color-glass-text); padding-left: 1.2rem; margin: 0.3rem 0 0 0;">
              ${product.benefits.map(b => `<li style="margin-bottom: 0.3rem;">${b}</li>`).join("")}
            </ul>
          </div>
        </div>
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Rendimiento y Dosificación</h4>
            <p><strong>Dosificación:</strong> ${product.dosage}<br><strong>Dilución / Método:</strong> ${product.dilution}</p>
          </div>
        </div>
        <div class="spa-feature-card">
          <div class="spa-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <div class="spa-feature-text">
            <h4>Seguridad e Impacto Ambiental</h4>
            <p><strong>Manejo Seguro:</strong> ${product.safety}<br><strong>Impacto en pH:</strong> ${product.phImpact || 'Neutro.'}</p>
          </div>
        </div>
      `;
    }

    featuresColumn.innerHTML = featuresHtml;

    // Restaurar opacidades con animaciones suaves
    featuresColumn.style.opacity = "1";
    featuresColumn.style.transform = "translateY(0)";
    
    spotlightCard.style.opacity = "1";
    spotlightCard.style.transform = "scale(1)";
  }, 150);
}

/**
 * 6. CONTROLADOR INTERACTIVO DE GIMNASIO & FITNESS
 */
function initGymProductSwitcher() {
  const tabs = document.querySelectorAll(".gym-product-tab");
  const selector = document.getElementById("gym-products-selector");
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
      const product = PRODUCTS_DATA.gimnasio.products.find((p) => p.id === productId);
      if (!product) return;

      // Actualizar el panel derecho
      updateGymDisplay(product);
    });
  });

  // Inicializar dinámicamente con el primer producto activo
  const activeTab = selector.querySelector(".gym-product-tab.active");
  if (activeTab) {
    const initialId = activeTab.getAttribute("data-product-id");
    const initialProduct = PRODUCTS_DATA.gimnasio.products.find((p) => p.id === initialId);
    if (initialProduct) updateGymDisplay(initialProduct);
  }
}

function updateGymDisplay(product) {
  const spotlightCard = document.getElementById("gym-spotlight-card");
  const imgEl = document.getElementById("gym-spotlight-img");
  const svgContainer = document.getElementById("gym-spotlight-svg-container");
  const featuresColumn = document.getElementById("gym-features-column");

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
      imgEl.src = product.image;
      imgEl.style.display = "block";
      svgContainer.style.display = "none";
    } else {
      imgEl.style.display = "none";
      // Obtener el SVG correspondiente de getProductIconSvg
      const iconSvg = getProductIconSvg(product.id);
      svgContainer.innerHTML = iconSvg;
      // Hacer que el SVG sea grande y estilizado en el spotlight
      const svgInner = svgContainer.querySelector("svg");
      if (svgInner) {
        svgInner.style.width = "120px";
        svgInner.style.height = "120px";
        svgInner.style.strokeWidth = "1.2";
      }
      svgContainer.style.display = "block";
    }

    // 2. Generar las características técnicas dinámicas
    let featuresHtml = "";

    // Mapeo de características según el producto de Gimnasio
    if (product.id === "swipol_gym") {
      featuresHtml = `
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 11l2 2 4-4"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Seguridad Hospitalaria de Amplio Espectro</h4>
            <p>Rigurosamente probado contra patógenos críticos como E. coli, Staphylococcus spp y Pseudomona aeroginosa, asegurando la desinfección total de los cuartos de enfermos (camas, pisos, persianas, gabinetes, sábanas).</p>
          </div>
        </div>
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Confort Absoluto para el Paciente</h4>
            <p>Líquido incoloro e inodoro, permitiendo cumplir con las más estrictas normas de higiene internacional sin generar molestias respiratorias en áreas de recuperación. Seguro para la piel y no irritante.</p>
          </div>
        </div>
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Sustentabilidad Certificada</h4>
            <p>Biodegradable con un 95.70% de eficiencia, cumpliendo con los estándares de sustentabilidad clínica y mitigación de huella ecológica.</p>
          </div>
        </div>
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Guía de Uso Rápido</h4>
            <p><strong>Superficies:</strong> Dilución 1:20 (25 ml en 500 ml de agua). Rociar y actuar por 30s. Sin enjuague. <strong>Pisos:</strong> Dilución 1:120 (83.3 ml en 10L de agua). <strong>Nebulización:</strong> Dilución 1:60.</p>
          </div>
        </div>
      `;
    } else if (product.id === "magic_gym") {
      featuresHtml = `
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Ambiente Confortable y Acogedor</h4>
            <p>Aromatizante premium en 5 fragancias (Lavender, Ocean Breeze, Lemon Lime, Flower Garden y Green Apple), ideal para mejorar la percepción de limpieza en pasillos, salas de espera y recepciones.</p>
          </div>
        </div>
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 11l2 2 4-4"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Higiene Confiable y Sustentable</h4>
            <p>Su coeficiente fenólico le otorga propiedades germicidas para una desinfección efectiva de los pisos clínicos. Fórmula totalmente biodegradable que apoya normativas ecológicas.</p>
          </div>
        </div>
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Eficiencia y Ahorro Financiero</h4>
            <p>Su alta capacidad de dilución optimiza drásticamente los recursos de mantenimiento del hospital, garantizando ahorros de entre el 35% y el 50% en el presupuesto de pisos.</p>
          </div>
        </div>
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Guía de Uso Rápido</h4>
            <p><strong>Mantenimiento Diario:</strong> Diluir de 60 a 80 ml de SWIPE Magic en una cubeta con 10 litros de agua y trapear. <strong>Limpieza Profunda:</strong> Aplicar concentrado en la zona y trapear con agua.</p>
          </div>
        </div>
      `;
    } else if (product.id === "swipe_gym") {
      featuresHtml = `
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/><path d="M9 12L11 14L15 10" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Limpieza Segura Multisuperficie</h4>
            <p>Emulsiona rápidamente grasa corporal y mugre sin dañar materiales. Seguro para camillas, sillas de vinil, plásticos, paredes, vidrios, espejos y artículos cromados.</p>
          </div>
        </div>
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Preparación Óptima para Desinfección</h4>
            <p>Primer paso esencial en el protocolo de higiene hospitalaria. Remueve la capa de suciedad para permitir que los desinfectantes posteriores actúen con el 100% de eficacia.</p>
          </div>
        </div>
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Biodegradabilidad y Alto Rendimiento</h4>
            <p>Biodegradabilidad superior al 99% (avalada por la U.A.N.L.) con registro NSF grado alimenticio. No contiene cáusticos libres ni es tóxico, logrando ahorros del 35% al 50% por su alta concentración.</p>
          </div>
        </div>
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Guía de Uso Rápido</h4>
            <p><strong>Mantenimiento General:</strong> Dilución liviana 1:100 (1 parte de Swipe por 100 de agua) para la limpieza diaria de polvo y suciedad en pisos, paredes y vidrios. Aplicar preferentemente con la Pistola Rociadora SWIPE.</p>
          </div>
        </div>
      `;
    } else if (product.id === "sure_thing_gym") {
      featuresHtml = `
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Confort Olfativo Absoluto</h4>
            <p>Elimina de raíz los olores clínicos, biológicos o de alimentos en cuartos de enfermos, baños y salas de espera. Crea una atmósfera cálida y reconfortante para pacientes y familiares.</p>
          </div>
        </div>
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Acción Dual (Higiene y Aroma)</h4>
            <p>Aporta un coeficiente levemente germicida al ambiente mientras aromatiza. Adaptable a las preferencias del hospital con notas olfativas disponibles como floral, menta, canela y vainilla.</p>
          </div>
        </div>
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Rendimiento Sorprendente</h4>
            <p>Fórmula biodegradable y ultra-concentrada de dilución por gotas. Brinda ahorros del 35% al 50% en comparación con aerosoles comerciales de bajo rendimiento.</p>
          </div>
        </div>
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Guía de Uso Rápido</h4>
            <p><strong>Áreas Grandes:</strong> Diluir 30 a 60 gotas en 500 ml de agua en rociador y atomizar. <strong>Botes de Basura:</strong> Aplicar gotas directas al fondo. <strong>Baños/Espacios Chicos:</strong> Dejar el envase destapado.</p>
          </div>
        </div>
      `;
    } else if (product.id === "hand_soap_foam_gym") {
      featuresHtml = `
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 11l2 2 4-4"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Protección Hospitalaria Prolongada</h4>
            <p>Su fórmula germicida es altamente efectiva contra bacterias, levaduras y hongos. Mantiene un efecto antimicrobial activo durante aproximadamente 2 horas después de su aplicación.</p>
          </div>
        </div>
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Confort en el Uso Frecuente</h4>
            <p>Su textura en espuma ligera deja una sensación de suavidad e incluye una agradable fragancia a almendras. También disponible en versión sin fragancia y sin color para pieles ultrasensibles.</p>
          </div>
        </div>
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Rendimiento y Ahorro en Presupuesto</h4>
            <p>Al dosificarse exclusivamente como espuma mediante la jabonera SWIPE FOAMER, reduce drásticamente el consumo y garantiza ahorros financieros de entre el 35% y el 50% en consumibles.</p>
          </div>
        </div>
        <div class="gym-feature-card">
          <div class="gym-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gym-feature-text">
            <h4>Guía de Uso Rápido</h4>
            <p><strong>Lavado:</strong> Dispensar espuma con dosificador SWIPE FOAMER, frotar vigorosamente las manos durante 1 minuto y enjuagar. Repetir si el protocolo médico exige desinfección más estricta.</p>
          </div>
        </div>
      `;
    }

    featuresColumn.innerHTML = featuresHtml;

    // Restaurar opacidades con animaciones suaves
    featuresColumn.style.opacity = "1";
    featuresColumn.style.transform = "translateY(0)";
    
    spotlightCard.style.opacity = "1";
    spotlightCard.style.transform = "scale(1)";
  }, 150);
}

/**
 * 7. CONTROLADOR INTERACTIVO DE GASTRONOMÍA & COCINAS
 */
function initGastronomiaProductSwitcher() {
  const tabs = document.querySelectorAll(".gastronomia-product-tab");
  const selector = document.getElementById("gastronomia-products-selector");
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
      const product = PRODUCTS_DATA.gastronomia.products.find((p) => p.id === productId);
      if (!product) return;

      // Actualizar el panel derecho
      updateGastronomiaDisplay(product);
    });
  });

  // Inicializar dinámicamente con el primer producto activo
  const activeTab = selector.querySelector(".gastronomia-product-tab.active");
  if (activeTab) {
    const initialId = activeTab.getAttribute("data-product-id");
    const initialProduct = PRODUCTS_DATA.gastronomia.products.find((p) => p.id === initialId);
    if (initialProduct) updateGastronomiaDisplay(initialProduct);
  }
}

function updateGastronomiaDisplay(product) {
  const spotlightCard = document.getElementById("gastronomia-spotlight-card");
  const imgEl = document.getElementById("gastronomia-spotlight-img");
  const svgContainer = document.getElementById("gastronomia-spotlight-svg-container");
  const featuresColumn = document.getElementById("gastronomia-features-column");

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
      imgEl.src = product.image;
      imgEl.style.display = "block";
      svgContainer.style.display = "none";
    } else {
      imgEl.style.display = "none";
      // Obtener el SVG correspondiente de getProductIconSvg
      const iconSvg = getProductIconSvg(product.id);
      svgContainer.innerHTML = iconSvg;
      // Hacer que el SVG sea grande y estilizado en el spotlight
      const svgInner = svgContainer.querySelector("svg");
      if (svgInner) {
        svgInner.style.width = "120px";
        svgInner.style.height = "120px";
        svgInner.style.strokeWidth = "1.2";
      }
      svgContainer.style.display = "block";
    }

    // 2. Generar las características técnicas dinámicas
    let featuresHtml = "";
    
    // Mapeo de características según el producto de Gastronomía
    if (product.id === "swipe_concentrado_gastronomia") {
      featuresHtml = `
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Poder Desengrasante Integral</h4>
            <p>Emulsiona de manera rápida y efectiva aceites y grasas tanto animales como vegetales acumulados en la cocina, sin dañar, manchar o corroer equipos de acero inoxidable, plásticos o superficies metálicas.</p>
          </div>
        </div>
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Seguridad Sanitaria Absoluta</h4>
            <p>Su fórmula no contiene cáusticos libres, no es tóxica ni inflamable. Al ser categoría A1, garantiza que la limpieza profunda de áreas de alimentos y cuartos limpios se realice sin riesgo de contaminación química, requiriendo únicamente un enjuague final con agua potable.</p>
          </div>
        </div>
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Rendimiento y Ahorro Financiero</h4>
            <p>Su extrema concentración permite trabajar con amplias tasas de dilución en agua. Esta versatilidad para abarcar desde la limpieza ligera de pisos hasta la remoción de grasa pesada con un solo producto es la base para asegurar ahorros operativos del 35% al 50% en el presupuesto de intendencia del área de nutrición.</p>
          </div>
        </div>
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Guía de Uso Rápido</h4>
            <p><strong>Limpieza General (Dilución 1:100):</strong> Mezclar 1 parte de producto por 100 de agua para la higiene diaria de pisos, paredes, vidrios y plásticos de la cocina. <br><strong>Acero Inoxidable (Dilución 1:12):</strong> Lavado de equipos de preparación, mesas de trabajo y tanques. <br><strong>Remoción de Grasa Pesada (Dilución 1:4):</strong> Remover grasas espesas. Aplicar sobre la superficie tibia para óptimos resultados.</p>
          </div>
        </div>
      `;
    } else if (product.id === "swipe_grease") {
      featuresHtml = `
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Poder Desengrasante de Impacto Profundo</h4>
            <p>Su gran capacidad humectante le permite penetrar y eliminar rápidamente la capa superior del cochambre carbonizado, actuando de forma simultánea en las diferentes capas de grasa acumulada. Es la herramienta definitiva para la restauración de parrillas, hornos, quemadores, planchas y sartenes en el área de preparación de dietas.</p>
          </div>
        </div>
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Máxima Adherencia y Rentabilidad Operativa</h4>
            <p>Su composición física en gel proporciona una adherencia altamente efectiva sobre las superficies, evitando escurrimientos. Esto prolonga el tiempo de acción química e incrementa en gran medida el rendimiento del producto. Esta nula pérdida de químico por escurrimiento es vital para garantizar los ahorros financieros del 35% al 50% proyectados para el mantenimiento pesado de la cocina.</p>
          </div>
        </div>
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Cumplimiento Ecológico</h4>
            <p>A pesar de su fuerza industrial, mantiene un perfil biodegradable que respalda los objetivos de sustentabilidad del hospital. Además, integra el descriptor DWM en su etiqueta para control en el almacén de dietología.</p>
          </div>
        </div>
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Guía de Uso Rápido y Precauciones</h4>
            <p><strong>Protocolo de Aplicación Segura:</strong> Uso estrictamente OBLIGATORIO de guantes de hule. Aplicar con brocha de cerdas plásticas. Nunca usar sobre superficies calientes para evitar vapores tóxicos. <br><strong>Tiempo de Acción:</strong> Dejar actuar el gel de 5 a 30 minutos. Remover con fibra suave y enjuagar con agua abundante. <br><span style="color: #ff5a5a; font-weight: 600;">⚠️ NO utilizar sobre aluminio, cromo o superficies pintadas/esmaltadas sin antes realizar una prueba de compatibilidad.</span></p>
          </div>
        </div>
      `;
    } else if (product.id === "swipe_crystal") {
      featuresHtml = `
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-linecap="round" stroke-linejoin="round"/><polyline points="22 4 12 14.01 9 11.01" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Higiene Alimentaria y Cero Residuos</h4>
            <p>Corta la grasa pesada en utensilios de cocina, loza, cristalería, sartenes y cubiertos, eliminando el opaco "efecto de gota" en los vasos y dejando las tarjas completamente libres de residuos. Además, su fórmula va más allá de la limpieza al eliminar una amplia gama de bacterias, hongos y levaduras.</p>
          </div>
        </div>
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Protección al Personal Médico-Dietético</h4>
            <p>A diferencia de los detergentes industriales agresivos, su fórmula suave, recomendada por dermatólogos, mantiene las manos del personal suaves y con un agradable aroma a limón tras las rutinas intensivas de lavado manual.</p>
          </div>
        </div>
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Máximo Rendimiento Financiero</h4>
            <p>La altísima concentración del químico permite que un solo litro de SWIPE CRYSTAL rinda hasta 100 litros de detergente lavaloza. Esta asombrosa tasa de dilución es el factor central para garantizar que se cumpla la meta de ahorro financiero del 35% al 50% en los consumibles diarios de la cocina.</p>
          </div>
        </div>
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Guía de Uso Rápido y Diluciones</h4>
            <p><strong>Lavado Regular de Loza:</strong> Diluir 10 ml de producto en un litro de agua para preparar la solución lavaloza estándar. <br><strong>Grasa Severa e Incrustada:</strong> Si se trata de sartenes, charolas u ollas institucionales con cargas muy pesadas de grasa, incrementar la dosis a 15 ml disueltos por cada litro de agua.</p>
          </div>
        </div>
      `;
    } else if (product.id === "swipe_peracetic") {
      featuresHtml = `
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Inocuidad Total en Alimentos</h4>
            <p>Desinfección directa de frutas, verduras, hortalizas con o sin cáscara, así como carnes, aves, pescados y mariscos. No imparte sabor, color, ni olor al producto final, y se descompone en materiales inocuos sin dejar ningún tipo de residuo tóxico. Cumple FDA, USDA, GRAS y NSF.</p>
          </div>
        </div>
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Eficiencia Absoluta en Entornos Críticos</h4>
            <p>Elimina de raíz bacterias, virus, levaduras, hongos y esporas de equipos, utensilios y mesas de preparación. Mantiene su total eficacia incluso en condiciones adversas: resiste alta dureza de agua y es completamente funcional a bajas temperaturas (hasta 4°C), por lo que es perfecto para sanitizar las cámaras frías del hospital.</p>
          </div>
        </div>
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Rendimiento y Control Presupuestal</h4>
            <p>Su nivel de ultra-concentración permite que sea funcional en diluciones extremas (1:120 a 1:1500). Esta drástica reducción en la cantidad de químico necesario por litro de agua es el pilar para sostener los ahorros financieros del 35% al 50% proyectados en desinfección alimentaria.</p>
          </div>
        </div>
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Guía de Uso Rápido y Precauciones</h4>
            <p><strong>Sanitización de Frutas y Verduras (100 ppm):</strong> Diluir 0.66 ml de producto por cada litro de agua (1:1500). Dejar en contacto de 5 a 10 min. No requiere enjuague posterior. <br><strong>Superficies y Carnes (200 ppm):</strong> Diluir 1.33 ml por litro de agua (1:750). Aplicar de 5 a 10 minutos y escurrir. No requiere enjuague. <br><span style="color: #ff5a5a; font-weight: 600;">⚠️ Usar EPP. Trabajar en ambientes ventilados y no aplicar sobre cobre, aluminio o metales suaves. Envase marcador de volumen de 1 L.</span></p>
          </div>
        </div>
      `;
    } else if (product.id === "swipol_gastronomia") {
      featuresHtml = `
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Inocuidad Alimentaria Total</h4>
            <p>Su fórmula es completamente incolora e inodora, ideal para cumplir con las más estrictas normas de higiene internacional en la preparación de dietas, eliminando una amplia gama de bacterias, hongos y levaduras incluso en presencia de tierra orgánica.</p>
          </div>
        </div>
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Alta Tolerancia en Entornos Exigentes</h4>
            <p>Mantiene sus propiedades desinfectantes intactas tanto en altas como en bajas temperaturas, y cuenta con una alta tolerancia frente a cargas de proteínas y agua dura, escenarios constantes en el procesamiento de alimentos.</p>
          </div>
        </div>
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Cumplimiento Normativo y Rendimiento</h4>
            <p>Su extrema concentración le permite alcanzar diluciones precisas que cumplen con los estándares de la FDA para plantas de alimentos. Esta alta capacidad de rendimiento es el factor clave para generar los ahorros financieros proyectados del 35% al 50% en los presupuestos de sanitización diaria.</p>
          </div>
        </div>
        <div class="gastronomia-feature-card">
          <div class="gastronomia-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="gastronomia-feature-text">
            <h4>Guía de Uso Rápido y Diluciones</h4>
            <p><strong>Superficies en Contacto Directo con Alimentos (200 ppm):</strong> Utilizar 8.3 ml de SWIPOL por cada litro de agua. Se requiere un enjuague con agua potable posterior a su uso. <br><strong>Desinfección General de Cocina (1:20):</strong> Diluir 25 ml en medio litro de agua. Rociar y actuar 30s. <br><strong>Trapeado de Pisos y Comedores (1:120):</strong> Utilizar 83.3 ml del producto en cubeta con 10 litros de agua.</p>
          </div>
        </div>
      `;
    }
    featuresColumn.innerHTML = featuresHtml;

    // Restaurar opacidades con animaciones suaves
    featuresColumn.style.opacity = "1";
    featuresColumn.style.transform = "translateY(0)";
    
    spotlightCard.style.opacity = "1";
    spotlightCard.style.transform = "scale(1)";
  }, 150);
}

/**
 * 8. CONTROLADOR INTERACTIVO DE MANTENIMIENTO GENERAL
 */
function initMantenimientoProductSwitcher() {
  const tabs = document.querySelectorAll(".mantenimiento-product-tab");
  const selector = document.getElementById("mantenimiento-products-selector");
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
      const product = PRODUCTS_DATA.mantenimiento.products.find((p) => p.id === productId);
      if (!product) return;

      // Actualizar el panel derecho
      updateMantenimientoDisplay(product);
    });
  });

  // Inicializar dinámicamente con el primer producto activo
  const activeTab = selector.querySelector(".mantenimiento-product-tab.active");
  if (activeTab) {
    const initialId = activeTab.getAttribute("data-product-id");
    const initialProduct = PRODUCTS_DATA.mantenimiento.products.find((p) => p.id === initialId);
    if (initialProduct) updateMantenimientoDisplay(initialProduct);
  }
}

function updateMantenimientoDisplay(product) {
  const spotlightCard = document.getElementById("mantenimiento-spotlight-card");
  const imgEl = document.getElementById("mantenimiento-spotlight-img");
  const svgContainer = document.getElementById("mantenimiento-spotlight-svg-container");
  const quoteBtn = document.getElementById("mantenimiento-add-to-quote-btn");
  const featuresColumn = document.getElementById("mantenimiento-features-column");

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
      imgEl.src = product.image;
      imgEl.style.display = "block";
      svgContainer.style.display = "none";
    } else {
      imgEl.style.display = "none";
      // Obtener el SVG correspondiente de getProductIconSvg
      const iconSvg = getProductIconSvg(product.id);
      svgContainer.innerHTML = iconSvg;
      // Hacer que el SVG sea grande y estilizado en el spotlight
      const svgInner = svgContainer.querySelector("svg");
      if (svgInner) {
        svgInner.style.width = "120px";
        svgInner.style.height = "120px";
        svgInner.style.strokeWidth = "1.2";
      }
      svgContainer.style.display = "block";
    }
    // 2. Actualizar botón de cotización
    if (quoteBtn) {
      quoteBtn.setAttribute("onclick", `addToQuoteCart('${product.id}', 'mantenimiento')`);
    }

    // 3. Generar las características técnicas dinámicas
    let featuresHtml = "";

    if (product.id === "swipe_concentrate") {
      featuresHtml = `
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Higiene Clínica Inmediata</h4>
            <p>Inhibe eficazmente el desarrollo de bacterias provenientes del agua y materias fecales, lo que impide de forma directa la formación de olores desagradables producidos por estos microorganismos en los baños del hospital.</p>
          </div>
        </div>
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Remoción de Incrustaciones Severas</h4>
            <p>Diseñado para disolver y quitar las manchas y el sarro fuertemente adherido bajo el anillo de la taza del inodoro, causado por los residuos calcáreos del agua.</p>
          </div>
        </div>
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Rentabilidad y Eficiencia de Dilución</h4>
            <p>Para el mantenimiento continuo, su fórmula concentrada permite una alta dilución. Esta capacidad de maximizar el rendimiento del producto es el motor para alcanzar ahorros financieros sostenidos de entre el 35% y el 50% en el presupuesto de limpieza de las áreas sanitarias.</p>
          </div>
        </div>
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Guía de Uso Rápido y Precauciones</h4>
            <p><strong>Mantenimiento Diario (Dilución 1:4):</strong> Mezclar 1 parte de SWIPE BRITE por 4 partes de agua en la botella aplicadora. Aplicar en la taza, frotar con el aplicador especial y enjuagar para mantener el sanitario desinfectado y desodorizado. <br><strong>Limpieza Profunda de Sarro (Concentrado):</strong> En casos de sarro severo o antiguo, quitar el agua del W.C., aplicar el producto concentrado directamente bajo el borde, tallar y dejar remojar por 15 minutos antes de enjuagar. <br><span style="color: #ff5a5a; font-weight: 600;">⚠️ Se recomienda el uso de guantes para el personal de intendencia y, por seguridad química, nunca debe mezclarse con cloro o cualquier otro producto.</span></p>
          </div>
        </div>
      `;
    } else if (product.id === "brite_gel") {
      featuresHtml = `
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Máxima Adherencia y Remoción</h4>
            <p>Su consistencia en gel le permite adherirse prolongadamente a las paredes de la taza, disolviendo de manera altamente efectiva el sarro incrustado y las manchas calcáreas que provienen del agua.</p>
          </div>
        </div>
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Erradicación Clínica de Olores</h4>
            <p>Actúa como un desinfectante sumamente eficaz al inhibir el desarrollo de bacterias derivadas del agua y materias fecales, previniendo desde el origen la formación de olores desagradables en las áreas sanitarias.</p>
          </div>
        </div>
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Alta Rentabilidad Operativa</h4>
            <p>Aunque tiene el poder para limpiezas profundas en estado puro, su fórmula concentrada permite diluirse para las rutinas de mantenimiento diario. Esta flexibilidad y alto rendimiento son fundamentales para lograr ahorros financieros del 35% al 50% en los insumos de esta área crítica.</p>
          </div>
        </div>
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Guía de Uso Rápido y Precauciones</h4>
            <p><strong>Mantenimiento Diario (Dilución 1:4):</strong> Para mantener los inodoros brillantes y desodorizados todos los días, diluir 1 parte de SWIPE BRITE GEL por 4 partes de agua en el bote aplicador y frotar. <br><strong>Desincrustación Severa (Concentrado):</strong> Para problemas serios de sarro, quitar el agua del W.C., aplicar el gel concentrado bajo el borde del anillo, dejar remojar por 15 minutos y frotar con una fibra verde (no de alambre) antes de enjuagar. <br><span style="color: #ff5a5a; font-weight: 600;">⚠️ Por seguridad del personal, se recomienda el uso de guantes y nunca debe mezclarse con cloro o cualquier otro producto químico.</span></p>
          </div>
        </div>
      `;
    } else if (product.id === "hand_soap") {
      featuresHtml = `
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Barrera de Control de Infecciones</h4>
            <p>Es una herramienta vital en los baños para prevenir infecciones causadas por falta de higiene cruzada, ya que elimina una amplia gama de bacterias, hongos y levaduras. Su eficacia está probada contra patógenos críticos como S. aureus, E. coli, Salmonella y Candida.</p>
          </div>
        </div>
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Protección Dermatológica Continua</h4>
            <p>Su pH balanceado de 5 a 6 está en perfecta armonía con la química natural de la piel. Esto asegura que sea un producto sumamente seguro y no irritante, permitiendo el lavado frecuente sin lastimar las manos del personal o los pacientes.</p>
          </div>
        </div>
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Rentabilidad y Eficiencia Operativa</h4>
            <p>Aunque el producto brinda un nivel clínico de protección, su integración con los despachadores institucionales SWIPE permite un control exacto de la dosis. Esta optimización del consumible es clave para respaldar los ahorros financieros proyectados del 35% al 50% en el abastecimiento de los módulos sanitarios.</p>
          </div>
        </div>
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Guía de Uso Rápido y Protocolo</h4>
            <p><strong>Protocolo de Desinfección:</strong> El producto debe usarse en su estado concentrado. Aplicar una cantidad razonable desde el despachador SWIPE, frotar firmemente por espacio de un minuto y enjuagar con agua. <br><strong>Refuerzo Clínico Estricto:</strong> Cuando la naturaleza del entorno requiera un nivel de desinfección más riguroso, la operación de lavado puede repetirse por máxima seguridad.</p>
          </div>
        </div>
      `;
    } else if (product.id === "blue_genie") {
      featuresHtml = `
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke-linecap="round"/><path d="M12 6v6l4 2" stroke-linecap="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Triple Acción Continua</h4>
            <p>En cada descarga, el sistema proporciona de manera automática poder desinfectante (inhibiendo el crecimiento bacteriano), poder desodorante (eliminando olores desagradables desde el interior del tanque) y poder desensarrante (evitando la acumulación de depósitos calcáreos tanto en el tanque como en la taza).</p>
          </div>
        </div>
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Percepción Visual de Higiene</h4>
            <p>Al activarse, el producto tiñe el agua de un color azul claro. Esto ofrece a pacientes, personal médico y visitantes un indicador visual de que el inodoro está siendo activamente sanitizado y desodorizado, aumentando la percepción de limpieza en la clínica.</p>
          </div>
        </div>
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Rendimiento Extraordinario y Ahorro</h4>
            <p>Su envase original permite que se dosifique automáticamente, manteniendo el W.C. en óptimas condiciones durante un periodo de 2 a 3 meses (aproximadamente 900 descargas). Esta drástica reducción en la necesidad de mano de obra para limpieza manual y la longevidad del cartucho son argumentos centrales para respaldar ahorros financieros del 35% al 50% en el mantenimiento de las áreas de sanitarios.</p>
          </div>
        </div>
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Guía de Uso Rápido e Instalación</h4>
            <p><strong>Instalación Sencilla:</strong> Después de lavar el inodoro de manera regular, realizar una descarga y colocar el SWIPE Blue Genie verticalmente en una esquina del tanque de agua, asegurando que no interfiera con el flotador. <br><strong>Activación:</strong> Esperar un par de minutos a que el tanque se llene nuevamente de agua y accionar la descarga. El agua tomará un tono azul claro, indicando que el producto está operando correctamente. <br><strong>Reemplazo:</strong> Proceder a cambiar el envase únicamente cuando se observe que el agua ya no se pinta de color azul. <br><strong>Presentación:</strong> Envase dosificador con peso neto de 250 gr.</p>
          </div>
        </div>
      `;
    } else if (product.id === "swipol_mantenimiento") {
      featuresHtml = `
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 11l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Erradicación de Patógenos Críticos</h4>
            <p>Ha demostrado una eficacia bactericida, viricida y fungicida de amplio espectro, eliminando bacterias, hongos y levaduras como E. coli, Staphylococcus spp y Pseudomona aeroginosa en áreas propensas a la contaminación cruzada como inodoros, lavabos y pisos de los baños.</p>
          </div>
        </div>
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Eficacia Ante Cargas Orgánicas</h4>
            <p>A diferencia de desinfectantes comunes, SWIPOL mantiene sus propiedades desinfectantes y su alta tolerancia incluso en presencia de tierra orgánica y agua dura, escenarios comunes en los módulos sanitarios.</p>
          </div>
        </div>
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Versatilidad y Eficiencia Financiera</h4>
            <p>Si se desea un ambiente perfumado en los baños, puede combinarse con cualquier aroma de SWIPE SURE THING sin perder su poder desinfectante. Su extrema capacidad de concentración permite diluciones muy altas, siendo la base técnica para garantizar ahorros del 35% al 50% en el presupuesto destinado a la desinfección diaria.</p>
          </div>
        </div>
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Guía de Uso Rápido y Diluciones</h4>
            <p><strong>Desinfección de Inodoros, Lavabos y Manijas (Rociado):</strong> Para el saneamiento de superficies de alto contacto en el baño, diluir en proporción 1:20 (25 ml de SWIPOL en medio litro de agua). Aplicar con la pistola rociadora, dejar actuar durante 30 segundos y secar. <br><strong>Trapeado de Pisos en Módulos Sanitarios:</strong> Utilizar una concentración de 1:120 (83.3 ml de producto en una cubeta con 10 litros de agua) para asegurar la desinfección total del piso. <br><strong>Tapetes Sanitarios:</strong> Para las entradas de zonas aisladas que requieran tapetes, diluir 25 ml de SWIPOL en 1.5 litros de agua (concentración 1:60).</p>
          </div>
        </div>
      `;
    } else {
      // Fallback dinámico premium para otros productos de Mantenimiento (Glass-Glow, Champú Cera Cart, Floor-Shine)
      featuresHtml = `
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" stroke-linecap="round"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Descripción del Producto</h4>
            <p>${product.description}</p>
          </div>
        </div>
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Beneficios Clave</h4>
            <ul style="font-size: 0.85rem; line-height: 1.5; color: var(--color-glass-text); padding-left: 1.2rem; margin: 0.3rem 0 0 0;">
              ${product.benefits.map(b => `<li style="margin-bottom: 0.3rem;">${b}</li>`).join("")}
            </ul>
          </div>
        </div>
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Rendimiento y Dosificación</h4>
            <p><strong>Dosificación:</strong> ${product.dosage}<br><strong>Dilución / Método:</strong> ${product.dilution}</p>
          </div>
        </div>
        <div class="mantenimiento-feature-card">
          <div class="mantenimiento-feature-icon-container">
            <svg class="feature-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <div class="mantenimiento-feature-text">
            <h4>Seguridad e Impacto Ambiental</h4>
            <p><strong>Manejo Seguro:</strong> ${product.safety}<br><strong>Impacto en pH:</strong> ${product.phImpact || 'Neutro.'}</p>
          </div>
        </div>
      `;
    }

    featuresColumn.innerHTML = featuresHtml;

    // Restaurar opacidades con animaciones suaves
    featuresColumn.style.opacity = "1";
    featuresColumn.style.transform = "translateY(0)";
    
    spotlightCard.style.opacity = "1";
    spotlightCard.style.transform = "scale(1)";
  }, 150);
}

