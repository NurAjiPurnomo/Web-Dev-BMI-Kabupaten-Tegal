import type { APIRoute } from 'astro';
import { getDB, saveDB, type AboutPageContent } from '../../lib/db';
import { supabase, isSupabaseConfigured, fetchAboutContent } from '../../lib/supabase';

export const GET: APIRoute = async () => {
  const about = await fetchAboutContent();
  return new Response(JSON.stringify(about), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    const data: Partial<AboutPageContent> = await request.json();

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('about').upsert([{
        id: 'default',
        hero_title: data.heroTitle,
        hero_subtitle: data.heroSubtitle,
        sejarah_title: data.sejarahTitle,
        sejarah_lead: data.sejarahLead,
        sejarah_body: data.sejarahBody,
        visi_title: data.visiTitle,
        visi_desc: data.visiDesc,
        misi_list: data.misiList
      }]);
      if (error) console.error('Supabase about update error:', error);
    }

    const db = getDB();
    db.about = {
      heroTitle: data.heroTitle || db.about.heroTitle,
      heroSubtitle: data.heroSubtitle || db.about.heroSubtitle,
      sejarahTitle: data.sejarahTitle || db.about.sejarahTitle,
      sejarahLead: data.sejarahLead || db.about.sejarahLead,
      sejarahBody: data.sejarahBody || db.about.sejarahBody,
      visiTitle: data.visiTitle || db.about.visiTitle,
      visiDesc: data.visiDesc || db.about.visiDesc,
      misiList: data.misiList || db.about.misiList
    };
    saveDB(db);

    return new Response(JSON.stringify({ success: true, about: db.about }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to update about content' }), { status: 400 });
  }
};
