// Campos de cabecera del viaje (vuelos + fechas). Se mezclan sobre cualquier
// guardado viejo para que nunca falten.
export const TRIP_META_DEFAULTS = {
  title: "Europa 2027",
  start_date: "2027-02-12",   // fecha de salida desde Buenos Aires
  arrival: "mad",             // id de catálogo de la ciudad de llegada
  openjaw: true,              // vuelvo desde otra ciudad
  departure: "rom",           // id de catálogo de la ciudad de regreso
  flights: 7000,
  budget_cap: 13000,
}

export const DEFAULT_TRIP = {
  ...TRIP_META_DEFAULTS,
  cities: [
    {
      id: "madrid",
      catalogId: "mad",
      city: "Madrid",
      flag: "🇪🇸",
      nights: 4,
      airbnb_per_night: 130,
      days: [
        { label: "Llegada", train: 0, super: 20, resto: 40, entradas: 0, transport: 10, notes: "Llegada, orientación, descanso" },
        { label: "Centro histórico", train: 0, super: 20, resto: 45, entradas: 20, transport: 10, notes: "Prado o Reina Sofía (14€/pp)" },
        { label: "Retiro + Malasaña", train: 0, super: 20, resto: 40, entradas: 0, transport: 10, notes: "Parques, barrios, mercados" },
        { label: "Excursión Toledo/Escorial", train: 0, super: 15, resto: 45, entradas: 15, transport: 20, notes: "Excursión de día (~10€/pp tren)" },
        { label: "Viaje a Barcelona", train: 200, super: 15, resto: 35, entradas: 0, transport: 5, notes: "AVE Madrid–Barcelona 2.5h" },
      ],
    },
    {
      id: "barcelona",
      catalogId: "bcn",
      city: "Barcelona",
      flag: "🇪🇸",
      nights: 2,
      airbnb_per_night: 135,
      days: [
        { label: "Llegada + Barrio Gótico", train: 0, super: 20, resto: 45, entradas: 0, transport: 10, notes: "Barrio Gótico, Ramblas, Boqueria" },
        { label: "Gaudí + Modernismo", train: 0, super: 20, resto: 45, entradas: 60, transport: 15, notes: "Sagrada Família ~15€/pp" },
        { label: "Viaje a Girona", train: 60, super: 15, resto: 35, entradas: 0, transport: 5, notes: "Tren regional BCN–Girona 38 min" },
      ],
    },
    {
      id: "girona",
      city: "Girona",
      flag: "🇪🇸",
      nights: 2,
      airbnb_per_night: 120,
      days: [
        { label: "Ciudad amurallada", train: 0, super: 18, resto: 38, entradas: 10, transport: 5, notes: "Murallas, catedral, barrio judío" },
        { label: "Calles + mercado", train: 0, super: 18, resto: 38, entradas: 0, transport: 5, notes: "Ciudad muy caminable" },
        { label: "Viaje a Aviñón", train: 180, super: 15, resto: 40, entradas: 0, transport: 5, notes: "TGV vía Barcelona ~3h" },
      ],
    },
    {
      id: "avignon",
      city: "Aviñón",
      flag: "🇫🇷",
      nights: 2,
      airbnb_per_night: 120,
      days: [
        { label: "Palacio de los Papas", train: 0, super: 22, resto: 50, entradas: 40, transport: 5, notes: "Palais des Papes ~10€/pp" },
        { label: "Pont + barrio medieval", train: 0, super: 22, resto: 50, entradas: 10, transport: 5, notes: "Ciudad muy caminable" },
        { label: "Lyon tránsito → Bérgamo", train: 280, super: 15, resto: 50, entradas: 0, transport: 20, notes: "Aviñón–Lyon 40min + Lyon–Milán 2h + Bérgamo 50min" },
      ],
    },
    {
      id: "bergamo",
      city: "Bérgamo",
      flag: "🇮🇹",
      nights: 3,
      airbnb_per_night: 125,
      days: [
        { label: "Llegada + Città Alta", train: 0, super: 20, resto: 45, entradas: 0, transport: 10, notes: "Funicular a ciudad alta" },
        { label: "Excursión Verona", train: 80, super: 15, resto: 50, entradas: 30, transport: 10, notes: "Bérgamo–Verona 1h10 tren. Arena, Julieta" },
        { label: "Bérgamo + Milán opcional", train: 0, super: 20, resto: 45, entradas: 15, transport: 15, notes: "Milán 50min si se quiere" },
        { label: "Viaje a Bolonia", train: 120, super: 15, resto: 40, entradas: 0, transport: 5, notes: "Bérgamo–Milán + Frecciarossa ~1h" },
      ],
    },
    {
      id: "bologna",
      city: "Bolonia",
      flag: "🇮🇹",
      nights: 2,
      airbnb_per_night: 125,
      days: [
        { label: "Pórticos + Piazza Maggiore", train: 0, super: 20, resto: 50, entradas: 10, transport: 8, notes: "Patrimonio UNESCO. Mejor gastronomía de Italia" },
        { label: "Mercados + Due Torri", train: 0, super: 20, resto: 50, entradas: 10, transport: 8, notes: "Mercato di Mezzo, torres medievales" },
        { label: "Viaje a Roma", train: 160, super: 15, resto: 40, entradas: 0, transport: 10, notes: "Frecciarossa Bolonia–Roma ~2h" },
      ],
    },
    {
      id: "roma",
      catalogId: "rom",
      city: "Roma",
      flag: "🇮🇹",
      nights: 4,
      airbnb_per_night: 140,
      days: [
        { label: "Llegada + Trastevere", train: 0, super: 22, resto: 55, entradas: 0, transport: 10, notes: "Barrio auténtico para primera noche" },
        { label: "Coliseo + Foro Romano", train: 0, super: 22, resto: 55, entradas: 80, transport: 15, notes: "Coliseo + Foro ~20€/pp con reserva" },
        { label: "Vaticano", train: 0, super: 22, resto: 55, entradas: 80, transport: 15, notes: "Museos Vaticanos + Sixtina ~20€/pp" },
        { label: "Pantheon + Vuelo", train: 0, super: 10, resto: 40, entradas: 10, transport: 50, notes: "Última mañana + transfer FCO" },
      ],
    },
  ],
}
