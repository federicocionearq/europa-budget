import { MapPin } from 'lucide-react'
import { CATALOG_LIST } from '../lib/cityCatalog'

// Desplegable para sumar un destino a la ruta (excluye los ya agregados).
export function CityPicker({ usedCatalogIds, onAdd }) {
  const available = CATALOG_LIST.filter(c => !usedCatalogIds.has(c.id))
  if (!available.length) return null

  return (
    <div className="city-picker">
      <MapPin size={14} />
      <select
        className="city-picker-select"
        value=""
        onChange={e => { if (e.target.value) onAdd(e.target.value) }}
      >
        <option value="">+ Agregar destino…</option>
        {available.map(c => (
          <option key={c.id} value={c.id}>{c.flag} {c.name}{c.direct ? '  (vuelo directo)' : ''}</option>
        ))}
      </select>
    </div>
  )
}
