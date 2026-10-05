-- ============================================================
-- SKRIP TABEL DATABASE SUPABASE UNTUK BMI KABUPATEN TEGAL
-- Salin dan jalankan skrip ini di SQL Editor di Supabase Dashboard
-- ============================================================

-- 1. TABEL PENGATURAN WEBSITE (SETTINGS)
CREATE TABLE IF NOT EXISTS public.settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    site_name TEXT NOT NULL DEFAULT 'BMI KAB TEGAL',
    sub_title TEXT NOT NULL DEFAULT 'Hadir untuk Masyarakat',
    description TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    facebook TEXT,
    instagram TEXT,
    twitter TEXT,
    youtube TEXT,
    copyright TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Data Default Pengaturan
INSERT INTO public.settings (id, site_name, sub_title, description, address, phone, email, facebook, instagram, twitter, youtube, copyright)
VALUES (
    'default',
    'BMI KAB TEGAL',
    'Hadir untuk Masyarakat',
    'Organisasi kepemudaan yang berfokus pada aksi sosial, pemberdayaan masyarakat, dan partisipasi politik yang sehat di wilayah Kabupaten Tegal.',
    'Secretariat Address, No. Maruras 13, BMI. Kabupaten Tegal',
    '0873-2363 4259',
    'email@bmiltegal.com',
    'https://facebook.com',
    'https://instagram.com',
    'https://twitter.com',
    'https://youtube.com',
    '© 2024 BMI KAB TEGAL. Memberdayakan Pemuda, Membangun Bangsa'
) ON CONFLICT (id) DO NOTHING;


-- 2. TABEL SLIDE HERO BANNER (HERO_SLIDES)
CREATE TABLE IF NOT EXISTS public.hero_slides (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    subtitle TEXT,
    image TEXT NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Data Default Hero Slides
INSERT INTO public.hero_slides (id, title, subtitle, image, active) VALUES
('hero-1', 'BMI KAB TEGAL - Hadir untuk Masyarakat', 'Aksi Nyata Pemuda Tegal Bagi Sesama dan Kemajuan Daerah', 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1470&auto=format&fit=crop', true),
('hero-2', 'Pemberdayaan UMKM Pemuda Tegal', 'Mendorong Kemandirian Ekonomi Generasi Muda Kabupaten Tegal', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1470&auto=format&fit=crop', true),
('hero-3', 'Tanggap Bencana & Kepedulian Sosial', 'Tim Relawan BMI Siap Siaga Membantu Warga Terdampak', 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1470&auto=format&fit=crop', true)
ON CONFLICT (id) DO NOTHING;


-- 3. TABEL BERITA (NEWS)
CREATE TABLE IF NOT EXISTS public.news (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Aksi Sosial',
    image TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Data Default Berita
INSERT INTO public.news (id, title, date, category, image, excerpt, content, featured) VALUES
('news-1', 'BMI TEGAL BANTU BANJIR DESA', '28 Jum 2022', 'Aksi Sosial', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop', 'BMI Tegal bantu banjir desa, desa penurrakan unsam vellage community...', 'Kader dan relawan BMI Kabupaten Tegal bergerak cepat menerjunkan tim tanggap bencana untuk membantu warga yang terdampak banjir di Desa Penurakan.', true),
('news-2', 'PELATIHAN UMKM UNTUK PEMUDA', '28 Jum 2022', 'Pemberdayaan', 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop', 'BMI Tegal, UMKM untuk pemuda pelatihan 5 kantu pemasaran umshii sam...', 'Dalam rangka menumbuhkan jiwa wirausaha pemuda Kabupaten Tegal, BMI mengelar workshop dan pelatihan pemasaran digital bagi wirausaha muda.', true),
('news-3', 'PELATIHAN UMKM UNTUK PEMUDA', '28 Jum 2022', 'Pemberdayaan', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop', 'BMI Tegal bantu untuk pemuda pelatihan pelatihan UMKM untuk pemuda.', 'Pelatihan lanjutan bagi wirausahawan muda yang berfokus pada legalitas usaha dan pemasaran produk.', true),
('news-4', 'Rapat Koordinasi BMI KAB TEGAL', '26 Juni 2022', 'Organisasi', 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=800&auto=format&fit=crop', 'Rapat Koordinasi BMI KAB TEGAL Rapat Koordinasi BMI TEGAL community...', 'Pengurus DPC BMI Kabupaten Tegal menyelenggarakan Rapat Koordinasi Wilayah.', false),
('news-5', 'BMI Tegal Salurkan Bantuan Masker', '26 Juni 2022', 'Kesehatan', 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?q=80&w=800&auto=format&fit=crop', 'BMI Tegal Salurkan Bantuan Masker pempusanran sutikan dan perkarrianya...', 'Wujud nyata kepedulian kesehatan lingkungan, pengurus BMI membagikan ribuan masker medis gratis.', false),
('news-6', 'BMI Tegal Salurkan Bantuan Masker', '26 Juni 2022', 'Kesehatan', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop', 'BMI Tegal Salurkan Bantuan Masker mengiuusi un-atem dan salurkan bantuan masker...', 'Aksi lanjutan pembagian masker medis dan penyemprotan disinfektan di pemukiman warga.', false)
ON CONFLICT (id) DO NOTHING;


-- 4. TABEL LAYANAN WARGA (LAYANAN)
CREATE TABLE IF NOT EXISTS public.layanan (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    nama TEXT NOT NULL,
    telepon TEXT NOT NULL,
    kategori TEXT NOT NULL,
    pesan TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Baru',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);


-- 5. KEAMANAN RLS (ROW LEVEL SECURITY) & KEBIJAKAN AKSES TABEL
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.layanan ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Settings Access" ON public.settings;
CREATE POLICY "Public Settings Access" ON public.settings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Hero Access" ON public.hero_slides;
CREATE POLICY "Public Hero Access" ON public.hero_slides FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public News Access" ON public.news;
CREATE POLICY "Public News Access" ON public.news FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Layanan Access" ON public.layanan;
CREATE POLICY "Public Layanan Access" ON public.layanan FOR ALL USING (true) WITH CHECK (true);


-- 6. STORAGE BUCKET UNTUK UPLOAD GAMBAR MEDIA
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Public Upload Media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media');
CREATE POLICY "Public Delete Media" ON storage.objects FOR DELETE USING (bucket_id = 'media');
