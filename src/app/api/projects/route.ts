import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Map snake_case to camelCase
    const projects = data.map((p: any) => ({
      ...p,
      oneLiner: p.one_liner,
      devSlugs: p.dev_slugs,
      trendingScore: p.trending_score,
      createdAt: p.created_at,
      approved: p.approved,
    }));

    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.type) {
      return NextResponse.json({ error: 'Name and Type are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
          name: body.name,
          one_liner: body.oneLiner,
          description: body.description,
          type: body.type,
          chains: body.chains || [],
          types: body.types || [body.type],
          status: body.status || 'coming_soon',
          tags: body.tags || [],
          dev_slugs: body.devSlugs || [],
          links: body.links || {},
          media: body.media || {},
          featured: body.featured || false,
          trending_score: body.trendingScore || 0,
          approved: false, // Default for new submissions
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
