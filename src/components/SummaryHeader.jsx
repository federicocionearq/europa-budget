import { fmt } from '../lib/calc'
import { tripDateRange } from '../lib/dates'

export function SummaryHeader({ breakdown, trip, tripDates, onUpdateTrip, saving }) {
  const over = breakdown.margin < 0
  const dateRange = tripDateRange(trip)
  const route = (trip.cities || []).map(c => c.city).join(' · ')

  return (
    <div className="summary-header">
      {/* Title row */}
      <div className="title-row">
        <div>
          <p className="trip-label">{dateRange ? `${dateRange} · 4 personas` : 'Elegí tu fecha de salida · 4 personas'}</p>
          <h1 className="trip-title">{trip.title || 'Europa 2027'}</h1>
          <p className="trip-route">{route || 'Empezá eligiendo tu ciudad de llegada ✈'}</p>
        </div>
        {saving && <span className="saving-badge">guardando…</span>}
      </div>

      {/* Main totals */}
      <div className="totals-grid">
        <div className="total-main">
          <span className="total-label">TOTAL ESTIMADO</span>
          <span className={`total-amount ${over ? 'over' : 'ok'}`}>{fmt(breakdown.total)}</span>
        </div>
        <div className="total-cap">
          <span className="total-label">TOPE</span>
          <div className="cap-row">
            <input
              type="number"
              className="cap-input"
              value={trip.budget_cap}
              onChange={e => onUpdateTrip(t => ({ ...t, budget_cap: Number(e.target.value) }))}
            />
            <span className={`margin-badge ${over ? 'over' : 'ok'}`}>
              {over ? `⚠ excede ${fmt(Math.abs(breakdown.margin))}` : `✓ margen ${fmt(breakdown.margin)}`}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-track">
        <div
          className={`progress-fill ${over ? 'over' : 'ok'}`}
          style={{ width: `${breakdown.pct}%` }}
        />
      </div>

      {/* Stats pills */}
      <div className="stats-row">
        {[
          { label: 'Por persona', val: fmt(breakdown.perPerson) },
          { label: 'Por noche (x4)', val: fmt(breakdown.perDay) },
          { label: 'Noches', val: breakdown.totalNights },
          { label: 'Ciudades', val: trip.cities.length },
        ].map(s => (
          <div key={s.label} className="stat-pill">
            <span className="stat-val">{s.val}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      <div className="cat-grid">
        {[
          { icon: '✈️', label: 'Vuelos', key: 'flights', editable: true },
          { icon: '🚄', label: 'Trenes', key: 'trains', editable: false },
          { icon: '🏠', label: 'Airbnb', key: 'airbnb', editable: false },
          { icon: '🍽️', label: 'Restós', key: 'resto', editable: false },
          { icon: '🛒', label: 'Súper', key: 'super', editable: false },
          { icon: '🎟️', label: 'Entradas', key: 'entradas', editable: false },
          { icon: '🚇', label: 'Local', key: 'transport', editable: false },
        ].map(cat => (
          <div key={cat.key} className="cat-item">
            <span className="cat-icon">{cat.icon}</span>
            <span className="cat-label">{cat.label}</span>
            {cat.editable ? (
              <input
                type="number"
                className="cat-input"
                value={trip.flights}
                onChange={e => onUpdateTrip(t => ({ ...t, flights: Number(e.target.value) }))}
              />
            ) : (
              <span className="cat-val">{fmt(breakdown[cat.key])}</span>
            )}
            <div className="cat-bar-track">
              <div
                className="cat-bar-fill"
                style={{ width: `${Math.min(100, (breakdown[cat.key] / breakdown.total) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
