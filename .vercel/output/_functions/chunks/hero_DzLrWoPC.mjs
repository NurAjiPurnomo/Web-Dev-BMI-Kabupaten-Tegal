import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as saveDB, t as getDB } from "./db_CDrfo20J.mjs";
import { i as fetchHeroSlides, l as isSupabaseConfigured, u as supabase } from "./supabase_CDNNdpTp.mjs";
//#region src/pages/api/hero.ts
var hero_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT
});
var GET = async () => {
	const slides = await fetchHeroSlides();
	return new Response(JSON.stringify(slides), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
var POST = async ({ request }) => {
	try {
		const data = await request.json();
		const newSlide = {
			id: `hero-${Date.now()}`,
			title: data.title || "BMI KAB TEGAL - Hadir untuk Masyarakat",
			subtitle: data.subtitle || "",
			image: data.image || "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1470&auto=format&fit=crop",
			active: data.active !== void 0 ? data.active : true
		};
		if (isSupabaseConfigured() && supabase) {
			const { error } = await supabase.from("hero_slides").insert([{
				id: newSlide.id,
				title: newSlide.title,
				subtitle: newSlide.subtitle,
				image: newSlide.image,
				active: newSlide.active
			}]);
			if (error) console.error("Supabase hero insert error:", error);
		}
		const db = getDB();
		db.heroSlides.push(newSlide);
		saveDB(db);
		return new Response(JSON.stringify({
			success: true,
			slide: newSlide
		}), { status: 201 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to create slide" }), { status: 400 });
	}
};
var PUT = async ({ request }) => {
	try {
		const data = await request.json();
		if (!data.id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });
		if (isSupabaseConfigured() && supabase) await supabase.from("hero_slides").update({
			title: data.title,
			subtitle: data.subtitle,
			image: data.image,
			active: data.active
		}).eq("id", data.id);
		const db = getDB();
		const index = db.heroSlides.findIndex((s) => s.id === data.id);
		if (index !== -1) {
			db.heroSlides[index] = {
				...db.heroSlides[index],
				...data
			};
			saveDB(db);
		}
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to update slide" }), { status: 400 });
	}
};
var DELETE = async ({ request }) => {
	try {
		const id = new URL(request.url).searchParams.get("id");
		if (!id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });
		if (isSupabaseConfigured() && supabase) await supabase.from("hero_slides").delete().eq("id", id);
		const db = getDB();
		db.heroSlides = db.heroSlides.filter((s) => s.id !== id);
		saveDB(db);
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to delete slide" }), { status: 400 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/hero@_@ts
var page = () => hero_exports;
//#endregion
export { page };
