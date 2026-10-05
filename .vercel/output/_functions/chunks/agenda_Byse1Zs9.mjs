import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as saveDB, t as getDB } from "./db_CDrfo20J.mjs";
import { l as isSupabaseConfigured, n as fetchAgendaList, u as supabase } from "./supabase_CDNNdpTp.mjs";
//#region src/pages/api/agenda.ts
var agenda_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT
});
var GET = async () => {
	const agenda = await fetchAgendaList();
	return new Response(JSON.stringify(agenda), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
var POST = async ({ request }) => {
	try {
		const data = await request.json();
		const newItem = {
			id: `agenda-${Date.now()}`,
			title: data.title || "Agenda Baru",
			kecamatan: data.kecamatan || "Kabupaten Tegal",
			desc: data.desc || "",
			schedule: data.schedule || "Jadwal Agenda",
			badge: data.badge || "Kegiatan",
			impact: data.impact || "Manfaat Warga",
			location: data.location || "Kabupaten Tegal",
			status: data.status || "Berjalan",
			image: data.image || "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=800&auto=format&fit=crop"
		};
		if (isSupabaseConfigured() && supabase) {
			const { error } = await supabase.from("agenda").insert([newItem]);
			if (error) console.error("Supabase agenda insert error:", error);
		}
		const db = getDB();
		db.agenda.unshift(newItem);
		saveDB(db);
		return new Response(JSON.stringify({
			success: true,
			item: newItem
		}), { status: 201 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to create agenda item" }), { status: 400 });
	}
};
var PUT = async ({ request }) => {
	try {
		const data = await request.json();
		if (!data.id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });
		if (isSupabaseConfigured() && supabase) {
			const { error } = await supabase.from("agenda").update({
				title: data.title,
				kecamatan: data.kecamatan,
				desc: data.desc,
				schedule: data.schedule,
				badge: data.badge,
				impact: data.impact,
				location: data.location,
				status: data.status,
				image: data.image
			}).eq("id", data.id);
			if (error) console.error("Supabase agenda update error:", error);
		}
		const db = getDB();
		const index = db.agenda.findIndex((a) => a.id === data.id);
		if (index !== -1) {
			db.agenda[index] = {
				...db.agenda[index],
				...data
			};
			saveDB(db);
		}
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to update agenda" }), { status: 400 });
	}
};
var DELETE = async ({ request }) => {
	try {
		const id = new URL(request.url).searchParams.get("id");
		if (!id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });
		if (isSupabaseConfigured() && supabase) await supabase.from("agenda").delete().eq("id", id);
		const db = getDB();
		db.agenda = db.agenda.filter((a) => a.id !== id);
		saveDB(db);
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to delete agenda" }), { status: 400 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/agenda@_@ts
var page = () => agenda_exports;
//#endregion
export { page };
