import { useState } from 'react'
import { calcCity, calcDay, fmt } from '../lib/calc'
import { getCity } from '../lib/cityCatalog'
import { fmtDate } from '../lib/dates'
import { Trash2, Plus, ChevronDown, ChevronUp, Sparkles } from 'lucide-react'

// Agrega el nombre de una actividad a las notas del día, sin duplicar.
function appendActivity(notes, name) {
  const current = (notes || '').trim()
  if (current.includes(name)) return current
  return current ? `${current} · ${name}` : name
}

const DAY_FIELDS = [
  { key: 'train', icon: '🚄', label: 'Tren' },
  { key: 'super', icon: '🛒', label: 'Súper' },
  { key: 'resto', icon: '🍽️', label: 'Restó' },
  { key: 'entradas', icon: '🎟️', label: 'Entradas' },
  { key: 'transport', icon: '🚇', label: 'Local' },
]

const RESTO_PRESETS = [
  { label: 'Eco', value: 60, hint: '~15€/pp' },
  { label: 'Medio', value: 80, hint: '~20€/pp' },
  { label: 'Especial', value: 120, hint: '~30€/pp' },
]

const SUPER_PRESETS = [
  { label: 'Liviano', value: 15, hint: 'desayuno' },
  { label: 'Normal', value: 25, hint: 'desay+snacks' },
  { label: 'Completo', value: 40, hint: 'todo en casa' },
]

function DayRow({ day, dayIndex, totalDays, airbnb, kids, onUpdate, onDelete, onMoveUp, onMoveDown }) {
  const [open, setOpen] = useState(false)
  const total = calcDay(day, airbnb)
  const canUp = dayIndex > 0
  const canDown = dayIndex < totalDays - 1

  return (
    <div className="day-row">
      <div className="day-header" onClick={() => setOpen(o => !o)}>
        <div className="day-left">
          {/* Reorder buttons */}
          <div className="day-reorder" onClick={e => e.stopPropagation()}>
            <button
              className={`reorder-btn ${canUp ? '' : 'disabled'}`}
              onClick={() => canUp && onMoveUp()}
              title="Subir"
            >
              <ChevronUp size={11} />
            </button>
            <button
              className={`reorder-btn ${canDown ? '' : 'disabled'}`}
              onClick={() => canDown && onMoveDown()}
              title="Bajar"
            >
              <ChevronDown size={11} />
            </button>
          </div>
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
                <div className="field-right">
                  {/* Presets for resto */}
                  {f.key === 'resto' && (
                    <div className="preset-btns">
                      {RESTO_PRESETS.map(p => (
                        <button
                          key={p.label}
                          className={`preset-btn ${day[f.key] === p.value ? 'active' : ''}`}
                          onClick={() => onUpdate({ ...day, [f.key]: p.value })}
                          title={p.hint}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Presets for super */}
                  {f.key === 'super' && (
                    <div className="preset-btns">
                      {SUPER_PRESETS.map(p => (
                        <button
                          key={p.label}
                          className={`preset-btn ${day[f.key] === p.value ? 'active' : ''}`}
                          onClick={() => onUpdate({ ...day, [f.key]: p.value })}
                          title={p.hint}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  )}
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
              </div>
            ))}
          </div>

          {/* Sugerencias de actividades con niños */}
          {kids && kids.length > 0 && (
            <div className="kids-section">
              <div className="kids-label"><Sparkles size={11} /> Top con niños · tocá para sumar al plan</div>
              <div className="kids-list">
                {kids.map(k => {
                  const added = (day.notes || '').includes(k.name)
                  return (
                    <button
                      key={k.name}
                      className={`kids-chip ${added ? 'added' : ''}`}
                      title={k.note + (k.approx ? ` · ≈ €${k.approx}/pers` : '')}
                      onClick={() => onUpdate({ ...day, notes: appendActivity(day.notes, k.name) })}
                    >
                      {added ? '✓ ' : '+ '}{k.name}
                      {k.approx ? <span className="kids-approx">≈€{k.approx}</span> : null}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

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

export function CityCard({ city, cityStats, cityDates, pinnedLabel, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false)
  const kids = getCity(city.catalogId)?.kids || null
  const dateLabel = cityDates ? `${fmtDate(cityDates.in)} – ${fmtDate(cityDates.out)}` : null

  const updateDay = (i, newDay) => {
    const days = city.days.map((d, idx) => idx === i ? newDay : d)
    onUpdate({ ...city, days })
  }

  const deleteDay = (i) => {
    const days = city.days.filter((_, idx) => idx !== i)
    onUpdate({ ...city, days })
  }

  const moveDay = (i, dir) => {
    const days = [...city.days]
    const j = i + dir
    if (j < 0 || j >= days.length) return
    ;[days[i], days[j]] = [days[j], days[i]]
    onUpdate({ ...city, days })
  }

  const addDay = () => {
    const newDay = { label: 'Nuevo día', train: 0, super: 25, resto: 80, entradas: 0, transport: 10, notes: '' }
    onUpdate({ ...city, days: [...city.days, newDay] })
  }

  return (
    <div className="city-card">
      <div className="city-header" onClick={() => setOpen(o => !o)}>
        <div className="city-left">
          <div className="city-badge">
            <span>{city.nights}n</span>
          </div>
          <div>
            <div className="city-name">
              {city.flag} {city.city}
              {pinnedLabel && <span className={`city-pin ${pinnedLabel}`}>{pinnedLabel}</span>}
            </div>
            <div className="city-sub">
              {dateLabel ? `${dateLabel} · ` : ''}{city.days.length} días · {fmt(cityStats.airbnbTotal)} aloj.
            </div>
          </div>
        </div>
        <div className="city-right">
          <div>
            <div className="city-total">{fmt(cityStats.total)}</div>
            <div className="city-avg">{fmt(cityStats.total / city.days.length)}/día</div>
          </div>
          {!pinnedLabel && (
            <button className="city-delete" onClick={e => { e.stopPropagation(); onDelete() }} title="Eliminar ciudad">
              <Trash2 size={14} />
            </button>
          )}
          <ChevronDown size={16} className={`chevron ${open ? 'open' : ''}`} />
        </div>
      </div>

      {open && (
        <div className="city-body">
          <div className="city-fields">
            <div className="city-field-row">
              <label className="city-field-label">Ciudad</label>
              <input className="city-field-input" value={city.city} onChange={e => onUpdate({ ...city, city: e.target.value })} />
            </div>
            <div className="city-field-row">
              <label className="city-field-label">País / emoji</label>
              <input className="city-field-input short" value={city.flag} onChange={e => onUpdate({ ...city, flag: e.target.value })} maxLength={4} />
            </div>
            <div className="city-field-row">
              <label className="city-field-label">Noches</label>
              <input type="number" className="city-field-input short" value={city.nights} min={1} onChange={e => onUpdate({ ...city, nights: Number(e.target.value) })} />
            </div>
            <div className="city-field-row">
              <label className="city-field-label">Airbnb / noche</label>
              <div className="field-input-wrap">
                <span className="field-prefix">$</span>
                <input type="number" className="city-field-input short" value={city.airbnb_per_night} min={0} onChange={e => onUpdate({ ...city, airbnb_per_night: Number(e.target.value) })} />
              </div>
            </div>
          </div>

          <div className="days-section">
            <div className="days-label">Días</div>
            {city.days.map((day, i) => (
              <DayRow
                key={i}
                day={day}
                dayIndex={i}
                totalDays={city.days.length}
                airbnb={city.airbnb_per_night}
                kids={kids}
                onUpdate={(nd) => updateDay(i, nd)}
                onDelete={() => deleteDay(i)}
                onMoveUp={() => moveDay(i, -1)}
                onMoveDown={() => moveDay(i, 1)}
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
