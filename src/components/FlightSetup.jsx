import { Plane, PlaneTakeoff, ExternalLink, Zap, Calendar } from 'lucide-react'
import { CATALOG_LIST, getCity, ORIGIN } from '../lib/cityCatalog'
import { tripFlightLinks } from '../lib/flightLinks'
import { computeTripDates, toISO, fmtDate } from '../lib/dates'

function CityChip({ cat, selected, onClick }) {
  return (
    <button
      type="button"
      className={`fs-chip ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <span className="fs-chip-name">{cat.flag} {cat.name}</span>
      {cat.direct
        ? <span className="fs-chip-tag direct"><Zap size={10} /> directo</span>
        : <span className="fs-chip-tag">con escala</span>}
    </button>
  )
}

export function FlightSetup({ trip, onUpdateTrip }) {
  const arrival = getCity(trip.arrival)
  const departure = getCity(trip.departure)
  const dates = computeTripDates(trip)

  const depISO = trip.start_date
  const retISO = dates.end ? toISO(dates.end) : null

  const links = tripFlightLinks({
    to: arrival?.code,
    depart: depISO,
    ret: retISO,
    returnFrom: trip.openjaw ? departure?.code : null,
  })

  const setArrival = (id) => onUpdateTrip(t => {
    const next = { ...t, arrival: id }
    if (!t.openjaw) next.departure = id
    return next
  })

  const setOpenjaw = (val) => onUpdateTrip(t => ({
    ...t,
    openjaw: val,
    departure: val ? (t.departure && t.departure !== t.arrival ? t.departure : null) : t.arrival,
  }))

  const setDeparture = (id) => onUpdateTrip(t => ({ ...t, departure: id }))

  return (
    <div className="flight-setup">
      <div className="fs-section-label"><Plane size={13} /> VUELOS</div>
      <p className="fs-hint"><Zap size={11} /> = vuelo directo frecuente desde {ORIGIN.name}</p>

      {/* Llegada */}
      <div className="fs-block-label">Ciudad de llegada</div>
      <div className="fs-grid">
        {CATALOG_LIST.map(cat => (
          <CityChip key={cat.id} cat={cat} selected={trip.arrival === cat.id} onClick={() => setArrival(cat.id)} />
        ))}
      </div>

      {/* Vuelta */}
      <div className="fs-block-label">Vuelo de vuelta</div>
      <div className="fs-return-opts">
        <label className={`fs-radio ${!trip.openjaw ? 'selected' : ''}`}>
          <input type="radio" name="openjaw" checked={!trip.openjaw} onChange={() => setOpenjaw(false)} />
          <span>Vuelvo desde {arrival ? arrival.name : 'la misma ciudad'}</span>
        </label>
        <label className={`fs-radio ${trip.openjaw ? 'selected' : ''}`}>
          <input type="radio" name="openjaw" checked={trip.openjaw} onChange={() => setOpenjaw(true)} />
          <span>Vuelvo desde otra <span className="fs-muted">(open-jaw)</span></span>
        </label>
      </div>

      {trip.openjaw && (
        <>
          <div className="fs-block-label sub">Ciudad de regreso</div>
          <div className="fs-grid">
            {CATALOG_LIST.filter(c => c.id !== trip.arrival).map(cat => (
              <CityChip key={cat.id} cat={cat} selected={trip.departure === cat.id} onClick={() => setDeparture(cat.id)} />
            ))}
          </div>
        </>
      )}

      {/* Fecha de salida */}
      <div className="fs-date-row">
        <div className="fs-block-label inline"><Calendar size={12} /> Fecha de salida</div>
        <input
          type="date"
          className="fs-date-input"
          value={trip.start_date || ''}
          onChange={e => onUpdateTrip(t => ({ ...t, start_date: e.target.value }))}
        />
        {dates.start && (
          <span className="fs-date-readout">
            {fmtDate(dates.start)} → {fmtDate(dates.end, { day: '2-digit', month: 'short', year: 'numeric' })} · {dates.totalDays} días
          </span>
        )}
      </div>

      {/* Costo de vuelos (lo cargás vos tras cotizar) */}
      <div className="fs-cost-row">
        <div className="fs-block-label inline"><PlaneTakeoff size={12} /> Costo de vuelos (total x4)</div>
        <div className="fs-cost-wrap">
          <span className="fs-cost-prefix">$</span>
          <input
            type="number"
            className="fs-cost-input"
            value={trip.flights}
            min={0}
            placeholder="cargá tras cotizar"
            onChange={e => onUpdateTrip(t => ({ ...t, flights: Number(e.target.value) }))}
          />
        </div>
      </div>

      {/* Deep links precargados */}
      {arrival && (
        <div className="fs-links">
          <span className="fs-links-label">
            Cotizar {ORIGIN.code} → {arrival.code}
            {trip.openjaw && departure && departure.id !== arrival.id ? `, vuelta ${departure.code} → ${ORIGIN.code}` : ''}:
          </span>
          <div className="fs-links-row">
            {links.google && <a className="fs-link" href={links.google} target="_blank" rel="noreferrer"><ExternalLink size={12} /> Google Flights</a>}
            {links.kayak && <a className="fs-link" href={links.kayak} target="_blank" rel="noreferrer"><ExternalLink size={12} /> Kayak</a>}
            <a className="fs-link verify" href={links.turismocity} target="_blank" rel="noreferrer"><ExternalLink size={12} /> TurismoCity (verificar)</a>
          </div>
        </div>
      )}
    </div>
  )
}
