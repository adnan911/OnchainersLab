import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Fetch live projects
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (projectsError) throw projectsError;

    // Fetch live developers
    const { data: developers, error: developersError } = await supabase
      .from('developers')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (developersError) throw developersError;

    // Map projects snake_case to camelCase
    const mappedProjects = projects.map((p: any) => ({
      ...p,
      oneLiner: p.one_liner,
      devSlugs: p.dev_slugs,
      trendingScore: p.trending_score,
      createdAt: p.created_at,
    }));

    return NextResponse.json({
      projects: mappedProjects,
      developers: developers,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
