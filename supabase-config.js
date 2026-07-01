import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Supabase 프로젝트 설정에서 복사한 값을 여기에 넣으세요.
const SUPABASE_URL = 'https://rxrxegmsbchwaskavzdx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_3X0Q-ypbvJO4kZY__L1P3g_YeIy0mco';

export const isSupabaseConfigured =
  !SUPABASE_URL.includes('YOUR_PROJECT_REF') &&
  !SUPABASE_ANON_KEY.includes('YOUR_ANON_KEY_HERE');

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
