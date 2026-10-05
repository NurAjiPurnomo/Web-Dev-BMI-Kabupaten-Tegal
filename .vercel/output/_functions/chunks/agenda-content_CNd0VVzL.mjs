import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as saveDB, t as getDB } from "./db_CDrfo20J.mjs";
import { l as isSupabaseConfigured, r as fetchAgendaPageContent, u as supabase } from "./supabase_CDNNdpTp.mjs";
//#region src/pages/api/agenda-content.ts
var agenda_content_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	PUT: () => PUT
});
var GET = async () => {
	const content = await fetchAgendaPageContent();
	return new Response(JSON.stringify(content), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
var PUT = async ({ request }) => {
	try {
		const data = await request.json();
		if (isSupabaseConfigured() && supabase) {
			const { error } = await supabase.from("agenda_content").upsert([{
				id: "default",
				hero_tag: data.heroTag,
				hero_title: data.heroTitle,
				hero_subtitle: data.heroSubtitle,
				event_spotlight_pill: data.eventSpotlightPill,
				event_spotlight_category: data.eventSpotlightCategory,
				event_spotlight_title: data.eventSpotlightTitle,
				event_spotlight_schedule: data.eventSpotlightSchedule,
				event_spotlight_location: data.eventSpotlightLocation,
				spotlight_badge: data.spotlightBadge,
				spotlight_category: data.spotlightCategory,
				spotlight_title: data.spotlightTitle,
				spotlight_desc: data.spotlightDesc,
				spotlight_image: data.spotlightImage,
				spotlight_feat1: data.spotlightFeat1,
				spotlight_feat2: data.spotlightFeat2,
				spotlight_feat3: data.spotlightFeat3,
				cta_tag: data.ctaTag,
				cta_title: data.ctaTitle,
				cta_desc: data.ctaDesc
			}]);
			if (error) console.error("Supabase agenda_content update error:", error);
		}
		const db = getDB();
		db.agendaPageContent = {
			...db.agendaPageContent,
			...data
		};
		saveDB(db);
		return new Response(JSON.stringify({
			success: true,
			agendaPageContent: db.agendaPageContent
		}), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to update agenda page content" }), { status: 400 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/agenda-content@_@ts
var page = () => agenda_content_exports;
//#endregion
export { page };
