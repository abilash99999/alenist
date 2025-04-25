// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://coueerimypktetjdnpnh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvdWVlcmlteXBrdGV0amRucG5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MjM4MjQsImV4cCI6MjA2MTA5OTgyNH0.HTSabccC4CZ3PjpQZofeSCgqhF8q6cDe_IpDlPThiH8'

export const supabase = createClient(supabaseUrl, supabaseKey)
