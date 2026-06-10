import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase, hasSupabase } from '../lib/supabase'
import { DEFAULT_TRIP, TRIP_META_DEFAULTS } from '../lib/defaultData'

const BUDGET_ID = 'europa-2027-fede'
const LOCAL_KEY = `europa-budget:${BUDGET_ID}`

// Garantiza que el trip tenga los campos nuevos (start_date, arrival, etc.)
// aunque venga de un guardado viejo sin ellos.
function withMeta(trip) {
  return { ...TRIP_META_DEFAULTS, ...trip }
}

export function useBudget() {
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const saveTimer = useRef(null)

  // Carga inicial: Supabase si hay credenciales, si no localStorage.
  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        if (!hasSupabase) {
          const raw = localStorage.getItem(LOCAL_KEY)
          setTrip(withMeta(raw ? JSON.parse(raw) : DEFAULT_TRIP))
          setError(null)
          return
        }

        const { data, error } = await supabase
          .from('budgets')
          .select('data')
          .eq('id', BUDGET_ID)
          .single()

        if (error && error.code !== 'PGRST116') throw error

        if (data?.data) {
          setTrip(withMeta(data.data))
        } else {
          setTrip(withMeta(DEFAULT_TRIP))
          await supabase.from('budgets').upsert({ id: BUDGET_ID, data: DEFAULT_TRIP })
        }
      } catch (err) {
        console.error('Load error:', err)
        // Fallback: intentar localStorage antes de rendirse al default.
        const raw = localStorage.getItem(LOCAL_KEY)
        setTrip(withMeta(raw ? JSON.parse(raw) : DEFAULT_TRIP))
        setError('No se pudo conectar con Supabase. Trabajando en modo local.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Guardado con debounce. Siempre persiste a localStorage; a Supabase si está.
  const saveTrip = useCallback(async (newTrip) => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      try {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(newTrip))
      } catch (err) {
        console.error('Local save error:', err)
      }

      if (!hasSupabase) return

      setSaving(true)
      try {
        const { error } = await supabase
          .from('budgets')
          .upsert({ id: BUDGET_ID, data: newTrip, updated_at: new Date().toISOString() })
        if (error) throw error
      } catch (err) {
        console.error('Save error:', err)
        setError('Error al guardar en Supabase (cambios guardados en este dispositivo).')
      } finally {
        setSaving(false)
      }
    }, 800)
  }, [])

  const updateTrip = useCallback((updater) => {
    setTrip(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveTrip(next)
      return next
    })
  }, [saveTrip])

  return { trip, loading, saving, error, updateTrip }
}
