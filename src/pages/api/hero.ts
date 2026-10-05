import type { APIRoute } from 'astro';
import { getDB, saveDB, type HeroSlide } from '../../lib/db';
import { getSupabase, fetchHeroSlides } from '../../lib/supabase';

export const GET: APIRoute = async () => {
  const slides = await fetchHeroSlides();
  return new Response(JSON.stringify(slides), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const newSlide: HeroSlide = {
      id: `hero-${Date.now()}`,
      title: data.title || 'BMI KAB TEGAL - Hadir untuk Masyarakat',
      subtitle: data.subtitle || '',
      image: data.image || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1470&auto=format&fit=crop',
      active: data.active !== undefined ? data.active : true
    };

    const client = getSupabase();
    if (client) {
      const { error } = await client.from('hero_slides').insert([{
        id: newSlide.id,
        title: newSlide.title,
        subtitle: newSlide.subtitle,
        image: newSlide.image,
        active: newSlide.active
      }]);
      if (error) {
        console.error('Supabase hero insert error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }
    }

    const db = getDB();
    db.heroSlides.push(newSlide);
    saveDB(db);

    return new Response(JSON.stringify({ success: true, slide: newSlide }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to create slide' }), { status: 400 });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    if (!data.id) return new Response(JSON.stringify({ error: 'ID required' }), { status: 400 });

    const client = getSupabase();
    if (client) {
      const { error } = await client.from('hero_slides').update({
        title: data.title,
        subtitle: data.subtitle,
        image: data.image,
        active: data.active
      }).eq('id', data.id);
      if (error) {
        console.error('Supabase hero update error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }
    }

    const db = getDB();
    const index = db.heroSlides.findIndex(s => s.id === data.id);
    if (index !== -1) {
      db.heroSlides[index] = { ...db.heroSlides[index], ...data };
      saveDB(db);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to update slide' }), { status: 400 });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return new Response(JSON.stringify({ error: 'ID required' }), { status: 400 });

    const client = getSupabase();
    if (client) {
      const { error } = await client.from('hero_slides').delete().eq('id', id);
      if (error) {
        console.error('Supabase hero delete error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }
    }

    const db = getDB();
    db.heroSlides = db.heroSlides.filter(s => s.id !== id);
    saveDB(db);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to delete slide' }), { status: 400 });
  }
};
