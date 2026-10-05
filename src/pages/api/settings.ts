import type { APIRoute } from 'astro';
import { getDB, saveDB } from '../../lib/db';
import { supabase, isSupabaseConfigured, fetchSiteSettings } from '../../lib/supabase';

export const GET: APIRoute = async () => {
  const settings = await fetchSiteSettings();
  return new Response(JSON.stringify(settings), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('settings').upsert({
        id: 'default',
        site_name: data.siteName,
        sub_title: data.subTitle,
        description: data.description,
        address: data.address,
        phone: data.phone,
        email: data.email,
        facebook: data.social?.facebook,
        instagram: data.social?.instagram,
        twitter: data.social?.twitter,
        youtube: data.social?.youtube,
        copyright: data.copyright,
        updated_at: new Date().toISOString()
      });
      if (error) console.error('Supabase settings update error:', error);
    }

    const db = getDB();
    db.settings = { ...db.settings, ...data };
    saveDB(db);

    return new Response(JSON.stringify({ success: true, settings: db.settings }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to update settings' }), { status: 400 });
  }
};
