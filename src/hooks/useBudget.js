import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { DEFAULT_TRIP } from '../lib/defaultData'

const BUDGET_ID = 'europa-2027-fede'

export function useBudget() {
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const saveTimer = useRef(null)

  // Load from Supabase on mount
  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('budgets')
          .select('data')
          .eq('id', BUDGET_ID)
          .single()

        if (error && error.code !== 'PGRST116') throw error

        if (data?.data) {
          setTrip(data.data)
        } else {
          // First time: save defaults
          setTrip(DEFAULT_TRIP)
          await supabase.from('budgets').upsert({ id: BUDGET_ID, data: DEFAULT_TRIP })
        }
      } catch (err) {
        console.error('Load error:', err)
        setTrip(DEFAULT_TRIP)
        setError('No se pudo conectar con Supabase. Trabajando en modo local.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Debounced save to Supabase
  const saveTrip = useCallback(async (newTrip) => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      setSaving(true)
      try {
        const { error } = await supabase
          .from('budgets')
          .upsert({ id: BUDGET_ID, data: newTrip, updated_at: new Date().toISOString() })
        if (error) throw error
      } catch (err) {
        console.error('Save error:', err)
        setError('Error al guardar. Verificá la conexión.')
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
