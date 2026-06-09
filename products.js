/**
 * Base de datos de productos químicos especializados por área
 * para Soluciones Singulares en Salud.
 */
const PRODUCTS_DATA = {
  alberca: {
    title: "Quirófanos & UCI",
    accentColor: "var(--color-alberca)",
    slogan: "Desinfección de grado quirúrgico, esterilización en frío y control de infecciones nosocomiales en áreas de alto riesgo.",
    products: [
      {
        id: "swipol_quirurgico",
        name: "Swipol (Desinfectante Quirúrgico)",
        tagline: "Desinfectante viricida y bactericida de grado quirúrgico en 30 segundos",
        description: "SWIPOL es un desinfectante germicida y limpiador líquido concentrado, clasificado con grado alimenticio y quirúrgico. Su avanzada formulación a base de cuaternario de amonio de última generación está diseñada para eliminar bacterias, hongos, levaduras y virus, manteniendo una alta efectividad incluso ante la presencia de tierra orgánica. Su fórmula es incolora e inodora, garantizando el cumplimiento de las más estrictas normas de higiene internacional sin causar irritación en la piel del personal ni molestias respiratorias en pacientes bajo anestesia. Además, es un producto certificado como biodegradable con un 95.70% de eficiencia.",
        benefits: [
          "Acción Viricida y Bactericida en 30 Segundos: Su cuaternario de amonio de quinta generación actúa en tiempo récord, eliminando virus envueltos, bacterias multirresistentes (como MRSA), hongos y levaduras. Ideal para los tiempos de rotación rápidos que se requieren entre cirugías.",
          "Seguridad Total para el Entorno Crítico: Fórmula incolora e inodora, cero vapores o aromas químicos irritantes. Seguro para el personal médico y para los pacientes bajo anestesia en UCI. No es irritante para la piel.",
          "Compatibilidad con Equipo Médico de Alta Tecnología: Alta compatibilidad con plásticos técnicos, acrílicos, pantallas táctiles de monitores, ventiladores, bombas de infusión y acero inoxidable quirúrgico, sin deteriorar ni opacas las superficies.",
          "Acción Germicida Residual y Ahorro Financiero: Su altísima concentración permite diluciones de hasta 1:200 para superficies generales y 1:100 para áreas de alta carga biológica. Esta eficiencia de rendimiento es la base para alcanzar ahorros financieros sostenidos del 35% al 50% en el presupuesto de bioseguridad quirúrgica."
        ],
        usage: "Desinfección de equipos médicos, lámparas scialíticas, mesas quirúrgicas, camillas, monitores, ventiladores y todas las superficies de contacto frecuente en quirófanos, UCI y urgencias.",
        dosage: "Superficies Generales (Dilución 1:200) | Grado Quirúrgico / Alta Carga Biológica (Dilución 1:100) | Trapeado de Pisos (Dilución 1:120) | Nebulización Ambiental (Dilución 1:60).",
        dilution: "Aplicar con atomizador en toda la superficie, frotar y dejar secar completamente. No requiere enjuague posterior. Para nebulización, utilizar con nebulizador y solución 1:60.",
        phImpact: "Neutro. No daña recubrimientos, acero inoxidable ni plásticos técnicos.",
        safety: "Biodegradabilidad certificada del 95.70%. Incoloro e inodoro. No irritante para la piel. No inflamable. No mezclar con jabones aniónicos o cloro.",
        badge: "Viricida en 30 Segundos",
        image: "images/swipol.png"
      },
      {
        id: "peracetic_esterilizante",
        name: "Peracetic (Esterilizante en Frío)",
        tagline: "Ácido peracético estabilizado para desinfección de nivel esterilizante",
        description: "SWIPE Peracetic es un poderoso desinfectante y esterilizante de rápida acción formulado a base de ácido peracético (14 - 16%). Dada su altísima efectividad y amplio espectro, es un producto fundamental en la industria hospitalaria para lograr un nivel superior de sanitización y garantizar la total asepsia de los entornos críticos. Su fórmula biodegradable asegura que, tras su acción germicida, se descomponga en materiales completamente inocuos, sin dejar ningún tipo de residuo tóxico en el ambiente clínico.",
        benefits: [
          "Esterilización de Amplio Espectro: Elimina de manera contundente todo tipo de microorganismos patógenos, incluyendo bacterias, virus, levaduras, hongos y esporas. Altamente recomendado para la desinfección profunda de equipo médico y superficies críticas del quirófano.",
          "Esterilización en Frío de Instrumental Termosensible: Permite la esterilización de endoscopios, citoscopios y laparoscopios por simple inmersión, sin requerir autoclaves u otros sistemas de alto costo energético.",
          "Acción Germicida Residual Prolongada: Mantiene su poder desinfectante activo durante varias horas en solución, proporcionando una ventana de acción confiable para tratar múltiples instrumentos en secuencia.",
          "Fórmula Biodegradable e Inocua: Se descompone en agua, oxígeno y ácido acético, sin dejar ningún tipo de residuo tóxico o peligroso en los instrumentos, en el ambiente del quirófano ni en el sistema de drenaje del hospital."
        ],
        usage: "Esterilización de endoscopios, instrumental quirúrgico termosensible y desinfección de alto nivel (DAL) en superficies quirúrgicas y de UCI.",
        dosage: "Esterilización de Instrumental (Inmersión) | Desinfección Superficial de Quirófanos (Dilución 1:50).",
        dilution: "Instrumental Termosensible: Sumergir el equipo completamente en la solución diluida durante el tiempo recomendado por el fabricante del instrumento. Superficies: Diluir en agua desmineralizada y aplicar con rociador en toda el área quirúrgica.",
        phImpact: "Ácido activo desinfectante. No usar sobre metales suaves como aluminio o cobre.",
        safety: "Utilizar equipo de protección personal completo (guantes, lentes de seguridad y mascarilla). Evitar contacto con la piel y ojos. Trabajar en áreas ventiladas. Almacenar en lugar fresco y oscuro.",
        badge: "Esterilizante Esporicida",
        image: "images/Peracetic.png"
      },
      {
        id: "swipe_quirofanos",
        name: "Swipe (Limpiador Multiusos)",
        tagline: "Limpiador y desengrasante multiusos de uso general en áreas críticas",
        description: "SWIPE es un limpiador y desengrasante líquido de uso general, formulado para ser altamente concentrado y versátil, con una biodegradabilidad superior al 99% (avalada por la U.A.N.L.). Es el limpiador base ideal para el entorno clínico, ya que no contiene cáusticos libres, no es tóxico ni corrosivo. Actúa como el paso previo esencial para la remoción de mugre y materia orgánica en áreas críticas, asegurando que los desinfectantes de grado quirúrgico posteriores alcancen el 100% de efectividad.",
        benefits: [
          "Limpieza de Superficies Clínicas: Emulsiona de forma rápida y efectiva la suciedad acumulada en mesas de operaciones, camillas, tripiés y mobiliario de Quirófanos y UCI, sin dañar ni rayar los materiales.",
          "Preparación Óptima para Desinfección: Elimina de raíz la capa de materia orgánica y polvo que sirve de refugio a los patógenos, preparando el área para la acción germicida posterior de SWIPOL o SWIPE Peracetic.",
          "Sustentabilidad y Ahorro Financiero: Su alta concentración permite diluciones extremas en agua, reduciendo el costo por litro de solución y garantizando ahorros financieros de entre el 35% y el 50% en el presupuesto operativo."
        ],
        usage: "Limpieza y remoción de suciedad general en superficies de contacto, pisos epóxicos, paredes y equipos de acero inoxidable en quirófanos y UCI.",
        dosage: "Mantenimiento General de UCI (Dilución 1:100) | Lavado de Acero Inoxidable (Dilución 1:12).",
        dilution: "Mantenimiento General: Diluir 1 parte de producto por 100 partes de agua. Lavado de Acero Inoxidable: Diluir 1 parte por 12 de agua. Se debe utilizar la Pistola Rociadora SWIPE para obtener la dilución exacta y evitar mermas en el presupuesto.",
        phImpact: "Neutro, libre de residuos opacos o cáusticos.",
        safety: "Biodegradabilidad superior al 99% (U.A.N.L.). Registro NSF grado alimenticio. No es tóxico, corrosivo ni inflamable.",
        badge: "Paso 1: Limpieza",
        image: "images/swipe_concentrado.png"
      },
      {
        id: "hand_soap_foam_quirofanos",
        name: "Swipe Hand Soap Foam",
        tagline: "Jabón líquido antimicrobial en espuma para higiene de manos",
        description: "SWIPE Hand Soap Foam es un avanzado jabón líquido antimicrobial formulado específicamente para la desinfección estricta de las manos en entornos hospitalarios críticos. Destaca por su composición totalmente biodegradable y por su diseño tecnológico para transformarse en una espuma suave y ligera al dispensarse a través de la jabonera especializada SWIPE FOAMER.",
        benefits: [
          "Barrera Antimicrobiana Prolongada: Es altamente efectivo en la desinfección y eliminación de una amplia gama de bacterias, hongos y levaduras. Su principal ventaja clínica es que, tras el lavado, su efecto antimicrobial permanece activo durante aproximadamente 2 horas. Esto proporciona una ventana de bioseguridad crucial para el personal médico y de enfermería que interactúa constantemente con pacientes vulnerables en terapia intensiva.",
          "Protección Dermatológica en Lavados Frecuentes: Los lavados quirúrgicos constantes suelen lastimar la piel, pero este producto cuenta con un pH balanceado de 5.5 a 6.5 que armoniza perfectamente con la química natural de las manos. Es sumamente seguro, no irrita y deja una sensación de suavidad tras su uso. Para las áreas de restricción máxima como los quirófanos, se recomienda utilizar su presentación disponible sin fragancia y sin color para evitar cualquier reactividad.",
          "Control de Dosificación y Rentabilidad Financiera: Al dispensarse exclusivamente en forma de espuma mediante el SWIPE FOAMER, se evita el desperdicio de líquido que suele ocurrir con los jabones tradicionales. Este estricto control volumétrico por cada aplicación es la clave operativa para asegurar los ahorros financieros garantizados del 35% al 50% en los consumibles de higiene para el personal médico."
        ],
        usage: "Higiene y lavado antimicrobial de manos para personal médico en áreas críticas y de restricción máxima.",
        dosage: "Protocolo de Lavado Clínico | Asepsia Quirúrgica Estricta.",
        dilution: "Protocolo de Lavado Clínico: Aplicar con el dosificador SWIPE FOAMER una cantidad suficiente de espuma en las manos, frotar vigorosamente durante 1 minuto completo y proceder a enjuagar con agua. Asepsia Quirúrgica Estricta: Si los protocolos de ingreso a quirófano o las intervenciones exigen una desinfección de un nivel más estricto, la operación de lavado puede y debe repetirse para garantizar la máxima seguridad libre de patógenos.",
        phImpact: "pH balanceado de 5.5 a 6.5 respetuoso de la piel.",
        safety: "Biodegradable. Versión sin fragancia y sin color para quirófanos y UCI. Almacenar en envase cerrado.",
        badge: "Efecto por 2 horas",
        image: "images/Hand Soap Foam.png"
      }
    ]
  },
  spa: {
    title: "Lavandería Clínica",
    accentColor: "var(--color-spa)",
    slogan: "Manejo higiénico y desinfección profunda de blancos y campos quirúrgicos expuestos a fluidos biológicos.",
    products: [
      {
        id: "hldh",
        name: "HLDH",
        tagline: "Detergente en polvo concentrado para desinfección terminal de textiles",
        description: "Detergente en polvo concentrado diseñado específicamente para la limpieza profunda, blanqueo y desinfección terminal de textiles en entornos críticos.",
        benefits: [
          "Poder Desinfectante a Base de Cloro: Integrado en la fórmula para garantizar la eliminación de patógenos comunes en sábanas, toallas y batas de pacientes.",
          "Control de Espuma y Alta Eficiencia: Fórmula de baja espumación que protege las lavadoras industriales y optimiza el consumo de agua.",
          "Agentes Antirredepositantes y Anticorrosivos: Previene que la suciedad disuelta se fije de nuevo en la tela y protege los componentes de acero inoxidable de los equipos.",
          "Seguridad para Ropa Blanca y Colores Firmes: Su poder blanqueador es seguro para textiles hospitalarios que requieran desinfección sin decoloración."
        ],
        usage: "Limpieza profunda, blanqueo y desinfección terminal de textiles en entornos críticos.",
        dosage: "Solo una medida dosificadora de 40 gramos es suficiente para lavar 4 kilogramos de ropa.",
        dilution: "Funciona en agua fría, pero logra su máximo rendimiento a temperaturas entre 40° y 60°C para la activación óptima del cloro.",
        phImpact: "Alcalino clorado activo.",
        safety: "No mezclar con ácidos o productos de amonio. Almacenar en lugar seco y fresco. Usar guantes.",
        badge: "Desinfección Terminal",
        image: "images/HLDH.png"
      },
      {
        id: "hldh_system_3",
        name: "HLDH System 3 Mezcla Clorada",
        tagline: "Blanqueador líquido y desinfectante de alto poder para lavandería institucional",
        description: "Es un blanqueador líquido y desinfectante de alto poder, formulado como un sistema de lavado enérgico para su uso exclusivo en lavanderías institucionales que manejan altos volúmenes de ropa blanca.",
        benefits: [
          "Eliminación Especializada de Manchas de Sangre: Diseñado específicamente para erradicar las manchas de sangre, incluyendo el 'mapa' residual que a menudo queda en los textiles clínicos, garantizando la recuperación de la prenda.",
          "Aseguramiento de Desinfección Total: Su potente acción clorada garantiza la desinfección completa de las prendas, un requisito crítico para romper la cadena de transmisión de infecciones en hospitales.",
          "Blanqueo de Alto Rendimiento: Restaura y mantiene la blancura de sábanas, batas y toallas, proporcionando una apariencia de limpieza impecable y profesional."
        ],
        usage: "Recomendado exclusivamente para prendas blancas.",
        dosage: "La dosis debe ajustarse según la clasificación de la ropa y el nivel de suciedad (consulte a su representante Swipe para optimizar el programa de lavado).",
        dilution: "Dosificación automática controlada según las necesidades específicas de la lavandería.",
        phImpact: "Altamente alcalino (pH 11-14).",
        safety: "Producto corrosivo. Requiere uso de guantes y gafas de seguridad para su manipulación. No combinar con otros productos químicos.",
        badge: "Blanqueador Clorado",
        image: "images/HLDH System 3 mezcla clorada.png"
      },
      {
        id: "emulsigraz",
        name: "Emulsigraz",
        tagline: "Detergente reforzador líquido concentrado booster para eliminar grasas y aceites",
        description: "Es un poderoso detergente líquido concentrado, diseñado específicamente como un refuerzo (booster) para emulsificar, dispersar y eliminar eficazmente grasas y aceites de origen vegetal, animal y mineral en textiles, evitando que la suciedad se vuelva a depositar en las prendas.",
        benefits: [
          "Eliminación de Manchas Difíciles: Ideal para tratar ropa de cama, uniformes y mantelería de áreas de nutrición contaminados con aceites, pomadas, cremas medicinales u otro tipo de residuos oleosos.",
          "Potenciador de Lavado: Incrementa significativamente la efectividad del detergente principal en cargas con suciedad pesada, asegurando una limpieza profunda desde el primer ciclo.",
          "Alta Eficiencia Térmica: Formulado para funcionar óptimamente a altas temperaturas (80°C - 90°C), rango comúnmente utilizado en lavanderías hospitalarias para procesos de sanitización."
        ],
        usage: "Utilizar en el ciclo de lavado principal como refuerzo del detergente.",
        dosage: "De 1.5 a 7 ml por kilogramo de ropa seca, dependiendo del nivel de grasa.",
        dilution: "Operar a temperaturas de 80°C a 90°C por un lapso de 8 minutos para maximizar resultados.",
        phImpact: "Detergente emulsionante.",
        safety: "Utilizar protección básica. Consultar ficha técnica para dosificación automática.",
        badge: "Refuerzo Emulsificante",
        image: "images/Emulsigraz.png"
      },
      {
        id: "soft",
        name: "Soft",
        tagline: "Suavizante líquido altamente concentrado y biodegradable para todo tipo de textiles",
        description: "Es un suavizante líquido altamente concentrado de aspecto cremoso y agradable aroma, formulado para ser biodegradable y dar el acabado final de suavidad a todo tipo de textiles.",
        benefits: [
          "Confort Superior para el Paciente: Imparte tersura y una sensación suave y esponjosa a sábanas, toallas y batas, mejorando significativamente la experiencia de comodidad durante la estancia hospitalaria.",
          "Percepción de Higiene Elevada: Deja un delicado y exquisito perfume en las prendas, reforzando la percepción de limpieza e higiene impecable tanto para pacientes como para el personal.",
          "Eficiencia Operativa: Elimina la electricidad estática de la ropa, facilitando los procesos posteriores de planchado industrial, doblado y manipulación de blancos.",
          "Cuidado del Equipo y Textiles: No deja residuos en la lavadora, protegiendo la maquinaria. Su fórmula fina es segura para todo tipo de fibras (algodón, poliéster, lana, seda) y ropa delicada."
        ],
        usage: "Agregar únicamente durante el último ciclo de enjuague.",
        dosage: "Dosificar en el último enjuague según el tamaño de la carga.",
        dilution: "Ideal tanto para ropa de cama y toallas estándar como para prendas finas y delicadas.",
        phImpact: "Ligeramente ácido a neutro en dilución.",
        safety: "Seguro en uso directo en el último enjuague.",
        badge: "Suavidad y Confort",
        image: "images/Soft.png"
      }
    ]
  },
  gimnasio: {
    title: "Habitaciones de Pacientes y Áreas Comunes",
    accentColor: "var(--color-gimnasio)",
    slogan: "Higiene, desinfección profunda de superficies y control ambiental en habitaciones de pacientes, pasillos y áreas comunes.",
    products: [
      {
        id: "swipol_gym",
        name: "Swipol",
        tagline: "Desinfectante germicida y limpiador líquido concentrado biodegradable",
        description: "SWIPOL es un desinfectante germicida y limpiador líquido concentrado, clasificado con grado alimenticio y quirúrgico. Su avanzada formulación a base de cuaternario de amonio de última generación está diseñada para eliminar bacterias, hongos y levaduras, manteniendo una alta efectividad incluso ante la presencia de tierra orgánica. Además, es un producto certificado como biodegradable con un 95.70% de eficiencia, alineándose con los más altos estándares de sustentabilidad clínica.",
        benefits: [
          "Seguridad Hospitalaria de Amplio Espectro: Rigurosamente probado contra patógenos críticos como E. coli, Staphylococcus spp y Pseudomona aeroginosa, asegurando la desinfección total de los cuartos de enfermos (camas, pisos, persianas, gabinetes, teléfonos, almohadas y sábanas).",
          "Confort Absoluto para el Paciente: Líquido incoloro e inodoro, permitiendo cumplir con las más estrictas normas de higiene internacional sin generar molestias respiratorias en áreas de recuperación y siendo totalmente seguro al no ser irritante para la piel.",
          "Alta Rentabilidad Operativa: Su alta tolerancia a las cargas de proteínas y su nivel de concentración permiten tasas de dilución sumamente altas, lo que se traduce directamente en importantes ahorros financieros y eficiencia logística de limpieza diaria."
        ],
        usage: "Desinfección de superficies de alto contacto, trapeado de pisos y nebulización ambiental profunda.",
        dosage: "Superficies 1:20 (25 ml en medio litro de agua) | Pisos 1:120 (83.3 ml en 10 litros de agua) | Nebulización 1:60.",
        dilution: "Dilución en agua. Para superficies rociar y dejar actuar 30 segundos sin enjuagar. Trapear pisos regularmente.",
        phImpact: "Estable y no corrosivo.",
        safety: "Biodegradable (95.70% de eficiencia). No es irritante para la piel. Almacenar en lugar fresco.",
        badge: "Desinfectante Germicida",
        image: "images/swipol.png"
      },
      {
        id: "magic_gym",
        name: "Swipe Magic",
        tagline: "Limpiador, aromatizante y desinfectante de pisos biodegradable",
        description: "SWIPE Magic es un versátil limpiador, aromatizante y desinfectante altamente concentrado y de fórmula biodegradable. Ha sido diseñado específicamente para el cuidado integral de los pisos, logrando eliminar la grasa, el polvo y la suciedad sin dejar residuos opacos. Su acción triple renueva la apariencia de las superficies, dándoles vida mientras desinfecta el área tratada.",
        benefits: [
          "Ambiente Confortable y Acogedor: Con propiedades de aromatización en 5 opciones (Lavender, Ocean Breeze, Lemon Lime, Flower Garden y Green Apple), ideal para mejorar la percepción de limpieza en recepciones, pasillos y salas de espera.",
          "Higiene Confiable y Sustentable: Su coeficiente fenólico le otorga propiedades germicidas, asegurando la desinfección efectiva de los pisos en las áreas de tránsito y recuperación, apoyando a la vez las normativas ecológicas del hospital.",
          "Máxima Eficiencia y Ahorro Financiero: Su alta eficiencia de dilución optimiza drásticamente los recursos materiales del hospital, garantizando ahorros financieros de entre el 35% y el 50% en el presupuesto de mantenimiento de pisos."
        ],
        usage: "Limpieza diaria, desinfección y aromatización de pisos clínicos en áreas de tránsito y recuperación.",
        dosage: "Mantenimiento Diario 60 a 80 ml en 10 litros de agua | Limpieza Profunda Localizada directo.",
        dilution: "Diluir para trapeado regular. Para zonas de suciedad pesada, rociar concentrado directo y trapear con agua limpia.",
        phImpact: "Neutro, libre de residuos opacos.",
        safety: "Biodegradable. Evitar el contacto directo. Mantener cerrado en lugar fresco.",
        badge: "Limpiador y Aromatizante",
        image: "images/Magic.png"
      },
      {
        id: "swipe_gym",
        name: "Swipe",
        tagline: "Limpiador y desengrasante líquido de uso general biodegradable",
        description: "SWIPE es un limpiador y desengrasante líquido de uso general, formulado para ser altamente concentrado y versátil. Cuenta con una biodegradabilidad superior al 99% (avalada por la U.A.N.L.) y posee registro ante la NSF como producto grado alimenticio. Es el limpiador base ideal para la clínica, ya que no contiene cáusticos libres, no es tóxico, no es corrosivo y no es inflamable, garantizando la máxima seguridad para el usuario y el medio ambiente.",
        benefits: [
          "Limpieza Segura Multisuperficie: Emulsiona rápidamente la mugre y grasa corporal sin dañar, rayar ni decolorar materiales. Es perfectamente seguro para camillas o sillas de vinil, plásticos, paredes, vidrios, espejos y cromo.",
          "Preparación Óptima para Desinfección: Actúa como el primer paso esencial en el protocolo de higiene hospitalaria, removiendo la capa de suciedad para permitir que los desinfectantes posteriores actúen con el 100% de eficacia.",
          "Sustentabilidad y Ahorro Financiero: Su extrema concentración permite diluciones muy altas con agua, lo que se traduce en ahorros financieros tangibles de entre un 35% y un 50% en el presupuesto de insumos de limpieza del hospital."
        ],
        usage: "Limpieza de polvo, grasa corporal y mugre en camillas, mobiliario, pisos, paredes, vidrios y espejos.",
        dosage: "Mantenimiento General (Solución Liviana 1:100) | Limpieza de polvo y suciedad ligera en superficies.",
        dilution: "Dilución 1:100 (1 parte de producto por 100 partes de agua). Se recomienda aplicar con la Pistola Rociadora SWIPE para optimizar la aplicación.",
        phImpact: "Neutro y libre de cáusticos libres.",
        safety: "Biodegradabilidad superior al 99% (U.A.N.L.). Registro NSF grado alimenticio. No es tóxico, corrosivo ni inflamable.",
        badge: "Limpiador Multiusos",
        image: "images/swipe_concentrado.png"
      },
      {
        id: "sure_thing_gym",
        name: "Swipe Sure Thing",
        tagline: "Neutralizador químico de olores y desodorante biodegradable",
        description: "SWIPE Sure Thing es un avanzado neutralizador de aromas, desodorante y desinfectante de ambiente en formato líquido, con una fórmula biodegradable y altamente concentrada. Su composición integra agentes degradadores de materia orgánica y emulsificantes con poder germicida, diseñados no solo para enmascarar, sino para eliminar de raíz los olores del medio ambiente.",
        benefits: [
          "Confort Olfativo y Ambiente de Recuperación: Hace desaparecer olores clínicos, biológicos o de alimentos en cuartos de enfermos, baños, pasillos y salas de espera, generando una atmósfera más cálida y reconfortante.",
          "Acción Dual de Higiene y Aroma: Aporta un coeficiente levemente germicida al entorno mientras aromatiza, adaptándose a las preferencias del hospital gracias a sus distintas notas olfativas (floral, menta, canela, vainilla).",
          "Rendimiento Sorprendente: Su formulación de ultra-concentración permite una dilución por gotas, logrando ahorros financieros de entre el 35% y el 50% frente a los típicos aerosoles comerciales de bajo rendimiento."
        ],
        usage: "Aromatización de áreas grandes, tratamiento de botes de basura y desodorización continua de espacios pequeños.",
        dosage: "Áreas grandes (30 a 60 gotas en 1/2 litro de agua) | Puntos críticos directo (unas cuantas gotas) | Espacios pequeños destapado.",
        dilution: "Dilución en agua para atomizador, uso directo por goteo o exposición permanente del envase destapado.",
        phImpact: "Compatible con desinfectantes como Swipol.",
        safety: "Fórmula biodegradable con poder germicida. Evitar la ingestión. Mantener cerrado en lugar fresco.",
        badge: "Neutralizador de Olores",
        image: "images/sure_thing.png"
      },
      {
        id: "hand_soap_foam_gym",
        name: "Swipe Hand Soap Foam",
        tagline: "Jabón líquido antimicrobial en espuma para higiene de manos",
        description: "SWIPE Hand Soap Foam es un avanzado jabón líquido antimicrobial diseñado para transformarse en una espuma suave y ligera a través de su dosificador especializado. Destaca por su composición totalmente biodegradable y por contar con un pH balanceado (5.5 a 6.5) que respeta la química natural de la piel, garantizando una higiene profunda sin causar irritación.",
        benefits: [
          "Protección Hospitalaria Prolongada: Fórmula germicida altamente efectiva contra bacterias, levaduras y hongos. El efecto antimicrobial permanece activo durante aproximadamente 2 horas tras su aplicación.",
          "Confort en el Uso Frecuente: Su textura en espuma deja sensación de suavidad con fragancia a almendras. Disponible también en versión sin fragancia y sin color para pacientes hipersensibles.",
          "Rendimiento y Control de Presupuesto: Dispensado mediante la jabonera SWIPE FOAMER, reduce drásticamente el consumo, garantizando ahorros financieros de entre el 35% y el 50% en insumos de higiene."
        ],
        usage: "Higiene y lavado antimicrobial de manos para personal médico, pacientes y visitas.",
        dosage: "Dosificar mediante jabonera SWIPE FOAMER para obtener espuma instantánea.",
        dilution: "Uso concentrado directo a través del dispensador espumador. Frotar 1 minuto y enjuagar.",
        phImpact: "pH balanceado (5.5 a 6.5) respetuoso de la piel.",
        safety: "Biodegradable. Versión con y sin fragancia. Almacenar en envase original cerrado.",
        badge: "Jabón Antimicrobial",
        image: "images/Hand Soap Foam.png"
      }
    ]
  },
  gastronomia: {
    title: "Dietología & Cocina",
    accentColor: "var(--color-gastronomia)",
    slogan: "Inocuidad microbiológica total en dietas y desengrase de cocinas hospitalarias.",
    products: [
      {
        id: "swipe_concentrado_gastronomia",
        name: "Swipe",
        tagline: "Desengrasante y limpiador líquido de uso general concentrado",
        description: "SWIPE es un desengrasante y limpiador líquido de uso general, altamente concentrado y formulado con un nivel de biodegradabilidad superior al 99%. Se distingue en el entorno clínico por contar con el registro internacional de la NSF (Categoría A1) y la aprobación de SAGARPA, avalándolo como un producto de grado alimenticio estrictamente seguro para ser utilizado en áreas de proceso, preparación y manejo de dietas hospitalarias.",
        benefits: [
          "Poder Desengrasante Integral: Emulsiona de manera rápida y efectiva aceites y grasas tanto animales como vegetales acumulados en la cocina, sin dañar, manchar o corroer equipos de acero inoxidable, plásticos o superficies metálicas.",
          "Seguridad Sanitaria Absoluta: Su fórmula no contiene cáusticos libres, no es tóxica ni inflamable. Al ser categoría A1, garantiza que la limpieza profunda de áreas de alimentos y cuartos limpios se realice sin riesgo de contaminación química, requiriendo únicamente un enjuague final con agua potable.",
          "Rendimiento y Ahorro Financiero: Su extrema concentración permite trabajar con amplias tasas de dilución en agua. Esta versatilidad para abarcar desde la limpieza ligera de pisos hasta la remoción de grasa pesada con un solo producto es la base para asegurar ahorros operativos del 35% al 50% en el presupuesto de intendencia del área de nutrición."
        ],
        usage: "Limpieza y desengrase general en áreas de proceso, preparación y manejo de alimentos.",
        dosage: "Limpieza General (Dilución 1:100) | Limpieza de Acero Inoxidable (Dilución 1:12) | Remoción de Grasa Pesada (Dilución 1:4).",
        dilution: "Limpieza General (1:100): Mezclar 1 parte de producto por 100 de agua. Acero Inoxidable (1:12): Lavado de equipos y mesas de trabajo. Grasa Pesada (1:4): Remover grasas espesas y adheridas (aplicar en superficie tibia para óptimo resultado).",
        phImpact: "Alcalino suave biodegradable.",
        safety: "Fórmula no tóxica y no inflamable, libre de cáusticos libres. Se requiere enjuague con agua potable.",
        badge: "NSF A1 / SAGARPA",
        image: "images/swipe_concentrado.png"
      },
      {
        id: "swipe_grease",
        name: "Grease",
        tagline: "Quitacochambre y desengrasante pesado en gel biodegradable DWM",
        description: "SWIPE GREASE es un poderoso quitacochambre y removedor de grasa formulado con una consistencia en gel totalmente biodegradable. Está compuesto por agentes cáusticos, humectantes y desengrasantes de alto impacto, diseñados específicamente para remover residuos de alimentos carbonizados en equipos de hierro y acero inoxidable propios de cocinas y comedores institucionales.",
        benefits: [
          "Poder Desengrasante de Impacto Profundo: Su gran capacidad humectante le permite penetrar y eliminar rápidamente la capa superior del cochambre carbonizado, actuando de forma simultánea en las diferentes capas de grasa acumulada. Es la herramienta definitiva para la restauración de parrillas, hornos, quemadores, planchas y sartenes en el área de preparación de dietas.",
          "Máxima Adherencia y Rentabilidad: Su composición física en gel proporciona una adherencia altamente efectiva sobre las superficies, evitando escurrimientos. Esto prolonga el tiempo de acción química e incrementa en gran medida el rendimiento del producto. Esta nula pérdida de químico por escurrimiento es vital para garantizar los ahorros financieros del 35% al 50% proyectados para el mantenimiento pesado de la cocina.",
          "Cumplimiento Ecológico: A pesar de su fuerza industrial, mantiene un perfil biodegradable que respalda los objetivos de sustentabilidad del hospital."
        ],
        usage: "Eliminación de cochambre y grasa carbonizada en parrillas, hornos, quemadores, planchas y sartenes.",
        dosage: "Protocolo de Aplicación Segura (Concentrado en gel).",
        dilution: "Aplicar una cantidad suficiente con brocha de cerdas plásticas sobre superficies tibias o frías (nunca calientes). Dejar actuar de 5 a 30 minutos según la severidad del cochambre. Tallar con fibra suave y enjuagar con agua abundante.",
        phImpact: "Fuertemente alcalino activo.",
        safety: "Obligatorio usar guantes de hule. No aplicar sobre aluminio, cromo o superficies pintadas/esmaltadas sin prueba previa. No usar en caliente para evitar vapores tóxicos.",
        badge: "DWM / Gel Quitacochambre",
        image: "images/grease.png"
      },
      {
        id: "swipe_crystal",
        name: "Crystal",
        tagline: "Detergente líquido concentrado lavaloza de grado alimenticio",
        description: "SWIPE CRYSTAL es un detergente líquido lavaloza formulado bajo estrictos estándares de grado alimenticio y con una composición totalmente biodegradable. Destaca por su enérgico poder para remover las grasas más difíciles de la cocina institucional, garantizando al mismo tiempo un cuidado dermatológico excepcional gracias a su pH neutro (7) que no maltrata la piel en el uso continuo.",
        benefits: [
          "Higiene Alimentaria y Cero Residuos: Corta la grasa pesada en utensilios de cocina, loza, cristalería, sartenes y cubiertos, eliminando el opaco 'efecto de gota' en los vasos y dejando las tarjas completamente libres de residuos. Además, su fórmula va más allá de la limpieza al eliminar una amplia gama de bacterias, hongos y levaduras.",
          "Protección al Personal Médico-Dietético: A diferencia de los detergentes industriales agresivos, su fórmula suave, recomendada por dermatólogos, mantiene las manos del personal suaves y con un agradable aroma a limón tras las rutinas intensivas de lavado manual.",
          "Máximo Rendimiento Financiero: Su característica más sobresaliente es la economía sorprendente que brinda al hospital. La altísima concentración del químico permite que un solo litro de SWIPE CRYSTAL rinda hasta 100 litros de detergente lavaloza. Esta asombrosa tasa de dilución es el factor central para garantizar que se cumpla la meta de ahorro financiero del 35% al 50% en los consumibles diarios de la cocina."
        ],
        usage: "Lavado manual de vajillas, vasos, cristalería, ollas, sartenes y utensilios de cocina.",
        dosage: "Lavado Regular (10 ml por litro) | Grasa Severa (15 ml por litro).",
        dilution: "Lavado Regular: Diluir 10 ml de Crystal por litro de agua. Grasa Severa e Incrustada: Incrementar la dosis a 15 ml por litro de agua para preparar la solución lavaloza.",
        phImpact: "pH Neutro (7.0) no corrosivo.",
        safety: "Fórmula biodegradable suave para las manos, dermatológicamente recomendada. Evitar contacto directo con los ojos.",
        badge: "pH Neutro / 1L rinde 100L",
        image: "images/crystal.png"
      },
      {
        id: "swipe_peracetic",
        name: "Peracetic",
        tagline: "Desinfectante biodegradable a base de ácido peracético DWM (1 L)",
        description: "SWIPE Peracetic es un desinfectante biodegradable de rápida acción, formulado a base de ácido peracético (14 - 16%). Desarrollado específicamente para la higienización en la industria alimenticia, cuenta con la aprobación de la FDA y el USDA, y está clasificado como sustancia GRAS y registro NSF, lo que certifica su total seguridad para el contacto directo con alimentos.",
        benefits: [
          "Inocuidad Total en Alimentos: Es el producto ideal para la desinfección directa de frutas, verduras, hortalizas con o sin cáscara, así como carnes, aves, pescados y mariscos. Su principal ventaja clínica es que no imparte sabor, color, ni olor al producto final, y se descompone en materiales inocuos sin dejar ningún tipo de residuo tóxico.",
          "Eficiencia Absoluta en Entornos Críticos: Elimina de raíz bacterias, virus, levaduras, hongos y esporas de equipos, utensilios y mesas de preparación. Mantiene su total eficacia incluso en condiciones adversas: resiste alta dureza de agua y es completamente funcional a bajas temperaturas (hasta 4°C), por lo que es perfecto para sanitizar las cámaras frías del hospital.",
          "Rendimiento y Control Presupuestal: Su nivel de ultra-concentración permite que sea funcional en diluciones extremas, yendo desde 1:120 hasta 1:1500. Esta drástica reducción en la cantidad de químico necesario por litro de agua es el pilar para sostener los ahorros financieros del 35% al 50% proyectados en el presupuesto de desinfección alimentaria."
        ],
        usage: "Desinfección de frutas, verduras, carnes, utensilios, mesas de preparación y cámaras frías.",
        dosage: "Frutas y Verduras (1:1500 / 100 ppm) | Superficies y Carnes (1:750 / 200 ppm).",
        dilution: "Sanitización de Alimentos: Diluir 0.66 ml por litro de agua (1:1500), actuar por 5-10 minutos (sin enjuague). Superficies de Contacto y Carnes: Diluir 1.33 ml por litro (1:750), aplicar 5-10 minutos, escurrir (sin enjuague).",
        phImpact: "Ácido orgánico biodegradable.",
        safety: "Evitar contacto prolongado con piel y ojos usando EPP. Trabajar en ambientes ventilados. No aplicar directamente sobre metales suaves como aluminio o cobre.",
        badge: "DWM 1 L / FDA & NSF",
        image: "images/Peracetic.png"
      },
      {
        id: "swipol_gastronomia",
        name: "Swipol",
        tagline: "Desinfectante germicida de grado alimenticio y quirúrgico DWM (1 L)",
        description: "SWIPOL es un desinfectante germicida y limpiador líquido que ostenta una doble clasificación de grado alimenticio y nivel quirúrgico, formulado a base de cuaternarios de amonio de última generación. Para asegurar un control logístico estricto en el almacén de dietología, integra el descriptor técnico DWM en la etiqueta frontal y marcador de volumen de 1 L.",
        benefits: [
          "Inocuidad Alimentaria Total: Su fórmula es completamente incolora e inodora, ideal para cumplir con las más estrictas normas de higiene internacional en la preparación de dietas, eliminando una amplia gama de bacterias, hongos y levaduras incluso en presencia de tierra orgánica.",
          "Alta Tolerancia en Entornos Exigentes: Mantiene sus propiedades desinfectantes intactas tanto en altas como en bajas temperaturas, y cuenta con una alta tolerancia frente a cargas de proteínas y agua dura, escenarios constantes en el procesamiento de alimentos.",
          "Cumplimiento Normativo y Rendimiento: Su extrema concentración le permite alcanzar diluciones precisas que cumplen con los estándares de la FDA para plantas de alimentos. Esta alta capacidad de rendimiento es el factor clave para generar ahorros del 35% al 50% en los presupuestos de sanitización diaria de la cocina."
        ],
        usage: "Desinfección de superficies, botes de basura, interior de refrigeradores, mesas de trabajo y trapeado de pisos de cocina.",
        dosage: "Superficies en Contacto Directo (8.3 ml/L) | Desinfección General (Dilución 1:20) | Trapeado de Pisos (Dilución 1:120).",
        dilution: "Contacto Directo: Diluir 8.3 ml por litro de agua (se requiere enjuague posterior con agua potable). Desinfección General: Diluir 25 ml en medio litro de agua (1:20), actuar por 30s. Pisos: Diluir 83.3 ml en 10 litros de agua (1:120).",
        phImpact: "Neutro, seguro para cerámica y superficies.",
        safety: "Biodegradabilidad certificada del 95.70%. Evitar contacto directo con los ojos. Almacenar en envase original.",
        badge: "DWM 1 L / Quirúrgico & Alim.",
        image: "images/swipol.png"
      }
    ]
  },
  mantenimiento: {
    title: "Sanitarios & Baños",
    accentColor: "var(--color-mantenimiento)",
    slogan: "Protocolos de desinfección agresiva para sanitarios comunes, vestidores y baños de visitas con control absoluto de olores orgánicos.",
    products: [
      {
        id: "swipe_concentrate",
        name: "Brite",
        tagline: "Limpiador líquido de tipo ácido desincrustante y desinfectante",
        description: "SWIPE BRITE es un limpiador líquido de tipo ácido, altamente concentrado, formulado específicamente para limpiar, desinfectar y desodorizar inodoros y mingitorios de manera rápida y segura. Su fórmula de acción rápida es 100% activa, produce poca espuma y cuenta con una comprobada biodegradabilidad del 96.64%, cumpliendo con los estándares ecológicos de las instalaciones hospitalarias. Es inofensivo para las tuberías y fosas sépticas, además de ser seguro para el esmalte de cualquier color de porcelana.",
        benefits: [
          "Higiene Clínica Inmediata: Inhibe eficazmente el desarrollo de bacterias provenientes del agua y materias fecales, lo que impide de forma directa la formación de olores desagradables producidos por estos microorganismos en los baños del hospital.",
          "Remoción de Incrustaciones Severas: Diseñado para disolver y quitar las manchas y el sarro fuertemente adherido bajo el anillo de la taza del inodoro, causado por los residuos calcáreos del agua.",
          "Rentabilidad y Eficiencia de Dilución: Para el mantenimiento continuo, su fórmula concentrada permite una alta dilución. Esta capacidad de maximizar el rendimiento del producto es el motor para alcanzar ahorros financieros sostenidos de entre el 35% y el 50% en el presupuesto de limpieza de las áreas sanitarias."
        ],
        usage: "Limpieza, desinfección y desodorización de inodoros y mingitorios en áreas sanitarias hospitalarias.",
        dosage: "Mantenimiento Diario (Dilución 1:4) | Limpieza Profunda de Sarro (Concentrado).",
        dilution: "Mantenimiento Diario: Diluir 1 parte de Brite por 4 de agua en botella aplicadora, aplicar en la taza, frotar con aplicador especial y enjuagar. Limpieza Profunda: Quitar el agua del W.C., aplicar producto concentrado directamente bajo el borde, tallar y remojar por 15 minutos antes de enjuagar.",
        phImpact: "Ácido activo desincrustante.",
        safety: "Se recomienda el uso de guantes para el personal de intendencia. Nunca debe mezclarse con cloro o cualquier otro producto.",
        badge: "Biodeg. 96.64%",
        image: "images/swipe_brite.png"
      },
      {
        id: "brite_gel",
        name: "Brite Gel",
        tagline: "Limpiador desincrustante y desodorizante de tipo ácido en formato gel",
        description: "SWIPE BRITE GEL es un limpiador de tipo ácido, altamente concentrado en formato gel, formulado para limpiar, desinfectar y desodorizar inodoros y mingitorios. Cuenta con una fórmula 100% activa de acción rápida y una biodegradabilidad comprobada del 96.64%, lo que asegura el cumplimiento de las normativas ambientales del hospital. Es totalmente inofensivo para tuberías o fosas sépticas y seguro para el esmalte de porcelana de cualquier color.",
        benefits: [
          "Máxima Adherencia y Remoción: Su consistencia en gel le permite adherirse prolongadamente a las paredes de la taza, disolviendo de manera altamente efectiva el sarro incrustado y las manchas calcáreas que provienen del agua.",
          "Erradicación Clínica de Olores: Actúa como un desinfectante sumamente eficaz al inhibir el desarrollo de bacterias derivadas del agua y materias fecales, previniendo desde el origen la formación de olores desagradables en las áreas sanitarias.",
          "Alta Rentabilidad Operativa: Aunque tiene el poder para limpiezas profundas en estado puro, su fórmula concentrada permite diluirse para las rutinas de mantenimiento diario. Esta flexibilidad y alto rendimiento son fundamentales para lograr ahorros financieros del 35% al 50% en los insumos de esta área crítica."
        ],
        usage: "Desincrustación de sarro y desodorización en inodoros y mingitorios con alta adherencia vertical.",
        dosage: "Mantenimiento Diario (Dilución 1:4) | Desincrustación Severa (Concentrado).",
        dilution: "Mantenimiento Diario: Diluir 1 parte de Brite Gel por 4 de agua en el bote aplicador y frotar. Desincrustación Severa: Quitar el agua del W.C., aplicar el gel concentrado bajo el borde del anillo, dejar remojar por 15 minutos y frotar con una fibra verde (no de alambre) antes de enjuagar.",
        phImpact: "Ácido activo en gel desincrustante.",
        safety: "Se recomienda el uso de guantes para el personal de intendencia. Nunca debe mezclarse con cloro o cualquier otro producto químico.",
        badge: "Máxima Adherencia",
        image: "images/Brite Gel.png"
      },
      {
        id: "hand_soap",
        name: "Swipe Hand Soap",
        tagline: "Jabón líquido germicida y antiséptico para desinfección estricta de manos",
        description: "SWIPE Hand Soap es un avanzado jabón líquido germicida, formulado con ingredientes de la más alta calidad y diseñado para la desinfección estricta de las manos. Respalda los compromisos de sustentabilidad del hospital al contar con una biodegradabilidad comprobada del 96.77% y ostentar certificación de grado alimenticio.",
        benefits: [
          "Barrera de Control de Infecciones: Es una herramienta vital en los baños para prevenir infecciones causadas por falta de higiene cruzada, ya que elimina una amplia gama de bacterias, hongos y levaduras. Su eficacia está probada contra patógenos críticos como S. aureus, E. coli, Salmonella y Candida.",
          "Protección Dermatológica Continua: Su pH balanceado de 5 a 6 está en perfecta armonía con la química natural de la piel. Esto asegura que sea un producto sumamente seguro y no irritante, permitiendo el lavado frecuente sin lastimar las manos del personal o los pacientes.",
          "Rentabilidad y Eficiencia Operativa: Aunque el producto brinda un nivel clínico de protección, su integración con los despachadores institucionales SWIPE permite un control exacto de la dosis. Esta optimización del consumible es clave para respaldar los ahorros financieros proyectados del 35% al 50% en el abastecimiento de los módulos sanitarios."
        ],
        usage: "Higiene y lavado antiséptico de manos en áreas comunes, vestidores y baños del hospital.",
        dosage: "Protocolo de Desinfección (Uso Concentrado).",
        dilution: "Aplicar una cantidad razonable desde el despachador SWIPE, frotar firmemente por espacio de un minuto y enjuagar con agua. Repetir la operación para un nivel de desinfección más riguroso.",
        phImpact: "pH balanceado de 5.0 a 6.0 compatible con la piel.",
        safety: "Dermatológicamente seguro. Evitar contacto con los ojos. Uso externo.",
        badge: "Grado Alimenticio",
        image: "images/hand_soap.png"
      },
      {
        id: "blue_genie",
        name: "Blue Genie",
        tagline: "Limpiador y detergente enzimático biodegradable de activación automática",
        description: "SWIPE Blue Genie es un innovador limpiador y detergente enzimático biodegradable, diseñado para activarse al simple contacto con el agua en el tanque del inodoro. Su fórmula mejorada cuenta con una alta concentración de surfactantes, secuestrantes y bactericidas que potencian su poder limpiador. Es un producto completamente seguro para el entorno clínico: NO es tóxico, NO es corrosivo, NO daña el medio ambiente y NO mancha la cerámica del sanitario.",
        benefits: [
          "Triple Acción Continua: En cada descarga, el sistema proporciona de manera automática poder desinfectante (inhibiendo el crecimiento bacteriano), poder desodorante (eliminando olores desagradables desde el interior del tanque) y poder desensarrante (evitando la acumulación de depósitos calcáreos tanto en el tanque como en la taza).",
          "Percepción Visual de Higiene: Al activarse, el producto tiñe el agua de un color azul claro. Esto ofrece a pacientes, personal médico y visitantes un indicador visual de que el inodoro está siendo activamente sanitizado y desodorizado, aumentando la percepción de limpieza en la clínica.",
          "Rendimiento Extraordinario y Ahorro Financiero: Su envase original permite que se dosifique automáticamente, manteniendo el W.C. en óptimas condiciones durante un periodo de 2 a 3 meses (aproximadamente 900 descargas). Esta drástica reducción en la necesidad de mano de obra para limpieza manual y la longevidad del cartucho son argumentos centrales para respaldar ahorros financieros del 35% al 50% en el mantenimiento de las áreas de sanitarios."
        ],
        usage: "Limpieza, desodorización y desensarre automático continuo de inodoros desde el tanque.",
        dosage: "Envase dosificador de peso neto 250 g (Durabilidad de 2 a 3 meses / aprox. 900 descargas).",
        dilution: "Instalación Sencilla: Colocar el envase verticalmente en una esquina del tanque de agua tras realizar una descarga, asegurando que no interfiera con el flotador. Esperar a que llene y descargar para activar (el agua tomará tono azul claro). Cambiar al perder color.",
        phImpact: "Seguro y no corrosivo para válvulas y cerámica.",
        safety: "Biodegradable, no tóxico, no corrosivo y no mancha la cerámica.",
        badge: "900 Descargas",
        image: "images/blue_genie.png"
      },
      {
        id: "swipol_mantenimiento",
        name: "Swipol",
        tagline: "Desinfectante germicida y limpiador de grado quirúrgico de amplio espectro",
        description: "SWIPOL es un poderoso desinfectante germicida y limpiador líquido de grado quirúrgico, formulado a base de cuaternarios de amonio de última generación. Destaca por su alta sustentabilidad al contar con una biodegradabilidad comprobada del 95.70%. Su fórmula avanzada es incolora e inodora, lo que garantiza el cumplimiento de las normativas de higiene internacional más estrictas sin causar irritación en la piel del personal.",
        benefits: [
          "Erradicación de Patógenos Críticos: Ha demostrado una eficacia bactericida, viricida y fungicida de amplio espectro, eliminando bacterias, hongos y levaduras como E. coli, Staphylococcus spp y Pseudomona aeroginosa en áreas propensas a la contaminación cruzada como inodoros, lavabos y pisos de los baños.",
          "Eficacia Ante Cargas Orgánicas: A diferencia de desinfectantes comunes, SWIPOL mantiene sus propiedades desinfectantes y su alta tolerancia incluso en presencia de tierra orgánica y agua dura, escenarios comunes en los módulos sanitarios.",
          "Versatilidad y Eficiencia Financiera: Si se desea un ambiente perfumado en los baños, puede combinarse con cualquier aroma de SWIPE SURE THING sin perder su poder desinfectante. Su extrema capacidad de concentración permite diluciones muy altas, siendo la base técnica para garantizar ahorros del 35% al 50% en el presupuesto destinado a la desinfección diaria."
        ],
        usage: "Desinfección de superficies de alto contacto, trapeado de pisos de baño y tapetes sanitarios.",
        dosage: "Superficies (Dilución 1:20) | Trapeado de Pisos (Dilución 1:120) | Tapetes Sanitarios (Dilución 1:60).",
        dilution: "Superficies: Diluir 25 ml de Swipol en medio litro de agua (1:20), aplicar con atomizador, actuar por 30s y secar. Pisos: Diluir 83.3 ml en 10 litros de agua (1:120) y trapear. Tapetes Sanitarios: Diluir 25 ml en 1.5 litros de agua (1:60).",
        phImpact: "Incoloro e inoloro. No daña recubrimientos cerámicos ni grifería.",
        safety: "Biodegradabilidad de 95.70%. Seguro para la piel del personal. No inflamable.",
        badge: "Grado Quirúrgico",
        image: "images/swipol.png"
      }
    ]
  },
  ahorro: {
    title: "Ahorro & Ecología",
    accentColor: "var(--color-ahorro)",
    slogan: "Sustentabilidad financiera y bioseguridad para Soluciones Singulares en Salud con sistemas de alta concentración.",
    products: [
      {
        id: "audit_service",
        name: "Ingeniería de Ahorro",
        tagline: "Estudio técnico personalizado de optimización de presupuesto de bioseguridad en sitio",
        description: "Analizamos detalladamente tus consumos y procesos de desinfección actuales para diseñar el sistema de dosificación y dilución Swipe óptimo, reduciendo costos operativos drásticamente mientras se elevan los estándares higiénicos.",
        benefits: [
          "Reducción directa de costos operativos de limpieza y desinfección.",
          "Capacitación presencial certificada al personal de intendencia del hospital.",
          "Entrega de manuales visuales de dosificación y carpetas técnicas de bioseguridad."
        ],
        usage: "Visita y diagnóstico operativo en las instalaciones del hospital sin costo ni compromiso.",
        dosage: "Evaluación técnica en sitio con duración de 2 a 3 horas.",
        dilution: "Personalizado por nuestro Ingeniero de Ventas Swipe según la infraestructura hospitalaria.",
        phImpact: "No aplica.",
        safety: "Protocolo de visitas bajo las normas de ingreso de Soluciones Singulares en Salud.",
        badge: "Servicio Sin Costo"
      }
    ]
  },
  demo: {
    title: "Demos & Pruebas en Sitio",
    accentColor: "var(--color-demo)",
    slogan: "Comprueba el rendimiento y resultados espectaculares de Swipe directamente en tus instalaciones sanitarias.",
    products: [
      {
        id: "demo_cocina",
        name: "Demo: Desinfección y Desengrase",
        tagline: "Prueba biológica de desinfección y remoción extrema de suciedad",
        description: "Llevamos a cabo demostraciones reales de desinfección con luminómetro (ATP) y desengrase de planchas/campanas. Compara el ahorro de tiempo y el nivel de inocuidad microbiológica al instante.",
        benefits: [
          "Prueba presencial con lectura de luminometría para validar bioseguridad.",
          "Demostración de efectividad en áreas de alto contacto o grasas carbonizadas.",
          "Muestras físicas y asesoría técnica para el departamento de compras y control infeccioso."
        ],
        usage: "Cocinas, habitaciones, sanitarios o salas de espera de Soluciones Singulares en Salud.",
        dosage: "Aplicación y muestreo de control biológico en cuadrante de prueba.",
        dilution: "Preparado en sitio por nuestro personal de ingeniería con dilución certificada.",
        phImpact: "Controlado según el producto a demostrar.",
        safety: "Aplicado por personal capacitado con equipo de bioseguridad adecuado.",
        badge: "Prueba Sin Costo"
      }
    ]
  }
};
