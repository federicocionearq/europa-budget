// Cálculo de fechas del viaje a partir de la fecha de salida + noches por ciudad.
// Todo se deriva de trip.start_date; al cambiar noches, las fechas se recalculan.

const MS_DAY = 86400000

function parseISO(iso) {
  // iso = 'YYYY-MM-DD' → Date local (sin corrimiento de zona horaria)
  if (!iso) return null
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function addDays(date, n) {
  return new Date(date.getTime() + n * MS_DAY)
}

// Date local → 'YYYY-MM-DD' sin corrimiento de zona horaria.
export function toISO(date) {
  if (!date) return null
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function fmtDate(date, opts = { day: '2-digit', month: 'short' }) {
  if (!date) return '—'
  return date.toLocaleDateString('es-AR', opts)
}

export function totalNights(cities) {
  return (cities || []).reduce((s, c) => s + (Number(c.nights) || 0), 0)
}

// Devuelve { start, end, totalNights, totalDays, perCity: [{ id, in, out }] }
export function computeTripDates(trip) {
  const start = parseISO(trip?.start_date)
  const cities = trip?.cities || []
  const nights = totalNights(cities)

  if (!start) {
    return { start: null, end: null, totalNights: nights, totalDays: nights ? nights + 1 : 0, perCity: [] }
  }

  let cursor = start
  const perCity = cities.map(c => {
    const checkIn = cursor
    const checkOut = addDays(cursor, Number(c.nights) || 0)
    cursor = checkOut
    return { id: c.id, in: checkIn, out: checkOut }
  })

  return {
    start,
    end: cursor,
    totalNights: nights,
    totalDays: nights ? nights + 1 : 0,
    perCity,
  }
}

// Texto compacto del rango total: "12 feb → 2 mar 2027"
export function tripDateRange(trip) {
  const { start, end } = computeTripDates(trip)
  if (!start) return null
  const sameYear = start.getFullYear() === end.getFullYear()
  const startTxt = fmtDate(start, sameYear ? { day: '2-digit', month: 'short' } : { day: '2-digit', month: 'short', year: 'numeric' })
  const endTxt = fmtDate(end, { day: '2-digit', month: 'short', year: 'numeric' })
  return `${startTxt} → ${endTxt}`
}
