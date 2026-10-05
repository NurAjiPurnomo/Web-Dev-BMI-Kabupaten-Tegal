import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as saveDB, t as getDB } from "./db_CDrfo20J.mjs";
import { c as fetchTeamMembers, l as isSupabaseConfigured, u as supabase } from "./supabase_CDNNdpTp.mjs";
//#region src/pages/api/team.ts
var team_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT
});
var GET = async () => {
	const team = await fetchTeamMembers();
	return new Response(JSON.stringify(team), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
var POST = async ({ request }) => {
	try {
		const data = await request.json();
		const newItem = {
			id: `team-${Date.now()}`,
			name: data.name || "Nama Pengurus",
			role: data.role || "Pengurus DPC BMI",
			image: data.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
			tag: data.tag || "Keorganisasian"
		};
		if (isSupabaseConfigured() && supabase) {
			const { error } = await supabase.from("team").insert([newItem]);
			if (error) console.error("Supabase team insert error:", error);
		}
		const db = getDB();
		db.team.push(newItem);
		saveDB(db);
		return new Response(JSON.stringify({
			success: true,
			item: newItem
		}), { status: 201 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to create team member" }), { status: 400 });
	}
};
var PUT = async ({ request }) => {
	try {
		const data = await request.json();
		if (!data.id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });
		if (isSupabaseConfigured() && supabase) {
			const { error } = await supabase.from("team").update({
				name: data.name,
				role: data.role,
				image: data.image,
				tag: data.tag
			}).eq("id", data.id);
			if (error) console.error("Supabase team update error:", error);
		}
		const db = getDB();
		const index = db.team.findIndex((t) => t.id === data.id);
		if (index !== -1) {
			db.team[index] = {
				...db.team[index],
				...data
			};
			saveDB(db);
		}
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to update team member" }), { status: 400 });
	}
};
var DELETE = async ({ request }) => {
	try {
		const id = new URL(request.url).searchParams.get("id");
		if (!id) return new Response(JSON.stringify({ error: "ID required" }), { status: 400 });
		if (isSupabaseConfigured() && supabase) await supabase.from("team").delete().eq("id", id);
		const db = getDB();
		db.team = db.team.filter((t) => t.id !== id);
		saveDB(db);
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Failed to delete team member" }), { status: 400 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/team@_@ts
var page = () => team_exports;
//#endregion
export { page };
