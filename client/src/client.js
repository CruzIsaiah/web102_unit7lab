import { createClient } from '@supabase/supabase-js';

const URL = 'https://rwputmeoyaglzqxhzpdl.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3cHV0bWVveWFnbHpxeGh6cGRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI3ODU0MTUsImV4cCI6MjAyODM2MTQxNX0.YBHkiruIgTQGBhW-UevZ5BwM_NG3tVPbBgDlDMwxmDI';

export const supabase = createClient(URL, API_KEY);
