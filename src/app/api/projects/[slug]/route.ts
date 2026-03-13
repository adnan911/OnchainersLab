import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', params.slug)
      .single();

    if (error) throw error;
    if (!data) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    const project = {
      ...data,
      oneLiner: data.one_liner,
      devSlugs: data.dev_slugs,
      trendingScore: data.trending_score,
      createdAt: data.created_at,
    };

    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.code === 'PGRST116' ? 404 : 500 });
  }
}
