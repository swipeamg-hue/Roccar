/**
 * Lógica matemática de las calculadoras y simuladores interactivos
 * para cada una de las 5 áreas de la concesionaria Roccar.
 */

const CALCULATORS = {
  // 1. TALLER DE SERVICIO Y MANTENIMIENTO - Dosificación de Desengrasantes y Solventes
  alberca: {
    render: (containerId) => {
      const html = `
        <div class="calculator-card" style="border-color: var(--color-alberca)">
          <div class="calc-title-group" style="color: var(--color-alberca)">
            <svg class="calc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <h3 class="calc-title">Dosificación de Limpiadores</h3>
          </div>
          <div class="calc-form">
            <div class="calc-input-group">
              <label class="calc-label">Superficie del Taller</label>
              <div class="calc-input-container">
                <input type="number" id="alb-vol" class="calc-input" value="150" min="10" max="10000">
                <span class="calc-unit">m² de área de servicio</span>
              </div>
            </div>
            <div class="calc-input-group">
              <label class="calc-label">Producto a Utilizar</label>
              <select id="alb-prod" class="calc-input calc-select">
                <option value="swipe">Swipe (Desengrasante Multiusos)</option>
                <option value="motor_foam">Motor Foam (Espuma de Motores)</option>
                <option value="rust_off">Rust Off (Removedor de Óxido)</option>
              </select>
            </div>
            <div class="calc-input-group">
              <label class="calc-label">Grado de Suciedad / Grasa</label>
              <select id="alb-state" class="calc-input calc-select">
                <option value="maint">Limpieza Ligera / Mantenimiento Diario</option>
                <option value="corrective">Grasa Pesada / Aceite Quemado Acumulado</option>
              </select>
            </div>
            <div class="calc-result-box" style="border-color: rgba(0, 242, 254, 0.15)">
              <span class="calc-result-value" id="alb-res" style="color: var(--color-alberca)">150 ml</span>
              <span class="calc-result-label">Cantidad de Producto Swipe</span>
            </div>
          </div>
        </div>
      `;
      document.getElementById(containerId).innerHTML = html;

      // Event Listeners
      const update = () => {
        const area = parseFloat(document.getElementById("alb-vol").value) || 0;
        const prod = document.getElementById("alb-prod").value;
        const state = document.getElementById("alb-state").value;
        
        // Asumimos 100 ml de solución diluida por m² de superficie
        const solutionNeededMl = area * 100;
        let amount = 0;

        if (prod === "swipe") {
          // Swipe: Routine 1:100 (10 ml/L), Heavy 1:4 (200 ml/L)
          const dilutionRatio = state === "maint" ? 100 : 5;
          amount = solutionNeededMl / dilutionRatio;
        } else if (prod === "motor_foam") {
          // Motor Foam: Routine 1:3 (250 ml/L), Heavy Concentrado 1:1 (500 ml/L)
          const dilutionRatio = state === "maint" ? 4 : 2;
          amount = solutionNeededMl / dilutionRatio;
        } else if (prod === "rust_off") {
          // Rust Off: Routine 1:10 (100 ml/L), Heavy Concentrado 1:1 (500 ml/L)
          const dilutionRatio = state === "maint" ? 11 : 2;
          amount = solutionNeededMl / dilutionRatio;
        }

        // Formatear salida
        let output = "";
        if (amount >= 1000) {
          output = `${(amount / 1000).toFixed(2)} L`;
        } else {
          output = `${Math.round(amount)} ml`;
        }

        document.getElementById("alb-res").innerText = output;
      };

      document.getElementById("alb-vol").addEventListener("input", update);
      document.getElementById("alb-prod").addEventListener("change", update);
      document.getElementById("alb-state").addEventListener("change", update);
      update();
    }
  },

  // 2. PISO DE VENTAS Y SHOWROOM - Dosificación Showroom y Exhibición
  spa: {
    render: (containerId) => {
      const html = `
        <div class="calculator-card" style="border-color: var(--color-spa)">
          <div class="calc-title-group" style="color: var(--color-spa)">
            <svg class="calc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 6v6l4 2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <h3 class="calc-title">Dosificación Showroom</h3>
          </div>
          <div class="calc-form">
            <div class="calc-input-group">
              <label class="calc-label">Superficie del Showroom</label>
              <div class="calc-input-container">
                <input type="number" id="spa-vol" class="calc-input" value="300" min="10" max="5000">
                <span class="calc-unit">m² de área de exhibición</span>
              </div>
            </div>
            <div class="calc-input-group">
              <label class="calc-label">Tipo de Limpieza y Detalle</label>
              <select id="spa-intensity" class="calc-input calc-select">
                <option value="soft">Mantenimiento Regular Diario (Brillo)</option>
                <option value="high" selected>Detallado de Entrega de Unidades</option>
              </select>
            </div>
            <div class="calc-input-group">
              <label class="calc-label">Producto a Utilizar</label>
              <select id="spa-product-type" class="calc-input calc-select" style="accent-color: var(--color-spa);">
                <option value="magic" selected>Magic (Limpiador y Aromatizante de Pisos)</option>
                <option value="swipol">Swipol (Desinfectante de Volante y Pantallas)</option>
                <option value="swipe">Swipe (Limpiador de Cristales y Vidrios)</option>
              </select>
            </div>
            <div class="calc-result-box" style="border-color: rgba(5, 230, 180, 0.15)">
              <span class="calc-result-value" id="spa-res" style="color: var(--color-spa)">250 ml</span>
              <span class="calc-result-label">Cantidad Necesaria Estimada</span>
            </div>
          </div>
        </div>
      `;
      document.getElementById(containerId).innerHTML = html;

      const update = () => {
        const area = parseFloat(document.getElementById("spa-vol").value) || 0;
        const level = document.getElementById("spa-intensity").value;
        const prod = document.getElementById("spa-product-type").value;
        
        const solutionNeededMl = area * 100;
        let amount = 0;

        if (prod === "magic") {
          // Magic: Routine 1:120, Heavy 1:60
          let dilutionRatio = level === "soft" ? 120 : 60;
          amount = solutionNeededMl / dilutionRatio;
        } else if (prod === "swipol") {
          // Swipol: Routine 1:20, Heavy 1:10
          let dilutionRatio = level === "soft" ? 20 : 10;
          amount = solutionNeededMl / dilutionRatio;
        } else if (prod === "swipe") {
          // Swipe: Routine 1:100, Heavy 1:12
          let dilutionRatio = level === "soft" ? 100 : 12;
          amount = solutionNeededMl / dilutionRatio;
        }

        let output = "";
        if (amount >= 1000) {
          output = `${(amount / 1000).toFixed(2)} L`;
        } else {
          output = `${Math.round(amount)} ml`;
        }

        document.getElementById("spa-res").innerText = output;
      };

      document.getElementById("spa-vol").addEventListener("input", update);
      document.getElementById("spa-intensity").addEventListener("change", update);
      document.getElementById("spa-product-type").addEventListener("change", update);
      update();
    }
  },

  // 3. ÁREA DE LAVADO Y ESTÉTICA AUTOMOTRIZ - Consumo Diario del Car Wash
  gimnasio: {
    render: (containerId) => {
      const html = `
        <div class="calculator-card" style="border-color: var(--color-gimnasio)">
          <div class="calc-title-group" style="color: var(--color-gimnasio)">
            <svg class="calc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <h3 class="calc-title">Consumo de Car Wash</h3>
          </div>
          <div class="calc-form">
            <div class="calc-input-group">
              <label class="calc-label">Volumen Diario de Autos Lavados</label>
              <select id="gym-concentrate" class="calc-input calc-select">
                <option value="15">15 Vehículos / día</option>
                <option value="30" selected>30 Vehículos / día (Promedio)</option>
                <option value="60">60 Vehículos / día (Alto)</option>
                <option value="120">120 Vehículos / día (Saturado)</option>
              </select>
            </div>
            <div class="calc-input-group">
              <label class="calc-label">Insumo Estética / Lavado</label>
              <select id="gym-type" class="calc-input calc-select">
                <option value="shampoo">Somthin Else Shampoo (Dosis 20 ml/auto)</option>
                <option value="shine">Car Shine Abrillantador (Dosis 50 ml/auto)</option>
              </select>
            </div>
            <div class="calc-input-group">
              <label class="calc-label">Régimen de Operación</label>
              <select id="gym-usage-frequency" class="calc-input calc-select">
                <option value="1" selected>Limpieza Estándar (1 Lavada/auto)</option>
                <option value="2">Detallado Completo (Lavado doble/Detalle)</option>
              </select>
            </div>
            <div class="calc-result-box" style="border-color: rgba(255, 77, 45, 0.15); display: grid; grid-template-columns: 50% 50%; gap: 1rem; align-items: center;">
              <div>
                <span class="calc-result-value" id="gym-res-qty" style="color: var(--color-gimnasio)">600 ml</span>
                <span class="calc-result-label" style="font-size:0.65rem">Consumo Diario Estimado</span>
              </div>
              <div style="border-left: 1px solid rgba(255,255,255,0.08)">
                <span class="calc-result-value" id="gym-res-save" style="color: #10b981">6.6 días</span>
                <span class="calc-result-label" style="font-size:0.65rem">Durabilidad de Garrafa 4L</span>
              </div>
            </div>
          </div>
        </div>
      `;
      document.getElementById(containerId).innerHTML = html;

      const update = () => {
        const vehicles = parseFloat(document.getElementById("gym-concentrate").value);
        const type = document.getElementById("gym-type").value;
        const usageFactor = parseFloat(document.getElementById("gym-usage-frequency").value);
        
        const baseDose = type === "shampoo" ? 20 : 50;
        const dailyConsumptionMl = vehicles * baseDose * usageFactor;
        const bottleCapacityMl = 4000;
        const daysDuration = bottleCapacityMl / dailyConsumptionMl;

        let consumptionOutput = "";
        if (dailyConsumptionMl >= 1000) {
          consumptionOutput = `${(dailyConsumptionMl / 1000).toFixed(2)} Litros`;
        } else {
          consumptionOutput = `${Math.round(dailyConsumptionMl)} ml`;
        }

        document.getElementById("gym-res-qty").innerText = consumptionOutput;
        document.getElementById("gym-res-save").innerText = `${daysDuration.toFixed(1)} días`;
      };

      document.getElementById("gym-concentrate").addEventListener("change", update);
      document.getElementById("gym-type").addEventListener("change", update);
      document.getElementById("gym-usage-frequency").addEventListener("change", update);
      update();
    }
  },

  // 4. SANITARIOS Y VESTIDORES - Protocolos de Higiene de Baños y Vestidores
  gastronomia: {
    render: (containerId) => {
      const html = `
        <div class="calculator-card" style="border-color: var(--color-gastronomia)">
          <div class="calc-title-group" style="color: var(--color-gastronomia)">
            <svg class="calc-icon" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <h3 class="calc-title">Higiene en Sanitarios</h3>
          </div>
          <div class="calc-form">
            <div class="calc-input-group">
              <label class="calc-label">Seleccionar Tarea en Sanitarios</label>
              <select id="gas-area" class="calc-input calc-select">
                <option value="brite">Limpieza y Desincrustación de Tazas (Brite)</option>
                <option value="brite_gel">Desincrustación de Adherencia en Gel (Brite Gel)</option>
                <option value="swipol">Desinfección de Áreas Comunes y Pisos (Swipol)</option>
                <option value="blue_genie">Mantenimiento Automático del WC (Blue Genie)</option>
                <option value="hand_soap">Lavado Antiséptico de Manos (Hand Soap)</option>
              </select>
            </div>
            
            <div id="gas-protocol-box" class="calc-result-box" style="border-color: rgba(255, 200, 55, 0.15); text-align: left; align-items: flex-start; padding: 1.2rem; font-size: 0.8rem; gap: 0.8rem;">
              <!-- Se inyecta dinámicamente -->
            </div>
          </div>
        </div>
      `;
      document.getElementById(containerId).innerHTML = html;

      const protocols = {
        brite: {
          product: "Brite (Desincrustante Rápido de Tazas)",
          dilution: "1:4 (Aseo Diario) a Concentrado",
          steps: [
            "Para mantenimiento diario, diluir 1 parte de Brite por 4 partes de agua en botella aplicadora.",
            "Aplicar en las paredes de la taza del W.C. o mingitorio y frotar con cepillo de cerdas.",
            "Para sarro severo, retirar el agua estancada, aplicar producto concentrado directo bajo el anillo.",
            "Dejar actuar por 10 a 15 minutos, tallar suavemente y jalar la palanca para enjuagar."
          ]
        },
        brite_gel: {
          product: "Brite Gel (Gel Desincrustante Ácido)",
          dilution: "Concentrado (Uso Directo)",
          steps: [
            "Usar guantes de hule para la limpieza y preparación.",
            "Aplicar el gel concentrado debajo del borde y en las paredes verticales de la taza.",
            "Gracias a su textura viscosa, se mantendrá adherido actuando sobre el sarro incrustado sin escurrirse.",
            "Dejar reposar 15 minutos, tallar con fibra verde y enjuagar con descarga de agua."
          ]
        },
        swipol: {
          product: "Swipol (Desinfectante Germicida Concentrado)",
          dilution: "1:20 (Superficies) a 1:120 (Pisos)",
          steps: [
            "Para lavabos, grifos y manijas, preparar dilución 1:20 (25 ml en medio litro de agua).",
            "Rociar, dejar actuar 30 segundos y secar con microfibra limpia sin enjuagar.",
            "Para el trapeado de pisos de sanitarios y vestidores, dosificar 83 ml en 10 L de agua (1:120).",
            "Mantiene los baños desinfectados y previene los olores orgánicos provocados por bacterias."
          ]
        },
        blue_genie: {
          product: "Blue Genie (Limpiador Enzimático Automático)",
          dilution: "Dosificación Automática de Descarga",
          steps: [
            "Retirar la tapa del tanque del inodoro y realizar una descarga de agua.",
            "Colocar el envase dosificador de Blue Genie de forma vertical en una esquina del tanque.",
            "Asegurar que no interfiera con el flotador o la cadena de descarga.",
            "Actúa en cada descarga liberando enzimas antisarro y tiñendo el agua de azul claro (dura hasta 900 descargas)."
          ]
        },
        hand_soap: {
          product: "Hand Soap (Jabón Líquido Germicida)",
          dilution: "Uso Directo en Despachador",
          steps: [
            "Abastecer los despachadores de los lavabos con Hand Soap concentrado.",
            "Aplicar una dosificación sobre manos húmedas y frotar vigorosamente por 30 segundos.",
            "Asegurar el tallado de palmas, dorso y uñas para una desinfección total.",
            "Enjuagar con abundante agua. El pH balanceado evita resequedad en asesores y clientes."
          ]
        }
      };

      const update = () => {
        const area = document.getElementById("gas-area").value;
        const data = protocols[area];
        
        let stepsHtml = data.steps.map((step, idx) => `
          <div style="display:flex; gap:0.5rem; line-height:1.4; margin-bottom:0.3rem;">
            <span style="color:var(--color-gastronomia); font-weight:bold;">${idx + 1}.</span>
            <span style="color:var(--color-glass-text);">${step}</span>
          </div>
        `).join("");

        document.getElementById("gas-protocol-box").innerHTML = `
          <div style="width:100%; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.5rem; margin-bottom:0.5rem; display:flex; justify-content:space-between; align-items:center;">
            <strong style="color:var(--color-text-white); font-family:var(--font-title); font-size:0.9rem;">${data.product}</strong>
            <span style="background:rgba(255,200,55,0.1); color:var(--color-gastronomia); padding:0.1rem 0.5rem; border-radius:4px; font-weight:bold; font-size:0.7rem;">Dil. ${data.dilution}</span>
          </div>
          <div style="width:100%;">
            <span style="font-size:0.65rem; color:var(--color-text-muted); text-transform:uppercase; letter-spacing:1px; display:block; margin-bottom:0.5rem;">Instrucciones del Protocolo</span>
            ${stepsHtml}
          </div>
        `;
      };

      document.getElementById("gas-area").addEventListener("change", update);
      update();
    }
  },

  // 5. OFICINAS, CAJAS Y SALA DE ESPERA - Dosificación en Áreas Administrativas
  mantenimiento: {
    render: (containerId) => {
      const html = `
        <div class="calculator-card" style="border-color: var(--color-mantenimiento)">
          <div class="calc-title-group" style="color: var(--color-mantenimiento)">
            <svg class="calc-icon" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <h3 class="calc-title">Dosificación en Oficinas</h3>
          </div>
          <div class="calc-form">
            <div class="calc-input-group">
              <label class="calc-label">Capacidad del Rociador / Atomizador</label>
              <div class="calc-input-container">
                <input type="number" id="maint-vol" class="calc-input" value="500" min="50" max="100000">
                <span class="calc-unit">mililitros (ml)</span>
              </div>
            </div>
            <div class="calc-input-group">
              <label class="calc-label">Producto a Diluir</label>
              <select id="maint-dil" class="calc-input calc-select">
                <option value="magic">Magic (Pisos y Aroma - Dil. 1:120)</option>
                <option value="swipe">Swipe (Escritorios y Vidrios - Dil. 1:100)</option>
                <option value="swipol">Swipol (Desinfectante - Dil. 1:20)</option>
                <option value="sure_thing">Sure Thing (Olores - Dil. 1:40)</option>
              </select>
            </div>
            
            <div class="calc-result-box" style="border-color: rgba(138, 63, 252, 0.15); display: grid; grid-template-columns: 50% 50%; gap: 1rem; align-items: center;">
              <div>
                <span class="calc-result-value" id="maint-res-swipe" style="color: var(--color-mantenimiento)">25 ml</span>
                <span class="calc-result-label" style="font-size:0.65rem">Producto Swipe</span>
              </div>
              <div style="border-left: 1px solid rgba(255,255,255,0.08)">
                <span class="calc-result-value" id="maint-res-water" style="color: var(--color-glass-text)">475 ml</span>
                <span class="calc-result-label" style="font-size:0.65rem">Agua limpia</span>
              </div>
            </div>
          </div>
        </div>
      `;
      document.getElementById(containerId).innerHTML = html;
 
      const update = () => {
        const vol = parseFloat(document.getElementById("maint-vol").value) || 0;
        const prod = document.getElementById("maint-dil").value;
        
        let ratio = 100; 
        if (prod === "magic") ratio = 120;
        if (prod === "swipol") ratio = 20;
        if (prod === "sure_thing") ratio = 40;

        const totalParts = ratio + 1;
        const swipeMl = vol / totalParts;
        const waterMl = vol - swipeMl;

        let swipeOutput = "";
        let waterOutput = "";

        if (swipeMl >= 1000) {
          swipeOutput = `${(swipeMl / 1000).toFixed(2)} L`;
        } else {
          swipeOutput = `${Math.round(swipeMl)} ml`;
        }

        if (waterMl >= 1000) {
          waterOutput = `${(waterMl / 1000).toFixed(2)} L`;
        } else {
          waterOutput = `${Math.round(waterMl)} ml`;
        }

        document.getElementById("maint-res-swipe").innerText = swipeOutput;
        document.getElementById("maint-res-water").innerText = waterOutput;
      };

      document.getElementById("maint-vol").addEventListener("input", update);
      document.getElementById("maint-dil").addEventListener("change", update);
      update();
    }
  },

  // 6. AHORRO & ECOLOGÍA - Calculadora de Ahorro y Sustentabilidad Anual
  ahorro: {
    render: (containerId) => {
      const html = `
        <div class="calculator-card" style="border-color: var(--color-ahorro)">
          <div class="calc-title-group" style="color: var(--color-ahorro)">
            <svg class="calc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <h3 class="calc-title">Simulador de Ahorro Anual</h3>
          </div>
          <div class="calc-form">
            <div class="calc-input-group">
              <label class="calc-label">Gasto Mensual Actual en Químicos</label>
              <div class="calc-input-container">
                <input type="number" id="eco-spend" class="calc-input" value="35000" min="5000" max="1000000">
                <span class="calc-unit">MXN / mes</span>
              </div>
            </div>
            <div class="calc-input-group">
              <label class="calc-label">Eficiencia de Optimización Swipe</label>
              <select id="eco-efficiency" class="calc-input calc-select">
                <option value="35">Optimización Conservadora (35% Ahorro)</option>
                <option value="40" selected>Optimización Recomendada (40% Ahorro)</option>
                <option value="45">Optimización Máxima (45% Ahorro)</option>
              </select>
            </div>
            
            <div class="calc-result-box" style="border-color: rgba(168, 255, 120, 0.15); display: grid; grid-template-columns: 50% 50%; gap: 1rem; align-items: center;">
              <div>
                <span class="calc-result-value" id="eco-res-monthly" style="color: var(--color-ahorro)">$14,000</span>
                <span class="calc-result-label" style="font-size:0.65rem">Ahorro Mensual</span>
              </div>
              <div style="border-left: 1px solid rgba(255,255,255,0.08)">
                <span class="calc-result-value" id="eco-res-annual" style="color: #10b981">$168,000</span>
                <span class="calc-result-label" style="font-size:0.65rem">Ahorro Anual Est.</span>
              </div>
            </div>
            
            <div style="background: rgba(255,255,255,0.02); padding: 0.8rem 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.04); font-size: 0.75rem; text-align: center;">
              🌱 <strong>Impacto Ecológico Anual:</strong> <span id="eco-res-bottles" style="color: var(--color-ahorro); font-weight: bold;">1,400</span> envases plásticos de 1L menos en el medio ambiente gracias a las diluciones Swipe en la concesionaria.
            </div>
          </div>
        </div>
      `;
      document.getElementById(containerId).innerHTML = html;

      const update = () => {
        const spend = parseFloat(document.getElementById("eco-spend").value) || 0;
        const eff = parseFloat(document.getElementById("eco-efficiency").value);
        
        const monthlySave = spend * (eff / 100);
        const annualSave = monthlySave * 12;
        
        const bottlesSaved = Math.round((spend / 300) * 12);

        document.getElementById("eco-res-monthly").innerText = `$${Math.round(monthlySave).toLocaleString("es-MX")} MXN`;
        document.getElementById("eco-res-annual").innerText = `$${Math.round(annualSave).toLocaleString("es-MX")} MXN`;
        document.getElementById("eco-res-bottles").innerText = bottlesSaved.toLocaleString("es-MX");
      };

      document.getElementById("eco-spend").addEventListener("input", update);
      document.getElementById("eco-efficiency").addEventListener("change", update);
      update();
    }
  },

  // 7. DEMO - Formulario de Programación de Demostraciones en Vivo por WhatsApp para Roccar
  demo: {
    render: (containerId) => {
      const html = `
        <div class="calculator-card" style="border-color: var(--color-demo)" id="demo-card-container">
          <div class="calc-title-group" style="color: var(--color-demo)">
            <svg class="calc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <h3 class="calc-title">Agendar Prueba en Sitio</h3>
          </div>
          <form class="calc-form" id="demo-booking-form">
            <div class="calc-input-group">
              <label class="calc-label">Área de la Agencia a Probar</label>
              <select id="demo-area" class="calc-input calc-select" required>
                <option value="Taller de Servicio y Mantenimiento">Taller de Servicio y Mantenimiento: Desengrase y Limpieza Mecánica</option>
                <option value="Piso de Ventas y Showroom">Piso de Ventas y Showroom: Brillo y Aromatización de Lujo</option>
                <option value="Área de Lavado y Estética Automotriz">Área de Lavado y Estética Automotriz: Detallado y Car Wash</option>
                <option value="Sanitarios y Vestidores">Sanitarios y Vestidores: Desincrustación y Sanitización</option>
                <option value="Oficinas, Cajas y Sala de Espera">Oficinas, Cajas y Sala de Espera: Limpieza Diaria y Desinfección</option>
              </select>
            </div>
            <div class="calc-input-group">
              <label class="calc-label">Fecha Propuesta</label>
              <input type="date" id="demo-date" class="calc-input" required>
            </div>
            <div class="calc-input-group">
              <label class="calc-label">Horario Preferido</label>
              <select id="demo-time" class="calc-input calc-select" required>
                <option value="09:30 AM">09:30 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="12:00 PM" selected>12:00 PM</option>
                <option value="12:30 PM">12:30 PM</option>
                <option value="13:00">13:00</option>
              </select>
            </div>
            
            <button type="submit" class="quotes-btn-submit" style="background: linear-gradient(135deg, var(--color-demo) 0%, #61003f 100%); color: #fff; box-shadow: 0 10px 20px var(--color-demo-glow); border: none; padding: 0.8rem; font-family: var(--font-title); font-weight:800; font-size:0.85rem; border-radius:8px; cursor:pointer; text-transform:uppercase; margin-top:0.5rem;">
              Solicitar Demostración
            </button>
          </form>
        </div>
      `;
      document.getElementById(containerId).innerHTML = html;

      // Establecer fecha mínima como mañana
      const today = new Date();
      today.setDate(today.getDate() + 1);
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();
      if (mm < 10) mm = '0' + mm;
      if (dd < 10) dd = '0' + dd;
      document.getElementById("demo-date").value = `${yyyy}-${mm}-${dd}`;
      document.getElementById("demo-date").min = `${yyyy}-${mm}-${dd}`;

      // Manejador de reserva
      document.getElementById("demo-booking-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const areaSelected = document.getElementById("demo-area").value;
        const dateVal = document.getElementById("demo-date").value;
        const timeVal = document.getElementById("demo-time").value;

        // Formatear fecha
        const dateParts = dateVal.split("-");
        const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

        // Redirección a WhatsApp para Roccar
        const textMessage = `¡Hola! Me gustaría agendar una demostración de productos Swipe en la concesionaria Roccar para el área de *${areaSelected}*.\n\n📅 *Fecha propuesta:* ${formattedDate}\n⏰ *Horario:* ${timeVal}`;
        const whatsappUrl = `https://wa.me/523321918862?text=${encodeURIComponent(textMessage)}`;
        window.open(whatsappUrl, '_blank');

        document.getElementById("demo-card-container").innerHTML = `
          <div class="quotes-success-msg" style="padding: 1.5rem 0;">
            <div class="success-icon-container" style="width:60px; height:60px; font-size:1.8rem; border-color: rgba(248, 87, 166, 0.4); color: var(--color-demo); box-shadow: 0 0 15px var(--color-demo-glow); margin: 0 auto;">✓</div>
            <h4 style="font-family: var(--font-title); font-size: 1.2rem; color: #fff; margin-top: 0.5rem; text-align:center;">¡Demo Solicitada!</h4>
            <p style="font-size: 0.8rem; line-height: 1.5; color: var(--color-text-muted); text-align: center; margin-top:0.5rem;">
              Te hemos redirigido a WhatsApp para coordinar tu demostración en el área de <strong>${areaSelected}</strong> el día <strong>${formattedDate}</strong> a las <strong>${timeVal}</strong>.
            </p>
            <p style="font-size: 0.75rem; color: var(--color-demo); font-weight:600; margin-top:0.5rem; text-align:center;">
              Si no se abrió la ventana de WhatsApp, puedes hacer click en el enlace para enviar el mensaje.
            </p>
            <button class="btn-details" onclick="CALCULATORS.demo.render('${containerId}')" style="margin: 1rem auto 0 auto; border-color: rgba(255,255,255,0.1); font-size: 0.75rem; padding: 0.5rem 1rem;">Agendar Otra Prueba</button>
          </div>
        `;
      });
    }
  }
};
