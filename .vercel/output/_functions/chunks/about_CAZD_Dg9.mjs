import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as saveDB, t as getDB } from "./db_CDrfo20J.mjs";
import { l as isSupabaseConfigured, t as fetchAboutContent, u as supabase } from "./supabase_CDNNdpTp.mjs";
//#region src/pages/api/about.ts
var about_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	PUT: () => PUT
});
var GET = async () => {
	const about = await fetchAboutContent();
	return new Response(JSON.stringify(about), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
var PUT = async ({ request }) => {
	try {
		const data = await request.json();
		if (isSupabaseConfigured() && supabase) {
			const { error } = await supabase.from("about").upsert([{
				id: "default",
				hero_title: data.heroTitle,
				hero_subtitle: data.heroSubtitle,
				sejarah_title: data.sejarahTitle,
				sejarah_lead: data.sejarahLead,
				sejarah_body: data.sejarahBody,
				visi_title: data.visiTitle,
				visi_desc: data.visiDesc,
				misi_list: data.misiList
			}]);
			if (error) console.error("Supabase about update error:", error);
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
		return new Response(JSON.stringify({
			success: true,
			about: db.about
		}), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to update about content" }), { status: 400 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/about@_@ts
var page = () => about_exports;
//#endregion
export { page };
