import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as saveDB, t as getDB } from "./db_CDrfo20J.mjs";
import { a as fetchLayananRequests, l as isSupabaseConfigured, u as supabase } from "./supabase_CDNNdpTp.mjs";
//#region src/pages/api/layanan.ts
var layanan_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT
});
var GET = async () => {
	const reqs = await fetchLayananRequests();
	return new Response(JSON.stringify(reqs), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
var POST = async ({ request }) => {
	try {
		const data = await request.json();
		if (!data.nama || !data.telepon || !data.pesan) return new Response(JSON.stringify({ error: "Data nama, telepon, dan pesan wajib diisi" }), { status: 400 });
		const newReq = {
			id: `req-${Date.now().toString().slice(-4)}`,
			nama: data.nama,
			telepon: data.telepon,
			kategori: data.kategori || "Umum",
			pesan: data.pesan,
			status: "Baru",
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		if (isSupabaseConfigured() && supabase) {
			const { error } = await supabase.from("layanan").insert([{
				id: newReq.id,
				nama: newReq.nama,
				telepon: newReq.telepon,
				kategori: newReq.kategori,
				pesan: newReq.pesan,
				status: newReq.status,
				created_at: newReq.createdAt
			}]);
			if (error) console.error("Supabase layanan insert error:", error);
		}
		const db = getDB();
		db.layanan.unshift(newReq);
		saveDB(db);
		return new Response(JSON.stringify({
			success: true,
			item: newReq,
			message: "Permohonan berhasil dikirim"
		}), { status: 201 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Gagal mengirimkan permohonan" }), { status: 400 });
	}
};
var PUT = async ({ request }) => {
	try {
		const data = await request.json();
		if (!data.id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });
		if (isSupabaseConfigured() && supabase) await supabase.from("layanan").update({ status: data.status }).eq("id", data.id);
		const db = getDB();
		const index = db.layanan.findIndex((l) => l.id === data.id);
		if (index !== -1) {
			db.layanan[index] = {
				...db.layanan[index],
				...data
			};
			saveDB(db);
		}
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to update request" }), { status: 400 });
	}
};
var DELETE = async ({ request }) => {
	try {
		const id = new URL(request.url).searchParams.get("id");
		if (!id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });
		if (isSupabaseConfigured() && supabase) await supabase.from("layanan").delete().eq("id", id);
		const db = getDB();
		db.layanan = db.layanan.filter((l) => l.id !== id);
		saveDB(db);
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to delete request" }), { status: 400 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/layanan@_@ts
var page = () => layanan_exports;
//#endregion
export { page };
