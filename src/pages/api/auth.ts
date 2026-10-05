import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { username, password } = data;

    // Admin credentials: username: admin@bmi.com, password: adminbmi2026
    if (
      (username?.toLowerCase() === 'admin@bmi.com' && password === 'adminbmi2026') ||
      (username === 'admin' && (password === 'admin123' || password === 'adminbmi2026'))
    ) {
      const token = 'bmi_admin_session_' + Date.now();
      return new Response(JSON.stringify({
        success: true,
        token: token,
        user: { name: 'Administrator BMI', role: 'Super Admin' }
      }), { status: 200 });
    }

    return new Response(JSON.stringify({ success: false, error: 'Username atau Password salah!' }), { status: 401 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Auth failed' }), { status: 400 });
  }
};
