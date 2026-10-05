import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { l as isSupabaseConfigured, u as supabase } from "./supabase_CDNNdpTp.mjs";
//#region src/pages/api/upload.ts
var upload_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request }) => {
	try {
		const file = (await request.formData()).get("file");
		if (!file) return new Response(JSON.stringify({ error: "No file provided" }), { status: 400 });
		if (!isSupabaseConfigured() || !supabase) return new Response(JSON.stringify({ error: "Supabase credentials missing. Please set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY in .env" }), { status: 400 });
		const fileExt = file.name.split(".").pop();
		const filePath = `uploads/${`${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`}`;
		const { data, error } = await supabase.storage.from("media").upload(filePath, file, {
			cacheControl: "3600",
			upsert: true
		});
		if (error) {
			console.error("Supabase upload error:", error);
			return new Response(JSON.stringify({ error: error.message }), { status: 500 });
		}
		const { data: publicUrlData } = supabase.storage.from("media").getPublicUrl(filePath);
		return new Response(JSON.stringify({
			success: true,
			url: publicUrlData.publicUrl
		}), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify({ error: err.message || "Upload failed" }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/upload@_@ts
var page = () => upload_exports;
//#endregion
export { page };
