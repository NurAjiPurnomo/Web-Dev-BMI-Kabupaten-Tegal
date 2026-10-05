import type { APIRoute } from 'astro';
import { getDB, saveDB, type NewsItem } from '../../lib/db';
import { getSupabase, fetchNewsList } from '../../lib/supabase';

export const GET: APIRoute = async () => {
  const news = await fetchNewsList();
  return new Response(JSON.stringify(news), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const newItem: NewsItem = {
      id: `news-${Date.now()}`,
      title: data.title || 'Judul Berita Baru',
      date: data.date || new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      category: data.category || 'Aksi Sosial',
      image: data.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
      excerpt: data.excerpt || '',
      content: data.content || '',
      featured: data.featured || false
    };

    const client = getSupabase();
    if (client) {
      const { error } = await client.from('news').insert([{
        id: newItem.id,
        title: newItem.title,
        date: newItem.date,
        category: newItem.category,
        image: newItem.image,
        excerpt: newItem.excerpt,
        content: newItem.content,
        featured: newItem.featured
      }]);
      if (error) {
        console.error('Supabase news insert error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }
    }

    const db = getDB();
    db.news.unshift(newItem);
    saveDB(db);

    return new Response(JSON.stringify({ success: true, item: newItem }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to create news item' }), { status: 400 });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    if (!data.id) return new Response(JSON.stringify({ error: 'ID required' }), { status: 400 });

    const client = getSupabase();
    if (client) {
      const { error } = await client.from('news').update({
        title: data.title,
        date: data.date,
        category: data.category,
        image: data.image,
        excerpt: data.excerpt,
        content: data.content,
        featured: data.featured
      }).eq('id', data.id);
      if (error) {
        console.error('Supabase news update error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }
    }

    const db = getDB();
    const index = db.news.findIndex(n => n.id === data.id);
    if (index !== -1) {
      db.news[index] = { ...db.news[index], ...data };
      saveDB(db);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to update news' }), { status: 400 });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return new Response(JSON.stringify({ error: 'ID required' }), { status: 400 });

    const client = getSupabase();
    if (client) {
      const { error } = await client.from('news').delete().eq('id', id);
      if (error) {
        console.error('Supabase news delete error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }
    }

    const db = getDB();
    db.news = db.news.filter(n => n.id !== id);
    saveDB(db);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to delete news' }), { status: 400 });
  }
};
