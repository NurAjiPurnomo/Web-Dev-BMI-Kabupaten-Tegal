import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { d as maybeRenderHead, i as renderComponent, p as addAttribute, u as renderTemplate } from "./server_3JpwUDJR.mjs";
import { t as createComponent } from "./compiler_CrHCyIHa.mjs";
import { t as $$Layout } from "./Layout_DkTVwF9-.mjs";
import { o as fetchNewsList, s as fetchSiteSettings } from "./supabase_CDNNdpTp.mjs";
import { n as $$Footer, r as $$Header, t as $$LayananModal } from "./LayananModal_uITHnjUr.mjs";
//#region src/pages/berita.astro
var berita_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Berita,
	file: () => $$file,
	url: () => $$url
});
var $$Berita = createComponent(async ($$result, $$props, $$slots) => {
	const settings = await fetchSiteSettings();
	const allNews = await fetchNewsList();
	const featuredNews = allNews[0] || {
		id: "news-1",
		title: "BMI TEGAL BANTU BANJIR DESA PENURAKAN",
		excerpt: "Kader dan relawan BMI Kabupaten Tegal bergerak cepat menerjunkan tim tanggap bencana untuk membantu warga yang terdampak banjir.",
		category: "Aksi Sosial",
		date: "28 Juni 2022",
		image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop"
	};
	const topSideNews = allNews.slice(1, 4);
	const archiveNews = allNews.slice(0, 6);
	const categories = [
		"Semua Berita",
		"Aksi Sosial",
		"UMKM Pemuda",
		"Konsolidasi",
		"Kegiatan"
	];
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": `Kabar & Berita Resmi - ${settings.siteName}`,
		"description": "Kumpulan berita resmi, aksi sosial, tanggap bencana, dan kegiatan DPC BMI Kabupaten Tegal.",
		"data-astro-cid-jvsxgkqb": true
	}, { "default": ($$result) => renderTemplate`${renderComponent($$result, "Header", $$Header, {
		"siteName": settings.siteName,
		"data-astro-cid-jvsxgkqb": true
	})}${maybeRenderHead($$result)}<main class="pdip-berita-wrapper" data-astro-cid-jvsxgkqb><!-- Top Header Banner (Light Corporate News Header) --><section class="portal-header-banner" data-astro-cid-jvsxgkqb><div class="container" data-astro-cid-jvsxgkqb><div class="banner-content" data-astro-cid-jvsxgkqb><span class="sub-heading-pill" data-astro-cid-jvsxgkqb>PORTAL BERITA RESMI DPC BMI TEGAL</span><h1 class="banner-title" data-astro-cid-jvsxgkqb>Kabar Gerakan & Kegiatan BMI Kabupaten Tegal</h1><p class="banner-sub" data-astro-cid-jvsxgkqb>Informasi resmi seputar aksi sosial, pemberdayaan pemuda desa, dan konsolidasi organisasi di 18 Kecamatan.</p></div></div></section><!-- Main Headline Grid (Featured + 3 Side Items) --><section class="headline-section" data-astro-cid-jvsxgkqb><div class="container" data-astro-cid-jvsxgkqb><div class="headline-grid" data-astro-cid-jvsxgkqb><!-- Featured Big Article (Left) --><a${addAttribute(`/berita/${featuredNews.id}`, "href")} class="headline-featured-card" data-astro-cid-jvsxgkqb><div class="feat-img-wrap" data-astro-cid-jvsxgkqb><img${addAttribute(featuredNews.image, "src")}${addAttribute(featuredNews.title, "alt")} class="feat-img" data-astro-cid-jvsxgkqb><span class="feat-category-badge" data-astro-cid-jvsxgkqb>${featuredNews.category}</span></div><div class="feat-content" data-astro-cid-jvsxgkqb><div class="feat-meta" data-astro-cid-jvsxgkqb><span class="feat-date" data-astro-cid-jvsxgkqb>${featuredNews.date}</span><span class="feat-author" data-astro-cid-jvsxgkqb>• Humas BMI Kab. Tegal</span></div><h2 class="feat-title" data-astro-cid-jvsxgkqb>${featuredNews.title}</h2><p class="feat-excerpt" data-astro-cid-jvsxgkqb>${featuredNews.excerpt}</p><div class="feat-read-btn" data-astro-cid-jvsxgkqb><span data-astro-cid-jvsxgkqb>Baca Berita Selengkapnya</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-jvsxgkqb><path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-jvsxgkqb></path></svg></div></div></a><!-- Top Trending / Latest News List (Right Sidebar) --><div class="headline-side-list" data-astro-cid-jvsxgkqb><div class="side-header-bar" data-astro-cid-jvsxgkqb><h3 class="side-title" data-astro-cid-jvsxgkqb>BERITA POPULER</h3><div class="side-accent-line" data-astro-cid-jvsxgkqb></div></div><div class="side-items-stack" data-astro-cid-jvsxgkqb>${topSideNews.map((item) => renderTemplate`<a${addAttribute(`/berita/${item.id}`, "href")} class="side-news-item" data-astro-cid-jvsxgkqb><div class="side-thumb-wrap" data-astro-cid-jvsxgkqb><img${addAttribute(item.image, "src")}${addAttribute(item.title, "alt")} class="side-thumb" data-astro-cid-jvsxgkqb></div><div class="side-item-info" data-astro-cid-jvsxgkqb><span class="side-item-cat" data-astro-cid-jvsxgkqb>${item.category}</span><h4 class="side-item-title" data-astro-cid-jvsxgkqb>${item.title}</h4><span class="side-item-date" data-astro-cid-jvsxgkqb>${item.date}</span></div></a>`)}</div></div></div></div></section><!-- Filter Category Tabs & News Archive Section --><section class="archive-section" data-astro-cid-jvsxgkqb><div class="container" data-astro-cid-jvsxgkqb><div class="archive-header-row" data-astro-cid-jvsxgkqb><div class="title-wrapper" data-astro-cid-jvsxgkqb><h2 class="section-title" data-astro-cid-jvsxgkqb><span class="red-prefix-bar" data-astro-cid-jvsxgkqb>|</span> Indeks Berita Terbaru</h2></div><!-- Category Filter Tabs --><div class="category-tabs" data-astro-cid-jvsxgkqb>${categories.map((cat, idx) => renderTemplate`<button${addAttribute(`tab-pill ${idx === 0 ? "active" : ""}`, "class")} data-astro-cid-jvsxgkqb>${cat}</button>`)}</div></div><!-- 3-Column Card Grid --><div class="news-cards-grid" data-astro-cid-jvsxgkqb>${archiveNews.map((item) => renderTemplate`<a${addAttribute(`/berita/${item.id}`, "href")} class="pdip-card" data-astro-cid-jvsxgkqb><div class="pdip-card-img-wrap" data-astro-cid-jvsxgkqb><img${addAttribute(item.image, "src")}${addAttribute(item.title, "alt")} loading="lazy" class="pdip-card-img" data-astro-cid-jvsxgkqb><span class="pdip-cat-tag" data-astro-cid-jvsxgkqb>${item.category}</span></div><div class="pdip-card-body" data-astro-cid-jvsxgkqb><span class="pdip-card-date" data-astro-cid-jvsxgkqb>${item.date}</span><h3 class="pdip-card-title" data-astro-cid-jvsxgkqb>${item.title}</h3><p class="pdip-card-excerpt" data-astro-cid-jvsxgkqb>${item.excerpt}</p><div class="pdip-card-footer" data-astro-cid-jvsxgkqb><span class="read-link" data-astro-cid-jvsxgkqb>Baca Selengkapnya</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-astro-cid-jvsxgkqb><path d="M5 12h14M12 5l7 7-7 7" data-astro-cid-jvsxgkqb></path></svg></div></div><div class="batik-bottom-accent" data-astro-cid-jvsxgkqb><svg viewBox="0 0 80 80" class="batik-svg" data-astro-cid-jvsxgkqb><path d="M80 0 L80 80 L0 80 Z" fill="var(--dark-red)" data-astro-cid-jvsxgkqb></path><path d="M80 20 L20 80 M80 40 L40 80 M80 60 L60 80" stroke="var(--primary-red)" stroke-width="3" opacity="0.6" data-astro-cid-jvsxgkqb></path></svg></div></a>`)}</div></div></section></main>${renderComponent($$result, "Footer", $$Footer, {
		"settings": settings,
		"data-astro-cid-jvsxgkqb": true
	})}${renderComponent($$result, "NewsDetailModal", NewsDetailModal, {
		"newsList": allNews,
		"data-astro-cid-jvsxgkqb": true
	})}${renderComponent($$result, "LayananModal", $$LayananModal, { "data-astro-cid-jvsxgkqb": true })}` })}`;
}, "C:/BMI/src/pages/berita.astro", void 0);
var $$file = "C:/BMI/src/pages/berita.astro";
var $$url = "/berita";
//#endregion
//#region \0virtual:astro:page:src/pages/berita@_@astro
var page = () => berita_exports;
//#endregion
export { page };
