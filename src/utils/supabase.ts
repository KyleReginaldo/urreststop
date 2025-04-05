import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl ?? "https://fpdlruaykocfvyeghnas.supabase.co",
  supabaseKey ??
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwZGxydWF5a29jZnZ5ZWdobmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2MDMzMzIsImV4cCI6MjA1OTE3OTMzMn0.QEDZfNbrC_iioVM1SWBHGn6hxdXxL1AOPD02hcKWTiE"
);
