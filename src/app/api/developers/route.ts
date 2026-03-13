import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('developers')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.slug) {
      return NextResponse.json({ error: 'Name and Slug are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('developers')
      .insert([
        {
          slug: body.slug,
          name: body.name,
          tagline: body.tagline,
          bio: body.bio,
          roles: body.roles || [],
          chains: body.chains || [],
          skills: body.skills || [],
          links: body.links || {},
          avatar_url: body.avatarUrl,
          featured_project_slugs: body.featuredProjectSlugs || [],
          approved: false, // Explicitly set to false for moderation
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
