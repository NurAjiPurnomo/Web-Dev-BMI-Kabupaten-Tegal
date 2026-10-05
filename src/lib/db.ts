import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

export interface SiteSettings {
  siteName: string;
  subTitle: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
  };
  copyright: string;
  itCredit?: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  active: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  featured?: boolean;
}

export interface LayananRequest {
  id: string;
  nama: string;
  telepon: string;
  kategori: string;
  pesan: string;
  status: 'Baru' | 'Diproses' | 'Selesai';
  createdAt: string;
}

export interface AgendaItem {
  id: string;
  title: string;
  kecamatan: string;
  desc: string;
  schedule: string;
  badge: string;
  impact: string;
  location?: string;
  status?: string;
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  tag: string;
}

export interface AboutPageContent {
  heroTitle: string;
  heroSubtitle: string;
  // Metrics (4 Stat Cards)
  metric1Val: string;
  metric1Lbl: string;
  metric2Val: string;
  metric2Lbl: string;
  metric3Val: string;
  metric3Lbl: string;
  metric4Val: string;
  metric4Lbl: string;
  // Peran & Sejarah Section
  sejarahTag: string;
  sejarahTitle: string;
  sejarahLead: string;
  sejarahBody: string;
  sejarahImage: string;
  sejarahBadgeText: string;
  sejarahBadgeSub: string;
  // Program Highlights (3 Poin Unggulan)
  highlight1Title: string;
  highlight1Desc: string;
  highlight2Title: string;
  highlight2Desc: string;
  highlight3Title: string;
  highlight3Desc: string;
  // Visi & Misi Section
  visiTitle: string;
  visiDesc: string;
  misiList: string[];
  // Pilar Gerakan (4 Pilar)
  pilar1Title: string;
  pilar1Desc: string;
  pilar2Title: string;
  pilar2Desc: string;
  pilar3Title: string;
  pilar3Desc: string;
  pilar4Title: string;
  pilar4Desc: string;
  // Jangkauan 18 Kecamatan Tagline
  kecamatanDesc: string;
  kecamatanList: string[];
  // Lokasi Kantor & Sekretariat
  kantorTitle: string;
  kantorSub: string;
  kantorAlamat: string;
  kantorJam: string;
  kantorPhone: string;
  kantorEmail: string;
  kantorMapsUrl: string;
  // CTA Banner Melayani Warga
  ctaTag: string;
  ctaTitle: string;
  ctaDesc: string;
}

export interface PillarItem {
  id: string;
  title: string;
  desc: string;
  category: string;
  status: string;
  stats: string;
  kecamatan: string;
  image: string;
}

export interface AgendaPageContent {
  heroTag: string;
  heroTitle: string;
  heroSubtitle: string;
  heroTrust1: string;
  heroTrust2: string;
  heroTrust3: string;
  // Hero Event Spotlight Card
  eventSpotlightPill: string;
  eventSpotlightCategory: string;
  eventSpotlightTitle: string;
  eventSpotlightSchedule: string;
  eventSpotlightLocation: string;
  // Spotlight Program Showcase
  spotlightBadge: string;
  spotlightCategory: string;
  spotlightTitle: string;
  spotlightDesc: string;
  spotlightImage: string;
  spotlightFeat1: string;
  spotlightFeat2: string;
  spotlightFeat3: string;
  spotlightBtnText: string;
  spotlightBtnUrl: string;
  // Pilar Gerakan (Dynamic List)
  pillarsTag: string;
  pillarsTitle: string;
  pillarsDesc: string;
  pillarsList: PillarItem[];
  // Legacy pillar fields fallback
  pilar1Title?: string; pilar1Desc?: string; pilar1Category?: string; pilar1Status?: string; pilar1Stats?: string; pilar1Kecamatan?: string; pilar1Image?: string;
  pilar2Title?: string; pilar2Desc?: string; pilar2Category?: string; pilar2Status?: string; pilar2Stats?: string; pilar2Kecamatan?: string; pilar2Image?: string;
  pilar3Title?: string; pilar3Desc?: string; pilar3Category?: string; pilar3Status?: string; pilar3Stats?: string; pilar3Kecamatan?: string; pilar3Image?: string;
  pilar4Title?: string; pilar4Desc?: string; pilar4Category?: string; pilar4Status?: string; pilar4Stats?: string; pilar4Kecamatan?: string; pilar4Image?: string;
  // Rekam Jejak Agenda Section
  realisasiTag: string;
  realisasiTitle: string;
  realisasiDesc: string;
  // Collaboration CTA
  ctaTag: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtnText: string;
  ctaBtnUrl: string;
}

export interface DatabaseSchema {
  settings: SiteSettings;
  heroSlides: HeroSlide[];
  news: NewsItem[];
  layanan: LayananRequest[];
  agenda: AgendaItem[];
  team: TeamMember[];
  about: AboutPageContent;
  agendaPageContent: AgendaPageContent;
}

export function getDB(): DatabaseSchema {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf-8');
      const parsed = JSON.parse(data);
      return {
        settings: parsed.settings || defaultSettings,
        heroSlides: parsed.heroSlides || [],
        news: parsed.news || [],
        layanan: parsed.layanan || [],
        agenda: parsed.agenda || defaultAgenda,
        team: parsed.team || defaultTeam,
        about: { ...defaultAbout, ...(parsed.about || {}) },
        agendaPageContent: { ...defaultAgendaPageContent, ...(parsed.agendaPageContent || {}) }
      };
    }
  } catch (err) {
    console.error('Error reading db.json:', err);
  }
  return {
    settings: defaultSettings,
    heroSlides: [],
    news: [],
    layanan: [],
    agenda: defaultAgenda,
    team: defaultTeam,
    about: defaultAbout,
    agendaPageContent: defaultAgendaPageContent
  };
}

const defaultSettings: SiteSettings = {
  siteName: "BMI KAB TEGAL",
  subTitle: "Hadir untuk Masyarakat",
  description: "Organisasi kepemudaan yang berfokus pada aksi sosial...",
  address: "Secretariat Address, No. Maruras 13, BMI. Kabupaten Tegal",
  phone: "0888-8888-8888",
  email: "email@bmiltegal.com",
  social: { facebook: "#", instagram: "#", twitter: "#", youtube: "#" },
  copyright: "© 2024 BMI KAB TEGAL",
  itCredit: "Dikelola oleh Penanggung Jawab Divisi IT DPC BMI Kab. Tegal"
};

const defaultAgenda: AgendaItem[] = [
  {
    id: "agenda-1",
    title: "Pendampingan Legalitas NIB Gratis Bagi 100 UMKM Pemuda Desa",
    kecamatan: "Kecamatan Slawi & Adiwerna",
    desc: "Fasilitasi pembuatan NIB dan izin edar gratis bagi wirausaha muda desa agar mudah mengakses perbankan dan program permodalan daerah.",
    schedule: "Setiap Hari Sabtu (09.00 - 15.00 WIB)",
    badge: "Ekonomi Kreatif",
    impact: "100+ Izin NIB Terbit",
    location: "Pendopo Kecamatan Slawi"
  },
  {
    id: "agenda-2",
    title: "Posko Relawan & Dapur Umum Tanggap Bencana Banjir",
    kecamatan: "Kecamatan Kramat & Suradadi",
    desc: "Penyiapan makanan hangat, penyaluran air bersih, selimut, dan obat-obatan bagi warga terdampak luapan sungai di pesisir utara Tegal.",
    schedule: "Aksi Tanggap Cepat Relawan",
    badge: "Kemanusiaan",
    impact: "1.200+ Paket Logistik",
    location: "Kawasan Pesisir Suradadi"
  },
  {
    id: "agenda-3",
    title: "Workshop Digital Branding & Fotografi Produk Pakai HP",
    kecamatan: "Kecamatan Pangkah & Lebaksiu",
    desc: "Pelatihan praktis teknik pencahayaan dan foto katalog produk UMKM desa memanfaatkan kamera ponsel untuk kebutuhan jualan online.",
    schedule: "Minggu Ke-2 Setiap Bulan",
    badge: "Digitalisasi",
    impact: "85 Pemuda Terlatih",
    location: "Balai Desa Pangkah"
  },
  {
    id: "agenda-4",
    title: "Bakti Sosial Donor Darah & Cek Kesehatan Lansia Gratis",
    kecamatan: "Kecamatan Margasari & Bumijawa",
    desc: "Kerjasama dengan PMI Kabupaten Tegal dalam penyediaan stok darah serta pemeriksaan gula darah & asam urat gratis bagi warga desa.",
    schedule: "Kegiatan Triwulan",
    badge: "Kesehatan",
    impact: "250 Kantong Darah",
    location: "Pendopo Kecamatan Bumijawa"
  }
];

const defaultTeam: TeamMember[] = [
  {
    id: "team-1",
    name: "H. Bambang Sutrisno, S.T.",
    role: "Ketua DPC BMI Kab. Tegal",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
    tag: "Pimpinan Organisasi"
  },
  {
    id: "team-2",
    name: "Rian Hidayat, S.Sos.",
    role: "Sekretaris DPC BMI Kab. Tegal",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
    tag: "Keorganisasian"
  },
  {
    id: "team-3",
    name: "Dewi Anggraeni, S.E.",
    role: "Bendahara DPC BMI Kab. Tegal",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    tag: "Keuangan"
  },
  {
    id: "team-4",
    name: "Ahmad Fauzi, S.Kom.",
    role: "Ketua Bidang UMKM Pemuda",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    tag: "Pemberdayaan UMKM"
  }
];

const defaultAbout: AboutPageContent = {
  heroTitle: "Mewujudkan Pemuda Berdaya Saing, Mandiri & Bergotong Royong",
  heroSubtitle: "DPC Banteng Muda Indonesia Kabupaten Tegal hadir sebagai wadah aksi nyata kepemudaan dalam penanggulangan bencana, pembinaan wirausaha UMKM desa, dan pelayanan sosial di 18 kecamatan.",
  metric1Val: "18",
  metric1Lbl: "Kecamatan Terjangkau",
  metric2Val: "150+",
  metric2Lbl: "Aksi Sosial & Relawan",
  metric3Val: "350+",
  metric3Lbl: "UMKM Binaan Pemuda",
  metric4Val: "10.000+",
  metric4Lbl: "Penerima Bantuan",
  sejarahTag: "PERAN & SEJARAH",
  sejarahTitle: "Gerakan Pemuda Berjiwa Social Impact & Gotong Royong",
  sejarahLead: "DPC BMI Kabupaten Tegal merupakan wadah kepemudaan yang berdiri di atas semangat gotong royong dan kepedulian sosial untuk bergerak bersama masyarakat.",
  sejarahBody: "Kami hadir melayani warga di 18 kecamatan — dari kawasan pesisir Suradadi hingga lereng Bumijawa — melalui aksi relawan bencana, bakti sosial, donor darah, hingga pendampingan izin legalitas NIB dan pemasaran digital bagi UMKM pemuda desa.",
  sejarahImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800&auto=format&fit=crop",
  sejarahBadgeText: "18 Kecamatan",
  sejarahBadgeSub: "Jaringan Relawan & Pengurus",
  highlight1Title: "Aksi Tanggap Sosial & Relawan",
  highlight1Desc: "Penyaluran bantuan logistik bencana, aksi donor darah, dan bakti sosial gotong royong warga.",
  highlight2Title: "Klinik UMKM & Inkubasi Pemuda",
  highlight2Desc: "Pendampingan pembuatan legalitas NIB, perbaikan desain kemasan, dan edukasi pemasaran digital gratis.",
  highlight3Title: "Partisipasi & Kepemimpinan Pemuda",
  highlight3Desc: "Ruang kaderisasi pemuda desa untuk aktif berorganisasi dan berkontribusi dalam pembangunan daerah.",
  visiTitle: "Mewujudkan Generasi Muda Berdaya Saing & Bergotong Royong",
  visiDesc: "Mewujudkan generasi muda Kabupaten Tegal yang mandiri, berkarakter gotong royong, berdaya saing tinggi dalam ekonomi kreatif UMKM, serta peduli terhadap kesejahteraan sosial masyarakat.",
  misiList: [
    "Menerjunkan tim relawan dalam setiap aksi sosial dan penanggulangan bencana di Kabupaten Tegal.",
    "Menyelenggarakan pelatihan dan pendampingan UMKM bagi wirausahawan pemuda desa.",
    "Memperkuat sinergi antara generasi muda dengan tokoh masyarakat dan pemerintah daerah.",
    "Mendorong partisipasi aktif pemuda dalam kegiatan kemasyarakatan dan kepemimpinan."
  ],
  pilar1Title: "Gotong Royong",
  pilar1Desc: "Bahu-membahu bersama warga tanpa membedakan latar belakang demi kemajuan daerah.",
  pilar2Title: "Pemberdayaan UMKM",
  pilar2Desc: "Mendampingi wirausaha muda dari perizinan legalitas hingga strategi pemasaran digital.",
  pilar3Title: "Tanggap Bencana",
  pilar3Desc: "Sigap dan cepat hadir membantu warga terdampak musibah banjir dan krisis sosial.",
  pilar4Title: "Kemandirian Pemuda",
  pilar4Desc: "Membentuk karakter pemuda yang berani berkarya, berorientasi solusi, dan inovatif.",
  kecamatanDesc: "Jaringan pengurus dan relawan BMI tersebar merata di seluruh wilayah Kabupaten Tegal.",
  kecamatanList: [
    'Slawi', 'Adiwerna', 'Dukuhturi', 'Talang', 'Kramat', 'Suradadi',
    'Warureja', 'Pangkah', 'Lebaksiu', 'Balapulang', 'Margasari', 'Bumijawa',
    'Bojong', 'Jatinegara', 'Pagerbarang', 'Dukuhwaru', 'Kedungbanteng', 'Tarub'
  ],
  kantorTitle: "Lokasi Kantor & Sekretariat",
  kantorSub: "Kantor DPC Banteng Muda Indonesia Kabupaten Tegal terbuka untuk ruang aspirasi, konsultasi wirausaha, dan layanan masyarakat.",
  kantorAlamat: "Jl. Prof. Muhammad Yamin No. 12, Pakembaran, Kec. Slawi, Kabupaten Tegal, Jawa Tengah 52415",
  kantorJam: "Senin - Sabtu: 08.00 - 16.00 WIB (Hari Minggu / Libur Nasional Tutup)",
  kantorPhone: "+62 812-3456-7890 (Humas DPC BMI Kab. Tegal)",
  kantorEmail: "dpc@bmitegal.or.id / sekretariat@bmitegal.or.id",
  kantorMapsUrl: "https://maps.google.com/?q=Slawi+Kabupaten+Tegal",
  ctaTag: "LAYANAN & ASPIRASI MASYARAKAT",
  ctaTitle: "DPC BMI Kab. Tegal Hadir Melayani Warga",
  ctaDesc: "Sampaikan aspirasi, permohonan pendampingan NIB UMKM desa, atau ajukan permohonan relawan aksi sosial."
};

const defaultAgendaPageContent: AgendaPageContent = {
  heroTag: "PROGRAM & AGENDA KERJA DPC BMI",
  heroTitle: "Aksi Nyata & Agenda Kerja Gotong Royong",
  heroSubtitle: "Jadwal pelatihan UMKM, bakti sosial relawan, posko bencana, dan sekolah kader kepemudaan di 18 kecamatan Kabupaten Tegal.",
  heroTrust1: "Aktif di 18 Kecamatan",
  heroTrust2: "350+ UMKM Pemuda Binaan",
  heroTrust3: "Tanggap Bencana & Relawan",
  eventSpotlightPill: "AGENDA MENDATANG",
  eventSpotlightCategory: "Pemberdayaan Ekonomi",
  eventSpotlightTitle: "Pelatihan Inkubasi UMKM Pemuda & Fasilitasi NIB Gratis",
  eventSpotlightSchedule: "12 Oktober 2026 (09.00 WIB)",
  eventSpotlightLocation: "Pendopo Kecamatan Slawi",
  spotlightBadge: "PROGRAM UNGGULAN 2024",
  spotlightCategory: "PEMBERDAYAAN EKONOMI KREATIF",
  spotlightTitle: "Klinik Inkubasi & Pendampingan NIB Gratis Bagi 1.000 UMKM Pemuda Desa",
  spotlightDesc: "Program strategis DPC BMI Kabupaten Tegal untuk membantu wirausaha muda di pedesaan memperoleh legalitas resmi, sertifikasi halal, pendampingan kemasan, dan pengusulan akses modal KUR daerah.",
  spotlightImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop",
  spotlightFeat1: "Fasilitasi NIB & Sertifikat Halal Gratis",
  spotlightFeat2: "Desain Kemasan Modern & Foto Produk HP",
  spotlightFeat3: "Pelatihan Penjualan Online via TikTok Shop & Shopee",
  spotlightBtnText: "Daftar Konsultasi UMKM",
  spotlightBtnUrl: "",
  pillarsTag: "PILAR GERAKAN",
  pillarsTitle: "4 Fokus Program Kerja Utama",
  pillarsDesc: "Empat pilar utama pendorong aksi nyata relawan dan kader BMI di Kabupaten Tegal.",
  pillarsList: [
    {
      id: "pilar-1",
      title: "Gotong Royong & Kemanusiaan",
      desc: "Bahu-membahu bersama warga tanpa membedakan latar belakang demi kemajuan daerah dan tanggap bencana.",
      category: "Sosial & Kemanusiaan",
      status: "Aktif Berkelanjutan",
      stats: "18 Kecamatan",
      kecamatan: "Seluruh Kab. Tegal",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "pilar-2",
      title: "Pemberdayaan UMKM Pemuda",
      desc: "Mendampingi wirausaha muda dari perizinan legalitas, sertifikasi halal, hingga strategi pemasaran digital.",
      category: "Ekonomi Kreatif",
      status: "Program Prioritas",
      stats: "350+ UMKM Binaan",
      kecamatan: "Adiwerna, Slawi, Kramat",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "pilar-3",
      title: "Tanggap Bencana & Aksi Cepat",
      desc: "Sigap dan cepat hadir membantu warga terdampak musibah banjir, krisis sosial, dan respon darurat.",
      category: "Relawan & Posko",
      status: "Siaga 24 Jam",
      stats: "12 Posko Desa",
      kecamatan: "Margasari, Bumijawa, Suradadi",
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "pilar-4",
      title: "Kemandirian & Kaderisasi Pemuda",
      desc: "Membentuk karakter pemuda yang berani berkarya, berorientasi solusi, dan berjiwa kepemimpinan tinggi.",
      category: "Pendidikan & Kepemimpinan",
      status: "Pelatihan Rutin",
      stats: "1.200+ Kader",
      kecamatan: "Dukuhturi, Talang, Lebaksiu",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800"
    }
  ],
  realisasiTag: "REKAM JEJAK AGENDA",
  realisasiTitle: "Agenda Realisasi Program",
  realisasiDesc: "Rekam kegiatan & aksi nyata langsung di tengah masyarakat desa.",
  ctaTag: "KOLABORASI & USULAN PROGRAM",
  ctaTitle: "Ingin Mengusulkan Program atau Berkolaborasi di Desamu?",
  ctaDesc: "Kader dan relawan DPC Banteng Muda Indonesia Kabupaten Tegal siap hadir dan bergotong royong menjalankan aksi nyata bersama warga desa Anda.",
  ctaBtnText: "Usulkan Program",
  ctaBtnUrl: ""
};

export function saveDB(data: DatabaseSchema): boolean {
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing to db.json:', err);
    return false;
  }
}
