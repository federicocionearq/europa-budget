import { useBudget } from './hooks/useBudget'
import { calcTrip } from './lib/calc'
import { SummaryHeader } from './components/SummaryHeader'
import { CityCard } from './components/CityCard'
import { Plus, RotateCcw } from 'lucide-react'
import { DEFAULT_TRIP } from './lib/defaultData'

export default function App() {
  const { trip, loading, saving, error, updateTrip } = useBudget()

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>Cargando presupuesto…</p>
      </div>
    )
  }

  const { breakdown, cities } = calcTrip(trip)

  const updateCity = (i, newCity) => {
    updateTrip(t => ({ ...t, cities: t.cities.map((c, idx) => idx === i ? newCity : c) }))
  }

  const deleteCity = (i) => {
    updateTrip(t => ({ ...t, cities: t.cities.filter((_, idx) => idx !== i) }))
  }

  const addCity = () => {
    const newCity = {
      id: `city-${Date.now()}`,
      city: 'Nueva ciudad',
      flag: '🏙️',
      nights: 2,
      airbnb_per_night: 120,
      days: [
        { label: 'Día 1', train: 0, super: 20, resto: 40, entradas: 0, transport: 10, notes: '' },
        { label: 'Día 2', train: 0, super: 20, resto: 40, entradas: 0, transport: 10, notes: '' },
        { label: 'Viaje siguiente', train: 100, super: 15, resto: 35, entradas: 0, transport: 5, notes: '' },
      ]
    }
    updateTrip(t => ({ ...t, cities: [...t.cities, newCity] }))
  }

  const resetToDefault = () => {
    if (window.confirm('¿Resetear al presupuesto original? Se perderán todos los cambios.')) {
      updateTrip(() => DEFAULT_TRIP)
    }
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
          onUpdateTrip={updateTrip}
          saving={saving}
        />

        <div className="cities-section">
          <div className="cities-header">
            <span className="section-label">CIUDADES</span>
            <div className="cities-actions">
              <button className="btn-ghost" onClick={resetToDefault}>
                <RotateCcw size={13} /> Reset
              </button>
              <button className="btn-add-city" onClick={addCity}>
                <Plus size={14} /> Ciudad
              </button>
            </div>
          </div>

          {trip.cities.map((city, i) => (
            <CityCard
              key={city.id || i}
              city={city}
              cityStats={cities[i]}
              onUpdate={(nc) => updateCity(i, nc)}
              onDelete={() => deleteCity(i)}
            />
          ))}
        </div>

        <footer className="app-footer">
          Precios en USD · 4 personas · Febrero temporada baja ✓
        </footer>
      </div>
    </div>
  )
}
