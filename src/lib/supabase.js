import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Si no hay credenciales (p. ej. corriendo en local sin .env), exportamos null
// y la app trabaja en modo local con localStorage. Así no rompe al iniciar.
export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export const hasSupabase = Boolean(supabase)
