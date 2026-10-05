import type { APIRoute } from 'astro';
import { getDB, saveDB, type LayananRequest } from '../../lib/db';
import { supabase, isSupabaseConfigured, fetchLayananRequests } from '../../lib/supabase';

export const GET: APIRoute = async () => {
  const reqs = await fetchLayananRequests();
  return new Response(JSON.stringify(reqs), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    if (!data.nama || !data.telepon || !data.pesan) {
      return new Response(JSON.stringify({ error: 'Data nama, telepon, dan pesan wajib diisi' }), { status: 400 });
    }

    const newReq: LayananRequest = {
      id: `req-${Date.now().toString().slice(-4)}`,
      nama: data.nama,
      telepon: data.telepon,
      kategori: data.kategori || 'Umum',
      pesan: data.pesan,
      status: 'Baru',
      createdAt: new Date().toISOString()
    };

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('layanan').insert([{
        id: newReq.id,
        nama: newReq.nama,
        telepon: newReq.telepon,
        kategori: newReq.kategori,
        pesan: newReq.pesan,
        status: newReq.status,
        created_at: newReq.createdAt
      }]);
      if (error) console.error('Supabase layanan insert error:', error);
    }

    const db = getDB();
    db.layanan.unshift(newReq);
    saveDB(db);

    return new Response(JSON.stringify({ success: true, item: newReq, message: 'Permohonan berhasil dikirim' }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Gagal mengirimkan permohonan' }), { status: 400 });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    if (!data.id) return new Response(JSON.stringify({ error: 'ID required' }), { status: 400 });

    if (isSupabaseConfigured() && supabase) {
      await supabase.from('layanan').update({
        status: data.status
      }).eq('id', data.id);
    }

    const db = getDB();
    const index = db.layanan.findIndex(l => l.id === data.id);
    if (index !== -1) {
      db.layanan[index] = { ...db.layanan[index], ...data };
      saveDB(db);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to update request' }), { status: 400 });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return new Response(JSON.stringify({ error: 'ID required' }), { status: 400 });

    if (isSupabaseConfigured() && supabase) {
      await supabase.from('layanan').delete().eq('id', id);
    }

    const db = getDB();
    db.layanan = db.layanan.filter(l => l.id !== id);
    saveDB(db);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to delete request' }), { status: 400 });
  }
};
