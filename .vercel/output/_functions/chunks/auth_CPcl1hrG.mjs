import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/api/auth.ts
var auth_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request }) => {
	try {
		const { username, password } = await request.json();
		if (username?.toLowerCase() === "admin@bmi.com" && password === "adminbmi2026" || username === "admin" && (password === "admin123" || password === "adminbmi2026")) {
			const token = "bmi_admin_session_" + Date.now();
			return new Response(JSON.stringify({
				success: true,
				token,
				user: {
					name: "Administrator BMI",
					role: "Super Admin"
				}
			}), { status: 200 });
		}
		return new Response(JSON.stringify({
			success: false,
			error: "Username atau Password salah!"
		}), { status: 401 });
	} catch (err) {
		return new Response(JSON.stringify({ error: "Auth failed" }), { status: 400 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth@_@ts
var page = () => auth_exports;
//#endregion
export { page };
