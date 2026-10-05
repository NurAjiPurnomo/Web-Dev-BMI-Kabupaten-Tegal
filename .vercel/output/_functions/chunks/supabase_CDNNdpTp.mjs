import { t as getDB } from "./db_CDrfo20J.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/lib/supabase.ts
var supabaseUrl = process.env.PUBLIC_SUPABASE_URL || "https://kppetaptpjhjiyyzwttz.supabase.co";
var supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwcGV0YXB0cGpoaml5eXp3dHR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4MDI4NTMsImV4cCI6MjEwNjM3ODg1M30.CM0x51ev_1CciHOGQBO_AScwhYtMb6mMYohUL8CZ-QA";
var isSupabaseConfigured = () => {
	return supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("your-project-id") && !supabaseAnonKey.includes("your-anon-key");
};
var supabase = isSupabaseConfigured() ? createClient(supabaseUrl, supabaseAnonKey) : null;
async function fetchSiteSettings() {
	if (isSupabaseConfigured() && supabase) try {
		const { data, error } = await supabase.from("settings").select("*").eq("id", "default").single();
		if (!error && data) return {
			siteName: data.site_name,
			subTitle: data.sub_title,
			description: data.description,
			address: data.address,
			phone: data.phone,
			email: data.email,
			social: {
				facebook: data.facebook || "#",
				instagram: data.instagram || "#",
				twitter: data.twitter || "#",
				youtube: data.youtube || "#"
			},
			copyright: data.copyright
		};
	} catch (err) {
		console.error("Supabase fetchSettings error:", err);
	}
	return getDB().settings;
}
async function fetchNewsList(limit) {
	if (isSupabaseConfigured() && supabase) try {
		let query = supabase.from("news").select("*").order("created_at", { ascending: false });
		if (limit) query = query.limit(limit);
		const { data, error } = await query;
		if (!error && data) return data.map((item) => ({
			id: item.id,
			title: item.title,
			date: item.date,
			category: item.category,
			image: item.image,
			excerpt: item.excerpt,
			content: item.content,
			featured: item.featured
		}));
	} catch (err) {
		console.error("Supabase fetchNews error:", err);
	}
	const news = getDB().news;
	return limit ? news.slice(0, limit) : news;
}
async function fetchHeroSlides() {
	if (isSupabaseConfigured() && supabase) try {
		const { data, error } = await supabase.from("hero_slides").select("*").order("created_at", { ascending: true });
		if (!error && data) return data.map((item) => ({
			id: item.id,
			title: item.title,
			subtitle: item.subtitle,
			image: item.image,
			active: item.active
		}));
	} catch (err) {
		console.error("Supabase fetchHero error:", err);
	}
	return getDB().heroSlides;
}
async function fetchLayananRequests(limit) {
	if (isSupabaseConfigured() && supabase) try {
		let query = supabase.from("layanan").select("*").order("created_at", { ascending: false });
		if (limit) query = query.limit(limit);
		const { data, error } = await query;
		if (!error && data) return data.map((item) => ({
			id: item.id,
			nama: item.nama,
			telepon: item.telepon,
			kategori: item.kategori,
			pesan: item.pesan,
			status: item.status,
			createdAt: item.created_at
		}));
	} catch (err) {
		console.error("Supabase fetchLayanan error:", err);
	}
	const layanan = getDB().layanan;
	return limit ? layanan.slice(0, limit) : layanan;
}
async function fetchAgendaList(limit) {
	if (isSupabaseConfigured() && supabase) try {
		let query = supabase.from("agenda").select("*").order("created_at", { ascending: false });
		if (limit) query = query.limit(limit);
		const { data, error } = await query;
		if (!error && data) return data.map((item) => ({
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
	} catch (err) {
		console.error("Supabase fetchAgenda error:", err);
	}
	const agenda = getDB().agenda;
	return limit ? agenda.slice(0, limit) : agenda;
}
async function fetchTeamMembers() {
	if (isSupabaseConfigured() && supabase) try {
		const { data, error } = await supabase.from("team").select("*");
		if (!error && data) return data.map((item) => ({
			id: item.id,
			name: item.name,
			role: item.role,
			image: item.image,
			tag: item.tag
		}));
	} catch (err) {
		console.error("Supabase fetchTeam error:", err);
	}
	return getDB().team;
}
async function fetchAboutContent() {
	if (isSupabaseConfigured() && supabase) try {
		const { data, error } = await supabase.from("about").select("*").eq("id", "default").single();
		if (!error && data) return {
			heroTitle: data.hero_title,
			heroSubtitle: data.hero_subtitle,
			sejarahTitle: data.sejarah_title,
			sejarahLead: data.sejarah_lead,
			sejarahBody: data.sejarah_body,
			visiTitle: data.visi_title,
			visiDesc: data.visi_desc,
			misiList: data.misi_list || []
		};
	} catch (err) {
		console.error("Supabase fetchAbout error:", err);
	}
	return getDB().about;
}
async function fetchAgendaPageContent() {
	if (isSupabaseConfigured() && supabase) try {
		const { data, error } = await supabase.from("agenda_content").select("*").eq("id", "default").single();
		if (!error && data) return {
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
	} catch (err) {
		console.error("Supabase fetchAgendaPageContent error:", err);
	}
	return getDB().agendaPageContent;
}
//#endregion
export { fetchLayananRequests as a, fetchTeamMembers as c, fetchHeroSlides as i, isSupabaseConfigured as l, fetchAgendaList as n, fetchNewsList as o, fetchAgendaPageContent as r, fetchSiteSettings as s, fetchAboutContent as t, supabase as u };
