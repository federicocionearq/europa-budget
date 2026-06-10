// Generadores de links a buscadores de vuelos con el tramo YA precargado.
// No traen precio en vivo (eso requiere una API de vuelos); abren la búsqueda
// completa para que el usuario vea el precio real sin recargar destinos a mano.

import { ORIGIN } from './cityCatalog'

// Google Flights acepta una búsqueda en lenguaje natural por el parámetro q.
export function googleFlightsLink({ from = ORIGIN.code, to, depart, ret }) {
  if (!to) return null
  let q = `Flights from ${from} to ${to}`
  if (depart) q += ` on ${depart}`
  if (ret) q += ` returning ${ret}`
  return `https://www.google.com/travel/flights?q=${encodeURIComponent(q)}`
}

// Kayak soporta tramos en el path. Ida y vuelta simple o multidestino (open-jaw).
export function kayakLink({ from = ORIGIN.code, to, depart, ret, returnFrom }) {
  if (!to || !depart) return null
  // Open-jaw: vuelvo desde otra ciudad (returnFrom) → multidestino
  if (returnFrom && returnFrom !== to && ret) {
    return `https://www.kayak.com/flights/${from}-${to}/${depart}/${returnFrom}-${from}/${ret}?sort=price_a`
  }
  // Ida y vuelta clásica
  if (ret) {
    return `https://www.kayak.com/flights/${from}-${to}/${depart}/${ret}?sort=price_a`
  }
  // Solo ida
  return `https://www.kayak.com/flights/${from}-${to}/${depart}?sort=price_a`
}

// TurismoCity no expone un formato de búsqueda verificable, así que dejamos el
// link a su buscador de vuelos para comparar/verificar precios manualmente.
export function turismoCityLink() {
  return 'https://www.turismocity.com.ar/vuelos'
}

// Devuelve el set de links para el tramo principal del viaje (ida y regreso).
export function tripFlightLinks({ to, depart, ret, returnFrom }) {
  return {
    google: googleFlightsLink({ to, depart, ret }),
    kayak: kayakLink({ to, depart, ret, returnFrom }),
    turismocity: turismoCityLink(),
  }
}
