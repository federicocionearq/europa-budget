export function calcDay(day, airbnb) {
  return (day.train || 0) + airbnb + (day.super || 0) + (day.resto || 0) + (day.entradas || 0) + (day.transport || 0)
}

export function calcCity(city) {
  const airbnbTotal = city.airbnb_per_night * city.nights
  const trainTotal = city.days.reduce((s, d) => s + (d.train || 0), 0)
  const superTotal = city.days.reduce((s, d) => s + (d.super || 0), 0)
  const restoTotal = city.days.reduce((s, d) => s + (d.resto || 0), 0)
  const entradasTotal = city.days.reduce((s, d) => s + (d.entradas || 0), 0)
  const transportTotal = city.days.reduce((s, d) => s + (d.transport || 0), 0)
  const total = airbnbTotal + trainTotal + superTotal + restoTotal + entradasTotal + transportTotal
  return { airbnbTotal, trainTotal, superTotal, restoTotal, entradasTotal, transportTotal, total }
}

export function calcTrip(trip) {
  const cities = trip.cities.map(c => ({ ...calcCity(c), city: c.city, id: c.id }))
  const sum = (key) => cities.reduce((s, c) => s + c[key], 0)
  const totalNights = trip.cities.reduce((s, c) => s + c.nights, 0)
  const totalDays = trip.cities.reduce((s, c) => s + c.days.length, 0)

  const breakdown = {
    flights: trip.flights,
    airbnb: sum('airbnbTotal'),
    trains: sum('trainTotal'),
    super: sum('superTotal'),
    resto: sum('restoTotal'),
    entradas: sum('entradasTotal'),
    transport: sum('transportTotal'),
  }
  breakdown.total = Object.values(breakdown).reduce((s, v) => s + v, 0)
  breakdown.margin = trip.budget_cap - breakdown.total
  breakdown.pct = Math.min(100, (breakdown.total / trip.budget_cap) * 100)
  breakdown.totalNights = totalNights
  breakdown.totalDays = totalDays
  breakdown.perPerson = Math.round(breakdown.total / 4)
  breakdown.perDay = Math.round(breakdown.total / totalNights)

  return { breakdown, cities }
}

export function fmt(n) {
  return '$' + Math.round(n).toLocaleString('en-US')
}
