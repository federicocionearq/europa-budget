import { useState } from 'react'
import { calcCity, calcDay, fmt } from '../lib/calc'
import { Trash2, Plus, ChevronDown, GripVertical } from 'lucide-react'

const DAY_FIELDS = [
  { key: 'train', icon: '🚄', label: 'Tren' },
  { key: 'super', icon: '🛒', label: 'Súper' },
  { key: 'resto', icon: '🍽️', label: 'Restó' },
  { key: 'entradas', icon: '🎟️', label: 'Entradas' },
  { key: 'transport', icon: '🚇', label: 'Local' },
]

function DayRow({ day, dayIndex, airbnb, onUpdate, onDelete, isLast }) {
  const [open, setOpen] = useState(false)
  const total = calcDay(day, airbnb)

  return (
    <div className="day-row">
      <div className="day-header" onClick={() => setOpen(o => !o)}>
        <div className="day-left">
          <span className="day-num">D{dayIndex + 1}</span>
          <input
            className="day-label-input"
            value={day.label}
            onClick={e => e.stopPropagation()}
            onChange={e => onUpdate({ ...day, label: e.target.value })}
          />
        </div>
        <div className="day-right">
          <span className="day-total">{fmt(total)}</span>
          <button className="day-delete" onClick={e => { e.stopPropagation(); onDelete() }} title="Eliminar día">
            <Trash2 size={13} />
          </button>
          <ChevronDown size={14} className={`chevron ${open ? 'open' : ''}`} />
        </div>
      </div>

      {open && (
        <div className="day-body">
          <div className="day-fields">
            <div className="day-field airbnb-field">
              <span className="field-icon">🏠</span>
              <span className="field-label">Airbnb</span>
              <span className="field-val muted">{fmt(airbnb)}<span className="field-note"> (edit en ciudad)</span></span>
            </div>
            {DAY_FIELDS.map(f => (
              <div key={f.key} className="day-field">
                <span className="field-icon">{f.icon}</span>
                <span className="field-label">{f.label}</span>
                <div className="field-input-wrap">
                  <span className="field-prefix">$</span>
                  <input
                    type="number"
                    className="field-input"
                    value={day[f.key] || 0}
                    min={0}
                    onChange={e => onUpdate({ ...day, [f.key]: Number(e.target.value) })}
                  />
                </div>
              </div>
            ))}
          </div>
          <textarea
            className="day-notes"
            value={day.notes || ''}
            placeholder="Notas del día…"
            onChange={e => onUpdate({ ...day, notes: e.target.value })}
            rows={2}
          />
        </div>
      )}
    </div>
  )
}

export function CityCard({ city, cityStats, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false)

  const updateDay = (i, newDay) => {
    const days = city.days.map((d, idx) => idx === i ? newDay : d)
    onUpdate({ ...city, days })
  }

  const deleteDay = (i) => {
    const days = city.days.filter((_, idx) => idx !== i)
    onUpdate({ ...city, days })
  }

  const addDay = () => {
    const newDay = { label: 'Nuevo día', train: 0, super: 20, resto: 40, entradas: 0, transport: 10, notes: '' }
    onUpdate({ ...city, days: [...city.days, newDay] })
  }

  return (
    <div className="city-card">
      {/* City header */}
      <div className="city-header" onClick={() => setOpen(o => !o)}>
        <div className="city-left">
          <div className="city-badge">
            <span>{city.nights}n</span>
          </div>
          <div>
            <div className="city-name">{city.flag} {city.city}</div>
            <div className="city-sub">{city.days.length} días · {fmt(cityStats.airbnbTotal)} aloj.</div>
          </div>
        </div>
        <div className="city-right">
          <div>
            <div className="city-total">{fmt(cityStats.total)}</div>
            <div className="city-avg">{fmt(cityStats.total / city.days.length)}/día</div>
          </div>
          <button className="city-delete" onClick={e => { e.stopPropagation(); onDelete() }} title="Eliminar ciudad">
            <Trash2 size={14} />
          </button>
          <ChevronDown size={16} className={`chevron ${open ? 'open' : ''}`} />
        </div>
      </div>

      {open && (
        <div className="city-body">
          {/* City-level editable fields */}
          <div className="city-fields">
            <div className="city-field-row">
              <label className="city-field-label">Ciudad</label>
              <input
                className="city-field-input"
                value={city.city}
                onChange={e => onUpdate({ ...city, city: e.target.value })}
              />
            </div>
            <div className="city-field-row">
              <label className="city-field-label">País / emoji</label>
              <input
                className="city-field-input short"
                value={city.flag}
                onChange={e => onUpdate({ ...city, flag: e.target.value })}
                maxLength={4}
              />
            </div>
            <div className="city-field-row">
              <label className="city-field-label">Noches</label>
              <input
                type="number"
                className="city-field-input short"
                value={city.nights}
                min={1}
                onChange={e => onUpdate({ ...city, nights: Number(e.target.value) })}
              />
            </div>
            <div className="city-field-row">
              <label className="city-field-label">Airbnb / noche</label>
              <div className="field-input-wrap">
                <span className="field-prefix">$</span>
                <input
                  type="number"
                  className="city-field-input short"
                  value={city.airbnb_per_night}
                  min={0}
                  onChange={e => onUpdate({ ...city, airbnb_per_night: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>

          {/* Day breakdown */}
          <div className="days-section">
            <div className="days-label">Días</div>
            {city.days.map((day, i) => (
              <DayRow
                key={i}
                day={day}
                dayIndex={i}
                airbnb={city.airbnb_per_night}
                onUpdate={(nd) => updateDay(i, nd)}
                onDelete={() => deleteDay(i)}
                isLast={i === city.days.length - 1}
              />
            ))}
            <button className="add-day-btn" onClick={addDay}>
              <Plus size={13} /> Agregar día
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
