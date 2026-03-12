import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://rexkihqqbgdwpkwyxamq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJleGtpaHFxYmdkd3Brd3l4YW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMzY4ODMsImV4cCI6MjA4ODkxMjg4M30.BrWkthCdkboVjfzmYVNbmr4Bw4H4h6WBGQo7NHhxBtY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
