import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as saveDB, t as getDB } from "./db_CDrfo20J.mjs";
import { l as isSupabaseConfigured, o as fetchNewsList, u as supabase } from "./supabase_CDNNdpTp.mjs";
//#region src/pages/api/news.ts
var news_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT
});
var GET = async () => {
	const news = await fetchNewsList();
	return new Response(JSON.stringify(news), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
var POST = async ({ request }) => {
	try {
		const data = await request.json();
		const newItem = {
			id: `news-${Date.now()}`,
			title: data.title || "Judul Berita Baru",
			date: data.date || (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", {
				day: "numeric",
				month: "short",
				year: "numeric"
			}),
			category: data.category || "Aksi Sosial",
			image: data.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop",
			excerpt: data.excerpt || "",
			content: data.content || "",
			featured: data.featured || false
		};
		if (isSupabaseConfigured() && supabase) {
			const { error } = await supabase.from("news").insert([{
				id: newItem.id,
				title: newItem.title,
				date: newItem.date,
				category: newItem.category,
				image: newItem.image,
				excerpt: newItem.excerpt,
				content: newItem.content,
				featured: newItem.featured
			}]);
			if (error) console.error("Supabase news insert error:", error);
		}
		const db = getDB();
		db.news.unshift(newItem);
		saveDB(db);
		return new Response(JSON.stringify({
			success: true,
			item: newItem
		}), { status: 201 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to create news item" }), { status: 400 });
	}
};
var PUT = async ({ request }) => {
	try {
		const data = await request.json();
		if (!data.id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });
		if (isSupabaseConfigured() && supabase) {
			const { error } = await supabase.from("news").update({
				title: data.title,
				date: data.date,
				category: data.category,
				image: data.image,
				excerpt: data.excerpt,
				content: data.content,
				featured: data.featured
			}).eq("id", data.id);
			if (error) console.error("Supabase news update error:", error);
		}
		const db = getDB();
		const index = db.news.findIndex((n) => n.id === data.id);
		if (index !== -1) {
			db.news[index] = {
				...db.news[index],
				...data
			};
			saveDB(db);
		}
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to update news" }), { status: 400 });
	}
};
var DELETE = async ({ request }) => {
	try {
		const id = new URL(request.url).searchParams.get("id");
		if (!id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });
		if (isSupabaseConfigured() && supabase) await supabase.from("news").delete().eq("id", id);
		const db = getDB();
		db.news = db.news.filter((n) => n.id !== id);
		saveDB(db);
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to delete news" }), { status: 400 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/news@_@ts
var page = () => news_exports;
//#endregion
export { page };
