import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as saveDB, t as getDB } from "./db_CDrfo20J.mjs";
import { l as isSupabaseConfigured, s as fetchSiteSettings, u as supabase } from "./supabase_CDNNdpTp.mjs";
//#region src/pages/api/settings.ts
var settings_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	PUT: () => PUT
});
var GET = async () => {
	const settings = await fetchSiteSettings();
	return new Response(JSON.stringify(settings), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
var PUT = async ({ request }) => {
	try {
		const data = await request.json();
		if (isSupabaseConfigured() && supabase) {
			const { error } = await supabase.from("settings").upsert({
				id: "default",
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
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			});
			if (error) console.error("Supabase settings update error:", error);
		}
		const db = getDB();
		db.settings = {
			...db.settings,
			...data
		};
		saveDB(db);
		return new Response(JSON.stringify({
			success: true,
			settings: db.settings
		}), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to update settings" }), { status: 400 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/settings@_@ts
var page = () => settings_exports;
//#endregion
export { page };
