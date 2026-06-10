import { useEffect } from 'react'
import { useBudget } from './hooks/useBudget'
import { calcTrip } from './lib/calc'
import { computeTripDates } from './lib/dates'
import { getCity } from './lib/cityCatalog'
import { SummaryHeader } from './components/SummaryHeader'
import { FlightSetup } from './components/FlightSetup'
import { CityCard } from './components/CityCard'
import { CityPicker } from './components/CityPicker'
import { RotateCcw } from 'lucide-react'
import { DEFAULT_TRIP } from './lib/defaultData'

// Crea un objeto-ciudad a partir de una entrada del catálogo.
function createCityFromCatalog(cat) {
  return {
    id: `${cat.id}-${Date.now()}`,
    catalogId: cat.id,
    city: cat.name,
    flag: cat.flag,
    nights: 2,
    airbnb_per_night: 120,
    days: [
      { label: 'Día 1', train: 0, super: 20, resto: 80, entradas: 0, transport: 10, notes: '' },
      { label: 'Día 2', train: 0, super: 20, resto: 80, entradas: 0, transport: 10, notes: '' },
    ],
  }
}

// Reordena las ciudades: llegada primero, regreso (open-jaw) último.
// Crea las ciudades pin si todavía no existen. Devuelve el mismo array si no hay cambios.
function reconcileCities(trip) {
  const cities = [...(trip.cities || [])]
  const findIdx = (catId) => cities.findIndex(c => c.catalogId === catId)

  // Asegurar ciudad de llegada
  let arrIdx = findIdx(trip.arrival)
  if (trip.arrival && arrIdx === -1) {
    const cat = getCity(trip.arrival)
    if (cat) { cities.unshift(createCityFromCatalog(cat)); arrIdx = 0 }
  }

  // Asegurar ciudad de regreso (solo si es open-jaw y distinta de la llegada)
  const hasDep = trip.openjaw && trip.departure && trip.departure !== trip.arrival
  if (hasDep && findIdx(trip.departure) === -1) {
    const cat = getCity(trip.departure)
    if (cat) cities.push(createCityFromCatalog(cat))
  }

  // Extraer pins y rearmar: [llegada, ...medio, regreso]
  const arrival = trip.arrival ? cities.find(c => c.catalogId === trip.arrival) : null
  const departure = hasDep ? cities.find(c => c.catalogId === trip.departure) : null
  const middle = cities.filter(c => c !== arrival && c !== departure)
  const ordered = [...(arrival ? [arrival] : []), ...middle, ...(departure ? [departure] : [])]

  // ¿Cambió algo respecto del original?
  const same =
    ordered.length === (trip.cities || []).length &&
    ordered.every((c, i) => c === trip.cities[i])
  return same ? trip.cities : ordered
}

export default function App() {
  const { trip, loading, saving, error, updateTrip } = useBudget()

  // Mantener la ruta consistente cuando cambian los vuelos.
  useEffect(() => {
    if (!trip) return
    const next = reconcileCities(trip)
    if (next !== trip.cities) updateTrip(t => ({ ...t, cities: next }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip?.arrival, trip?.departure, trip?.openjaw])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Cargando presupuesto…</p>
      </div>
    )
  }

  const { breakdown, cities } = calcTrip(trip)
  const tripDates = computeTripDates(trip)

  const updateCity = (i, newCity) => {
    updateTrip(t => ({ ...t, cities: t.cities.map((c, idx) => idx === i ? newCity : c) }))
  }

  const deleteCity = (i) => {
    updateTrip(t => ({ ...t, cities: t.cities.filter((_, idx) => idx !== i) }))
  }

  const addCityFromCatalog = (catId) => {
    updateTrip(t => {
      if ((t.cities || []).some(c => c.catalogId === catId)) return t
      const cat = getCity(catId)
      if (!cat) return t
      const newCity = createCityFromCatalog(cat)
      const cities = [...t.cities]
      const hasDep = t.openjaw && t.departure && t.departure !== t.arrival
      const depIdx = hasDep ? cities.findIndex(c => c.catalogId === t.departure) : -1
      if (depIdx >= 0) cities.splice(depIdx, 0, newCity)
      else cities.push(newCity)
      return { ...t, cities }
    })
  }

  const resetToDefault = () => {
    if (window.confirm('¿Resetear al viaje de ejemplo? Se perderán todos los cambios.')) {
      updateTrip(() => DEFAULT_TRIP)
    }
  }

  const usedCatalogIds = new Set((trip.cities || []).map(c => c.catalogId).filter(Boolean))
  const pinnedLabel = (city) => {
    if (city.catalogId && city.catalogId === trip.arrival) return 'llegada'
    if (trip.openjaw && city.catalogId && city.catalogId === trip.departure && trip.departure !== trip.arrival) return 'regreso'
    return null
  }

  return (
    <div className="app">
      <div className="app-inner">
        {error && (
          <div className="error-banner">⚠ {error}</div>
        )}

        <SummaryHeader
          breakdown={breakdown}
          trip={trip}
          tripDates={tripDates}
          onUpdateTrip={updateTrip}
          saving={saving}
        />

        <FlightSetup trip={trip} onUpdateTrip={updateTrip} />

        <div className="cities-section">
          <div className="cities-header">
            <span className="section-label">TU RUTA</span>
            <div className="cities-actions">
              <button className="btn-ghost" onClick={resetToDefault}>
                <RotateCcw size={13} /> Reset
              </button>
            </div>
          </div>

          {trip.cities.map((city, i) => (
            <CityCard
              key={city.id || i}
              city={city}
              cityStats={cities[i]}
              cityDates={tripDates.perCity[i]}
              pinnedLabel={pinnedLabel(city)}
              onUpdate={(nc) => updateCity(i, nc)}
              onDelete={() => deleteCity(i)}
            />
          ))}

          <CityPicker usedCatalogIds={usedCatalogIds} onAdd={addCityFromCatalog} />
        </div>

        <footer className="app-footer">
          Precios en USD · 4 personas · Febrero temporada baja ✓
        </footer>
      </div>
    </div>
  )
}
