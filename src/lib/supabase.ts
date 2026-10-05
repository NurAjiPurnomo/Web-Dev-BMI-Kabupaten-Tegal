import { createClient } from '@supabase/supabase-js';
import { getDB, saveDB, type DatabaseSchema, type NewsItem, type HeroSlide, type LayananRequest, type SiteSettings, type AgendaPageContent } from './db';

export function getSupabaseUrl(): string {
  return (
    process.env.PUBLIC_SUPABASE_URL ||
    import.meta.env.PUBLIC_SUPABASE_URL ||
    ''
  );
}

export function getSupabaseAnonKey(): string {
  return (
    process.env.PUBLIC_SUPABASE_ANON_KEY ||
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY ||
    ''
  );
}

export const isSupabaseConfigured = () => {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  return (
    !!url &&
    !!key &&
    !url.includes('your-project-id') &&
    !key.includes('your-anon-key')
  );
};

let cachedClient: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (!isSupabaseConfigured()) return null;
  if (!cachedClient) {
    cachedClient = createClient(getSupabaseUrl(), getSupabaseAnonKey());
  }
  return cachedClient;
}

export const supabase = getSupabase();

// ==========================================
// UNIFIED DATA FETCHERS (SUPABASE OR FALLBACK)
// ==========================================

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client
        .from('settings')
        .select('*')
        .eq('id', 'default')
        .single();

      if (!error && data) {
        return {
          siteName: data.site_name,
          subTitle: data.sub_title,
          description: data.description,
          address: data.address,
          phone: data.phone,
          email: data.email,
          social: {
            facebook: data.facebook || '#',
            instagram: data.instagram || '#',
            twitter: data.twitter || '#',
            youtube: data.youtube || '#'
          },
          copyright: data.copyright,
          itCredit: data.it_credit || "Dikelola oleh Penanggung Jawab Divisi IT DPC BMI Kab. Tegal"
        };
      }
    } catch (err) {
      console.error('Supabase fetchSettings error:', err);
    }
  }
  return getDB().settings;
}

export async function fetchNewsList(limit?: number): Promise<NewsItem[]> {
  const client = getSupabase();
  if (client) {
    try {
      let query = client
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (!error && data) {
        return data.map(item => ({
          id: item.id,
          title: item.title,
          date: item.date,
          category: item.category,
          image: item.image,
          excerpt: item.excerpt,
          content: item.content,
          featured: item.featured
        }));
      }
    } catch (err) {
      console.error('Supabase fetchNews error:', err);
    }
  }
  const news = getDB().news;
  return limit ? news.slice(0, limit) : news;
}

export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client
        .from('hero_slides')
        .select('*')
        .order('created_at', { ascending: true });

      if (!error && data) {
        return data.map(item => ({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
          image: item.image,
          active: item.active
        }));
      }
    } catch (err) {
      console.error('Supabase fetchHero error:', err);
    }
  }
  return getDB().heroSlides;
}

export async function fetchLayananRequests(limit?: number): Promise<LayananRequest[]> {
  const client = getSupabase();
  if (client) {
    try {
      let query = client
        .from('layanan')
        .select('*')
        .order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (!error && data) {
        return data.map(item => ({
          id: item.id,
          nama: item.nama,
          telepon: item.telepon,
          kategori: item.kategori,
          pesan: item.pesan,
          status: item.status as any,
          createdAt: item.created_at
        }));
      }
    } catch (err) {
      console.error('Supabase fetchLayanan error:', err);
    }
  }
  const layanan = getDB().layanan;
  return limit ? layanan.slice(0, limit) : layanan;
}

export async function fetchAgendaList(limit?: number): Promise<AgendaItem[]> {
  const client = getSupabase();
  if (client) {
    try {
      let query = client
        .from('agenda')
        .select('*')
        .order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (!error && data) {
        return data.map(item => ({
          id: item.id,
          title: item.title,
          kecamatan: item.kecamatan,
          desc: item.desc,
          schedule: item.schedule,
          badge: item.badge,
          impact: item.impact,
          location: item.location,
          status: item.status,
          image: item.image
        }));
      }
    } catch (err) {
      console.error('Supabase fetchAgenda error:', err);
    }
  }
  const agenda = getDB().agenda;
  return limit ? agenda.slice(0, limit) : agenda;
}

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client
        .from('team')
        .select('*');

      if (!error && data && data.length > 0) {
        return data.map(item => ({
          id: item.id,
          name: item.name,
          role: item.role,
          image: item.image,
          tag: item.tag
        }));
      }
    } catch (err) {
      console.error('Supabase fetchTeam error:', err);
    }
  }
  return getDB().team;
}

export async function fetchAboutContent(): Promise<AboutPageContent> {
  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client
        .from('about')
        .select('*')
        .eq('id', 'default')
        .single();

      if (!error && data) {
        return {
          heroTitle: data.hero_title,
          heroSubtitle: data.hero_subtitle,
          sejarahTitle: data.sejarah_title,
          sejarahLead: data.sejarah_lead,
          sejarahBody: data.sejarah_body,
          visiTitle: data.visi_title,
          visiDesc: data.visi_desc,
          misiList: data.misi_list || []
        };
      }
    } catch (err) {
      console.error('Supabase fetchAbout error:', err);
    }
  }
  return getDB().about;
}

export async function fetchAgendaPageContent(): Promise<AgendaPageContent> {
  const client = getSupabase();
  if (client) {
    try {
      const { data, error } = await client
        .from('agenda_content')
        .select('*')
        .eq('id', 'default')
        .single();

      if (!error && data) {
        return {
          heroTag: data.hero_tag,
          heroTitle: data.hero_title,
          heroSubtitle: data.hero_subtitle,
          eventSpotlightPill: data.event_spotlight_pill,
          eventSpotlightCategory: data.event_spotlight_category,
          eventSpotlightTitle: data.event_spotlight_title,
          eventSpotlightSchedule: data.event_spotlight_schedule,
          eventSpotlightLocation: data.event_spotlight_location,
          spotlightBadge: data.spotlight_badge,
          spotlightCategory: data.spotlight_category,
          spotlightTitle: data.spotlight_title,
          spotlightDesc: data.spotlight_desc,
          spotlightImage: data.spotlight_image,
          spotlightFeat1: data.spotlight_feat1,
          spotlightFeat2: data.spotlight_feat2,
          spotlightFeat3: data.spotlight_feat3,
          ctaTag: data.cta_tag,
          ctaTitle: data.cta_title,
          ctaDesc: data.cta_desc
        };
      }
    } catch (err) {
      console.error('Supabase fetchAgendaPageContent error:', err);
    }
  }
  return getDB().agendaPageContent;
}
