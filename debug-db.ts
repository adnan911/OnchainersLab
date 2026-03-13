import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkData() {
  console.log('--- DB DEBUG START ---');
  
  const { data: projects, error: pError, count: pCount } = await supabase.from('projects').select('*', { count: 'exact' });
  if (pError) console.error('Projects Error:', pError);
  else console.log(`Projects Count: ${pCount}`, projects?.map(p => ({ slug: p.slug, approved: p.approved })));

  const { data: developers, error: dError, count: dCount } = await supabase.from('developers').select('*', { count: 'exact' });
  if (dError) console.error('Developers Error:', dError);
  else console.log(`Developers Count: ${dCount}`, developers?.map(d => ({ slug: d.slug, approved: d.approved })));
  
  console.log('--- DB DEBUG END ---');
}

checkData();
