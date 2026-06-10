// Catálogo de ciudades europeas para el armador de viaje.
// - code: código de ciudad IATA (para los deep links de vuelos)
// - direct: true si suele haber vuelo directo frecuente desde Buenos Aires (EZE)
// - kids: top actividades pensadas para viajar con niños (lo que SÍ o SÍ vale la pena)
//
// Las actividades son curadas (no precios en tiempo real). El costo de entrada
// es un estimado editable; lo importante es saber QUÉ hacer en cada lugar.

export const ORIGIN = { code: 'BUE', name: 'Buenos Aires' }

export const CITY_CATALOG = {
  mad: {
    id: 'mad', name: 'Madrid', flag: '🇪🇸', code: 'MAD', country: 'España', direct: true,
    kids: [
      { name: 'Parque del Retiro en bote', note: 'Remar en el estanque, titiriteros los findes', approx: 8 },
      { name: 'Zoo Aquarium de Madrid', note: 'Pandas, delfinario y acuario', approx: 24 },
      { name: 'Teleférico de Madrid', note: 'Vistas de la ciudad sobre Casa de Campo', approx: 6 },
      { name: 'Museo del Ferrocarril', note: 'Trenes antiguos para subir, ideal peques', approx: 6 },
      { name: 'Faunia', note: 'Parque temático de biodiversidad', approx: 28 },
    ],
  },
  bcn: {
    id: 'bcn', name: 'Barcelona', flag: '🇪🇸', code: 'BCN', country: 'España', direct: true,
    kids: [
      { name: 'Parc Güell', note: 'Mosaicos de Gaudí, espacio abierto para correr', approx: 10 },
      { name: 'CosmoCaixa (museo de ciencia)', note: 'Bosque inundado y planetario, muy interactivo', approx: 6 },
      { name: 'Acuario de Barcelona', note: 'Túnel de tiburones en el puerto', approx: 25 },
      { name: 'Teleférico de Montjuïc', note: 'Subida al castillo con vistas al mar', approx: 14 },
      { name: 'Playa de la Barceloneta', note: 'Tarde de playa y paseo marítimo', approx: 0 },
    ],
  },
  rom: {
    id: 'rom', name: 'Roma', flag: '🇮🇹', code: 'ROM', country: 'Italia', direct: true,
    kids: [
      { name: 'Coliseo (tour para chicos)', note: 'Reservar entrada con horario para evitar filas', approx: 18 },
      { name: 'Villa Borghese en bici', note: 'Alquiler de bicis y carritos, lago con botes', approx: 12 },
      { name: 'Explora – museo de los niños', note: 'Museo interactivo, ideal lluvia', approx: 10 },
      { name: 'Gelato + plaza Navona', note: 'Heladerías, artistas callejeros, fuentes', approx: 5 },
      { name: 'Time Elevator Roma', note: 'Cine 5D sobre la historia de Roma', approx: 14 },
    ],
  },
  mil: {
    id: 'mil', name: 'Milán', flag: '🇮🇹', code: 'MIL', country: 'Italia', direct: false,
    kids: [
      { name: 'Museo de Ciencia y Tecnología Leonardo da Vinci', note: 'Submarino real, máquinas de Da Vinci', approx: 10 },
      { name: 'Terrazas del Duomo', note: 'Subir al techo de la catedral entre gárgolas', approx: 16 },
      { name: 'Acuario Cívico', note: 'Pequeño pero gratuito/barato, céntrico', approx: 5 },
      { name: 'Parco Sempione', note: 'Parque grande junto al castillo Sforzesco', approx: 0 },
      { name: 'Museo del Cine (MIC)', note: 'Interactivo, juegos de luz y sombra', approx: 10 },
    ],
  },
  flo: {
    id: 'flo', name: 'Florencia', flag: '🇮🇹', code: 'FLR', country: 'Italia', direct: false,
    kids: [
      { name: 'Museo Galileo', note: 'Instrumentos científicos, telescopios de Galileo', approx: 10 },
      { name: 'Subir al Duomo / Campanile', note: 'Escalones y vistas, aventura para más grandes', approx: 20 },
      { name: 'Jardines de Boboli', note: 'Laberintos, grutas y fuentes para corretear', approx: 10 },
      { name: 'Carrusel de Piazza della Repubblica', note: 'Calesita histórica en el centro', approx: 3 },
      { name: 'Mercato Centrale', note: 'Probar comida toscana en plan informal', approx: 0 },
    ],
  },
  ven: {
    id: 'ven', name: 'Venecia', flag: '🇮🇹', code: 'VCE', country: 'Italia', direct: false,
    kids: [
      { name: 'Paseo en vaporetto por el Gran Canal', note: 'El "colectivo de agua", barato y mágico', approx: 9 },
      { name: 'Isla de Murano (vidrio)', note: 'Ver soplado de vidrio en vivo', approx: 0 },
      { name: 'Subir al Campanile de San Marco', note: 'Ascensor a la torre, vistas de la laguna', approx: 12 },
      { name: 'Museo de Historia Natural', note: 'Esqueleto de dinosaurio y acuario', approx: 8 },
      { name: 'Perderse por los puentes', note: 'Buscar góndolas y máscaras, gelato en mano', approx: 0 },
    ],
  },
  nap: {
    id: 'nap', name: 'Nápoles', flag: '🇮🇹', code: 'NAP', country: 'Italia', direct: false,
    kids: [
      { name: 'Pizza napolitana en una pizzería histórica', note: 'La pizza nació acá, plan imperdible', approx: 8 },
      { name: 'Città della Scienza', note: 'Museo interactivo con planetario', approx: 12 },
      { name: 'Castel dell’Ovo', note: 'Castillo junto al mar, gratis para recorrer', approx: 0 },
      { name: 'Napoli Sotterranea', note: 'Túneles bajo la ciudad, aventura para más grandes', approx: 12 },
      { name: 'Paseo por Lungomare', note: 'Costanera con vistas al Vesubio', approx: 0 },
    ],
  },
  par: {
    id: 'par', name: 'París', flag: '🇫🇷', code: 'PAR', country: 'Francia', direct: true,
    kids: [
      { name: 'Torre Eiffel', note: 'Subir o picnic en el Campo de Marte', approx: 28 },
      { name: 'Cité des Sciences (La Villette)', note: 'Cité des Enfants, top mundial para chicos', approx: 12 },
      { name: 'Jardín de Luxemburgo', note: 'Veleros en el estanque, calesita, ponis', approx: 5 },
      { name: 'Paseo en bateau-mouche por el Sena', note: 'Ver París desde el río', approx: 15 },
      { name: 'Disneyland Paris (día completo)', note: 'Excursión aparte, reservar con tiempo', approx: 70 },
    ],
  },
  niz: {
    id: 'niz', name: 'Niza', flag: '🇫🇷', code: 'NCE', country: 'Francia', direct: false,
    kids: [
      { name: 'Promenade des Anglais', note: 'Costanera para bici/patines frente al mar', approx: 0 },
      { name: 'Parc Phoenix', note: 'Jardín botánico con animales y mariposario', approx: 10 },
      { name: 'Colina del Castillo', note: 'Mirador con cascada y juegos, ascensor gratis', approx: 0 },
      { name: 'Playa de piedras', note: 'Tarde de mar y helado', approx: 0 },
      { name: 'Tren turístico de Niza', note: 'Recorrido fácil por el casco viejo', approx: 10 },
    ],
  },
  lis: {
    id: 'lis', name: 'Lisboa', flag: '🇵🇹', code: 'LIS', country: 'Portugal', direct: true,
    kids: [
      { name: 'Oceanário de Lisboa', note: 'Uno de los mejores acuarios de Europa', approx: 25 },
      { name: 'Tranvía 28', note: 'Recorrido clásico subiendo y bajando colinas', approx: 3 },
      { name: 'Pavilhão do Conhecimento', note: 'Museo de ciencia interactivo en el Parque das Nações', approx: 11 },
      { name: 'Castillo de San Jorge', note: 'Murallas, pavos reales y vistas', approx: 15 },
      { name: 'Pastéis de Belém', note: 'Probar los originales recién salidos', approx: 4 },
    ],
  },
  opo: {
    id: 'opo', name: 'Oporto', flag: '🇵🇹', code: 'OPO', country: 'Portugal', direct: false,
    kids: [
      { name: 'Crucero de los 6 puentes por el Duero', note: 'Paseo en barco corto y barato', approx: 15 },
      { name: 'Librería Lello', note: 'La escalera "de Harry Potter"', approx: 8 },
      { name: 'World of Discoveries', note: 'Museo interactivo con paseo en barco interior', approx: 14 },
      { name: 'Teleférico de Gaia', note: 'Vistas del río junto a las bodegas', approx: 7 },
      { name: 'Jardines do Palácio de Cristal', note: 'Pavos reales y miradores', approx: 0 },
    ],
  },
  fra: {
    id: 'fra', name: 'Frankfurt', flag: '🇩🇪', code: 'FRA', country: 'Alemania', direct: true,
    kids: [
      { name: 'Senckenberg (museo natural)', note: 'Enorme colección de dinosaurios', approx: 12 },
      { name: 'Zoo de Frankfurt', note: 'Uno de los más antiguos de Europa', approx: 13 },
      { name: 'Paseo por el Main + Eiserner Steg', note: 'Costanera de museos y puente peatonal', approx: 0 },
      { name: 'Palmengarten', note: 'Jardín botánico con trencito y botes', approx: 7 },
      { name: 'Subir a la torre Main Tower', note: 'Mirador 200 m sobre la ciudad', approx: 9 },
    ],
  },
  mun: {
    id: 'mun', name: 'Múnich', flag: '🇩🇪', code: 'MUC', country: 'Alemania', direct: false,
    kids: [
      { name: 'Deutsches Museum', note: 'Museo de ciencia y técnica gigante', approx: 15 },
      { name: 'Jardín Inglés', note: 'Ver a los surfistas de la ola del Eisbach', approx: 0 },
      { name: 'Zoo Hellabrunn', note: 'Geo-zoo muy bien armado', approx: 18 },
      { name: 'Carillón de Marienplatz', note: 'Show de figuras a las 11 y 12 h', approx: 0 },
      { name: 'Castillo de Neuschwanstein (excursión)', note: 'El castillo "de Disney", día completo', approx: 21 },
    ],
  },
  ber: {
    id: 'ber', name: 'Berlín', flag: '🇩🇪', code: 'BER', country: 'Alemania', direct: false,
    kids: [
      { name: 'Museo de Historia Natural', note: 'El dinosaurio más alto montado del mundo', approx: 11 },
      { name: 'Legoland Discovery Centre', note: 'Indoor, ideal para los más chicos', approx: 20 },
      { name: 'Zoo de Berlín', note: 'El zoo con más especies del mundo', approx: 18 },
      { name: 'AquaDom / acuarios', note: 'Vida marina en el centro', approx: 20 },
      { name: 'Cúpula del Reichstag', note: 'Gratis con reserva previa, vistas 360°', approx: 0 },
    ],
  },
  ams: {
    id: 'ams', name: 'Ámsterdam', flag: '🇳🇱', code: 'AMS', country: 'Países Bajos', direct: true,
    kids: [
      { name: 'NEMO Science Museum', note: '5 pisos interactivos + terraza con vistas', approx: 17 },
      { name: 'Paseo en barco por los canales', note: 'Ver la ciudad desde el agua', approx: 16 },
      { name: 'Artis Zoo', note: 'Zoo histórico con planetario incluido', approx: 25 },
      { name: 'Vondelpark', note: 'Andar en bici, juegos y patos', approx: 0 },
      { name: 'Micropia / Madame Tussauds', note: 'Museo de microbios o de cera, según edad', approx: 16 },
    ],
  },
  lon: {
    id: 'lon', name: 'Londres', flag: '🇬🇧', code: 'LON', country: 'Reino Unido', direct: true,
    kids: [
      { name: 'Natural History Museum', note: 'Dinosaurios y ballena, entrada gratis', approx: 0 },
      { name: 'Science Museum', note: 'Interactivo, entrada gratis', approx: 0 },
      { name: 'London Eye', note: 'La noria gigante sobre el Támesis', approx: 32 },
      { name: 'Cambio de guardia (Buckingham)', note: 'Espectáculo gratuito, llegar temprano', approx: 0 },
      { name: 'Diana Memorial Playground', note: 'Parque pirata enorme en Kensington', approx: 0 },
    ],
  },
  pra: {
    id: 'pra', name: 'Praga', flag: '🇨🇿', code: 'PRG', country: 'Chequia', direct: false,
    kids: [
      { name: 'Reloj Astronómico', note: 'Show de figuras cada hora en la plaza vieja', approx: 0 },
      { name: 'Castillo de Praga', note: 'El complejo de castillo más grande del mundo', approx: 17 },
      { name: 'Museo Lego', note: 'Miles de sets, muy cerca del centro', approx: 10 },
      { name: 'Paseo en barco por el Moldava', note: 'Vistas del Puente de Carlos', approx: 14 },
      { name: 'Petřín (funicular + torre)', note: 'Colina con torre tipo Eiffel y laberinto de espejos', approx: 10 },
    ],
  },
  vie: {
    id: 'vie', name: 'Viena', flag: '🇦🇹', code: 'VIE', country: 'Austria', direct: false,
    kids: [
      { name: 'Prater (parque de diversiones)', note: 'La rueda gigante histórica y juegos', approx: 12 },
      { name: 'Schönbrunn + Zoo Tiergarten', note: 'Palacio con el zoo más antiguo del mundo', approx: 24 },
      { name: 'Casa del Mar (Haus des Meeres)', note: 'Acuario en una torre, terraza con vistas', approx: 19 },
      { name: 'Museo de Historia Natural', note: 'Meteoritos y dinosaurios', approx: 14 },
      { name: 'Technisches Museum', note: 'Museo de la técnica, muy interactivo', approx: 16 },
    ],
  },
}

// Orden de despliegue: primero los de vuelo directo desde Buenos Aires.
export const CATALOG_LIST = Object.values(CITY_CATALOG).sort(
  (a, b) => (b.direct ? 1 : 0) - (a.direct ? 1 : 0)
)

export function getCity(id) {
  return CITY_CATALOG[id] || null
}
