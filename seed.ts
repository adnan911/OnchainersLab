import * as dotenv from 'dotenv';
import { resolve } from 'path';

// 1. First, load the environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

async function runSeed() {
  console.log('Starting clear and seed...');

  // 2. Dynamically import modules that need the environment to be ready
  const { supabase } = await import('./src/lib/supabase');
  const { developers } = await import('./src/data/developers');
  const { projects } = await import('./src/data/projects');

  console.log(`Ready to seed: ${developers.length} developers and ${projects.length} projects`);

  // 1. Delete all existing records
  console.log('Clearing existing data...');
  const { error: clearProjectsError } = await supabase.from('projects').delete().neq('slug', 'FORCE_DELETE_ALL');
  if (clearProjectsError) console.error('Error clearing projects:', clearProjectsError);
  
  const { error: clearDevsError } = await supabase.from('developers').delete().neq('slug', 'FORCE_DELETE_ALL');
  if (clearDevsError) console.error('Error clearing developers:', clearDevsError);

  // Seed Developers
  console.log('Seeding developers...');
  for (const dev of developers) {
    const { error } = await supabase.from('developers').upsert({
      slug: dev.slug,
      name: dev.name,
      tagline: dev.tagline,
      bio: dev.bio,
      roles: dev.roles,
      chains: dev.chains,
      skills: dev.skills,
      links: dev.links,
      avatar_url: dev.avatarUrl,
      featured_project_slugs: dev.featuredProjectSlugs,
      approved: true,
    }, { onConflict: 'slug' });
    if (error) console.error(`Error seeding dev ${dev.slug}:`, error);
  }

  // Seed Projects
  console.log('Seeding projects...');
  for (const project of projects) {
    const { error } = await supabase.from('projects').upsert({
      slug: project.slug,
      name: project.name,
      one_liner: project.oneLiner,
      description: project.description,
      type: project.type,
      chains: project.chains,
      types: project.types,
      status: project.status,
      tags: project.tags,
      dev_slugs: project.devSlugs,
      links: project.links,
      media: project.media,
      featured: project.featured,
      trending_score: project.trendingScore,
      approved: true,
    }, { onConflict: 'slug' });
    if (error) console.error(`Error seeding project ${project.slug}:`, error);
  }

  console.log('Seed completed!');
}

runSeed().catch((err) => {
  console.error('Seed script failed:', err);
  process.exit(1);
});
