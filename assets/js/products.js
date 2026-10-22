/*
 * Catálogo de Aloumiño.
 *
 * Para añadir un producto, copia un bloque y cambia sus datos:
 *  - id:          identificador único, sin espacios ni tildes.
 *  - category:    una de las claves de CATEGORIES.
 *  - collections: (opcional) colecciones de temporada: navidad, otono, sanvalentin, madre, padre, eventos.
 *  - price:       número en euros, o null si es "a consultar".
 *  - images:      rutas a las fotos dentro de assets/img/. Si no hay foto, deja [].
 *  - options:     opciones de personalización (type: "select" o "text").
 *  - status:      "soon" para mostrarlo como "Próximamente".
 *  - featured:    true para mostrarlo en la portada.
 */
(function () {
  const AROMAS = ["Lavanda", "Café", "Crema de coco", "Galleta de avena", "Toffee", "Pumpkin pie", "Floral de primavera", "Sin aroma"];
  const COLORS = ["Blanco roto", "Crema", "Rosa empolvado", "Verde salvia", "Otro (indícalo en la nota)"];
  const GIFT_NOTE = { id: "nota", label: "Nota para regalo (opcional)", type: "text", placeholder: "Escribe un mensaje breve para la tarjeta" };

  window.ALOUMINO_CATEGORIES = [
    { id: "aromaticas", name: "Velas aromáticas", intro: "Velas de vaso con cera de soja, pensadas para llenar tu casa de calma y de aromas que abrazan." },
    { id: "decorativas", name: "Velas decorativas y figuras", intro: "Pequeñas esculturas de cera para decorar, regalar o encender en un momento especial." },
    { id: "ramos", name: "Ramos de velas", intro: "Flores de cera que no se marchitan. Ramos y letras para regalar algo que dura." },
    { id: "wax", name: "Wax melts", intro: "Toda la fragancia de una vela, sin llama. Solo tienes que fundirlos en un quemador." },
    { id: "ambientadores", name: "Ambientadores y mikados", intro: "Aromas que se quedan en tu espacio día tras día. Estamos preparando esta colección con mucho mimo." },
    { id: "temporada", name: "Colecciones especiales", intro: "Navidad, otoño, San Valentín, Día de la Madre y del Padre… Creaciones de temporada en edición limitada." },
    { id: "detalles", name: "Detalles para celebraciones", intro: "Recuerdos personalizados para bodas, bautizos, comuniones y eventos únicos." }
  ];

  window.ALOUMINO_COLLECTIONS = {
    navidad: "Navidad",
    otono: "Otoño",
    sanvalentin: "San Valentín",
    madre: "Día de la Madre",
    padre: "Día del Padre",
    primavera: "Primavera",
    eventos: "Eventos"
  };

  window.ALOUMINO_PRODUCTS = [
    // ---------- Velas aromáticas ----------
    {
      id: "lavanda-mansina",
      name: "Lavanda mansiña",
      category: "aromaticas",
      price: 10,
      images: ["assets/img/vela-lavanda-mansina.jpg"],
      aroma: "Lavanda",
      short: "Vela de vaso grande con aroma suave a lavanda.",
      description: "Nuestra vela más serena. Lavanda limpia y delicada para esos ratos en los que solo te apetece bajar el ritmo: un baño, una lectura, el final de un día largo. Se presenta en vaso de cristal con tapa de madera y etiqueta ilustrada a mano.",
      details: { Formato: "Vaso grande de cristal con tapa", Cera: "Soja natural", Mecha: "Algodón" },
      options: [GIFT_NOTE],
      featured: true
    },
    {
      id: "outono-pumpkin-pie",
      name: "Outono · Pumpkin pie",
      category: "aromaticas",
      collections: ["otono"],
      price: 10,
      images: ["assets/img/vela-otono-pumpkin-pie.jpg"],
      aroma: "Pumpkin pie: calabaza especiada y canela",
      short: "La vela del otoño: cálida, especiada y muy de casa.",
      description: "Huele a tarde de lluvia, a manta y a algo horneándose en la cocina. Una mezcla cálida de calabaza y especias que convierte cualquier rincón en refugio. Edición de temporada.",
      details: { Formato: "Vaso grande de cristal con tapa", Cera: "Soja natural", Mecha: "Algodón" },
      options: [GIFT_NOTE],
      badge: "Otoño",
      featured: true
    },
    {
      id: "primavera",
      name: "Vela Primavera",
      category: "aromaticas",
      collections: ["primavera"],
      price: 10,
      images: ["assets/img/vela-primavera.jpg"],
      aroma: "Floral de primavera",
      short: "Vela de vaso coronada con una flor de cera hecha a mano.",
      description: "Una vela que también es un pequeño ramo. Base en dos tonos y una flor de cera modelada pétalo a pétalo, con un aroma floral y luminoso. Preciosa para regalar… o para regalarte.",
      details: { Formato: "Vaso de cristal", Cera: "Soja natural", Acabado: "Flor de cera hecha a mano" },
      options: [
        { id: "color", label: "Color de la flor", type: "select", choices: ["Rosa empolvado", "Blanco roto", "Melocotón", "Otro (indícalo en la nota)"] },
        GIFT_NOTE
      ],
      featured: true
    },
    {
      id: "velas-pequenas",
      name: "Velas pequeñas de vaso",
      category: "aromaticas",
      price: 8,
      images: ["assets/img/velas-pequenas.jpg"],
      aroma: "Café, crema de coco, galleta de avena o toffee",
      short: "Tarro ámbar con tapa. Elige tu aroma favorito.",
      description: "Nuestras velas golosas en formato pequeño: perfectas para probar aromas, para un detalle o para tener una en cada rincón de casa. Tarro de cristal ámbar con tapa metálica.",
      details: { Formato: "Tarro ámbar pequeño con tapa", Cera: "Soja natural", Mecha: "Algodón" },
      options: [
        { id: "aroma", label: "Aroma", type: "select", required: true, choices: ["Café", "Crema de coco", "Galleta de avena", "Toffee"] },
        GIFT_NOTE
      ]
    },

    // ---------- Velas decorativas y figuras ----------
    {
      id: "vela-corazones",
      name: "Vela de corazones",
      category: "decorativas",
      collections: ["sanvalentin"],
      price: null,
      images: ["assets/img/vela-corazones.jpg"],
      aroma: "Sin aroma o con el aroma que elijas",
      short: "Burbujas de corazones en cera de soja.",
      description: "Una vela decorativa llena de corazones que enamora a primera vista. Ideal para San Valentín, aniversarios o para decir «te quiero» sin palabras.",
      details: { Tipo: "Vela decorativa / figura", Cera: "Soja natural" },
      options: [
        { id: "color", label: "Color", type: "select", choices: COLORS },
        { id: "aroma", label: "Aroma", type: "select", choices: AROMAS },
        GIFT_NOTE
      ],
      featured: true
    },
    {
      id: "vela-lazo",
      name: "Vela lazo",
      category: "decorativas",
      price: null,
      images: ["assets/img/vela-lazo.jpg"],
      aroma: "Sin aroma o con el aroma que elijas",
      short: "Un lazo de cera, delicado y muy fotogénico.",
      description: "Un detalle tierno y elegante para decorar una estantería, una mesa de celebración o acompañar un regalo. Disponible en varios tonos suaves.",
      details: { Tipo: "Vela decorativa / figura", Cera: "Soja natural" },
      options: [
        { id: "color", label: "Color", type: "select", choices: ["Lila suave", ...COLORS] },
        { id: "aroma", label: "Aroma", type: "select", choices: AROMAS },
        GIFT_NOTE
      ]
    },
    {
      id: "buda-loto",
      name: "Buda y flor de loto",
      category: "decorativas",
      price: null,
      images: ["assets/img/velas-buda-loto.jpg"],
      aroma: "Sin aroma o con el aroma que elijas",
      short: "Dúo de figuras para crear un rincón de calma.",
      description: "Un pequeño Buda y una flor de loto en cera de tono marfil. Pensados para espacios de descanso, yoga o meditación, o para regalar serenidad a alguien que la necesita.",
      details: { Tipo: "Figuras decorativas (se pueden pedir por separado)", Cera: "Soja natural" },
      options: [
        { id: "pieza", label: "Pieza", type: "select", choices: ["Dúo Buda + loto", "Solo Buda", "Solo flor de loto"] },
        { id: "aroma", label: "Aroma", type: "select", choices: AROMAS },
        GIFT_NOTE
      ]
    },
    {
      id: "vela-relieve",
      name: "Vela pilar con relieve",
      category: "decorativas",
      price: null,
      images: ["assets/img/vela-figura-relieve.jpg"],
      aroma: "Sin aroma o con el aroma que elijas",
      short: "Vela escultórica con una figura en relieve.",
      description: "Una vela de pilar con un relieve lleno de detalle, que luce tanto encendida como apagada. Cada pieza sale del molde con pequeñas diferencias que la hacen única.",
      details: { Tipo: "Vela pilar decorativa", Cera: "Soja natural" },
      options: [
        { id: "color", label: "Color", type: "select", choices: COLORS },
        { id: "aroma", label: "Aroma", type: "select", choices: AROMAS },
        GIFT_NOTE
      ]
    },

    // ---------- Ramos de velas ----------
    {
      id: "bouquet",
      name: "Bouquet de flores de cera",
      category: "ramos",
      price: null,
      images: ["assets/img/bouquet-azul.jpg", "assets/img/ramo-colores.jpg"],
      aroma: "Aroma suave a elegir",
      short: "Un ramo que no se marchita, en los colores que tú elijas.",
      description: "Rosas, margaritas y flores de cera combinadas con flor seca en una composición hecha a mano. Un regalo que perfuma, decora y dura mucho más que un ramo tradicional. Cada bouquet se prepara por encargo.",
      details: { Tipo: "Bouquet en maceta o envuelto", Elaboración: "Por encargo" },
      options: [
        { id: "paleta", label: "Paleta de colores", type: "select", choices: ["Azul y blanco", "Rosas empolvados", "Multicolor", "Tonos neutros", "Otra (indícala en la nota)"] },
        { id: "aroma", label: "Aroma", type: "select", choices: AROMAS },
        GIFT_NOTE
      ],
      featured: true
    },
    {
      id: "ramo-tulipanes",
      name: "Ramo de tulipanes",
      category: "ramos",
      price: null,
      images: ["assets/img/ramo-tulipanes.jpg"],
      aroma: "Aroma suave a elegir",
      short: "Tulipanes de cera en tonos rosa y blanco.",
      description: "Tulipanes de cera con tallo, envueltos con delicadeza. Un ramo sencillo y elegante para cumpleaños, aniversarios o simplemente porque sí.",
      details: { Tipo: "Ramo envuelto", Elaboración: "Por encargo" },
      options: [
        { id: "tamano", label: "Tamaño del ramo", type: "select", choices: ["Pequeño", "Mediano", "Grande"] },
        { id: "colores", label: "Colores", type: "select", choices: ["Rosa y blanco", "Solo blanco", "Solo rosa", "Otro (indícalo en la nota)"] },
        GIFT_NOTE
      ]
    },
    {
      id: "flor-individual",
      name: "Flor de cera individual",
      category: "ramos",
      price: null,
      images: ["assets/img/bouquet-flor.jpg"],
      aroma: "Aroma suave a elegir",
      short: "Una flor envuelta con flor seca. El detalle perfecto.",
      description: "Una sola flor de cera, envuelta en papel y acompañada de paniculata. Pensada como detalle para invitados, profesores, compañeras… o para alguien que se merece una flor que no se marchita.",
      details: { Tipo: "Flor envuelta", Elaboración: "Por encargo" },
      options: [
        { id: "color", label: "Color", type: "select", choices: COLORS },
        GIFT_NOTE
      ]
    },
    {
      id: "letra-personalizada",
      name: "Letra floral personalizada",
      category: "ramos",
      collections: ["eventos"],
      price: null,
      images: ["assets/img/letra-personalizada.jpg"],
      aroma: "Aroma suave a elegir",
      short: "Tu inicial cubierta de flores de cera, en caja.",
      description: "Una inicial rellena de flores de cera hechas a mano, presentada en caja. Un regalo muy personal para nacimientos, cumpleaños, bodas o para decorar un rincón especial.",
      details: { Tipo: "Letra en caja", Elaboración: "Por encargo" },
      options: [
        { id: "letra", label: "Letra", type: "text", required: true, placeholder: "Ej.: N" },
        { id: "paleta", label: "Paleta de colores", type: "select", choices: ["Rosas y blancos", "Tonos neutros", "Multicolor", "Otra (indícala en la nota)"] },
        GIFT_NOTE
      ],
      featured: true
    },

    // ---------- Wax melts ----------
    {
      id: "wax-sachet",
      name: "Wax sachet",
      category: "wax",
      price: 6,
      images: ["assets/img/wax-sachet.jpg"],
      aroma: "A elegir",
      short: "Placa aromática decorada con flor seca, para colgar.",
      description: "Una placa de cera aromática decorada con lavanda y flores secas. Cuélgala en el armario, en el coche o en el pomo de una puerta y deja que perfume sin llama.",
      details: { Uso: "Para colgar, sin llama", Cera: "Soja natural" },
      options: [
        { id: "aroma", label: "Aroma", type: "select", required: true, choices: AROMAS.filter(a => a !== "Sin aroma") },
        GIFT_NOTE
      ],
      featured: true
    },
    {
      id: "wax-melts-flores",
      name: "Wax melts",
      category: "wax",
      price: 5,
      images: ["assets/img/wax-melts-flores.jpg"],
      aroma: "A elegir",
      short: "Piezas de cera aromática para fundir en quemador.",
      description: "Pequeñas flores y formas de cera aromática para usar en tu quemador. Coloca una o dos piezas, enciende la vela de calentar y disfruta del aroma durante horas.",
      details: { Uso: "En quemador de wax melts", Cera: "Soja natural" },
      options: [
        { id: "aroma", label: "Aroma", type: "select", required: true, choices: AROMAS.filter(a => a !== "Sin aroma") }
      ]
    },
    {
      id: "pack-quemador",
      name: "Pack con quemador",
      category: "wax",
      price: 35,
      images: ["assets/img/pack-quemador.jpg"],
      aroma: "Selección de aromas a elegir",
      short: "Quemador de cerámica + selección de wax melts.",
      description: "Todo lo necesario para empezar: un quemador de cerámica y una selección de wax melts en cajitas. Un regalo completo y muy agradecido.",
      details: { Incluye: "Quemador + selección de wax melts", Cera: "Soja natural" },
      options: [
        { id: "aromas", label: "Aromas preferidos", type: "text", placeholder: "Ej.: lavanda, toffee y café" },
        GIFT_NOTE
      ]
    },

    // ---------- Ambientadores y mikados ----------
    {
      id: "mikado",
      name: "Mikado aromático",
      category: "ambientadores",
      price: null,
      status: "soon",
      images: [],
      aroma: "Nuestros aromas de siempre",
      short: "Difusor de varillas para perfumar tu casa sin llama.",
      description: "Estamos preparando nuestros mikados con los aromas de la casa. Si te apetece ser de las primeras personas en probarlos, escríbenos y te avisamos.",
      details: { Tipo: "Difusor de varillas" },
      options: []
    },
    {
      id: "ambientador-textil",
      name: "Ambientador textil",
      category: "ambientadores",
      price: null,
      status: "soon",
      images: [],
      aroma: "Nuestros aromas de siempre",
      short: "Bruma para cojines, cortinas y ropa de cama.",
      description: "Una bruma suave para perfumar textiles y crear ambiente en segundos. Muy pronto en la tienda.",
      details: { Tipo: "Spray textil" },
      options: []
    },

    // ---------- Colecciones especiales ----------
    {
      id: "dia-de-la-madre",
      name: "Vela Día de la Madre",
      category: "temporada",
      collections: ["madre"],
      price: null,
      images: ["assets/img/vela-dia-de-la-madre.jpg"],
      aroma: "Floral a elegir",
      short: "Vela con flor de cera y etiqueta «Feliz Día de la Madre».",
      description: "Una vela de vaso con flor de cera y etiqueta ilustrada para decirle a mamá todo lo que a veces no decimos. Se puede personalizar con su nombre.",
      details: { Formato: "Vaso de cristal", Edición: "Día de la Madre" },
      options: [
        { id: "nombre", label: "Nombre en la etiqueta (opcional)", type: "text", placeholder: "Ej.: María" },
        GIFT_NOTE
      ],
      badge: "Día de la Madre"
    },
    {
      id: "dia-del-padre",
      name: "Vela Día del Padre",
      category: "temporada",
      collections: ["padre"],
      price: null,
      images: ["assets/img/velas-dia-del-padre.jpg"],
      aroma: "Café, toffee o a elegir",
      short: "Tarro ámbar con etiqueta «Feliz Día del Padre».",
      description: "Velas en tarro ámbar con etiquetas pensadas para papá. Aromas cálidos y golosos, y la opción de añadir un mensaje personalizado.",
      details: { Formato: "Tarro ámbar con tapa", Edición: "Día del Padre" },
      options: [
        { id: "aroma", label: "Aroma", type: "select", choices: ["Café", "Toffee", "Galleta de avena", "Crema de coco"] },
        { id: "etiqueta", label: "Texto de la etiqueta", type: "select", choices: ["Feliz Día del Padre", "Eres el mejor papá", "Personalizado (indícalo en la nota)"] },
        GIFT_NOTE
      ],
      badge: "Día del Padre"
    },
    {
      id: "coleccion-navidad",
      name: "Colección Navidad",
      category: "temporada",
      collections: ["navidad"],
      price: null,
      images: ["assets/img/coleccion-navidad.jpg"],
      aroma: "Aromas navideños",
      short: "Figuras de cera para la mesa y el árbol.",
      description: "Gnomos, renos, abetos y figuras navideñas en cera blanca para decorar la mesa, el recibidor o regalar en el amigo invisible. Plazas limitadas cada temporada: te recomendamos reservar con antelación.",
      details: { Tipo: "Figuras y velas navideñas", Edición: "Navidad" },
      options: [
        { id: "pieza", label: "Pieza", type: "select", choices: ["Gnomo", "Reno", "Árbol", "Lote variado", "Otra (indícala en la nota)"] },
        GIFT_NOTE
      ],
      badge: "Navidad",
      featured: true
    },

    // ---------- Detalles para celebraciones ----------
    {
      id: "detalle-bautizo",
      name: "Vela recuerdo personalizada",
      category: "detalles",
      collections: ["eventos"],
      price: null,
      images: ["assets/img/detalle-bautizo.jpg"],
      aroma: "Aroma suave a elegir",
      short: "Mini vela con etiqueta personalizada para tus invitados.",
      description: "Pequeñas velas en tarro con tapa dorada, flor seca y etiqueta con el nombre y la fecha de tu celebración. Ideales para bautizos, comuniones, bodas y cumpleaños.",
      details: { Formato: "Tarro pequeño con tapa", Pedido: "Desde varias unidades, por encargo" },
      options: [
        { id: "evento", label: "Tipo de evento", type: "select", choices: ["Bautizo", "Comunión", "Boda", "Cumpleaños", "Otro"] },
        { id: "texto", label: "Texto de la etiqueta", type: "text", placeholder: "Ej.: Bautizo Aitana · 25/03/2026" }
      ]
    },
    {
      id: "detalle-nombre",
      name: "Tarro con nombre y corcho",
      category: "detalles",
      collections: ["eventos"],
      price: null,
      images: ["assets/img/detalle-nombre.jpg"],
      aroma: "Aroma suave a elegir",
      short: "Mini vela con nombre de cada invitado, cierre de corcho.",
      description: "Un recuerdo con el nombre de cada invitado escrito en la cera y un ramillete de flor seca. Funciona además como marcasitios en la mesa.",
      details: { Formato: "Mini tarro con corcho", Pedido: "Por encargo" },
      options: [
        { id: "nombres", label: "Nombres y fecha", type: "text", placeholder: "Puedes detallar la lista en la nota del pedido" }
      ]
    }
  ];
})();
