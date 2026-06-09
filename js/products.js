/**
 * Base de datos de productos químicos especializados por área
 * para la concesionaria Roccar.
 */
const PRODUCTS_DATA = {
  alberca: {
    title: "Taller de Servicio y Mantenimiento",
    accentColor: "var(--color-alberca)",
    slogan: "Limpieza pesada de motores, desengrase dieléctrico de precisión y remoción de óxido para la operatividad y estética de componentes mecánicos.",
    products: [
      {
        id: "swipe_taller",
        name: "Swipe",
        tagline: "Limpiador y desengrasante multiusos de alta concentración",
        description: "SWIPE es el limpiador y desengrasante biodegradable base para el taller mecánico de Roccar. Su fórmula altamente concentrada y versátil está diseñada para disolver y emulsionar rápidamente grasas de origen mineral, aceites lubricantes y mugre acumulada en superficies metálicas, herramientas, maquinarias y pisos de concreto del taller.",
        benefits: [
          "Poder Emulsionante Rápido: Descompone la grasa de motores y herramientas sin dañar las piezas ni dejar capas aceitosas.",
          "Versatilidad en Diluciones: Permite preparar la solución exacta según el grado de suciedad, desde desengrase pesado hasta limpieza ligera.",
          "Ahorro y Control Presupuestal: Su alto nivel de concentración rinde para múltiples aplicaciones, garantizando ahorros de entre el 35% y el 50% en insumos."
        ],
        usage: "Limpieza general de pisos de taller, herramientas mecánicas, bancos de trabajo y piezas de motor.",
        dosage: "Grasa Pesada (Dilución 1:4) | Limpieza de Herramientas (Dilución 1:12) | Mantenimiento de Pisos (Dilución 1:100).",
        dilution: "Diluir en agua según la dosis recomendada. Aplicar, dejar actuar unos minutos para disolver la grasa, tallar si es necesario y enjuagar.",
        phImpact: "Neutro en dilución. Seguro para usar sobre metales, plásticos y pinturas.",
        safety: "Biodegradabilidad superior al 99%. No contiene cáusticos libres, no es tóxico ni inflamable.",
        badge: "Remoción de Grasa Mineral",
        image: "images/swipe_concentrado.png"
      },
      {
        id: "motor_foam",
        name: "Motor Foam",
        tagline: "Desengrasante espumoso de alto impacto para motores y transmisiones",
        description: "SWIPE Motor Foam es un desengrasante especializado de alta potencia formulado para adherirse a superficies verticales en el vano motor. Su espuma densa penetra y disuelve de manera inmediata el cochambre carbonizado, grasa pesada, aceites quemados y suciedad vial acumulada en motores, transmisiones, componentes de suspensión y bloques de cilindros.",
        benefits: [
          "Espuma de Máxima Adherencia: Su consistencia espumosa se mantiene sobre superficies verticales del motor, maximizando el tiempo de contacto químico.",
          "Eliminación de Residuos Carbonizados: Penetra de manera enérgica las costras de aceite y hollín, facilitando su remoción sin tallar excesivamente.",
          "Seguridad para Mangueras y Plásticos: Diseñado para ser seguro con cables, mangueras de caucho y plásticos del compartimento del motor."
        ],
        usage: "Desengrase y limpieza profunda de compartimentos de motor, transmisiones, bloques de motor y chasis.",
        dosage: "Aplicación concentrada o dilución hasta 1:3 para suciedad moderada.",
        dilution: "Aplicar en spray sobre el motor tibio (no caliente), dejar actuar de 5 a 10 minutos para disolver el cochambre, y enjuagar con agua a presión.",
        phImpact: "Alcalino controlado.",
        safety: "Usar guantes y lentes de seguridad. No aplicar en motores calientes o en marcha. Evitar rociar directamente sobre la toma de aire o componentes electrónicos sensibles.",
        badge: "Espuma Desengrasante",
        image: "images/Motor Foam.png"
      },
      {
        id: "shock",
        name: "Shock",
        tagline: "Solvente dieléctrico de evaporación rápida para limpieza electrónica",
        description: "SWIPE Shock es un solvente limpiador dieléctrico formulado para la limpieza segura de componentes eléctricos y electrónicos en el taller de Roccar. Remueve aceites, grasas, humedad y polvo de alternadores, distribuidores, marchas, bobinas, tableros de fusibles y conectores electrónicos sensibles, con una capacidad de aislamiento de hasta 25,000 voltios, previniendo cortocircuitos sin dejar residuos.",
        benefits: [
          "Alta Rigidez Dieléctrica: Seguro para limpieza de equipos eléctricos energizados o delicados con resistencia de hasta 25,000V.",
          "Evaporación Ultra Rápida: Se seca al instante sin dejar residuos conductivos ni manchas, permitiendo la reactivación rápida del componente.",
          "Cero Residuos Aceitosos: Deja las superficies de contacto metálicas completamente limpias y secas, mejorando la conductividad eléctrica."
        ],
        usage: "Limpieza de alternadores, bobinas, marchas, contactores, arneses y sensores electrónicos.",
        dosage: "Uso directo (Concentrado).",
        dilution: "No diluir. Aplicar mediante pulverizador o inmersión del componente, dejar actuar para disolver la grasa e impurezas, y permitir secar al aire libre.",
        phImpact: "No aplica (solvente orgánico).",
        safety: "Trabajar en áreas bien ventiladas. Mantener alejado de fuentes de calor y chispas. No usar cerca de llamas abiertas.",
        badge: "Dieléctrico hasta 25,000V",
        image: "images/Shock.png"
      },
      {
        id: "rust_off",
        name: "Rust Off",
        tagline: "Desincrustante ácido y eliminador de óxido para componentes de acero",
        description: "SWIPE Rust Off es un desincrustante y remover de óxido de base ácida diseñado para restaurar piezas metálicas corroídas. Disuelve químicamente el óxido de hierro, sarro calcáreo y depósitos minerales en piezas de suspensión, pernos trabados, herramientas de taller y tuberías de refrigeración, facilitando su restauración sin dañar el metal base gracias a sus inhibidores de corrosión.",
        benefits: [
          "Eliminación Química del Óxido: Disuelve el óxido y las incrustaciones rápidamente sin necesidad de lijar de forma mecánica o arenar.",
          "Inhibidores de Corrosión Integrados: Protege el metal base una vez removida la corrosión, retardando la re-oxidación posterior.",
          "Excelente Agente Acondicionador: Deja una superficie fosfatizada ideal para el posterior anclaje de pinturas o recubrimientos protectores."
        ],
        usage: "Desoxidación de piezas de suspensión, tornillería, chasis corroídos, herramientas y tuberías de agua en el taller.",
        dosage: "Óxido Pesado (Concentrado) | Limpieza Ligera / Baño de Piezas (Dilución 1:3 a 1:10).",
        dilution: "Aplicar directo o por inmersión. Dejar actuar según el nivel de corrosión (5 a 20 minutos), tallar suavemente con cepillo de alambre y enjuagar abundantemente con agua.",
        phImpact: "Fuertemente ácido. No usar en aluminio, magnesio o metales blandos.",
        safety: "Usar guantes de nitrilo, lentes de seguridad y mascarilla. No mezclar con cloro o productos alcalinos. Almacenar en envase plástico original.",
        badge: "Fórmula Ácida Activa",
        image: "images/rust_off.png"
      },
      {
        id: "biodegreaser",
        name: "Biodegreaser",
        tagline: "Desengrasante ecológico base agua para limpieza industrial y de talleres",
        description: "SWIPE Biodegreaser es un limpiador desengrasante base agua, formulado con agentes tensioactivos biodegradables y disolventes ecológicos. Ofrece una alternativa segura para el desengrase de piezas mecánicas en tinas de lavado y limpieza de pisos de concreto del taller de servicio de Roccar, reduciendo la dependencia de solventes derivados del petróleo peligrosos para el usuario y el medio ambiente.",
        benefits: [
          "Fórmula Ecológica Biodegradable: Reduce el impacto ambiental de los residuos del taller y facilita el tratamiento de aguas residuales.",
          "Alternativa Segura a Solventes de Petróleo: Sin vapores nocivos para la salud del operario ni riesgos extremos de inflamabilidad.",
          "Limpieza en Tinas de Lavado: Excelente rendimiento en sistemas de lavado de piezas manuales o automáticos con agua caliente o fría."
        ],
        usage: "Limpieza ecológica de piezas desarmadas en tinas de lavado, y remoción de grasa en pisos de concreto del taller.",
        dosage: "Tina de Lavado (Dilución 1:5 a 1:10) | Desengrase Pesado de Pisos (Dilución 1:20) | Mantenimiento (Dilución 1:50).",
        dilution: "Diluir en agua. Aplicar sobre la grasa o aceite, dejar actuar unos minutos, frotar con cepillo o escoba, y enjuagar con agua limpia.",
        phImpact: "Alcalino suave biodegradable.",
        safety: "Biodegradable. No contiene solventes clorados ni hidrocarburos. Usar protección ocular básica. Evitar el contacto prolongado con la piel.",
        badge: "Eco-Desengrasante",
        image: "images/biodegreaser.png"
      }
    ]
  },
  spa: {
    title: "Piso de Ventas y Showroom",
    accentColor: "var(--color-spa)",
    slogan: "Brillo de exhibición en pisos, desinfección de puntos de alto contacto en vehículos y aromatización premium para la mejor experiencia del cliente.",
    products: [
      {
        id: "magic_showroom",
        name: "Magic",
        tagline: "Limpiador y aromatizante de pisos para áreas de exhibición",
        description: "SWIPE Magic es el limpiador y aromatizante biodegradable ideal para los pisos de exhibición en el Showroom de Roccar. Su fórmula triple limpia la suciedad y el polvo sin dejar opacidad ni residuos, reavivando el brillo natural del mármol, porcelanato o loseta. Deja una sofisticada y duradera fragancia premium que mejora la experiencia del cliente.",
        benefits: [
          "Brillo Impecable de Exhibición: Elimina el polvo y las huellas de calzado de los clientes en los pisos de la sala, sin dejar marcas opacas.",
          "Aromatización de Lujo: Fragancias exclusivas de alta fijación (como Lavender, Ocean, etc.) que crean una atmósfera acogedora.",
          "Rendimiento y Eficiencia: Su alta concentración permite que rinda en diluciones extremas, asegurando un control óptimo de gastos."
        ],
        usage: "Limpieza diaria y aromatización de pisos en showroom, recepción y oficinas comerciales.",
        dosage: "Mantenimiento Regular (Dilución 1:120 a 1:150) | Limpieza Localizada (Concentrado).",
        dilution: "Mezclar 80 ml en una cubeta de 10 litros de agua y aplicar con trapeador de microfibra. Dejar secar al aire.",
        phImpact: "Neutro, no daña el acabado brillante de pisos finos.",
        safety: "Biodegradable. No irrita la piel en dilución. Mantener cerrado.",
        badge: "Brillo y Aroma de Lujo",
        image: "images/Magic.png"
      },
      {
        id: "sure_thing_showroom",
        name: "Sure Thing",
        tagline: "Neutralizador químico de olores para cabinas y showroom",
        description: "SWIPE Sure Thing es un avanzado neutralizador de olores diseñado para eliminar de raíz los aromas desagradables en el Showroom y en las cabinas de los vehículos en exhibición o entregados. No enmascara los olores, sino que degrada químicamente las moléculas que causan la fetidez (humedad, humo de cigarrillo, olor corporal), dejando un ambiente fresco y agradable.",
        benefits: [
          "Eliminación de Olores en Vehículos: Remueve de raíz los olores de encierro, humedad o cigarrillos en el interior de los autos seminuevos y de demostración.",
          "Neutralización Química Real: Su fórmula reacciona con los compuestos orgánicos volátiles, destruyéndolos de forma inmediata.",
          "Aromatización Sofisticada: Aporta notas sutiles y elegantes al entorno, generando confianza y confort en el cliente."
        ],
        usage: "Desodorización y aromatización de interiores de autos en exhibición, lounge de entrega y baños.",
        dosage: "Tratamiento de Cabinas (Rociador 1:20) | Aromatización de Showroom (Dilución 1:40).",
        dilution: "Diluir en agua en una botella atomizadora. Rociar finamente en el aire y sobre superficies textiles como alfombras y vestiduras.",
        phImpact: "Neutro, no daña textiles ni plásticos.",
        safety: "Biodegradable, libre de propelentes dañinos. Evitar contacto directo con los ojos.",
        badge: "Neutralización Química",
        image: "images/sure_thing.png"
      },
      {
        id: "swipol_showroom",
        name: "Swipol",
        tagline: "Desinfectante germicida de amplio espectro para áreas de alto contacto",
        description: "SWIPOL es el desinfectante germicida a base de cuaternarios de amonio de quinta generación, indispensable para mantener la bioseguridad en el Piso de Ventas de Roccar. Su fórmula incolora e inodora desinfecta en 30 segundos todas las superficies de contacto frecuente, rompiendo la cadena de transmisión de gérmenes sin irritar ni dejar residuos químicos molestos.",
        benefits: [
          "Sanitización de Puntos de Alto Contacto: Ideal para la desinfección de volantes, palancas de cambio, pantallas táctiles y manijas de vehículos de exhibición.",
          "Acción Rápida en 30 Segundos: Elimina virus, bacterias y hongos de forma inmediata, permitiendo una rápida rotación en demostraciones de manejo.",
          "Compatibilidad Absoluta con Materiales: Seguro para usar sobre acabados de cuero, vinilo, acero cepillado, fibra de carbono y plásticos del auto."
        ],
        usage: "Desinfección de vehículos demo, escritorios de ventas, terminales de cobro y barandales.",
        dosage: "Desinfección de Superficies (Dilución 1:20) | Nebulización de Cabinas (Dilución 1:60).",
        dilution: "Rociar la dilución sobre la superficie con atomizador, dejar actuar 30 segundos y retirar el exceso con microfibra. No requiere enjuague.",
        phImpact: "Neutro. No daña plásticos técnicos, pantallas ni acabados finos.",
        safety: "Biodegradable (95.70%). No irritante. No mezclar con cloro ni detergentes aniónicos.",
        badge: "Eficacia en 30 Segundos",
        image: "images/swipol.png"
      },
      {
        id: "swipe_showroom",
        name: "Swipe",
        tagline: "Limpiador multiusos para cristales y detalles de exhibición",
        description: "SWIPE es el limpiador multiusos diluido para lograr la máxima transparencia en cristales, espejos y superficies metálicas del Showroom. Emulsiona marcas de dedos, polvo y suciedad ligera al instante, permitiendo que los autos en exhibición luzcan impecables bajo los reflectores de la sala.",
        benefits: [
          "Cristales Perfectamente Limpios: Proporciona una limpieza sin rayas en parabrisas, ventanas, cristales de exhibición y espejos.",
          "Remoción Rápida de Huellas: Elimina con una sola pasada las marcas de manos y dedos en las carrocerías y vidrios de los vehículos en exhibición.",
          "Rendimiento Extraordinario: Su dilución liviana permite preparar decenas de litros de limpiador económico, reduciendo costos drásticamente."
        ],
        usage: "Limpieza de vidrios y espejos de vehículos, mesas de cristal, aparadores y pantallas de información.",
        dosage: "Limpieza de Cristales / Solución Liviana (Dilución 1:100) | Limpieza de Plásticos (Dilución 1:12).",
        dilution: "Utilizar la solución 1:100 en botella rociadora, aplicar sobre el cristal y limpiar con jalador de goma o paño de microfibra seco.",
        phImpact: "Neutro, libre de amoniaco o residuos cáusticos.",
        safety: "Seguro para el usuario. Biodegradabilidad superior al 99%. No raya ni daña las películas polarizadas.",
        badge: "Transparencia sin Rayas",
        image: "images/swipe_concentrado.png"
      }
    ]
  },
  gimnasio: {
    title: "Área de Lavado y Estética Automotriz",
    accentColor: "var(--color-gimnasio)",
    slogan: "Limpieza y protección de pintura carrocería, abrillantado fino de interiores de vinilo, piel y plásticos, y reacondicionado de aluminio y cromo.",
    products: [
      {
        id: "somthin_else",
        name: "Somthin Else",
        tagline: "Shampoo concentrado de carrocería con acabado de alto brillo",
        description: "SWIPE Somthin Else es el shampoo de carrocería premium y de pH neutro formulado para el área de lavado y estética automotriz de Roccar. Desarrollado con tensoactivos de alta espumación y lubricantes sintéticos, remueve de forma enérgica la suciedad vial, polvo y grasa de la carrocería, encapsulando las partículas para evitar micro-rayones (swirl marks) durante el lavado manual, y dejando un acabado brillante que realza el color del vehículo.",
        benefits: [
          "Espuma Densa y Lubricación Superior: Encapsula la tierra y el polvo de la pintura, permitiendo que el guante se deslice sin rayar la laca del auto.",
          "Cuidado de Ceras y Selladores: Su pH neutro limpia a profundidad sin desgastar los recubrimientos cerámicos, selladores ni ceras previamente aplicados.",
          "Alto Rendimiento en Car Wash: Su fórmula superconcentrada rinde hasta en dilución 1:500 en cubeta o hidrolavadora, minimizando el consumo químico por lavado."
        ],
        usage: "Lavado manual o con espumadora (foam cannon) de carrocerías, rines y pasos de rueda en el área de estética.",
        dosage: "Lavado de Exteriores (Dilución 1:500) | Aplicación con Cañón de Espuma (Dilución 1:10).",
        dilution: "Para lavado en cubeta, diluir 1 parte de producto por 500 partes de agua. Para cañón de espuma, diluir 1:10. Lavar la carrocería de arriba hacia abajo y enjuagar.",
        phImpact: "pH Neutro (7.0). Completamente seguro para todo tipo de pinturas, barnices y plásticos.",
        safety: "Biodegradable, no irritante para la piel. Puede usarse en lavabos del personal como jabón de manos de alta eficiencia.",
        badge: "pH Neutro y Alto Brillo",
        image: "images/Somthin Else.png"
      },
      {
        id: "car_shine",
        name: "Car Shine",
        tagline: "Abrillantador y protector de vinilos, plásticos y vestiduras",
        description: "SWIPE Car Shine es un protector y abrillantador premium formulado con emulsión de siliconas de alta calidad. Diseñado para nutrir y proteger tableros de instrumentos, paneles de puertas, llantas, molduras exteriores de plástico y vestiduras de vinilo o piel en el área de estética automotriz. Deja una capa protectora contra los rayos UV, restaurando el color original con un acabado seco al tacto y un brillo de exhibición no grasoso.",
        benefits: [
          "Protección UV de Larga Duración: Protege los tableros y plásticos contra la decoloración y cuarteaduras causadas por la exposición solar.",
          "Acabado Seco y sin Brillo Grasoso: Evita que el polvo se adhiera rápidamente a las superficies interiores, manteniendo el habitáculo limpio por más tiempo.",
          "Lustre Premium para Neumáticos: Deja un brillo satinado profundo en las llantas que realza la estética final de entrega de la unidad."
        ],
        usage: "Acondicionamiento y abrillantado de tableros, consolas, molduras exteriores plásticas, hules y neumáticos.",
        dosage: "Uso Directo / Acabado Brillante (Concentrado) | Acabado Mate Satinado (Dilución 1:1 a 1:2).",
        dilution: "Aplicar una pequeña cantidad sobre un aplicador de espuma o microfibra, esparcir uniformemente sobre la superficie limpia y pulir con microfibra seca.",
        phImpact: "Estable y neutro. No mancha las molduras.",
        safety: "Biodegradable. Mantener cerrado. Evitar el contacto con pedales o volantes por riesgo de deslizamiento.",
        badge: "Protección UV Premium",
        image: "images/Car Shine.png"
      },
      {
        id: "alubrite",
        name: "Alubrite",
        tagline: "Limpiador ácido y renovador de rines de aluminio y cromo",
        description: "SWIPE Alubrite es un limpiador desincrustante de base ácida altamente efectivo, desarrollado para eliminar de raíz el polvo de balatas (frenos), óxido superficial y sarro de rines de aluminio, cromo y componentes de acero inoxidable del vehículo. Devuelve el brillo metálico original a los rines y tubos de escape obstruidos por la suciedad de la carretera.",
        benefits: [
          "Remoción del Polvo de Balatas: Disuelve químicamente los depósitos de hierro quemado y carbonilla que se adhieren a los rines.",
          "Brillo Metálico Inmediato: Restaura el aspecto del aluminio y acero inoxidable opacos, eliminando manchas de oxidación de forma rápida.",
          "Limpieza Profunda de Motores: Excelente para desincrustar sarro y óxido ligero en bloques de motor de aluminio."
        ],
        usage: "Limpieza pesada de rines de aluminio y cromo, tubos de escape, estribos de acero y tanques de combustible de aluminio.",
        dosage: "Limpieza Profunda (Concentrado) | Limpieza de Rines / Aseo Regular (Dilución 1:3 a 1:5).",
        dilution: "Rociar la solución diluida en los rines fríos, dejar actuar de 1 a 2 minutos (no permitir que se seque), tallar ligeramente con cepillo y enjuagar con abundante agua a presión.",
        phImpact: "Fuertemente ácido. No usar sobre rines pintados con laca sensible sin prueba previa.",
        safety: "Obligatorio usar guantes, lentes de seguridad y mascarilla. Trabajar en áreas ventiladas. No mezclar con otros químicos.",
        badge: "Desincrustante de Rines",
        image: "images/alubrite.png"
      },
      {
        id: "steelbrite",
        name: "Steelbrite",
        tagline: "Lustrador y pulidor protector de metales y cromo",
        description: "SWIPE Steelbrite es una pasta pulidora y lustradora de alto rendimiento diseñada para restaurar, pulir y proteger metales no ferrosos como cromo, acero inoxidable, latón y cobre. Elimina la opacidad, manchas de agua, sarro y oxidación superficial de molduras, defensas, logotipos y tubos de escape cromados, dejando una micro-capa repelente al agua y al polvo.",
        benefits: [
          "Brillo de Espejo: Restaura el brillo máximo de las molduras cromadas y logotipos de los vehículos nuevos y seminuevos.",
          "Eliminación de Oxidación Fina: Remueve la opacidad superficial y manchas de sarro de agua de lluvia ácida en los detalles de metal.",
          "Protección Repelente Duradera: Deja una barrera protectora invisible que retarda la re-oxidación y facilita los lavados posteriores."
        ],
        usage: "Pulido y abrillantado de cromo, defensas de acero inoxidable, logotipos metálicos y embellecedores de escape.",
        dosage: "Aplicación directa (Pasta concentrada).",
        dilution: "No diluir. Aplicar una pequeña cantidad sobre un paño de microfibra, frotar firmemente sobre el metal en movimientos circulares y pulir con una microfibra limpia hasta obtener brillo de espejo.",
        phImpact: "No corrosivo en seco.",
        safety: "No inflamable. Evitar contacto directo con los ojos. Lavar las manos tras su aplicación.",
        badge: "Pulido Espejo",
        image: "images/steelbrite.png"
      }
    ]
  },
  gastronomia: {
    title: "Sanitarios y Vestidores",
    accentColor: "var(--color-gastronomia)",
    slogan: "Limpieza profunda y desincrustación de tazas y mingitorios, higiene antimicrobial para usuarios y control total de sarro y olores.",
    products: [
      {
        id: "brite_sanitarios",
        name: "Brite",
        tagline: "Limpiador ácido desincrustante rápido para inodoros y mingitorios",
        description: "SWIPE Brite es un desincrustante ácido concentrado diseñado para eliminar sarro y manchas calcáreas en tazas y mingitorios de las áreas de sanitarios y vestidores de la concesionaria. Actúa disolviendo la suciedad mineral rápidamente sin dañar la porcelana ni la grifería.",
        benefits: [
          "Remoción Instantánea de Sarro: Disuelve depósitos de agua dura acumulados bajo el anillo del inodoro de forma segura.",
          "Eliminación de Microorganismos: Combate el desarrollo de bacterias que causan el mal olor en mingitorios.",
          "Seguridad para Tuberías: Fórmula inofensiva para tuberías de PVC, cobre y fosas sépticas."
        ],
        usage: "Desincrustación y desinfección de inodoros y mingitorios en los baños de clientes y personal.",
        dosage: "Aseo Diario (Dilución 1:4) | Sarro Incrustado (Concentrado).",
        dilution: "Para aseo diario, aplicar la solución 1:4 en la taza, tallar con cepillo y descargar. Para sarro incrustado, aplicar concentrado directo.",
        phImpact: "Fuertemente ácido.",
        safety: "Usar guantes de hule. No mezclar con cloro ni otros limpiadores alcalinos.",
        badge: "Desincrustación Activa",
        image: "images/swipe_brite.png"
      },
      {
        id: "brite_gel_sanitarios",
        name: "Brite Gel",
        tagline: "Desincrustante ácido en gel de alta adherencia vertical",
        description: "SWIPE Brite Gel ofrece la misma potencia desincrustante en una consistencia de gel viscoso. Esto permite que el producto se adhiera a las paredes verticales del inodoro, prolongando el tiempo de acción química para disolver incrustaciones de sarro rebeldes.",
        benefits: [
          "Máxima Adherencia Vertical: Evita el escurrimiento rápido del producto, maximizando la efectividad del contacto químico.",
          "Eliminación de Manchas Amarillas: Ideal para restaurar la porcelana manchada por óxido o minerales del agua.",
          "Ahorro y Rendimiento: Su textura en gel evita el desperdicio por escurrimiento, optimizando el presupuesto de limpieza."
        ],
        usage: "Limpieza pesada y desincrustación de inodoros y mingitorios con sarro severo.",
        dosage: "Mantenimiento (Dilución 1:4) | Desincrustación Profunda (Concentrado).",
        dilution: "Aplicar el gel concentrado bajo el borde del inodoro, dejar actuar de 10 a 15 minutos, tallar y descargar el agua.",
        phImpact: "Fuertemente ácido.",
        safety: "Usar guantes. Nunca combinar con cloro para evitar gases peligrosos.",
        badge: "Gel Viscoso Adherente",
        image: "images/Brite Gel.png"
      },
      {
        id: "swipol_sanitarios",
        name: "Swipol",
        tagline: "Desinfectante germicida de grado quirúrgico para baños y vestidores",
        description: "SWIPOL es el desinfectante germicida concentrado a base de cuaternario de amonio para garantizar la higiene en las áreas comunes de sanitarios y vestidores. Elimina gérmenes patógenos comunes, evitando contagios y asegurando un ambiente libre de bacterias.",
        benefits: [
          "Sanitización de Pisos y Paredes: Desinfecta de raíz lavabos, pisos cerámicos, grifería y manijas de puertas.",
          "Control de Infecciones Cruzadas: Ideal para desinfectar vestidores del personal técnico y sanitarios públicos.",
          "Control de Aromas: Evita el mal olor eliminando a las bacterias que lo producen."
        ],
        usage: "Sanitización de pisos cerámicos, muros, lavabos, grifería y tapetes sanitarios.",
        dosage: "Superficies de Baño (Dilución 1:20) | Trapeado de Pisos (Dilución 1:120).",
        dilution: "Rociar la solución diluida 1:20 en grifos y lavabos, dejar actuar y limpiar. Trapear pisos con solución 1:120.",
        phImpact: "Neutro, no daña recubrimientos ni grifos cromados.",
        safety: "Biodegradable. No irrita la piel. No mezclar con cloro.",
        badge: "Germicida de Baño",
        image: "images/swipol.png"
      },
      {
        id: "blue_genie_sanitarios",
        name: "Blue Genie",
        tagline: "Limpiador y desodorizante enzimático de activación automática",
        description: "SWIPE Blue Genie es una pastilla enzimática concentrada colocada en el tanque del inodoro. Con cada descarga, se dosifica automáticamente liberando agentes de limpieza y enzimas que previenen la acumulación de sarro y aromatizan el sanitario continuamente, tiñendo el agua de un tono azul claro de higiene.",
        benefits: [
          "Limpieza Continua Automática: Actúa las 24 horas en cada descarga, reduciendo la necesidad de limpieza manual constante.",
          "Efecto Enzimático Antisarro: Previene que los minerales del agua dura se incrusten en la taza del inodoro.",
          "Estética y Percepción: El agua teñida de azul claro ofrece a los clientes un indicador visual de limpieza constante."
        ],
        usage: "Mantenimiento y desodorización continua de W.C. públicos y de oficinas.",
        dosage: "Envase de 250 gramos con duración de hasta 900 descargas.",
        dilution: "Colocar el frasco dosificador de forma vertical en el interior del tanque, lejos del flotador. Se activa al contacto con el agua.",
        phImpact: "Seguro para las válvulas de descarga.",
        safety: "Biodegradable, no corrosivo y seguro para tuberías.",
        badge: "Rinde 900 Descargas",
        image: "images/blue_genie.png"
      },
      {
        id: "hand_soap_sanitarios",
        name: "Hand Soap",
        tagline: "Jabón líquido germicida y humectante para lavado de manos",
        description: "SWIPE Hand Soap es un jabón líquido antibacterial de pH balanceado diseñado para la higiene de manos en los baños de Roccar. Su fórmula enriquecida elimina gérmenes patógenos mientras cuida y suaviza la piel ante lavados constantes, ideal tanto para asesores como para clientes.",
        benefits: [
          "Desinfección Segura de Manos: Elimina bacterias gram-positivas y gram-negativas al instante.",
          "Fórmula Suave y Humectante: Mantiene la piel hidratada, evitando resequedad o irritaciones en lavados continuos.",
          "Aroma Agradable y Limpio: Deja una fragancia suave que complementa la experiencia de higiene."
        ],
        usage: "Lavado diario y sanitización de manos de clientes, administrativos y asesores en sanitarios.",
        dosage: "Uso directo mediante despachador de jabón SWIPE.",
        dilution: "Aplicar una pequeña dosis del jabón directo en las manos húmedas, frotar durante 30 a 60 segundos y enjuagar.",
        phImpact: "pH balanceado de 5.5 a 6.0 respetuoso con la piel.",
        safety: "Biodegradable, libre de triclosán. Dermatológicamente probado.",
        badge: "Dermatológicamente Seguro",
        image: "images/hand_soap.png"
      }
    ]
  },
  mantenimiento: {
    title: "Oficinas, Cajas y Sala de Espera",
    accentColor: "var(--color-mantenimiento)",
    slogan: "Higiene y limpieza de escritorios, cajas de cobro y salas de espera, eliminación de polvo en cristales y aromatización constante del ambiente.",
    products: [
      {
        id: "magic_oficinas",
        name: "Magic",
        tagline: "Limpiador y aromatizante de pisos para salas de espera",
        description: "SWIPE Magic es el limpiador aromatizante para el mantenimiento de pisos en el área administrativa, oficinas y sala de espera de clientes de Roccar. Limpia el polvo y suciedad del calzado, dejando los pisos relucientes y un ambiente aromatizado de larga duración.",
        benefits: [
          "Ambiente Fresco para el Cliente: La sala de espera mantiene una atmósfera agradable con aromas relajantes.",
          "Brillo e Higiene Sostenida: Limpieza profunda de pisos de loseta o madera sin dañarlos ni dejar residuos pegajosos.",
          "Rendimiento y Ahorro: Rinde hasta para cientos de trapeados por botella concentrada, optimizando el presupuesto."
        ],
        usage: "Trapeado diario y aromatización de áreas de espera, pasillos de oficinas y cajas.",
        dosage: "Mantenimiento Regular (Dilución 1:120 a 1:150).",
        dilution: "Diluir 80 ml de Magic en una cubeta de 10 litros de agua y trapear los pisos.",
        phImpact: "Neutro, libre de cáusticos.",
        safety: "Biodegradable. Mantener cerrado.",
        badge: "Ambiente Aromatizado",
        image: "images/Magic.png"
      },
      {
        id: "swipol_oficinas",
        name: "Swipol",
        tagline: "Desinfectante germicida para mobiliario de oficina",
        description: "SWIPOL es el desinfectante germicida de amplio espectro diseñado para la sanitización de escritorios, teclados, teléfonos, perillas de cajones y salas de juntas en el área administrativa de Roccar, manteniendo a los colaboradores protegidos contra gérmenes.",
        benefits: [
          "Higiene en Equipos Compartidos: Ideal para limpiar teclados, ratones y teléfonos de uso múltiple en cajas o recepción.",
          "Protección Invisible: No deja color, olor residual ni manchas sobre la madera o plásticos de los escritorios.",
          "Eficacia Rápida: Desinfecta superficies en 30 segundos, rompiendo cadenas de transmisión de enfermedades."
        ],
        usage: "Sanitización de escritorios, cubículos de cajas, barandales y áreas de recepción.",
        dosage: "Desinfección de Superficies (Dilución 1:20).",
        dilution: "Rociar sobre el escritorio o mueble, dejar actuar 30 segundos y retirar con paño de microfibra limpio.",
        phImpact: "Neutro. Seguro en maderas tratadas y acabados de plástico.",
        safety: "Biodegradable. Seguro para uso diario.",
        badge: "Desinfección en Oficinas",
        image: "images/swipol.png"
      },
      {
        id: "swipe_oficinas",
        name: "Swipe",
        tagline: "Limpiador y desengrasante multiusos para vidrios y escritorios",
        description: "SWIPE es el limpiador multiusos definitivo para eliminar polvo, manchas de café, grasa corporal y marcas en escritorios, mamparas, vidrios de cajas y cubículos en el área administrativa de Roccar.",
        benefits: [
          "Remoción de Manchas Comunes: Quita huellas de grasa, café o polvo de escritorios y mesas de juntas.",
          "Brillo en Vidrios de Caja: Limpieza impecable para los vidrios y mamparas de acrílico en las cajas de cobro.",
          "Gran Rentabilidad Operativa: Rinde decenas de litros de solución multiusos con un solo envase concentrado."
        ],
        usage: "Limpieza diaria de escritorios, archiveros, vidrios y mamparas en áreas administrativas.",
        dosage: "Limpieza Ligera (Dilución 1:100) | Limpieza de Mobiliario (Dilución 1:12).",
        dilution: "Rociar la dilución sobre la superficie y limpiar con un paño de microfibra hasta dejarla seca.",
        phImpact: "Neutro.",
        safety: "Biodegradable, no tóxico, libre de amoniaco.",
        badge: "Limpieza Práctica",
        image: "images/swipe_concentrado.png"
      },
      {
        id: "sure_thing_oficinas",
        name: "Sure Thing",
        tagline: "Neutralizador de olores y desodorante ambiental premium",
        description: "SWIPE Sure Thing elimina olores orgánicos o de encierro en las salas de espera, cubículos administrativos y salas de juntas de Roccar, reemplazando el mal olor por un aroma sutil y profesional que reconforta a los clientes en espera.",
        benefits: [
          "Sala de Espera Agradable: Neutraliza olores de comida, calzado o aire acondicionado en la recepción.",
          "Acción de Larga Duración: Su fórmula degrada las bacterias causantes del mal olor en vez de solo perfumar.",
          "Aromatización de Bajo Costo: Rinde mucho más que los aerosoles comerciales, disminuyendo el costo operativo."
        ],
        usage: "Desodorización y ambientación de salas de juntas, baños y recepción de clientes.",
        dosage: "Atomización Ambiental (Dilución 1:40) | Gotas Concentradas en Botes de Basura.",
        dilution: "Diluir en agua y rociar en el ambiente. Colocar unas gotas directo en botes de basura.",
        phImpact: "Neutro.",
        safety: "Biodegradable. Mantener cerrado.",
        badge: "Control de Olores",
        image: "images/sure_thing.png"
      }
    ]
  },
  ahorro: {
    title: "Ahorro & Ecología",
    accentColor: "var(--color-ahorro)",
    slogan: "Sustentabilidad financiera y rentabilidad operativa para agencias Roccar mediante diluciones de alta concentración y control de insumos.",
    products: [
      {
        id: "audit_service",
        name: "Ingeniería de Ahorro",
        tagline: "Estudio técnico de optimización de presupuesto en sitio sin costo",
        description: "Analizamos detalladamente tus consumos y procesos de desinfección y estética automotriz actuales en Roccar para diseñar el sistema de dosificación y dilución Swipe óptimo, reduciendo costos operativos drásticamente mientras se elevan los estándares de entrega.",
        benefits: [
          "Reducción directa de costos operativos de limpieza, estética y taller.",
          "Capacitación presencial certificada al personal de lavado y mecánicos de la concesionaria.",
          "Entrega de manuales visuales de dosificación y carpetas técnicas de seguridad."
        ],
        usage: "Visita y diagnóstico operativo en las instalaciones de la agencia sin costo ni compromiso.",
        dosage: "Evaluación técnica en sitio con duración de 2 a 3 horas.",
        dilution: "Personalizado por nuestro Ingeniero de Ventas Swipe según la infraestructura de la agencia.",
        phImpact: "No aplica.",
        safety: "Protocolo de visitas bajo las normas de seguridad de Roccar.",
        badge: "Servicio Sin Costo"
      }
    ]
  },
  demo: {
    title: "Demos & Pruebas en Sitio",
    accentColor: "var(--color-demo)",
    slogan: "Comprueba el rendimiento y resultados espectaculares de Swipe directamente en tus instalaciones.",
    products: [
      {
        id: "demo_cocina",
        name: "Demo: Desinfección y Estética",
        tagline: "Prueba presencial de lavado de carrocería y desengrase pesado",
        description: "Llevamos a cabo demostraciones reales de desengrase de motores con Motor Foam, desoxidación con Rust Off o acabado de exhibición con Car Shine y Somthin Else. Compara el ahorro de tiempo y el brillo inigualable al instante.",
        benefits: [
          "Prueba presencial en un vehículo real para validar el brillo y desengrase.",
          "Demostración de efectividad de dilución y eliminación de marcas viales.",
          "Muestras físicas y asesoría técnica para el departamento de compras de la agencia."
        ],
        usage: "Talleres, áreas de lavado, showroom o salas de espera de Roccar.",
        dosage: "Aplicación y muestreo de control en panel de prueba del vehículo.",
        dilution: "Preparado en sitio por nuestro personal de ingeniería con dilución certificada.",
        phImpact: "Controlado según el producto a demostrar.",
        safety: "Aplicado por personal capacitado con equipo de protección adecuado.",
        badge: "Prueba Sin Costo"
      }
    ]
  }
};
