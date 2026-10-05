import type { APIRoute } from 'astro';
import { getDB, saveDB, type AgendaItem } from '../../lib/db';
import { supabase, isSupabaseConfigured, fetchAgendaList } from '../../lib/supabase';

export const GET: APIRoute = async () => {
  const agenda = await fetchAgendaList();
  return new Response(JSON.stringify(agenda), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const newItem: AgendaItem = {
      id: `agenda-${Date.now()}`,
      title: data.title || 'Agenda Baru',
      kecamatan: data.kecamatan || 'Kabupaten Tegal',
      desc: data.desc || '',
      schedule: data.schedule || 'Jadwal Agenda',
      badge: data.badge || 'Kegiatan',
      impact: data.impact || 'Manfaat Warga',
      location: data.location || 'Kabupaten Tegal',
      status: data.status || 'Berjalan',
      image: data.image || 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=800&auto=format&fit=crop'
    };

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('agenda').insert([newItem]);
      if (error) console.error('Supabase agenda insert error:', error);
    }

    const db = getDB();
    db.agenda.unshift(newItem);
    saveDB(db);

    return new Response(JSON.stringify({ success: true, item: newItem }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to create agenda item' }), { status: 400 });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    if (!data.id) return new Response(JSON.stringify({ error: 'ID required' }), { status: 400 });

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('agenda').update({
        title: data.title,
        kecamatan: data.kecamatan,
        desc: data.desc,
        schedule: data.schedule,
        badge: data.badge,
        impact: data.impact,
        location: data.location,
        status: data.status,
        image: data.image
      }).eq('id', data.id);
      if (error) console.error('Supabase agenda update error:', error);
    }

    const db = getDB();
    const index = db.agenda.findIndex(a => a.id === data.id);
    if (index !== -1) {
      db.agenda[index] = { ...db.agenda[index], ...data };
      saveDB(db);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to update agenda' }), { status: 400 });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return new Response(JSON.stringify({ error: 'ID required' }), { status: 400 });

    if (isSupabaseConfigured() && supabase) {
      await supabase.from('agenda').delete().eq('id', id);
    }

    const db = getDB();
    db.agenda = db.agenda.filter(a => a.id !== id);
    saveDB(db);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to delete agenda' }), { status: 400 });
  }
};
