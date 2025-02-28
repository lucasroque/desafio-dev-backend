import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yxwhlswfuwlldfwpbgqw.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4d2hsc3dmdXdsbGRmd3BiZ3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NjY2MDEsImV4cCI6MjA1NjI0MjYwMX0.ftwRxvSox3dHlOZlYi6qtN-PhK1dJje7L4QmQ6v2Cmo"

export default createClient(supabaseUrl, supabaseKey)
